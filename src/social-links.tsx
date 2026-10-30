import {ArrowUpRight} from 'lucide-react';
import {InstagramIcon,WhatsAppIcon} from './social-icons';
import contacts from './contacts.json';

export default function SocialLinks(){
 return <div className="footer-social"><span>CONTATO & REDES</span><div className="social-buttons">
 {contacts.whatsapp?<a href={'https://wa.me/'+contacts.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={23}/><span>WhatsApp</span><ArrowUpRight size={13}/></a>:<span className="social-pending"><WhatsAppIcon size={23}/>WhatsApp <small>Em breve</small></span>}
 {contacts.instagram?<a href={'https://www.instagram.com/'+contacts.instagram+'/'} target="_blank" rel="noreferrer"><InstagramIcon size={23}/><span>Instagram</span><ArrowUpRight size={13}/></a>:<span className="social-pending"><InstagramIcon size={23}/>Instagram <small>Em breve</small></span>}
 </div></div>;
}
