'use client';
import {useEffect,useRef,useState} from 'react';

/** Approved dimensional artwork with pointer parallax, floating and scroll lighting. */
export default function HammerScene({compact=false}:{compact?:boolean}){
 const host=useRef<HTMLDivElement>(null);
 const[visible,setVisible]=useState(true);
 useEffect(()=>{
  const isPaused=()=>document.documentElement.dataset.motion==='paused';
  const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
  let scrollFrame=0,pointerFrame=0;
  const pointer={x:0,y:0};
  const update=()=>{
   scrollFrame=0;const el=host.current;if(!el)return;
   const section=el.closest('section')||el;const rect=section.getBoundingClientRect();const h=window.innerHeight;
   const progress=compact?(h*.9-rect.top)/(h*.65+rect.height*.3):window.scrollY/(h*.65);
   el.style.setProperty('--scroll-turn',String(isPaused()?0:clamp(progress,0,1)));el.style.setProperty('--model-energy',String(isPaused()?.35:clamp(.12+progress*.95,.12,1)));
  };
  const scroll=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(update);};
  const move=(event:PointerEvent)=>{
   if(isPaused()||!host.current)return;
   const rect=host.current.getBoundingClientRect();
   pointer.x=clamp((event.clientX-rect.left)/rect.width*2-1,-1,1);
   pointer.y=clamp((event.clientY-rect.top)/rect.height*2-1,-1,1);
   if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{
    pointerFrame=0;host.current?.style.setProperty('--pointer-x',String(pointer.x));host.current?.style.setProperty('--pointer-y',String(pointer.y));
   });
  };
  const change=()=>{if(isPaused()){host.current?.style.setProperty('--pointer-x','0');host.current?.style.setProperty('--pointer-y','0');}update();};
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'100px'});
  if(host.current)observer.observe(host.current);
  update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);window.addEventListener('pointermove',move,{passive:true});window.addEventListener('nordhub:motion',change);
  return()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);window.removeEventListener('pointermove',move);window.removeEventListener('nordhub:motion',change);observer.disconnect();cancelAnimationFrame(scrollFrame);cancelAnimationFrame(pointerFrame);};
 },[compact]);
 return <div ref={host} data-visible={visible} data-emblem="approved" className={'hammer-canvas'+(compact?' compact-model':'')} role="img" aria-label="Emblema Nördhub em três quartos, com relevo metálico, movimento ao mouse e iluminação durante a rolagem"><div className="model-aura"/><div className="model-fallback" aria-hidden="true"><img src="/nordhub-quarter.webp" alt=""/><div className="fallback-sheen"/></div><span className="model-signal" aria-hidden="true"><i/>CIRCUITOS EM MOVIMENTO</span></div>;
}
