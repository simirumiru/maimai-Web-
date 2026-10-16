/* maiplate import (ASCII-only: Japanese text is written as \uXXXX so it shows correctly on any charset) */
/* mai\u30d7\u30ec\u30fc\u30c8\uff1amaimai \u3067\u3089\u3063\u304f\u3059 NET \u304b\u3089\u8a18\u9332\u3092\u8aad\u307f\u53d6\u3063\u3066 mai\u30d7\u30ec\u30fc\u30c8\u3078\u9001\u308b\u3002
   \u30d6\u30c3\u30af\u30de\u30fc\u30af\u306b\u306f\u300c\u3053\u306e\u30d5\u30a1\u30a4\u30eb\u3092\u8aad\u307f\u8fbc\u3080\u3060\u3051\u300d\u306e\u77ed\u3044\u30b3\u30fc\u30c9\u304c\u5165\u3063\u3066\u3044\u308b\u3002
   \u53d6\u308a\u8fbc\u307f\u306e\u4e2d\u8eab\u3092\u5909\u3048\u305f\u3044\u3068\u304d\u306f\u3053\u306e\u30d5\u30a1\u30a4\u30eb\u3092\u76f4\u3059\uff08\u307f\u3093\u306a\u306e\u30d6\u30c3\u30af\u30de\u30fc\u30af\u306f\u5909\u3048\u306a\u304f\u3066\u3088\u3044\uff09\u3002
   \u30d6\u30c3\u30af\u30de\u30fc\u30af\u5074\u3067\u5148\u306b maiplate \u306e\u30bf\u30d6\u3092\u958b\u304d\u3001window.__maiplateT\uff08mai\u30d7\u30ec\u30fc\u30c8\u306eURL\uff09\u3068
   window.__maiplateW\uff08\u958b\u3044\u305f\u30bf\u30d6\uff09\u3092\u6e21\u3057\u3066\u304f\u308b\u3002

   \u30b9\u30de\u30db\uff08\u7279\u306b iPhone \u306e Safari\uff09\u306f\u3001\u898b\u3066\u3044\u306a\u3044\u30bf\u30d6\u306e\u51e6\u7406\u3092\u6b62\u3081\u3066\u3057\u307e\u3046\u3002
   \u30d6\u30c3\u30af\u30de\u30fc\u30af\u304c mai\u30d7\u30ec\u30fc\u30c8\u306e\u30bf\u30d6\u3092\u958b\u304f\u3068 NET \u306e\u30bf\u30d6\u304c\u88cf\u306b\u56de\u308a\u3001\u8aad\u307f\u53d6\u308a\u304c\u9014\u4e2d\u3067\u6b62\u307e\u308b\u306e\u3067\u3001
   \u30b9\u30de\u30db\u3067\u306f\u958b\u3044\u305f\u30bf\u30d6\u3092\u3044\u3063\u305f\u3093\u9589\u3058\u3066 NET \u306e\u753b\u9762\u306e\u307e\u307e\u8aad\u307f\u53d6\u308a\u3001
   \u8aad\u307f\u7d42\u308f\u3063\u305f\u3089\u300cmai\u30d7\u30ec\u30fc\u30c8\u306b\u9001\u308b\u300d\u30dc\u30bf\u30f3\u3067 mai\u30d7\u30ec\u30fc\u30c8\u3092\u958b\u3044\u3066\u9001\u308b\u3002 */
(function(){
var T = window.__maiplateT;
if (!T){ var cs = document.currentScript; T = cs ? cs.src.replace(/[?#].*$/, '').replace(/[^\/]*$/, '') : 'https://maiplate.vercel.app/'; }
var O = new URL(T).origin;
if (location.hostname !== 'maimaidx.jp'){ alert('maimai\u3067\u3089\u3063\u304f\u3059NET\u306b\u30ed\u30b0\u30a4\u30f3\u3057\u305f\u753b\u9762\u3067\u958b\u3044\u3066\u304f\u3060\u3055\u3044\u3002'); return; }
/* \u3082\u3046\u4e00\u5ea6\u62bc\u3055\u308c\u305f\u3068\u304d\u306f\u3001\u524d\u306e\u6848\u5185\u3092\u6d88\u3057\u3066\u6700\u521d\u304b\u3089\u3084\u308a\u76f4\u3059\uff08\u524d\u306e\u5206\u306f\u6b62\u3081\u308b\uff09 */
var run = (window.__maiplateRun = (window.__maiplateRun || 0) + 1);
function stale(){ return window.__maiplateRun !== run; }
var old = document.getElementById('maiplate-box'); if (old) old.remove();

var mobile = /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
var w = window.__maiplateW;
if (mobile && w && !w.closed){ try{ w.close(); }catch(e){} }
if (!mobile && (!w || w.closed)) w = window.open(T + '#/import', 'maiplate');

/* ---- NET \u306e\u753b\u9762\u306e\u4e0a\u306b\u51fa\u3059\u6848\u5185\uff08\u6587\u5b57\uff0b\u5fc5\u8981\u306a\u3089\u30dc\u30bf\u30f3\uff09 ---- */
var box = document.createElement('div'); box.id = 'maiplate-box';
box.style.cssText = 'position:fixed;left:12px;right:12px;top:14px;z-index:99999;display:flex;flex-direction:column;align-items:center;gap:8px;' +
  'background:#1d2a35;color:#fff;font:bold 14px/1.5 sans-serif;padding:12px 16px;border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35);text-align:center';
var msg = document.createElement('div'); box.appendChild(msg);
var btn = document.createElement('button');
btn.style.cssText = 'display:none;appearance:none;-webkit-appearance:none;border:0;border-radius:999px;background:#2f9be0;color:#fff;font:bold 16px sans-serif;padding:10px 22px;cursor:pointer';
box.appendChild(btn);
document.body.appendChild(box);
function say(t, label, onTap){
  msg.textContent = t;
  if (label){ btn.textContent = label; btn.onclick = onTap; btn.style.display = ''; }
  else { btn.onclick = null; btn.style.display = 'none'; }
}
function fail(t){
  fin = true;
  if (stale()) return;
  box.style.background = '#7a1f1f';
  say(t);
  try{ if (w && !w.closed) w.postMessage({ type: 'maiplate-progress', error: 1, msg: t }, O); }catch(e){}
}

/* ---- 1\u30da\u30fc\u30b8\u5206\u3092\u8aad\u3080\uff08\u6642\u9593\u304c\u304b\u304b\u308a\u3059\u304e\u305f\u30891\u56de\u3060\u3051\u3084\u308a\u76f4\u3059\uff09 ---- */
function ic(r, re){ var m = r.querySelectorAll('img'); for (var i = 0; i < m.length; i++){ var x = re.exec(String(m[i].src).replace(/[?#].*$/, '')); if (x) return x[1]; } return ''; }
function load(d, tries){
  var ctl = ('AbortController' in window) ? new AbortController() : null;
  var timer = ctl ? setTimeout(function(){ ctl.abort(); }, 90000) : null;
  return fetch('/maimai-mobile/record/musicGenre/search/?genre=99&diff=' + d, { credentials: 'include', signal: ctl ? ctl.signal : undefined })
    .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(function(t){ clearTimeout(timer); return t; },
          function(e){ clearTimeout(timer); if (tries > 0) return load(d, tries - 1); throw e; });
}
function parse(t, d){
  var doc = new DOMParser().parseFromString(t, 'text/html'); var out = [], g = '';
  doc.querySelectorAll('.main_wrapper.t_c .m_15').forEach(function(r){
    if (r.classList.contains('screw_block')){ g = r.textContent.trim(); return; }
    var sb = r.querySelectorAll('.music_score_block'), nm = r.querySelector('.music_name_block');
    if (!sb.length || !nm) return;
    var n = nm.textContent.replace(/\s+/g, ' ').trim();
    if (n === 'Link' && /niconico/i.test(g)) n = 'Link (Circle of friends)';
    var k = r.querySelector('.music_kind_icon');
    var ty = r.id ? (r.id.indexOf('sta_') >= 0 ? 'ST' : 'DX') : (k && /_standard/.test(k.src) ? 'ST' : 'DX');
    out.push([n, ty, d, Math.round((parseFloat(sb[0].textContent) || 0) * 10000),
      ic(r, /music_icon_(fcp?|app?)\.png$/), ic(r, /music_icon_(fsd?p?|fdxp?|fsp?|sync)\.png$/)]);
  });
  return out;
}

/* ---- \u9032\u307f\u5177\u5408\uff08\u4f55\u30da\u30fc\u30b8\u8aad\u3081\u305f\u304b\uff0b\u5c11\u3057\u305a\u3064\u9032\u3081\u308b\u8868\u793a\uff09 ---- */
var dn = 0, tot = 5, fin = false, sh = 0;
var pt = setInterval(function(){
  if (fin || stale()){ clearInterval(pt); return; }
  try{ if (w && !w.closed) w.postMessage({ type: 'maiplate-progress', done: dn, total: tot }, O); }catch(e){}
}, 400);
var st = setInterval(function(){
  if (fin || stale()){ clearInterval(st); return; }
  var cap = Math.min(95, dn / tot * 100 + 19);
  if (sh < cap) sh = Math.min(cap, sh + Math.max(0.12, (cap - sh) * 0.035));
  say('mai\u30d7\u30ec\u30fc\u30c8\uff1a\u8a18\u9332\u3092\u8aad\u307f\u53d6\u308a\u4e2d\u2026 ' + Math.floor(sh) + '%\uff08' + dn + '/' + tot + '\uff09' +
    (mobile ? '\n\u3053\u306e\u753b\u9762\u306e\u307e\u307e\u5c11\u3057\u5f85\u3063\u3066\u304f\u3060\u3055\u3044' : ''));
}, 60);
msg.style.whiteSpace = 'pre-line';

function page(d){ return load(d, 1).then(function(t){ var r = parse(t, d); dn++; return r; }); }
Promise.all([page(0), page(1), page(2), page(3), page(4)]).then(function(a){
  fin = true;
  if (stale()) return;
  var rec = [].concat.apply([], a);
  if (!rec.length){ fail('\u8a18\u9332\u3092\u8aad\u307f\u53d6\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002maimai\u3067\u3089\u3063\u304f\u3059NET\u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3044\u308b\u304b\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002'); return; }
  var p = { type: 'maiplate-import', v: 1, at: Date.now(), records: rec };
  var ok = false, sending = null;
  window.addEventListener('message', function(e){ if (e.origin === O && e.data === 'maiplate-ack') ok = true; });
  function done(){
    clearInterval(sending);
    say('mai\u30d7\u30ec\u30fc\u30c8\u3078\u9001\u308a\u307e\u3057\u305f\uff08' + rec.length + '\u8b5c\u9762\uff09\u3002mai\u30d7\u30ec\u30fc\u30c8\u306e\u30bf\u30d6\u3067\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002');
    setTimeout(function(){ box.remove(); }, 8000);
  }
  /* \u5c4a\u3044\u305f\u3068\u8fd4\u4e8b\u304c\u6765\u308b\u307e\u3067\u9001\u308a\u7d9a\u3051\u308b\uff08mai\u30d7\u30ec\u30fc\u30c8\u306e\u8aad\u307f\u8fbc\u307f\u306b\u6642\u9593\u304c\u304b\u304b\u3063\u3066\u3082\u5c4a\u304f\u3088\u3046\u306b\u6700\u592710\u5206\uff09 */
  function send(){
    clearInterval(sending);
    var n = 0;
    sending = setInterval(function(){
      if (stale()){ clearInterval(sending); return; }
      if (ok){ done(); return; }
      if (n++ > 1200){ clearInterval(sending); say('\u9001\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044\u3002'); return; }
      try{ if (w && !w.closed) w.postMessage(p, O); }catch(e){}
    }, 500);
  }
  function openAndSend(){
    w = window.open(T + '#/import', 'maiplate');
    if (!w){ say('mai\u30d7\u30ec\u30fc\u30c8\u3092\u958b\u3051\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u3092\u8a31\u53ef\u3057\u3066\u3001\u3082\u3046\u4e00\u5ea6\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'mai\u30d7\u30ec\u30fc\u30c8\u306b\u9001\u308b', openAndSend); return; }
    say('mai\u30d7\u30ec\u30fc\u30c8\u3078\u9001\u3063\u3066\u3044\u307e\u3059\u2026\uff08' + rec.length + '\u8b5c\u9762\uff09', 'mai\u30d7\u30ec\u30fc\u30c8\u3092\u958b\u304f', openAndSend);
    send();
  }
  if (w && !w.closed){
    /* PC\uff1a\u958b\u3044\u3066\u3042\u308b\u30bf\u30d6\u3078\u305d\u306e\u307e\u307e\u9001\u308b */
    say('mai\u30d7\u30ec\u30fc\u30c8\u3078\u9001\u3063\u3066\u3044\u307e\u3059\u2026\uff08' + rec.length + '\u8b5c\u9762\uff09', 'mai\u30d7\u30ec\u30fc\u30c8\u3092\u958b\u304f', openAndSend);
    send();
  } else {
    /* \u30b9\u30de\u30db\uff1a\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u305f\u3089 mai\u30d7\u30ec\u30fc\u30c8\u3092\u958b\u3044\u3066\u9001\u308b */
    say('\u8aad\u307f\u53d6\u308a\u304c\u7d42\u308f\u308a\u307e\u3057\u305f\uff08' + rec.length + '\u8b5c\u9762\uff09', 'mai\u30d7\u30ec\u30fc\u30c8\u306b\u9001\u308b', openAndSend);
  }
}).catch(function(e){
  fail('\u8aad\u307f\u53d6\u308a\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u901a\u4fe1\u72b6\u6cc1\u3092\u78ba\u8a8d\u3057\u3066\u3001\u3082\u3046\u4e00\u5ea6\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044\u3002\uff08' + (e && e.name === 'AbortError' ? '\u6642\u9593\u5207\u308c' : (e && e.message || e)) + '\uff09');
});
})();
