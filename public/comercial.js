/* Nördhub commercial landing: consent-first GA4, campaign links and conversion events. */
const CONSENT='nordhub_analytics_consent_v1';
const MEASUREMENT='G-58MVN9K061';
const IG='https://www.instagram.com/_nordhub/';
let tagStarted=false;
function getChoice(){try{return localStorage.getItem(CONSENT)}catch{return null}}
function startGA(){
  if(tagStarted||getChoice()!=='accepted')return;
  tagStarted=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',MEASUREMENT,{allow_google_signals:false,allow_ad_personalization_signals:false});
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+MEASUREMENT;
  document.head.appendChild(s);
}
function saveChoice(choice){
  try{localStorage.setItem(CONSENT,choice)}catch{}
  document.querySelector('.commercial-consent')?.remove();
  if(choice==='accepted')startGA();
  else if(tagStarted){
    window['ga-disable-'+MEASUREMENT]=true;
    window.gtag?.('consent','update',{analytics_storage:'denied'});
  }
}
function showConsent(){
  if(document.querySelector('.commercial-consent'))return;
  const backdrop=document.createElement('div');
  backdrop.className='commercial-consent';
  backdrop.innerHTML='<section class="commercial-consent-card" role="dialog" aria-modal="true" aria-labelledby="commercial-consent-heading"><button type="button" class="commercial-consent-close" aria-label="Fechar sem aceitar análises">×</button><span class="kicker">NÖRDHUB / PRIVACIDADE</span><h2 id="commercial-consent-heading">Sua privacidade. <em>Sua escolha.</em></h2><p>Usamos armazenamento local para lembrar sua preferência. Com sua autorização, o Google Analytics ajuda a entender visitas ao site. A navegação continua disponível sem aceitar análises.</p><p><a href="/privacidade.html" target="_blank" rel="noopener noreferrer">Política de Privacidade ↗</a> · <a href="/cookies.html" target="_blank" rel="noopener noreferrer">Cookies ↗</a></p><div class="actions"><button type="button" class="btn primary commercial-consent-yes">Aceitar análises ↗</button><button type="button" class="btn outline commercial-consent-no">Continuar sem análises</button></div></section>';
  document.body.appendChild(backdrop);
  const focus=backdrop.querySelector('.commercial-consent-close');
  focus.focus();
  const no=()=>saveChoice('rejected');
  backdrop.querySelector('.commercial-consent-close').addEventListener('click',no);
  backdrop.querySelector('.commercial-consent-no').addEventListener('click',no);
  backdrop.querySelector('.commercial-consent-yes').addEventListener('click',()=>saveChoice('accepted'));
  backdrop.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();no()}
    if(e.key==='Tab'){
      const items=[...backdrop.querySelectorAll('button,a[href]')];
      const index=items.indexOf(document.activeElement);
      if(e.shiftKey&&index===0){e.preventDefault();items.at(-1).focus()}
      else if(!e.shiftKey&&index===items.length-1){e.preventDefault();items[0].focus()}
    }
  });
}
if(getChoice()==='accepted')startGA();
else if(getChoice()!=='rejected')showConsent();

const footer=document.querySelector('footer');
if(footer){
  const pref=footer.querySelector('.commercial-pref-btn');
  if(pref)pref.addEventListener('click',showConsent);
  else{
    const fallback=document.createElement('button');
    fallback.type='button';fallback.textContent='Configurar cookies';fallback.className='commercial-pref-btn';
    fallback.addEventListener('click',showConsent);
    footer.appendChild(fallback);
  }
}

document.addEventListener('click',event=>{
  const el=event.target.closest('[data-conversion]');
  if(!el||getChoice()!=='accepted'||typeof window.gtag!=='function')return;
  window.gtag('event',el.dataset.conversion,{link_location:el.href||location.href});
});
document.querySelectorAll('[data-utm]').forEach(anchor=>{
  const params=new URLSearchParams(location.search);
  const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  if(!keys.some(key=>params.has(key)))return;
  const url=new URL(anchor.href,location.origin);
  if(url.origin!==location.origin)return;
  keys.filter(key=>params.has(key)).forEach(key=>url.searchParams.set(key,params.get(key)));
  anchor.href=url.href;
});

/* Reuse the homepage's restrained 3D parallax on the approved hammer artwork. */
document.querySelectorAll('.nord-3d-scene').forEach(scene=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const model=scene.querySelector('.visual-model');if(!model)return;
  scene.addEventListener('pointermove',event=>{
    const rect=scene.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,((event.clientX-rect.left)/rect.width-.5)*2));
    const y=Math.max(-1,Math.min(1,((event.clientY-rect.top)/rect.height-.5)*2));
    model.style.transform='rotateY('+(x*8).toFixed(2)+'deg) rotateX('+(-y*6).toFixed(2)+'deg)';
  },{passive:true});
  scene.addEventListener('pointerleave',()=>{model.style.transform='rotateY(0deg) rotateX(0deg)'});
});

/* Responsive fixed menu, matching the institutional navigation behavior. */
const commercialHeader=document.querySelector('.wrap>header');
if(commercialHeader){
  const menu=commercialHeader.querySelector('nav');
  if(menu){
    menu.id='commercial-navigation';
    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='commercial-menu-toggle';
    toggle.setAttribute('aria-controls','commercial-navigation');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menu');
    toggle.textContent='☰';
    commercialHeader.appendChild(toggle);
    const closeMenu=()=>{
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Abrir menu');
      toggle.textContent='☰';
    };
    toggle.addEventListener('click',()=>{
      const open=menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
      toggle.textContent=open?'×':'☰';
    });
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>740)closeMenu()});
  }
}
