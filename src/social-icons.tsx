'use client';
import {useId} from 'react';
export function InstagramIcon({size=18}:{size?:number}){
 const gradient='instagram-'+useId().replace(/:/g,'');
 return <svg className="brand-social-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id={gradient} x1="2" y1="24" x2="22" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD600"/><stop offset=".28" stopColor="#FF7A00"/><stop offset=".52" stopColor="#FF0069"/><stop offset=".76" stopColor="#D300C5"/><stop offset="1" stopColor="#7638FA"/></linearGradient></defs><rect x="1" y="1" width="22" height="22" rx="6" fill={`url(#${gradient})`}/><rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" stroke="white" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.3" stroke="white" strokeWidth="1.7"/><circle cx="16.6" cy="7.5" r="1" fill="white"/></svg>;
}
export function WhatsAppIcon({size=18}:{size?:number}){
 return <svg className="brand-social-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M12 1.1A10.8 10.8 0 0 0 2.7 17.4L1.2 23l5.8-1.5A10.9 10.9 0 1 0 12 1.1Z"/><path fill="white" d="M17.8 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.8-1.7-2.1-.1-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.6-.4Z"/></svg>;
}
