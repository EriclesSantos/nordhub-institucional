/* Campaign measurement and contact: never create analytics before consent. */
const consentKey='nordhub_analytics_consent_v1';
const measurement='G-58MVN9K061';
const analyticsAllowed=()=>{try{return localStorage.getItem(consentKey)==='accepted';}catch{return false;}};
function setupAnalytics(){
  if(!analyticsAllowed())return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js',new Date());
  gtag('config',measurement,{allow_google_signals:false,allow_ad_personalization_signals:false});
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+measurement;document.head.appendChild(s);
}
setupAnalytics();
document.addEventListener('click',event=>{
  const el=event.target.closest('[data-conversion]');
  if(!el||!analyticsAllowed()||typeof window.gtag!=='function')return;
  gtag('event',el.dataset.conversion,{link_location:el.href||location.href});
});
document.querySelectorAll('[data-utm]').forEach(anchor=>{
  const q=new URLSearchParams(location.search);
  const campaign=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].filter(k=>q.has(k));
  if(!campaign.length)return;
  const url=new URL(anchor.href,location.origin);
  for(const k of campaign)url.searchParams.set(k,q.get(k));
  anchor.href=url.href;
});
