/* maiプレート：maimai でらっくす NET から記録を読み取って maiプレートへ送る。
   ブックマークには「このファイルを読み込むだけ」の短いコードが入っている。
   取り込みの中身を変えたいときはこのファイルを直す（みんなのブックマークは変えなくてよい）。
   ブックマーク側で先に maiプレートのタブを開き、window.__maiplateT（maiプレートのURL）と
   window.__maiplateW（開いたタブ）を渡してくる。 */
(function(){
var T=window.__maiplateT;
if(!T){var cs=document.currentScript;T=cs?cs.src.replace(/[?#].*$/,'').replace(/[^\/]*$/,''):'https://maiplate.vercel.app/';}
var O=new URL(T).origin;
if(location.hostname!=='maimaidx.jp'){alert('maimaiでらっくすNETにログインした画面で開いてください。');return;}
var w=window.__maiplateW;
if(!w||w.closed)w=window.open(T+'#/import','maiplate');
if(!w){alert('新しいタブを開けませんでした。ポップアップを許可して、もう一度開いてください。');return;}
var box=document.createElement('div');box.style.cssText='position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:99999;background:#1d2a35;color:#fff;font:bold 14px sans-serif;padding:10px 16px;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.35)';box.textContent='maiプレート：記録を読み取り中…';document.body.appendChild(box);
function ic(r,re){var m=r.querySelectorAll('img');for(var i=0;i<m.length;i++){var x=re.exec(String(m[i].src).replace(/[?#].*$/,''));if(x)return x[1];}return '';}
function get(d){return fetch('/maimai-mobile/record/musicGenre/search/?genre=99&diff='+d,{credentials:'include'}).then(function(r){return r.text();}).then(function(t){var doc=new DOMParser().parseFromString(t,'text/html');var out=[],g='';
doc.querySelectorAll('.main_wrapper.t_c .m_15').forEach(function(r){if(r.classList.contains('screw_block')){g=r.textContent.trim();return;}
var sb=r.querySelectorAll('.music_score_block'),nm=r.querySelector('.music_name_block');if(!sb.length||!nm)return;
var n=nm.textContent.replace(/\s+/g,' ').trim();if(n==='Link'&&/niconico/i.test(g))n='Link (Circle of friends)';
var k=r.querySelector('.music_kind_icon');var ty=r.id?(r.id.indexOf('sta_')>=0?'ST':'DX'):(k&&/_standard/.test(k.src)?'ST':'DX');
out.push([n,ty,d,Math.round((parseFloat(sb[0].textContent)||0)*10000),ic(r,/music_icon_(fcp?|app?)\.png$/),ic(r,/music_icon_(fsd?p?|fdxp?|fsp?|sync)\.png$/)]);});return out;});}
var dn=0,tot=5,fin=false;var pt=setInterval(function(){if(fin){clearInterval(pt);return;}try{w.postMessage({type:'maiplate-progress',done:dn,total:tot},O);}catch(e){}},400);
var sh=0;var st=setInterval(function(){if(fin){clearInterval(st);return;}var cap=Math.min(95,dn/tot*100+19);if(sh<cap)sh=Math.min(cap,sh+Math.max(0.12,(cap-sh)*0.035));box.textContent='maiプレート：記録を読み取り中… '+Math.floor(sh)+'%';},60);
function g2(d){return get(d).then(function(r){dn++;return r;});}
Promise.all([g2(0),g2(1),g2(2),g2(3),g2(4)]).then(function(a){fin=true;var rec=[].concat.apply([],a);var p={type:'maiplate-import',v:1,at:Date.now(),records:rec};
if(!rec.length)p.error='記録を読み取れませんでした。maimaiでらっくすNETにログインしているか確認してください。';
var ok=false,n=0;window.addEventListener('message',function(e){if(e.origin===O&&e.data==='maiplate-ack')ok=true;});
box.textContent='maiプレートへ送っています…（'+rec.length+'譜面）';
var t=setInterval(function(){if(ok){clearInterval(t);box.textContent='maiプレートへ送りました。maiプレートのタブで確認してください。';setTimeout(function(){box.remove();},6000);return;}
if(n++>120){clearInterval(t);box.textContent='送れませんでした。もう一度お試しください。';return;}try{w.postMessage(p,O);}catch(e){}},500);}).catch(function(e){fin=true;box.textContent='読み取りに失敗しました：'+e.message;try{w.postMessage({type:'maiplate-progress',error:1},O);}catch(x){}});})();
