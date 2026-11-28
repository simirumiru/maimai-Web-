"""maiツールの統計（匿名）を1日1回まとめるスクリプト。GitHub Actions から動かす。

Firestore の stats_users（本番）と test_stats_users（テスト）を全部読み、
譜面ごとに「遊んだ人数」と「SSS・FC・AP・星などを達成した人数」を数えて
stats.json / test_stats.json に書き出す。

読み込みにはサービスアカウントの鍵（GitHub の Secrets: FIREBASE_SA）を使う。
鍵がないときは、手元で試せるように --local の JSON ファイルから読む。
"""
import json, os, sys, hashlib, datetime, unicodedata, re

PROJECT = 'maimai-plate-27ca2'
COLLECTIONS = {'stats_users': 'stats.json', 'test_stats_users': 'test_stats.json'}
# 出力の並び: [遊んだ人数, SSS, SSS+, FC, FC+, AP, AP+, FS, FS+, FDX, FDX+, ☆1..☆7]
N_COLS = 18


def norm(n):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', str(n or ''))).strip()


def plausible(rows):
    """ありえない記録が1つでもあれば、その人の分は数えない"""
    if not isinstance(rows, list) or not rows or len(rows) > 6000:
        return False
    seen = set()
    for r in rows:
        if not (isinstance(r, list) and len(r) == 5 and isinstance(r[0], str)):
            return False
        key, ach, fc, fs, star = r
        if key in seen:
            return False
        seen.add(key)
        if not all(isinstance(x, int) for x in (ach, fc, fs, star)):
            return False
        if not (0 < ach <= 1010000 and 0 <= fc <= 4 and 0 <= fs <= 5 and 0 <= star <= 7):
            return False
        if fc >= 3 and ach < 1000000:      # AP なのに 100% 未満
            return False
        if fc == 4 and ach != 1010000:      # AP+ は 101% だけ
            return False
        if key.count('|') < 2 or key.rsplit('|', 1)[1] not in ('3', '4'):
            return False
    return True


def aggregate(docs):
    charts, users, dropped, bodies = {}, 0, 0, set()
    for d in docs:
        body = d.get('r')
        if not isinstance(body, str):
            dropped += 1
            continue
        h = hashlib.sha256(body.encode('utf-8')).hexdigest()
        if h in bodies:                     # 全く同じ中身はまとめて1人
            dropped += 1
            continue
        try:
            rows = json.loads(body)
        except Exception:
            dropped += 1
            continue
        if not plausible(rows):
            dropped += 1
            continue
        bodies.add(h)
        users += 1
        for key, ach, fc, fs, star in rows:
            name, typ, diff = key.rsplit('|', 2)
            k = norm(name) + '|' + typ + '|' + diff
            c = charts.setdefault(k, [0] * N_COLS)
            c[0] += 1
            if ach >= 1000000: c[1] += 1
            if ach >= 1005000: c[2] += 1
            for i in range(1, 5):
                if fc >= i: c[2 + i] += 1
            for i in range(2, 6):
                if fs >= i: c[5 + i] += 1
            for i in range(1, 8):
                if star >= i: c[10 + i] += 1
    return charts, users, dropped


def read_firestore(col, token):
    import requests
    url = f'https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents/{col}'
    out, page = [], None
    while True:
        params = {'pageSize': 300}
        if page:
            params['pageToken'] = page
        r = requests.get(url, params=params, headers={'Authorization': 'Bearer ' + token}, timeout=60)
        r.raise_for_status()
        j = r.json()
        for d in j.get('documents', []):
            f = d.get('fields', {})
            out.append({'r': f.get('r', {}).get('stringValue')})
        page = j.get('nextPageToken')
        if not page:
            return out


def get_token():
    from google.oauth2 import service_account
    import google.auth.transport.requests
    info = json.loads(os.environ['FIREBASE_SA'])
    cred = service_account.Credentials.from_service_account_info(info, scopes=['https://www.googleapis.com/auth/datastore'])
    cred.refresh(google.auth.transport.requests.Request())
    return cred.token


def main():
    outdir = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else '.'
    jst = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=9)
    local = sys.argv[sys.argv.index('--local') + 1] if '--local' in sys.argv else None
    token = None if local else get_token()
    for col, fname in COLLECTIONS.items():
        docs = json.load(open(local)).get(col, []) if local else read_firestore(col, token)
        charts, users, dropped = aggregate(docs)
        res = {'at': f'{jst.month}/{jst.day}', 'users': users, 'c': charts}
        with open(os.path.join(outdir, fname), 'w', encoding='utf-8') as f:
            json.dump(res, f, ensure_ascii=False, separators=(',', ':'))
        print(f'{col}: {users} users, {len(charts)} charts, {dropped} dropped')


if __name__ == '__main__':
    main()
