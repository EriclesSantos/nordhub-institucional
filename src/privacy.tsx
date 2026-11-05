import {useEffect,useState} from 'react';
import './privacy.css';

const NOTICE_KEY='nordhub_privacy_notice_v1';

export default function PrivacyNotice(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    try {setVisible(window.localStorage.getItem(NOTICE_KEY)!=='acknowledged')} catch {setVisible(true)}
  },[]);
  function acknowledge(){
    try {window.localStorage.setItem(NOTICE_KEY,'acknowledged')} catch {/* Armazenamento indisponível: apenas fecha o aviso. */}
    setVisible(false);
  }
  return <>
    {visible&&<section className="nh-privacy-notice" role="region" aria-label="Aviso de privacidade">
      <div className="nh-privacy-copy">
        <strong>Privacidade na Nördhub</strong>
        <p>Este site não utiliza cookies de publicidade ou análise neste momento. Usamos somente armazenamento local para guardar sua escolha de ocultar este aviso. <a href="/privacidade.html">Política de Privacidade</a> · <a href="/cookies.html">Política de Cookies</a>.</p>
      </div>
      <button type="button" onClick={acknowledge} aria-label="Entendi o aviso de privacidade">Entendi</button>
    </section>}
    <nav className="nh-privacy-links" aria-label="Informações legais">
      <a href="/privacidade.html">Privacidade</a><span aria-hidden="true">·</span><a href="/cookies.html">Cookies</a>
      {!visible&&<button type="button" onClick={()=>setVisible(true)} aria-label="Reabrir aviso de privacidade">Preferências</button>}
    </nav>
  </>;
}
