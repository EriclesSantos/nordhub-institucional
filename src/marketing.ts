// Commercial interaction metrics require an already granted analytics consent.
const CONSENT_KEY='nordhub_analytics_consent_v1';
function consented(){try{return localStorage.getItem(CONSENT_KEY)==='accepted'}catch{return false}}
function addCampaignParams(){
  const current=new URLSearchParams(window.location.search);
  const utm=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  if(!utm.some(k=>current.has(k)))return;
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach(anchor=>{
    const url=new URL(anchor.href,window.location.origin);
    if(url.origin!==location.origin)return;
    utm.filter(k=>current.has(k)).forEach(k=>url.searchParams.set(k,current.get(k)!));
    anchor.href=url.href;
  });
}
export function initializeMarketing(){
  addCampaignParams();
  document.addEventListener('click',event=>{
    const el=(event.target as Element|null)?.closest?.<HTMLElement>('[data-conversion]');
    if(!el || !consented() || typeof window.gtag!=='function')return;
    const name=el.dataset.conversion;
    if(!name)return;
    window.gtag('event',name,{link_location:(el as HTMLAnchorElement).href||location.href});
  });
}
declare global{interface Window{gtag?:(...args:unknown[])=>void}}
