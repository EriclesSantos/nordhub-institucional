'use client';
import {Children,isValidElement,cloneElement,useEffect,useRef,useState,type ReactNode,type ReactElement,type CSSProperties} from 'react';
const plain=(nodes:ReactNode):string=>Children.toArray(nodes).map(node=>typeof node==='string'||typeof node==='number'?String(node):isValidElement<{children?:ReactNode}>(node)?node.type==='br'?' ':plain(node.props.children):'').join('');
/** Each viewport entry owns its typing clock; it never waits for another animation. */
export default function TypeText({children,delay=0}:{children:ReactNode;delay?:number}){
 const ref=useRef<HTMLSpanElement>(null);const total=plain(children).length;
 const[shown,setShown]=useState(total);
 useEffect(()=>{
  const el=ref.current;if(!el)return;let timer=0,frame=0,inView=false;
  const cancel=()=>{window.clearTimeout(timer);cancelAnimationFrame(frame);};
  const start=()=>{
   cancel();if(document.documentElement.dataset.motion==='paused'){setShown(total);return;}
   setShown(0);if(!inView)return;
   timer=window.setTimeout(()=>{const started=performance.now();const step=Math.min(48,3000/Math.max(total,1));
    const tick=(now:number)=>{const count=Math.min(total,Math.floor((now-started)/step));setShown(count);if(count<total)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);
   },delay+(el.closest('.reveal')?650:0));
  };
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;start();},{threshold:.15});
  observer.observe(el);window.addEventListener('nordhub:motion',start);
  return()=>{cancel();observer.disconnect();window.removeEventListener('nordhub:motion',start);};
 },[delay,total]);
 let index=0;
 const letters=(nodes:ReactNode):ReactNode=>Children.map(nodes,node=>{
  if(typeof node==='string'||typeof node==='number')return Array.from(String(node)).map(char=>{const i=index++;return <span className="type-char" key={i} style={{'--letter-visible':i<shown?1:0} as CSSProperties}>{char}</span>;});
  if(isValidElement<{children?:ReactNode}>(node))return node.type==='br'?node:cloneElement(node as ReactElement<{children?:ReactNode}>,{},letters(node.props.children));return node;
 });
 return <span ref={ref} className="type-text" data-typing={shown<total} data-characters={shown} aria-label={plain(children)}><span aria-hidden="true">{letters(children)}</span></span>;
}
