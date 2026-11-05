import {useEffect,useRef,useState} from 'react';
import {analyticsAvailable,startAnalytics,stopAnalytics} from './analytics';
import './privacy.css';

type Choice='accepted'|'rejected'|null;
const CONSENT_KEY='nordhub_analytics_consent_v1';
const OPEN_EVENT='nordhub:open-privacy';
const OLD_NOTICE_KEY='nordhub_privacy_notice_v1';

export default function PrivacyNotice(){
  const [choice,setChoice]=useState<Choice>(null);
  const [visible,setVisible]=useState(false);
  const [ready,setReady]=useState(false);
  const closeButton=useRef<HTMLButtonElement>(null);
  const enabled=analyticsAvailable();

  useEffect(()=>{
    let saved:Choice=null;
    try {
      const value=localStorage.getItem(CONSENT_KEY);
      if(value==='accepted'||value==='rejected')saved=value;
      // Remove obsolete dismissal key from the earlier banner.
      localStorage.removeItem(OLD_NOTICE_KEY);
    } catch {/* No storage access: ask again on a future visit. */}
    if(saved==='accepted'&&enabled)startAnalytics();
    setChoice(saved);
    setVisible(!saved);
    setReady(true);
  },[enabled]);

  useEffect(()=>{
    const open=()=>setVisible(true);
    window.addEventListener(OPEN_EVENT,open);
    return ()=>window.removeEventListener(OPEN_EVENT,open);
  },[]);

  useEffect(()=>{
    if(!visible)return;
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    closeButton.current?.focus();
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();decide('rejected');}
      if(event.key==='Tab'){
        const modal=document.querySelector<HTMLElement>('.nh-consent-card');
        const focusables=modal?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]');
        if(!focusables?.length)return;
        const first=focusables[0],last=focusables[focusables.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    window.addEventListener('keydown',onKey);
    return()=>{window.removeEventListener('keydown',onKey);previous?.focus();}
  },[visible]);

  function decide(value:Exclude<Choice,null>){
    if(value==='accepted'&&enabled)startAnalytics();
    else stopAnalytics();
    try{localStorage.setItem(CONSENT_KEY,value)}catch{/* Applies for this visit only. */}
    setChoice(value);
    setVisible(false);
  }

  if(!ready)return null;
  if(!visible)return null;
  return <div className="nh-consent-backdrop">
    <section className="nh-consent-card" role="dialog" aria-modal="true" aria-labelledby="nh-consent-title" aria-describedby="nh-consent-description">
      <div className="nh-consent-glow" aria-hidden="true"/>
      <div className="nh-consent-top">
        <span className="nh-consent-eyebrow"><span className="nh-consent-dot"/> NÖRDHUB / PRIVACIDADE</span>
        <button type="button" className="nh-consent-close" ref={closeButton} onClick={()=>decide('rejected')} aria-label="Fechar sem autorizar análises">×</button>
      </div>
      <div className="nh-consent-icon" aria-hidden="true">◇</div>
      <h2 id="nh-consent-title">Sua privacidade.<br/><span>Sua escolha.</span></h2>
      <p id="nh-consent-description">Utilizamos armazenamento local para lembrar sua preferência. {enabled?'Com sua autorização, podemos usar o Google Analytics para entender visitas e melhorar a experiência do site.':'O Google Analytics ainda não está ativo nesta publicação.'} Você pode navegar normalmente sem autorizar a análise de dados.</p>
      <div className="nh-consent-links">
        <a href="/privacidade.html" target="_blank" rel="noopener noreferrer">Política de Privacidade ↗</a>
        <a href="/cookies.html" target="_blank" rel="noopener noreferrer">Política de Cookies ↗</a>
      </div>
      <div className="nh-consent-actions">
        {enabled&&<button type="button" className="nh-consent-accept" onClick={()=>decide('accepted')}>Aceitar análises <span aria-hidden="true">↗</span></button>}
        <button type="button" className="nh-consent-reject" onClick={()=>decide('rejected')}>{enabled?'Continuar sem análises':'Entendi'}</button>
      </div>
      <p className="nh-consent-footnote">O botão × fecha este aviso sem ativar o Google Analytics. {choice?'Você pode mudar sua decisão no rodapé.':'Sua decisão poderá ser alterada depois no rodapé.'}</p>
    </section>
  </div>;
}

export function reopenPrivacy(){
  if(typeof window!=='undefined')window.dispatchEvent(new Event(OPEN_EVENT));
}
