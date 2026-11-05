// Google Analytics 4 loads exclusively after explicit analytics consent.
const measurementId=(import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
const validId=/^G-[A-Z0-9]+$/.test(measurementId);
let initialized=false;
type GtagFn=(...args:unknown[])=>void;
type AnalyticsWindow=Window & {dataLayer?:unknown[][];gtag?:GtagFn;[key:string]:unknown};

export function analyticsAvailable(){return validId;}
export function startAnalytics(){
  if(!validId || typeof window==='undefined')return;
  const w=window as unknown as AnalyticsWindow;
  w[`ga-disable-${measurementId}`]=false;
  if(initialized){
    w.gtag?.('consent','update',{analytics_storage:'granted'});
    return;
  }

  initialized=true;
  w.dataLayer=w.dataLayer||[];
  w.gtag=(...args:unknown[])=>{w.dataLayer!.push(args)};

  // Establish consent BEFORE initializing/configuring the Google tag.
  // We don't load GA4 at all until the visitor opts in.
  w.gtag('consent','default',{
    analytics_storage:'denied',
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied'
  });
  w.gtag('js',new Date());
  w.gtag('consent','update',{analytics_storage:'granted'});

  // Explicit page_view makes the first consented page visit predictable.
  // send_page_view:false prevents a duplicate automatic view.
  w.gtag('config',measurementId,{
    send_page_view:false,
    allow_google_signals:false,
    allow_ad_personalization_signals:false
  });
  w.gtag('event','page_view',{
    send_to:measurementId,
    page_location:window.location.href,
    page_title:document.title
  });

  const script=document.createElement('script');
  script.async=true;
  script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.nordhubAnalytics='true';
  document.head.appendChild(script);
}

export function stopAnalytics(){
  if(!validId || typeof window==='undefined')return;
  const w=window as unknown as AnalyticsWindow;
  w.gtag?.('consent','update',{analytics_storage:'denied'});
  w[`ga-disable-${measurementId}`]=true;
  // Best effort to remove GA cookies; provider cookies may have other names.
  for(const cookie of document.cookie.split(';')){
    const name=cookie.split('=')[0]?.trim();
    if(!name || !/^_ga(?:_|$)/.test(name))continue;
    for(const domain of ['', 'domain='+location.hostname+';', 'domain=.'+location.hostname+';', 'domain=.nordhub.app.br;']){
      document.cookie=`${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; ${domain} SameSite=Lax`;
    }
  }
}
