import {useEffect,useState} from 'react';
import {analyticsAvailable,startAnalytics,stopAnalytics} from './analytics';
import './privacy.css';

type Choice='accepted'|'rejected'|null;
const CONSENT_KEY='nordhub_analytics_consent_v1';

export default function PrivacyNotice(){
  const [choice,setChoice]=useState<Choice>(null);
  const [visible,setVisible]=useState(false);
  const [ready,setReady]=useState(false);
  const enabled=analyticsAvailable();
  useEffect(()=>{
    let saved:Choice=null;
    try{
      const value=localStorage.getItem(CONSENT_KEY);
      if(value==='accepted'||value==='rejected')saved=value;
    }catch{/* Sem acesso ao armazenamento, solicitar escolha nesta visita. */}
    if(saved==='accepted' && enabled)startAnalytics();
    setChoice(saved);
    setVisible(!saved);
    setReady(true);
  },[enabled]);
  function decide(value:Exclude<Choice,null>){
    if(value==='accepted' && enabled)startAnalytics(); else stopAnalytics();
    try{localStorage.setItem(CONSENT_KEY,value)}catch{/* Decisão vale apenas nesta visita. */}
    setChoice(value);
    setVisible(false);
  }
  if(!ready)return null;
  return <>
    {visible&&<section className="nh-privacy-notice" role="region" aria-label="Preferências de privacidade">
      <div className="nh-privacy-copy">
        <strong>Sua privacidade importa</strong>
        <p>Usamos armazenamento local necessário para memorizar sua escolha. {enabled?'Com sua autorização, o Google Analytics 4 poderá medir visitas e interação com o site; você pode recusar sem perder nenhuma funcionalidade.':'A medição por Google Analytics não está ativa nesta publicação.'} <a href="/privacidade.html">Política de Privacidade</a> · <a href="/cookies.html">Política de Cookies</a>.</p>
        {choice&&<small>Escolha atual: {choice==='accepted'?'análises autorizadas':'análises recusadas'}.</small>}
      </div>
      <div className="nh-privacy-actions">
        <button type="button" className="nh-privacy-reject" onClick={()=>decide('rejected')}>Recusar análises</button>
        {enabled&&<button type="button" className="nh-privacy-accept" onClick={()=>decide('accepted')}>Aceitar análises</button>}
      </div>
    </section>}
    <nav className="nh-privacy-links" aria-label="Informações legais">
      <a href="/privacidade.html">Privacidade</a><span aria-hidden="true">·</span><a href="/cookies.html">Cookies</a>
      {!visible&&<button type="button" onClick={()=>setVisible(true)} aria-label="Alterar preferências de privacidade">Preferências</button>}
    </nav>
  </>;
}
