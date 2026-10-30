'use client';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Settings2} from 'lucide-react';
import {InstagramIcon,WhatsAppIcon} from './social-icons';
type Contacts={whatsapp:string;instagram:string;canEdit:boolean};
export default function SocialLinks(){
 const[data,setData]=useState<Contacts>({whatsapp:'',instagram:'_nordhub',canEdit:false});
 const[failed,setFailed]=useState(false);
 useEffect(()=>{const ac=new AbortController();fetch('/api/socials',{signal:ac.signal,cache:'no-store'}).then(r=>{if(!r.ok)throw new Error();return r.json() as Promise<Contacts>}).then(setData).catch(e=>{if(e.name!=='AbortError')setFailed(true)});return()=>ac.abort()},[]);
 return <div className="footer-social"><span>CONTATO & REDES</span><div className="social-buttons">
 {data.whatsapp?<a href={'https://wa.me/'+data.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={23}/><span>WhatsApp</span><ArrowUpRight size={13}/></a>:<span className="social-pending"><WhatsAppIcon size={23}/>WhatsApp <small>Em breve</small></span>}
 {data.instagram?<a href={'https://www.instagram.com/'+data.instagram+'/'} target="_blank" rel="noreferrer"><InstagramIcon size={23}/><span>Instagram</span><ArrowUpRight size={13}/></a>:<span className="social-pending"><InstagramIcon size={23}/>Instagram <small>Em breve</small></span>}
 </div>{data.canEdit&&<a className="manage-social" href="/admin/contatos"><Settings2 size={12}/>Cadastrar ou editar contatos</a>}{failed&&<small className="social-error">Contatos indisponíveis no momento.</small>}</div>
}
