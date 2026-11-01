document.addEventListener("DOMContentLoaded",function(){
var SL=!!(navigator.connection&&(navigator.connection.saveData||/2g/.test(navigator.connection.effectiveType||"")));
var $=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
$("img[data-src]").forEach(function(i){var s=$(i.dataset.src)[0];if(s)i.src=s.src});
var G=window.gsap,ST=window.ScrollTrigger,R=matchMedia("(prefers-reduced-motion:reduce)").matches,FX=!!(G&&ST)&&!R;
var H=document.documentElement,ld=$("#ld")[0],nv=$("#nv")[0],pt=$("#pt")[0],NSV="http://www.w3.org/2000/svg";
if(!FX)H.classList.add("ng");
var routes={home:"home","become-a-donor":"donor",problem:"problem","how-it-works":"how",partners:"partners","early-access":"early",login:"login",help:"help",privacy:"legal",terms:"legal",impressum:"legal"};
var titles={home:"Connecting futures","become-a-donor":"Become a donor",problem:"The Problem","how-it-works":"How it works",partners:"Partners","early-access":"Early access",login:"Login",help:"Help center",privacy:"Privacy",terms:"Terms",impressum:"Impressum"};
var lenis=null,ctx=null,cur=null,busy=false,mms=[],rotTok=0;
/* helpers */
function S(t,a,p){var e=document.createElementNS(NSV,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function D(cls,html,st,p){var e=document.createElement("div");e.className=cls;if(html)e.innerHTML=html;if(st)e.style.cssText=st;if(p)p.appendChild(e);return e}
function stage(vw,W,H,fit,lim){vw.innerHTML="";fit=innerHeight<520?96:(innerWidth<800?260:fit+(innerWidth<1024?56:0));var b=D("stg","","aspect-ratio:"+W+"/"+H+";width:min(100%,calc((100svh - "+fit+"px)*"+(W/H)+"))"+(lim?";max-width:"+lim:""),vw);var s=S("svg",{viewBox:"0 0 "+W+" "+H,"aria-hidden":"true"},b);return{b:b,s:s}}
function fracAt(path,pt){var L=path.getTotalLength(),b=0,bd=1e12;for(var i=0;i<=400;i++){var q=path.getPointAtLength(L*i/400),d=Math.pow(q.x-pt[0],2)+Math.pow(q.y-pt[1],2);if(d<bd){bd=d;b=i/400}}return b}
function clampCards(cs){var W=innerWidth,m=14;cs.forEach(function(c){var p=c.parentNode,tgE=c.closest(".tg");if(tgE){var tb=tgE.getBoundingClientRect(),w=c.closest(".cdw");w.style.transition="opacity .4s";w.style.opacity=(tb.left>-6&&tb.left<W+6)?1:0}p.style.setProperty("--cx","0px");var b=c.getBoundingClientRect(),s=0;if(b.left<m)s=m-b.left;else if(b.right>W-m)s=W-m-b.right;p.style.setProperty("--cx",s+"px")})}
function obj(html,l,t,r,cls,ex,p){var w=D("obw","","left:"+l+"%;top:"+t+"%",p),c=D("obc","","--r:"+r+"deg",w);return D("ob "+(cls||""),html,ex,c)}
function pop(el){return {transformBox:"fill-box",transformOrigin:"center",scale:0}}
/* split text */
function mk(t){var w=document.createElement("span");w.className="w";var i=document.createElement("span");i.className="i";i.textContent=t;w.appendChild(i);return w}
function walk(el,fn){Array.prototype.slice.call(el.childNodes).forEach(function(c){if(c.nodeType==3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(" "));return}f.appendChild(fn(t))});el.replaceChild(f,c)}else if(c.nodeType==1&&c.className.indexOf("w")!==0&&c.className.indexOf("sw")!==0&&c.className.indexOf("rot")<0)walk(c,fn)})}
$("[data-split]").forEach(function(el){walk(el,mk)});
$("[data-scrub]").forEach(function(el){walk(el,function(t){var s=document.createElement("span");s.className="sw";s.textContent=t;return s})});
$("[data-chars]").forEach(function(el){var t=el.textContent;el.textContent="";t.split("").forEach(function(ch){var w=document.createElement("span");w.className="c";var i=document.createElement("span");i.className="i";i.innerHTML=ch==" "?"&nbsp;":ch;w.appendChild(i);el.appendChild(w)})});
/* ui */
var mb=$("#mb")[0],mn=$("#mn")[0];function tg(o){mb.setAttribute("aria-expanded",o);mn.classList.toggle("open",o);mn.setAttribute("aria-hidden",!o);$("#mb .mt")[0].textContent=o?"Close":"Menu";dk();nv.classList.remove("hide");if(lenis)o?lenis.stop():lenis.start()}
mn.addEventListener("click",function(e){if(e.target===mn)tg(false)});
mb.onclick=function(){tg(mb.getAttribute("aria-expanded")!="true")};addEventListener("keydown",function(e){if(e.key=="Escape")tg(false)});
function mkSh(){var m=matchMedia("(max-width:767px)").matches;$(".hd").forEach(function(x){if(x.tagName=="SPAN")x.style.display=m?"none":""});$(".sh").forEach(function(x){x.style.display=m?"":"none"})}mkSh();addEventListener("resize",mkSh);
function form(f,ok,build){var box=$(ok)[0];f.addEventListener("submit",function(e){e.preventDefault();var bad=[];$("[required]",f).forEach(function(i){var v=i.type=="checkbox"?i.checked:i.checkValidity();var h=i.closest(".f,.ck");if(h)h.classList.toggle("bad",!v);if(!v)bad.push(i)});var er=$(".er",f)[0];er.textContent=bad.length?"Please complete the highlighted fields.":"";if(bad.length){bad[0].focus();return}
if(build){var d={};new FormData(f).forEach(function(v,k){d[k]=v});var a=$("a.btn",box)[0];a.href="mailto:doorgeshsungkur3@gmail.com?subject="+encodeURIComponent(build.s)+"&body="+encodeURIComponent(Object.keys(d).map(function(k){return k+": "+d[k]}).join("\n"))}
f.style.display="none";box.classList.add("show");if(G){G.from(box,{y:40,opacity:0,duration:1,ease:"expo.out"});var bb=box.getBoundingClientRect();confetti(bb.left+bb.width/2,Math.max(120,bb.top+60),44)}})}
form($("#ef")[0],"#eok",{s:"Early access request — ConneQt"});form($("#lf")[0],"#lok",null);
$("#pa .pn").forEach(function(p){function on(){$("#pa .pn").forEach(function(x){x.classList.toggle("on",x===p)})}p.addEventListener("mouseenter",on);p.addEventListener("click",on)});
$("#fq .q>button").forEach(function(b){b.addEventListener("click",function(){var q=b.parentNode,a=$(".qa",q)[0],o=!q.classList.contains("o");q.classList.toggle("o",o);b.setAttribute("aria-expanded",o);if(G)G.to(a,{height:o?"auto":0,duration:.8,ease:"expo.out",onComplete:function(){if(ST)ST.refresh()}});else a.style.height=o?"auto":0})});
$("#sq")[0].addEventListener("input",function(e){var v=e.target.value.toLowerCase().trim(),n=0;$("#fq .q").forEach(function(q){var m=!v||q.textContent.toLowerCase().indexOf(v)>-1;q.style.display=m?"":"none";if(m)n++});$("#nq")[0].style.display=n?"none":"block"});
function legalTab(name){$("[data-a]").forEach(function(a){a.hidden=a.dataset.a!==name});$(".tb a").forEach(function(a){a.classList.toggle("on",a.dataset.t===name)})}
var dock=$("#dock")[0];function dk(){dock.classList.toggle("show",scrollY>innerHeight*.55||mn.classList.contains("open"))}addEventListener("scroll",dk,{passive:true});
/* routing */
function show(name){var pg=routes[name];$("[data-page]").forEach(function(p){p.hidden=p.dataset.page!==pg});$(".ul,#mn .sheet a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+name)});document.title=titles[name]+" — Conneqt";var cp=$("#chp")[0];if(cp)cp.hidden=routes[name]!=="problem";if(pg=="legal")legalTab(name);cur=name}
function heroIn(){var r=$("[data-page]:not([hidden])")[0];if(!FX||!r)return;var h=$("[data-hero]",r)[0];G.timeline().to($("[data-hero] .i",r),{yPercent:0,duration:1.4,stagger:.07,ease:"expo.out"}).call(function(){if(h)h.classList.add("dn")},null,"-=.6").to($("[data-hi]",r),{opacity:1,y:0,duration:1.1,stagger:.1,ease:"expo.out"},"-=1.1");var dec=$(".hsun,.birds,.fi",r);if(dec.length)G.to(dec,{opacity:1,scale:1,duration:1.8,ease:"back.out(1.6)",stagger:.12});var rs=$(".rot>span",r);if(rs.length){G.to(rs[0],{yPercent:0,duration:1.4,ease:"expo.out",delay:.45});var ri=0,tok=++rotTok;G.delayedCall(3.4,function lp(){if(tok!==rotTok||cur!=="problem")return;var a=rs[ri],b=rs[(ri+1)%rs.length];ri=(ri+1)%rs.length;G.to(a,{yPercent:-120,duration:.9,ease:"expo.inOut"});G.fromTo(b,{yPercent:120},{yPercent:0,duration:.9,ease:"expo.inOut"});G.delayedCall(2.5,lp)})}}
function base(r){$("h1,h2",r).forEach(function(h){var w=$(".i",h);if(!w.length)return;G.set(w,{yPercent:118});if(h.hasAttribute("data-hero"))return;ST.create({trigger:h,start:"top 90%",once:true,onEnter:function(){G.to(w,{yPercent:0,duration:1.4,stagger:.06,ease:"expo.out"});h.classList.add("dn")}})});
G.set($("[data-hi]",r),{opacity:0,y:30});
$("[data-fade]",r).forEach(function(p){G.set(p,{opacity:0,y:30});G.to(p,{opacity:1,y:0,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:p,start:"top 92%"}})});
$("[data-scrub]",r).forEach(function(p){var s=$(".sw",p);G.set(s,{opacity:.14});G.to(s,{opacity:1,duration:.55,stagger:.07,ease:"power1.out",delay:.35,scrollTrigger:{trigger:p,start:"top 75%"}})});
$(".tr>div",r).forEach(function(d){G.from(d,{borderTopColor:"transparent",duration:1,scrollTrigger:{trigger:d,start:"top 90%"}})});
$(".rb",r).forEach(function(b){G.set(b,{scale:0});G.to(b,{scale:1,duration:1.5,ease:"elastic.out(1,.6)",scrollTrigger:{trigger:b,start:"top 94%"}})})}
var P={};
/* ---- scene A: people on the map ---- */
function sceneA(mob){var path=$("#sA .ln")[0],L=path.getTotalLength(),nd=$("#sA .nd"),tg=$("#sA .tg"),cds=$("#sA .cd"),dot=$("#hd")[0],fz=$("#fz"),vw=$("#vA");fz=fz[0];vw=vw[0];
var pts=[[122,178],[662,140],[1030,346]],fr=pts.map(function(p){return fracAt(path,p)});
G.set(path,{strokeDashoffset:1.001});G.set(nd,{attr:{r:0}});G.set($("#sA .stm"),{scaleY:0});G.set(cds,{opacity:0,y:16});G.set(dot,{opacity:0});
var s=.12,o={p:0},tl=G.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:"#sA",pin:true,scrub:1,start:"top top",end:"+=260%",anticipatePin:1,invalidateOnRefresh:true},onUpdate:function(){clampCards(cds)}});
tl.to(path,{strokeDashoffset:0,duration:1},s).to(dot,{opacity:1,duration:.03},s).to(o,{p:1,duration:1,onUpdate:function(){var q=path.getPointAtLength(L*o.p);dot.setAttribute("cx",q.x);dot.setAttribute("cy",q.y);pan(q.x)}},s).to(dot,{opacity:0,duration:.05},s+.97);
var pan=function(px){if(!mob)return;var W=fz.offsetWidth,V=vw.offsetWidth,x=Math.max(V-W,Math.min(0,V/2-px/1120*W));G.set(fz,{x:x})};pan(0);
tg.forEach(function(t,i){var a=s+fr[i];tl.to(nd[i],{attr:{r:8},duration:.06,ease:"back.out(3)"},a).to($(".stm",t),{scaleY:1,duration:.1,ease:"power2.out"},a).to($(".cd",t),{opacity:1,y:0,duration:.14,ease:"power2.out"},a+.06)});
tl.to({},{duration:.25});clampCards(cds)}
/* ---- scene B: the barrier ---- */
function person(p,x,y,c){var g=S("g",{transform:"translate("+x+" "+y+")"},p);S("circle",{r:32,fill:c,stroke:"#1b1b33","stroke-width":3},g);S("circle",{cy:-8,r:9,fill:"#1b1b33"},g);S("path",{d:"M-16 18a16 14 0 0 1 32 0",class:"ic",fill:"#1b1b33"},g);return g}
function uni(p,x,y,c){var g=S("g",{transform:"translate("+x+" "+y+")",opacity:.9},p);S("path",{d:"M-52 -12L0 -50L52 -12Z",class:"ic",fill:c||"#fff"},g);[-34,-11,11,34].forEach(function(cx){S("path",{d:"M"+cx+" -2V36",class:"ic"},g)});S("path",{d:"M-58 44H58",class:"ic"},g);return g}
function sceneB(mob){var vw=$("#vB")[0],W=mob?600:1200,H=mob?900:560,st=stage(vw,W,H,mob?250:320),s=st.s;
var d=mob?"M300 150C120 240 480 300 300 400S120 560 300 650":"M150 400C300 400 330 280 450 320S600 480 700 410S850 290 940 350",
g=mob?d+"S300 700 300 712":d+"S1010 380 1040 350",end=mob?[300,650]:[940,350];
S("path",{d:g,class:"gh"},s);var path=S("path",{d:d,class:"wr",pathLength:1,style:"stroke-dasharray:1 1.5"},s);
person(s,mob?300:110,mob?100:400,"#ff9fb0");uni(s,mob?300:1090,mob?760:330,"#fff");
var wall=S("rect",mob?{x:190,y:674,width:220,height:22,rx:4,fill:"#1b1b33"}:{x:978,y:240,width:24,height:220,rx:4,fill:"#1b1b33"},s);
var x1=S("path",{d:"M"+(end[0]-14)+" "+(end[1]-14)+"L"+(end[0]+14)+" "+(end[1]+14)+"M"+(end[0]+14)+" "+(end[1]-14)+"L"+(end[0]-14)+" "+(end[1]+14),class:"wr",style:"stroke:#d93a55;stroke-width:6"},s);
var dot=S("circle",{r:10,class:"hd2",cx:mob?300:150,cy:mob?150:400},s);
var obs=mob?[["Tuition fees",26,29,"sun",-4],["Living costs",74,47,"rs",3],["Visas &amp; travel",30,64,"tl",-3]]:[["Tuition fees",35,40,"sun",-4],["Living costs",52,87,"rs",3],["Visas &amp; travel",71,34,"tl",-3]],
cards=obs.map(function(o){return obj(o[0],o[1],o[2],o[4],o[3],"",st.b)}),
cap=obj("The road ends where the money runs out",50,mob?95:100,0,"cap","background:#1b1b33;color:#fff;box-shadow:none;white-space:normal;text-align:center;width:min(80vw,440px)",st.b);
var L=path.getTotalLength(),fr=obs.map(function(o){return fracAt(path,[o[1]/100*W,o[2]/100*H])});
G.set(path,{strokeDashoffset:1.001});G.set([wall,x1],pop());G.set(wall,{scaleY:0,scaleX:1,transformOrigin:"50% 100%"});G.set(cards,{opacity:0,y:20,scale:.8});G.set(cap,{opacity:0,y:20});G.set(dot,{opacity:0});
var s0=.1,o={p:0},tl=G.timeline({defaults:{ease:"none"},onUpdate:function(){clampCards(cards.concat([cap]))}});
tl.to(path,{strokeDashoffset:0,duration:1},s0).to(dot,{opacity:1,duration:.03},s0).to(o,{p:1,duration:1,onUpdate:function(){var q=path.getPointAtLength(L*o.p);dot.setAttribute("cx",q.x);dot.setAttribute("cy",q.y)}},s0);
cards.forEach(function(c,i){tl.to(c,{opacity:1,y:0,scale:1,duration:.12,ease:"back.out(2)"},s0+Math.max(0,fr[i]-.04))});
tl.to(wall,{scaleY:1,duration:.1,ease:"back.out(2)"},s0+1).to(x1,{scale:1,duration:.08,ease:"back.out(3)"},s0+1.05).to(cap,{opacity:1,y:0,duration:.12},s0+1.12).to({},{duration:.3});clampCards(cards.concat([cap]));return tl}
/* ---- scene C: the bridge ---- */
var HEART="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z",CAP="M2 9l10-5 10 5-10 5-10-5zm4 3.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-4.5l-6 3-6-3z",COL=["#ffcf3f","#ff9fb0","#fbf6ef","#a6d3ff","#ffcf3f"];
var ICO={pencil:"M3 21l3.5-1 12-12-2.5-2.5-12 12L3 21zM15 7l2.5 2.5",book:"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM6 19h13",paper:"M6 3h9l4 4v14H6V3zM15 3v4h4M9 12h7M9 16h7",cap:"M2 9l10-5 10 5-10 5-10-5zm4 3.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-4.5",bulb:"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z",star:"M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.5 6.6 19.4l1.2-6L3.4 9.3l6-.7L12 3z"};
function confetti(x,y,n){if(!FX)return;var cols=["#ffcf3f","#ff9fb0","#62d2c6","#2f5be7","#1b1b33","#a6d3ff"],rnd=G.utils.random;for(var i=0;i<n;i++){(function(){var d=document.createElement("i");d.style.cssText="position:fixed;left:"+x+"px;top:"+y+"px;width:"+rnd(6,11)+"px;height:"+rnd(10,18)+"px;background:"+cols[i%6]+";z-index:260;pointer-events:none;border-radius:2px";document.body.appendChild(d);G.timeline({onComplete:function(){d.remove()}}).to(d,{x:rnd(-240,240),y:rnd(-280,-40),rotation:rnd(-540,540),duration:.75,ease:"power3.out"}).to(d,{y:"+=380",opacity:0,rotation:"+=200",duration:1.1,ease:"power1.in"})})()}}
function badge(p,x,y,c,glyph){var g=S("g",{transform:"translate("+x+" "+y+")"},p),i=S("g",{},g);S("circle",{r:30,fill:c,stroke:"#1b1b33","stroke-width":3},i);S("path",{d:glyph,transform:"translate(-12 -12)",fill:"#1b1b33"},i);return i}
function sceneC(mob){var vw=$("#vC")[0],W=mob?600:1200,H=mob?900:600,st=stage(vw,W,H,mob?260:300),s=st.s,hub=mob?{x:300,y:450}:{x:600,y:300},ys=[0,1,2,3,4],
pos=function(i,side){var t=mob?[80,190,300,410,520][i]:[90,195,300,405,510][i];return mob?{x:t,y:side?800:100}:{x:side?1090:110,y:t}};
var wires=[],don=[],stu=[],coins=[];
ys.forEach(function(i){var a=pos(i,0),b=pos(i,1);
var d1=mob?"M"+a.x+" "+(a.y+30)+"C"+a.x+" 250 300 280 300 395":"M"+(a.x+30)+" "+a.y+"C360 "+a.y+" 380 300 480 300";
var d2=mob?"M300 505C300 620 "+b.x+" 640 "+b.x+" "+(b.y-30):"M720 300C820 300 840 "+b.y+" "+(b.x-30)+" "+b.y;
wires.push([S("path",{d:d1,class:"wr",pathLength:1,style:"stroke-dasharray:1 1.5"},s),S("path",{d:d2,class:"wr br",pathLength:1,style:"stroke-dasharray:1 1.5"},s)])});
ys.forEach(function(i){var a=pos(i,0),b=pos(i,1);don.push(badge(s,a.x,a.y,COL[i],HEART));stu.push(badge(s,b.x,b.y,COL[(i+2)%5],CAP))});
var hg=S("g",{transform:"translate("+(hub.x-120)+" "+(hub.y-55)+")"},s),hb=S("g",{},hg);S("rect",{width:240,height:110,rx:30,fill:"#fbf6ef",stroke:"#1b1b33","stroke-width":3.5},hb);var lg=S("svg",{x:28,y:30,width:184,height:50,viewBox:"0 0 149.785 40",fill:"#1b1b33"},hb);S("use",{href:"#cq"},lg);
var vb=S("g",{transform:"translate("+(hub.x+110)+" "+(hub.y-50)+")"},s),vi=S("g",{},vb);S("circle",{r:22,fill:"#ffcf3f",stroke:"#1b1b33","stroke-width":3},vi);S("path",{d:"M-9 1l6 6 12-13",class:"ic"},vi);
var checks=stu.map(function(g,i){var p=pos(i,1),c=S("g",{transform:"translate("+(p.x+24)+" "+(p.y-24)+")"},s),ci=S("g",{},c);S("circle",{r:13,fill:"#62d2c6",stroke:"#1b1b33","stroke-width":2.5},ci);S("path",{d:"M-5 0l4 4 7-8",class:"ic",style:"stroke-width:2.5"},ci);return ci});
ys.forEach(function(i){coins.push(S("circle",{r:8,fill:"#ffcf3f",stroke:"#1b1b33","stroke-width":2.5},s),S("circle",{r:8,fill:"#ffcf3f",stroke:"#1b1b33","stroke-width":2.5},s))});
var sp=$("#sC .stps span");G.set(sp,{opacity:0,y:10});G.set(sp[0],{opacity:1,y:0});
G.set(don.concat(stu,[hb,vi],checks),pop());G.set(wires.reduce(function(a,w){return a.concat(w)},[]),{strokeDashoffset:1.001});G.set(coins,{opacity:0});
var tl=G.timeline({defaults:{ease:"none"}});
function step(i,t){if(i)tl.to(sp[i-1],{opacity:0,y:-10,duration:.05},t);tl.fromTo(sp[i],{opacity:0,y:10},{opacity:1,y:0,duration:.06},t)}
step(1,.4);step(2,.6);step(3,.88);
ys.forEach(function(i){var w=wires[i],c1=coins[i*2],c2=coins[i*2+1],p1={p:0},p2={p:0};
tl.to(don[i],{scale:1,duration:.1,ease:"back.out(2.5)"},.02+i*.04).to(w[0],{strokeDashoffset:0,duration:.22},.1+i*.04)
.set(c1,{opacity:1},.12+i*.04).to(p1,{p:1,duration:.24,onUpdate:function(){var q=w[0].getPointAtLength(w[0].getTotalLength()*p1.p);c1.setAttribute("cx",q.x);c1.setAttribute("cy",q.y)}},.12+i*.04).set(c1,{opacity:0},.38+i*.04)
.to(w[1],{strokeDashoffset:0,duration:.22},.62+i*.03).to(stu[i],{scale:1,duration:.1,ease:"back.out(2.5)"},.74+i*.03)
.set(c2,{opacity:1},.64+i*.03).to(p2,{p:1,duration:.24,onUpdate:function(){var q=w[1].getPointAtLength(w[1].getTotalLength()*p2.p);c2.setAttribute("cx",q.x);c2.setAttribute("cy",q.y)}},.64+i*.03).set(c2,{opacity:0},.9+i*.03)
.to(checks[i],{scale:1,duration:.08,ease:"back.out(3)"},.92+i*.03)});
tl.to(hb,{scale:1,duration:.12,ease:"back.out(2)"},.4).to(vi,{scale:1,duration:.1,ease:"back.out(3)"},.54).to({},{duration:.2});return tl}
/* ---- scene E: the road stays open ---- */
function sceneE(mob){var vw=$("#vE")[0],W=mob?600:1200,H=mob?900:560,st=stage(vw,W,H,mob?260:250),s=st.s;
var d=mob?"M300 130C130 220 470 270 300 360S130 540 300 620S450 720 320 800":"M110 440C260 440 300 300 470 300S660 430 800 400S960 240 1070 250";
S("path",{d:d,class:"gh"},s);var path=S("path",{d:d,class:"wr br",pathLength:1,style:"stroke-dasharray:1 1.5"},s),L=path.getTotalLength();
var fr=[.02,.36,.68,.98],lab=["Enrol","Study","Pass exams","Graduate"],ik=["pencil","book","paper","cap"],cl=["#ffcf3f","#62d2c6","#ff9fb0","#ffcf3f"],cls=["sun","tl","rs","sun"],ms=[],tgs=[],end;
fr.forEach(function(f,i){var q=path.getPointAtLength(L*f);if(i==3)end=q;var g=S("g",{transform:"translate("+q.x+" "+q.y+")"},s),m=S("g",{},g);S("circle",{r:26,fill:cl[i],stroke:"#1b1b33","stroke-width":3},m);S("path",{d:ICO[ik[i]],transform:"translate(-12 -12)",class:"ic",style:i==3?"fill:#1b1b33":""},m);ms.push(m);
tgs.push(obj(lab[i],q.x/W*100+(mob?(q.x>300?-1:1)*(innerWidth<380?30:19):0),q.y/H*100+(mob?0:(i%2?-11:11)),i%2?2:-2,cls[i],"",st.b))});
var dot=S("circle",{r:11,class:"hd2",cx:mob?300:110,cy:mob?130:440},s);
var capg=S("g",{transform:"translate("+end.x+" "+(end.y-4)+")"},s),ci=S("g",{},capg);S("path",{d:ICO.cap,transform:"translate(-29 -29) scale(2.4)",fill:"#1b1b33",stroke:"#1b1b33","stroke-width":.6,"stroke-linejoin":"round"},ci);
var cc=["#ffcf3f","#ff9fb0","#62d2c6","#2f5be7","#1b1b33","#fbf6ef"],cfs=[],rnd=G.utils.random;
for(var i=0;i<26;i++)cfs.push(D("cf","","left:"+end.x/W*100+"%;top:"+end.y/H*100+"%;background:"+cc[i%6],st.b));
G.set(path,{strokeDashoffset:1.001});G.set(ms,pop());G.set(tgs,{opacity:0,y:14,scale:.85});G.set(ci,pop());G.set(dot,{opacity:0});G.set(cfs,{scale:0});
var s0=.08,o={p:0},tl=G.timeline({defaults:{ease:"none"},onUpdate:function(){clampCards(tgs)}});
tl.to(path,{strokeDashoffset:0,duration:1},s0).to(dot,{opacity:1,duration:.03},s0).to(o,{p:1,duration:1,onUpdate:function(){var q=path.getPointAtLength(L*o.p);dot.setAttribute("cx",q.x);dot.setAttribute("cy",q.y)}},s0).to(dot,{opacity:0,duration:.04},s0+.96);
fr.forEach(function(f,i){var a=s0+f;tl.to(ms[i],{scale:1,duration:.08,ease:"back.out(3)"},Math.max(0,a-.02)).to(tgs[i],{opacity:1,y:0,scale:1,duration:.1,ease:"back.out(2)"},a)});
tl.to(ci,{scale:1,duration:.05,ease:"back.out(3)"},s0+1).to(ci,{y:-130,rotation:540,duration:.2,ease:"power2.out"},s0+1.05).to(ci,{y:0,rotation:720,duration:.2,ease:"bounce.out"},s0+1.25);
cfs.forEach(function(c){tl.to(c,{scale:1,x:rnd(-170,170),y:rnd(-210,-40),rotation:rnd(-360,360),duration:.2,ease:"power2.out"},s0+1.08).to(c,{y:"+=240",opacity:0,duration:.28,ease:"power1.in"},s0+1.28)});
tl.to({},{duration:.3});clampCards(tgs);return tl}
/* ---- scene D: globe and pins ---- */
function sceneD(){var vw=$("#vD")[0],W=800,st=stage(vw,W,W,innerWidth>=900&&innerHeight>=560?110:390,"860px"),s=st.s,gl=document.createElement("img");gl.alt="A stack of books, an open book and a globe";gl.src=$(".stk")[0].src;gl.style.cssText="position:absolute;left:50%;top:50%;width:36%;will-change:transform";G.set(gl,{xPercent:-50,yPercent:-50});st.b.appendChild(gl);
var PIN="M0 -24C-13 -24 -17 -9 -17 -2C-17 11 0 26 0 26S17 11 17 -2C17 -9 13 -24 0 -24Z",wires=[],pins=[];
for(var i=0;i<10;i++){var a=i/10*Math.PI*2-1.2,r=i%2?300:345,x=400+Math.cos(a)*r,y=400+Math.sin(a)*r,sx=400+Math.cos(a)*190,sy=400+Math.sin(a)*190,mx=(sx+x)/2+Math.sin(a)*40,my=(sy+y)/2-Math.cos(a)*40;
wires.push(S("path",{d:"M"+sx+" "+sy+"Q"+mx+" "+my+" "+x+" "+(y+22),class:"wr wh",pathLength:1,style:"stroke-dasharray:1 1.5;stroke-width:3"},s));
var g=S("g",{transform:"translate("+x+" "+y+")"},s),pi=S("g",{},g);S("path",{d:PIN,fill:["#ffcf3f","#ff9fb0","#62d2c6","#fbf6ef"][i%4],stroke:"#1b1b33","stroke-width":3},pi);S("circle",{r:6,cy:-3,fill:"#1b1b33"},pi);pins.push(pi)}
var ring=S("circle",{cx:400,cy:400,r:230,fill:"none",stroke:"rgba(255,255,255,.35)","stroke-width":2,"stroke-dasharray":"2 10","stroke-linecap":"round"},s);
G.set(wires,{strokeDashoffset:1.001});G.set(pins,pop());
var tl=G.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:"#sD",pin:true,scrub:1,start:"top top",end:"+=200%",anticipatePin:1,invalidateOnRefresh:true}});
tl.fromTo(gl,{rotation:-10,scale:.9},{rotation:10,scale:1.05,duration:1.2},0).to(ring,{rotation:90,transformOrigin:"50% 50%",duration:1.2},0);
pins.forEach(function(p,i){tl.to(wires[i],{strokeDashoffset:0,duration:.14},.06+i*.08).to(p,{scale:1,duration:.1,ease:"back.out(3)"},.15+i*.08)});tl.to({},{duration:.25})}
/* ---- home page ---- */
P.problem=function(r){
G.set(".hsun",{opacity:0,scale:.85});G.set(".birds",{opacity:0});
G.to(".hsun",{yPercent:-18,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});G.to(".birds",{x:"16vw",y:-70,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
G.to(".sm .dd:first-of-type",{rotation:200,ease:"none",scrollTrigger:{trigger:".sm",start:"top bottom",end:"bottom top",scrub:true}});G.to(".sm .dd:last-of-type",{x:60,ease:"none",scrollTrigger:{trigger:".sm",start:"top bottom",end:"bottom top",scrub:true}});
var rs=$(".rot>span",r);G.set(rs,{yPercent:120});G.set(".fi",{opacity:0,scale:.4});
$(".fi").forEach(function(f,i){G.to(f,{y:"+="+(10+i*3),rotation:i%2?8:-8,duration:2.2+i*.35,yoyo:true,repeat:-1,ease:"sine.inOut"});G.to(f,{yPercent:-(40+i*28),ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}})});
var hero=$(".hero",r)[0];if(!hero._pm&&matchMedia("(hover:hover)").matches){hero._pm=1;hero.addEventListener("pointermove",function(e){var nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;G.to(".hsun",{x:nx*-34,y:ny*-26,duration:1.2,ease:"power3.out",overwrite:"auto"});G.to(".stk",{x:nx*-26,y:ny*-20,duration:1.2,ease:"power3.out",overwrite:"auto"});$(".fi").forEach(function(f,i){G.to(f,{x:nx*(30+i*12),duration:1.2,ease:"power3.out",overwrite:"auto"})})})}
var pen=$(".sm .pen")[0],nbp=$(".sm .nb p")[0];if(pen){G.fromTo(pen,{y:0},{y:function(){return nbp.offsetHeight-pen.offsetHeight},duration:1.8,delay:.35,ease:"power1.inOut",scrollTrigger:{trigger:nbp,start:"top 75%",invalidateOnRefresh:true}})}
var cap=$(".capfly")[0];if(cap){G.set(cap,{opacity:0,y:90,rotation:-30});ST.create({trigger:".cta",start:"top 70%",once:true,onEnter:function(){var tl=G.timeline();tl.to(cap,{opacity:1,y:-60,rotation:300,duration:.7,ease:"power2.out"}).call(function(){var b=cap.getBoundingClientRect();confetti(b.left+b.width/2,b.top+b.height/2,36)},null,"-=.1").to(cap,{y:0,rotation:360,duration:.7,ease:"bounce.out"})}})}
$(".rb").forEach(function(b){if(b._cf)return;b._cf=1;b.addEventListener("pointerdown",function(e){confetti(e.clientX,e.clientY,26)})});
G.to($(".hero h1",r),{yPercent:-10,opacity:.15,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom 15%",scrub:true}});
G.to(".stk",{yPercent:-30,rotation:16,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
var mm=G.matchMedia();mms.push(mm);
mm.add({d:"(min-width:800px)",m:"(max-width:799px)"},function(cx){var mob=cx.conditions.m;
sceneA(mob);
var xt=G.timeline({scrollTrigger:{trigger:"#xp",pin:true,scrub:.8,start:"top top",end:"+=180%",anticipatePin:1}});
G.set(".xa",{yPercent:-170});G.set(".xb",{yPercent:170});G.set(".xc",{opacity:0,y:40});
xt.to(".xi",{scale:1,borderRadius:0,duration:2,ease:"power2.inOut"},0).fromTo(".xi img",{scale:1.6},{scale:1,duration:2,ease:"none"},0).to(".xa,.xb",{yPercent:0,duration:2,ease:"power2.inOut"},0).to(".xc",{opacity:1,y:0,duration:.8,ease:"power2.out"},1.7).to({},{duration:.9});
var tbB=sceneB(mob),tcB=sceneC(mob),teB=sceneE(mob),dB=tbB.duration(),dC=tcB.duration(),c0=dB+.3,e0=c0+dC;G.set("#vC,#vE",{autoAlpha:0});G.set("#sC .ph1,#sC .ph2",{autoAlpha:0,y:30});G.set("#sC",{backgroundColor:"#ffc4bd"});G.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:"#sC",pin:true,scrub:1,start:"top top",end:"+=720%",anticipatePin:1,invalidateOnRefresh:true}}).add(tbB,0).to("#vB",{autoAlpha:0,scale:.94,duration:.28,ease:"power2.in"},dB).to("#sC .ph0",{autoAlpha:0,y:-30,duration:.22,ease:"power2.in"},dB).to("#sC",{backgroundColor:"#b9ede6",duration:.4},dB+.05).to("#sC .ph1",{autoAlpha:1,y:0,duration:.25,ease:"power2.out"},dB+.22).to("#vC",{autoAlpha:1,duration:.2},dB+.24).add(tcB,c0).to("#vC",{autoAlpha:0,scale:.94,duration:.28,ease:"power2.in"},e0).to("#sC .ph1",{autoAlpha:0,y:-30,duration:.22,ease:"power2.in"},e0).to("#sC",{backgroundColor:"#ffe08a",duration:.4},e0+.05).to("#sC .ph2",{autoAlpha:1,y:0,duration:.25,ease:"power2.out"},e0+.22).to("#vE",{autoAlpha:1,duration:.2},e0+.24).add(teB,e0+.3);sceneD();
var chp=$("#chp")[0],nm=["","The problem","The numbers","The system gap","Barrier to bridge","Why it matters","Get involved"];
var chs=$("[data-ch]",r),chC=null;function chUp(){var y=innerHeight*.55,best=null;chs.forEach(function(el){var b=(el.parentNode.classList.contains("pin-spacer")?el.parentNode:el).getBoundingClientRect();if(b.top<=y&&b.bottom>y)best=el});if(best&&best!==chC){chC=best;$("b",chp)[0].textContent="0"+best.dataset.ch+" / 06";$("span",chp)[0].textContent=nm[+best.dataset.ch]}}ST.create({start:0,end:"max",onUpdate:chUp,onRefresh:chUp})})};
P.how=function(r){var c=$(".sd",r);c.forEach(function(d,i){if(i<c.length-1)G.to(d,{scale:.93,ease:"none",scrollTrigger:{trigger:c[i+1],start:"top 85%",end:"top 20%",scrub:true}});G.from($("h3",d),{yPercent:30,opacity:0,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:d,start:"top 80%"}})})};
/* ---- added: reveals for the new sections (same motion language as the rest of the site) ---- */
function stx(t,s){return {trigger:t,start:s||"top 85%",refreshPriority:-1}}
function countUp(el){var to=+el.dataset.n,p=el.dataset.p||"",su=el.dataset.s||"",o={v:0};G.to(o,{v:to,duration:1.6,ease:"power2.out",onUpdate:function(){el.textContent=p+Math.round(o.v)+su},scrollTrigger:stx(el,"top bottom")})}
function extras(r){
$("[data-deal]",r).forEach(function(g){G.fromTo(g.children,{y:40,opacity:0},{y:0,opacity:1,duration:1.3,ease:"expo.out",stagger:.1,scrollTrigger:stx(g)})});
$("[data-n]",r).forEach(countUp);
$(".gp li",r).forEach(function(li){var t=G.timeline({scrollTrigger:stx(li,"top 90%")});t.fromTo($(".ln",li),{scaleX:0},{scaleX:1,duration:1.2,ease:"expo.inOut"}).fromTo($("em,span,.gck",li),{y:24,opacity:0},{y:0,opacity:1,duration:1.1,ease:"expo.out",stagger:.06},"-=.8")});
$(".ceo",r).forEach(function(c){var t=G.timeline({scrollTrigger:stx(c,"top 85%")});t.fromTo($(".ceoc",c),{y:50,opacity:0},{y:0,opacity:1,duration:1.3,ease:"expo.out"}).fromTo($(".ceoi img",c),{scale:1.15},{scale:1,duration:1.8,ease:"expo.out"},0)});
$(".jri",r).forEach(function(p){G.fromTo(p,{y:60,opacity:0,rotation:-3},{y:0,opacity:1,rotation:0,duration:1.4,ease:"expo.out",scrollTrigger:stx(p,"top 85%")})});
$(".qt,.goal",r).forEach(function(q){G.fromTo(q,{y:40,opacity:0},{y:0,opacity:1,duration:1.3,ease:"expo.out",scrollTrigger:stx(q)})});
}
var _Pp=P.problem;P.problem=function(r){_Pp(r);extras(r)};
var _Ph=P.how;P.how=function(r){_Ph(r);extras(r)};
P.partners=extras;P.early=extras;
P.home=function(r){extras(r);var hm=$(".hm",r)[0],sc={trigger:hm,start:"top top",end:"bottom top",scrub:true};
G.set($(".hm-sun,.hm-birds,.hm-chip",r),{opacity:0});var hfs=$(".hf",r),dv=function(k,m){return function(i,e){return (+e.dataset[k])*(m||1)}};hfs.forEach(function(h){G.set(h.firstChild,{opacity:0,xPercent:+h.dataset.dx*1.8,yPercent:+h.dataset.dy*1.8,rotation:+h.dataset.r*2.2})});G.timeline({scrollTrigger:{trigger:hm,pin:true,start:"top top",end:"+=75%",scrub:.8,anticipatePin:1}}).fromTo(hfs,{xPercent:dv("dx"),yPercent:dv("dy"),rotation:dv("r")},{xPercent:0,yPercent:0,rotation:0,ease:"power2.inOut",stagger:.03});G.set($(".hm-sun",r),{scale:.55});G.set($(".hm-chip",r),{y:30});
G.to($(".hm-sun",r),{yPercent:-30,ease:"none",scrollTrigger:sc});G.to($(".hm-birds",r),{x:60,y:-50,ease:"none",scrollTrigger:sc});
$(".hm-chip",r).forEach(function(c,i){G.to(c,{yPercent:-(90+i*70),ease:"none",scrollTrigger:sc})});
G.to($(".hm-tx",r),{yPercent:-12,ease:"none",scrollTrigger:sc})};
function homeIn(){if(cur!=="home")return;var r=$('[data-page="home"]')[0];G.timeline().to($(".hm-sun",r),{opacity:1,scale:1,duration:1.8,ease:"expo.out"},0).to($(".hf b",r),{opacity:1,xPercent:0,yPercent:0,rotation:0,duration:1.7,ease:"expo.out",stagger:.06},.1).to($(".hm-birds",r),{opacity:1,duration:1.2},.6).to($(".hm-chip",r),{opacity:1,y:0,duration:1.2,ease:"expo.out",stagger:.14},.7)}
var _hi=heroIn;heroIn=function(){_hi();homeIn()};
/* ---- v3 additions ---- */
(function(){
/* help centre tabs + search */
var hcat="donor",sq=$("#sq")[0];
function hf(){var v=(sq.value||"").toLowerCase().trim(),n=0;$("#fq .q").forEach(function(q){var m=q.dataset.cat===hcat&&(!v||q.textContent.toLowerCase().indexOf(v)>-1);q.style.display=m?"":"none";if(m)n++});$("#nq")[0].style.display=n?"none":"block"}
$(".htb button").forEach(function(b){b.addEventListener("click",function(){hcat=b.dataset.cat;$(".htb button").forEach(function(x){x.classList.toggle("on",x===b);x.setAttribute("aria-selected",x===b)});hf();if(FX&&ST)ST.refresh()})});
sq.addEventListener("input",hf);hf();
/* become-a-donor: two steps */
var df=$("#df")[0],s1=$('[data-step="1"]',df)[0],s2=$('[data-step="2"]',df)[0],dots=$(".dsteps span"),der=$(".er",df)[0];
function step(n){s1.hidden=n!==1;s2.hidden=n!==2;dots.forEach(function(d,i){d.classList.toggle("on",i<n)});der.textContent="";if(G&&FX)G.fromTo(n==1?s1:s2,{opacity:0,y:24},{opacity:1,y:0,duration:.8,ease:"expo.out"});var f=$("input",n==1?s1:s2)[0];if(f)f.focus({preventScroll:true})}
$("#dnx")[0].addEventListener("click",function(){var bad=[];$("[required]",s1).forEach(function(i){var ok=i.checkValidity();i.closest(".f").classList.toggle("bad",!ok);if(!ok)bad.push(i)});if(bad.length){der.textContent="Please complete the highlighted fields.";bad[0].focus();return}step(2)});
$("#dbk")[0].addEventListener("click",function(){step(1)});
$("input",s1).forEach(function(i){i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();$("#dnx")[0].click()}})});
form(df,"#dok",{s:"Become a donor — ConneQt"});
})();
function numbersBox(r){$(".nbb",r).forEach(function(box){var bs=$("b[data-v]",box),tws=[];bs.forEach(function(b){var p=b.dataset.p||"",su=b.dataset.s||"",o={v:0};b.textContent=p+"0"+su;tws.push(G.to(o,{v:+b.dataset.v,duration:2,ease:"power2.out",paused:true,onUpdate:function(){b.textContent=p+Math.round(o.v)+su}}))});
ST.create({trigger:box,start:"top 85%",once:true,refreshPriority:-1,onEnter:function(){tws.forEach(function(t){t.play()})}});
function fin(){tws.forEach(function(t){t.progress(1)})}box.addEventListener("click",fin);box.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fin()}})})}
function stack(r){var c=$(".psk .sd",r);c.forEach(function(d,i){if(i<c.length-1)G.to(d,{scale:.93,ease:"none",scrollTrigger:{trigger:c[i+1],start:"top 85%",end:"top 20%",scrub:true}});G.from($("h3",d),{yPercent:30,opacity:0,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:d,start:"top 80%"}})})}
var _Pp3=P.problem;P.problem=function(r){_Pp3(r);numbersBox(r)};
P.partners=function(r){extras(r);stack(r)};
function photoIn(r){if(!FX)return;$(".shp,.hla .pol,.lgp .pol,.lga .pol",r).forEach(function(p,i){var rt=p.classList.contains("p2")?5:(p.classList.contains("shp")?3:-4);G.fromTo(p,{y:50,opacity:0,rotation:rt+(i%2?6:-6)},{y:0,opacity:1,rotation:rt,duration:1.4,ease:"expo.out",scrollTrigger:{trigger:p,start:"top 92%",refreshPriority:-1}})})}
var _base0=base;base=function(r){_base0(r);photoIn(r)};
function glob(){if(!FX)return;G.set($(".big .i"),{yPercent:115});G.to($(".big .i"),{yPercent:0,duration:1.5,stagger:.04,ease:"expo.out",scrollTrigger:{trigger:".big",start:"top 96%"}});ST.create({start:0,end:"max",onUpdate:function(s){$("#pg i")[0].style.transform="scaleX("+s.progress+")";$("#pg b")[0].style.left=s.progress*100+"%"}})}
function build(name){var pg=routes[name],root=$('[data-page="'+pg+'"]')[0];mms.forEach(function(m){m.revert()});mms=[];if(ctx)ctx.revert();scrollTo(0,0);if(lenis)lenis.scrollTo(0,{immediate:true,force:true});if(FX){ctx=G.context(function(){base(root);if(P[pg])P[pg](root)});ST.refresh()}}
var pb=$("#pt .pb"),ptt=$("#ptt")[0],pw=$("#pt .pwrap path")[0],pcl=$("#pt .pcl")[0],pc=$("#pt .pc")[0];
function pTitle(name){ptt.innerHTML="";var t=titles[name].split(" ");t.forEach(function(w,i){var s=mk(w);if(i==t.length-1)s.firstChild.classList.add("sx");ptt.appendChild(s);ptt.appendChild(document.createTextNode(" "))})}
function cover(name,mid,after){busy=true;if(lenis)lenis.stop();pTitle(name);var ti=$("#ptt .i");G.set("#pt",{display:"block"});G.set(pb,{clipPath:"inset(100% 0% 0% 0%)"});G.set(pc,{opacity:1});G.set(ti,{yPercent:115});G.set(pw,{strokeDashoffset:1.001});G.set(pcl,{opacity:0});
var o={p:0};G.timeline({onComplete:function(){busy=false}})
.to(pb,{clipPath:"inset(0% 0% 0% 0%)",duration:.85,ease:"expo.inOut",stagger:.09})
.to(ti,{yPercent:0,duration:.9,stagger:.07,ease:"expo.out"},"-=.55")
.to(pw,{strokeDashoffset:0,duration:.9,ease:"power2.inOut"},"<+.2").set(pcl,{opacity:1},"<")
.to(o,{p:1,duration:.9,ease:"power2.inOut",onUpdate:function(){var q=pw.getPointAtLength(pw.getTotalLength()*o.p);pcl.style.left=q.x/400*100+"%";pcl.style.top=q.y/40*100+"%"}},"<")
.call(mid,null,">-.15")
.to(pc,{opacity:0,y:-20,duration:.35,ease:"power2.in"},">+.15")
.to(pb.slice().reverse(),{clipPath:"inset(0% 0% 100% 0%)",duration:.9,ease:"expo.inOut",stagger:.09},">-.1")
.call(after,null,"-=.8").set("#pt",{display:"none"})}
function navigate(name){if(busy)return;var same=routes[name]===routes[cur];try{if(location.hash!=="#"+name)history.replaceState(null,"","#"+name)}catch(e){}
if(!FX){show(name);build(name);return}
if(same&&cur){show(name);scrollTo(0,0);if(lenis)lenis.scrollTo(0,{immediate:true,force:true});ST.refresh();return}
cover(name,function(){show(name);build(name)},function(){if(lenis)lenis.start();heroIn()})}
document.addEventListener("click",function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var n=a.getAttribute("href").slice(1);if(routes[n]){e.preventDefault();if(mn.classList.contains("open"))tg(false);navigate(n)}});
addEventListener("hashchange",function(){var n=location.hash.slice(1);if(routes[n]&&n!==cur)navigate(n)});
/* boot */
var first="home";try{if("scrollRestoration" in history)history.scrollRestoration="manual";history.replaceState(null,"","#home")}catch(e){}
if(!FX){if(ld)ld.remove();show(first);build(first);addEventListener("scroll",function(){var m=H.scrollHeight-innerHeight;var pr=m>0?scrollY/m:0;$("#pg i")[0].style.transform="scaleX("+pr+")";$("#pg b")[0].style.left=pr*100+"%"},{passive:true});return}
G.registerPlugin(ST);ST.config({ignoreMobileResize:true});
if(window.Lenis){lenis=new Lenis({duration:1.3,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true});lenis.on("scroll",ST.update);G.ticker.add(function(t){lenis.raf(t*1000)});G.ticker.lagSmoothing(0);lenis.stop();lenis.on("scroll",function(e){nv.classList.toggle("hide",e.direction===1&&e.scroll>240)})}
show(first);build(first);glob();
/* ---- v4: one section per scroll (desktop) + tempting join button ---- */
(function(){if(!lenis)return;
var SN=matchMedia("(min-width:900px) and (min-height:560px)"),anim=false,lastT=0,lastAbs=0,lastDir=0,doneT=0,idle=0;
function ok(){return SN.matches&&!busy&&!mn.classList.contains("open")}
function info(){var pg=$("[data-page]:not([hidden])")[0];if(!pg||pg.hasAttribute("data-free"))return null;var vh=innerHeight,max=Math.max(0,document.documentElement.scrollHeight-vh),st=[],fr=[],y0=scrollY;
Array.prototype.slice.call(pg.children).concat([$(".ft")[0]]).forEach(function(el){if(!el||el.hidden||!el.offsetHeight)return;var r=el.getBoundingClientRect(),t=r.top+y0,h=r.height,e=t+h-vh;
if(el.classList.contains("pin-spacer")||el.classList.contains("sk")){st.push(t);if(e>t+4){st.push(e);fr.push([Math.round(t),Math.round(e)])}return}
st.push(t);if(h>vh*1.06){var n=Math.ceil((h-vh)/(vh*.85));for(var k=1;k<=n;k++)st.push(t+(e-t)*k/n)}});
st=st.map(function(y){return Math.max(0,Math.min(max,Math.round(y)))}).sort(function(a,b){return a-b}).filter(function(y,i,a){return !i||y-a[i-1]>8});return{st:st,fr:fr}}
function go(y){anim=true;lenis.scrollTo(y,{duration:1.05,easing:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},lock:true,force:true,onComplete:function(){anim=false;doneT=performance.now()}})}
function next(I,y,d){var i;if(d>0){for(i=0;i<I.st.length;i++)if(I.st[i]>y+4)return I.st[i]}else{for(i=I.st.length-1;i>=0;i--)if(I.st[i]<y-4)return I.st[i]}return null}
addEventListener("wheel",function(e){if(!ok()||e.ctrlKey)return;var I=info();if(!I)return;var dy=e.deltaY*(e.deltaMode==1?33:e.deltaMode==2?innerHeight:1);if(Math.abs(dy)<Math.abs(e.deltaX))return;var d=dy>0?1:-1,y=lenis.scroll,nw=performance.now();
if(!anim&&nw-doneT<900&&nw-lastT<200&&d===lastDir){lastT=nw;e.preventDefault();e.stopImmediatePropagation();return}
if(!anim){for(var i=0;i<I.fr.length;i++){var z=I.fr[i];if((y>z[0]+2&&y<z[1]-2)||(Math.abs(y-z[0])<=2&&d>0)||(Math.abs(y-z[1])<=2&&d<0))return}}
e.preventDefault();e.stopImmediatePropagation();
var now=performance.now(),gap=now-lastT,ab=Math.abs(dy),fresh=gap>200||ab>lastAbs*1.6+4||d!==lastDir||(now-doneT>650&&ab>=40);lastT=now;lastAbs=ab;lastDir=d;
if(anim||!fresh||ab<2)return;var t=next(I,y,d);if(t!=null)go(t)},{passive:false,capture:true});
function settle(){if(!ok()||anim)return;var I=info();if(!I)return;var y=lenis.scroll,i;for(i=0;i<I.fr.length;i++)if(y>I.fr[i][0]-2&&y<I.fr[i][1]+2)return;for(i=0;i<I.st.length;i++)if(Math.abs(I.st[i]-y)<3)return;
var lo=null,hi=null;I.st.forEach(function(s){if(s<=y)lo=s;else if(hi==null)hi=s});var d=lenis.direction||1,t;
if(lo==null)t=hi;else if(hi==null)t=lo;else{var p=(y-lo)/(hi-lo);t=d>0?(p>.12?hi:lo):(p<.88?lo:hi)}if(t!=null)go(t)}
lenis.on("scroll",function(){if(anim)return;clearTimeout(idle);idle=setTimeout(settle,180)});
})();
if(matchMedia("(hover:hover)").matches)$(".rbw").forEach(function(w){var b=$(".rb",w)[0];w.addEventListener("pointermove",function(e){var r=w.getBoundingClientRect();G.to(b,{x:(e.clientX-r.left-r.width/2)*.28,y:(e.clientY-r.top-r.height/2)*.28,duration:.6,ease:"power3.out",overwrite:"auto"})});w.addEventListener("pointerleave",function(){G.to(b,{x:0,y:0,duration:1.1,ease:"elastic.out(1,.4)",overwrite:"auto"})})});
/* loader: a sunrise over many languages */
var words=["Education","Éducation","Educación","शिक्षा","التعليم","教育","Ledikasyon"],wl=["en","fr","es","hi","ar","zh","mfe"],lw=$(".lw2")[0],N=words.length,T=.44;
function done(){scrollTo(0,0);if(lenis){lenis.scrollTo(0,{immediate:true,force:true});lenis.start()}heroIn()}
if(ld)ld.style.animation="none";
if(SL||!ld){if(ld)ld.remove();done()}else{
words.forEach(function(w,i){var s=document.createElement("span");s.textContent=w;s.lang=wl[i];if(wl[i]==="ar")s.dir="rtl";lw.appendChild(s)});
var ws=$(".lw2 span"),cnt=$("#cnt")[0],c={v:0},W=innerWidth,sun=$(".lsun")[0],bds=[],lu=$(".lu path")[0],rnd=G.utils.random;
G.set("#pt",{display:"block"});G.set(pb,{clipPath:"inset(0% 0% 0% 0%)"});G.set(pc,{opacity:0});
for(var i=0;i<5;i++){var bd=S("svg",{viewBox:"0 0 44 18","aria-hidden":"true",class:"bd"},ld);S("path",{d:"M2 15Q12 -3 22 13Q32 -3 42 15",fill:"none",stroke:"#1b1b33","stroke-width":3,"stroke-linecap":"round","stroke-linejoin":"round"},bd);bd.style.cssText="position:absolute;left:0;top:"+(9+i*10)+"%;width:"+(28+i*7)+"px";bd.firstChild.style.animationDelay=(i*.08)+"s";bds.push(bd)}
var kk=["pencil","book","cap","bulb","star","paper","pencil","book"],ics=kk.map(function(k,i){var d=D("li","","left:"+(6+i*11.5)+"%;top:70%;width:"+rnd(26,40)+"px;height:"+rnd(26,40)+"px;opacity:0",null);d.innerHTML='<svg viewBox="0 0 24 24"><path d="'+ICO[k]+'"/></svg>';ld.insertBefore(d,lw);return d});
G.set(ws,{yPercent:130});G.set(sun,{yPercent:104});G.set(".lgf",{xPercent:-50,yPercent:-50});
bds.forEach(function(bd,i){G.fromTo(bd,{x:-90},{x:W+90,duration:3.8+i*.3,delay:.1+i*.32,ease:"none",repeat:-1});G.to(bd,{y:i%2?-22:22,duration:.8+i*.12,yoyo:true,repeat:-1,ease:"sine.inOut"})});
ics.forEach(function(d,i){G.fromTo(d,{y:0,opacity:0,rotation:-25},{y:-rnd(180,320),opacity:.85,rotation:rnd(10,40),duration:rnd(2.6,3.6),delay:.3+i*.28,ease:"sine.out"});G.to(d,{opacity:0,duration:.8,delay:1.8+i*.28})});
function setc(v){if(cnt)cnt.textContent=Math.round(v)}
var tl=G.timeline({delay:.15,onComplete:function(){G.killTweensOf(bds);G.killTweensOf(ics);ld.remove();G.set("#pt",{display:"none"})}});
tl.fromTo(sun,{yPercent:104},{yPercent:26,duration:N*T+1,ease:"power2.out"},0).to(c,{v:92,duration:N*T+.8,ease:"none",onUpdate:function(){setc(c.v)}},0);
ws.forEach(function(w,i){tl.to(w,{yPercent:0,duration:.38,ease:"expo.out"},i*T);tl.to(w,{yPercent:-130,duration:.28,ease:"expo.in"},i*T+.36);});tl.set(lu,{opacity:1},.12).fromTo(lu,{strokeDashoffset:1.001},{strokeDashoffset:0,duration:.6,ease:"power2.out",immediateRender:false},.12).to(lu,{strokeDashoffset:-1.001,duration:.45,ease:"power2.in"},(N-1)*T+.3).set(lu,{opacity:0},(N-1)*T+.76);
tl.fromTo(".lgf",{opacity:0,y:30,scale:.94},{opacity:1,y:0,scale:1,duration:.8,ease:"expo.out"},N*T+.12);
tl.addPause(N*T+1.05,function(){if(document.readyState==="complete")tl.play();else{addEventListener("load",function(){tl.play()});setTimeout(function(){tl.play()},6000)}});
tl.to(".lu",{opacity:0,duration:.3},">").add(function(){G.killTweensOf(ics);G.to(ics,{opacity:0,duration:.4})},"<")
.to(".lgf",{width:function(){return Math.min(innerWidth*.84,1300)},top:"50%",duration:1,ease:"expo.inOut"},"<")
.to(".lbr",{opacity:0,y:24,duration:.5,ease:"power2.in"},"<")
.to(sun,{yPercent:8,scale:1.1,duration:1,ease:"expo.inOut"},"<")
.to(bds,{opacity:0,duration:.5},"<")
.add(function(){var g=$(".lgf")[0];g.style.position="fixed";g.style.zIndex=320;document.body.appendChild(g)},">+.3")
.to(".lgf",{left:function(){var n=$("#nv .logo")[0].getBoundingClientRect();return n.left+n.width/2},top:function(){var n=$("#nv .logo")[0].getBoundingClientRect();return n.top+n.height/2},width:function(){return $("#nv .logo")[0].getBoundingClientRect().width},duration:1.3,ease:"power3.inOut"},">")
.to(ld,{clipPath:"inset(0% 0% 100% 0%)",duration:1.1,ease:"expo.inOut"},"<+.15")
.to(pb.slice().reverse(),{clipPath:"inset(0% 0% 100% 0%)",duration:1,ease:"expo.inOut",stagger:.1},"<+.14").call(done,null,"-=.95").call(function(){var g=$("body>.lgf")[0];if(g)g.remove()});
ld.addEventListener("pointerdown",function(){tl.timeScale(3.5)})}
addEventListener("load",function(){ST.refresh()});
});
