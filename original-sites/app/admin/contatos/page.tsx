import {env} from 'cloudflare:workers';
import {requireChatGPTUser} from '@/app/chatgpt-auth';
import ContactEditor from './editor';
export const dynamic='force-dynamic';
export default async function ContactSettings(){
 const user=await requireChatGPTUser('/admin/contatos');
 const admin=(env as unknown as Record<string,string>).NORDHUB_ADMIN_EMAIL;
 if(!admin||user.email.toLowerCase()!==admin.toLowerCase())return <main className="admin-shell"><h1>Acesso restrito</h1><p>Esta área está disponível apenas para a administração da Nördhub.</p><a href="/">Voltar ao site</a></main>;
 return <ContactEditor/>;
}
