import {env} from 'cloudflare:workers';
import {eq} from 'drizzle-orm';
import {getDb} from '@/db';
import {siteContacts} from '@/db/schema';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {normalizeSocials} from '@/lib/social-validation';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store'};
export async function GET(){
 const user=await getChatGPTUser();
 const admin=(env as unknown as Record<string,string>).NORDHUB_ADMIN_EMAIL;
 const canEdit=Boolean(admin&&user?.email.toLowerCase()===admin.toLowerCase());
 const rows=await getDb().select().from(siteContacts).where(eq(siteContacts.id,'main')).limit(1);
 const row=rows[0];return Response.json({whatsapp:row?.whatsapp||'',instagram:row?.instagram||'_nordhub',canEdit},{headers});
}
export async function PUT(request:Request){
 const user=await getChatGPTUser();const admin=(env as unknown as Record<string,string>).NORDHUB_ADMIN_EMAIL;
 if(!admin||!user||user.email.toLowerCase()!==admin.toLowerCase())return Response.json({error:'Acesso restrito à administração.'},{status:403,headers});
 const origin=request.headers.get('origin');
 if(origin&&new URL(origin).host!==new URL(request.url).host)return Response.json({error:'Origem não autorizada.'},{status:403,headers});
 let data;try{data=normalizeSocials(await request.json())}catch(e){return Response.json({error:e instanceof Error?e.message:'Dados inválidos.'},{status:400,headers})}
 const updatedAt=new Date().toISOString();
 await getDb().insert(siteContacts).values({id:'main',...data,updatedAt}).onConflictDoUpdate({target:siteContacts.id,set:{...data,updatedAt}});
 return Response.json({...data,canEdit:true},{headers});
}
