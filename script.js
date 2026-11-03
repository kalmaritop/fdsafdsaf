
document.addEventListener("DOMContentLoaded",()=>{
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add("show"),Math.min(i*60,260));
        io.unobserve(e.target);
      }
    });
  },{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  const bar=document.querySelector(".progress-line");
  const upd=()=>{
    if(!bar)return;
    const d=document.documentElement;
    const max=d.scrollHeight-d.clientHeight;
    bar.style.width=(max>0?d.scrollTop/max*100:0)+"%";
  };
  document.addEventListener("scroll",upd,{passive:true});upd();

  document.querySelectorAll("[data-count]").forEach(el=>{
    const target=+el.dataset.count;let cur=0;
    const step=Math.max(1,Math.ceil(target/45));
    const t=setInterval(()=>{
      cur+=step;
      if(cur>=target){cur=target;clearInterval(t)}
      el.textContent=cur;
    },32);
  });

  const chars=["♪","♫","♩","✦","◆"];
  for(let i=0;i<7;i++){
    const n=document.createElement("div");
    n.textContent=chars[i%chars.length];
    n.style.cssText=`position:fixed;left:${6+i*14}%;bottom:-30px;color:rgba(217,180,90,.08);font-size:${22+(i%3)*8}px;pointer-events:none;z-index:-1;animation:rise ${12+i%4*2}s linear ${-i*1.3}s infinite`;
    document.body.appendChild(n);
  }
  const s=document.createElement("style");
  s.textContent="@keyframes rise{from{transform:translateY(0) rotate(0)}to{transform:translateY(-120vh) rotate(260deg)}}";
  document.head.appendChild(s);
});
