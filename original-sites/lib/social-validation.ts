export function normalizeSocials(value: unknown): {whatsapp:string;instagram:string} {
 if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Dados inválidos.');
 const input=value as Record<string, unknown>;
 if(typeof input.whatsapp!=='string'||typeof input.instagram!=='string')throw new Error('Preencha os campos como texto.');
 let whatsapp=input.whatsapp.trim(),instagram=input.instagram.trim();
 if(whatsapp&&!/^\+?[\d ()-]+$/.test(whatsapp))throw new Error('Use apenas o número do WhatsApp, com DDI e DDD.');
 whatsapp=whatsapp.replace(/\D/g,'');
 if(whatsapp&&!/^[1-9]\d{7,14}$/.test(whatsapp))throw new Error('Informe um número válido, com DDI e DDD.');
 if(/^https?:\/\//i.test(instagram)){
  let url:URL;try{url=new URL(instagram)}catch{throw new Error('Perfil do Instagram inválido.')}
  if(!['instagram.com','www.instagram.com'].includes(url.hostname)||url.username||url.password)throw new Error('Use um perfil do instagram.com.');
  const parts=url.pathname.split('/').filter(Boolean);
  if(parts.length!==1)throw new Error('Informe o link do perfil, não uma publicação.');
  instagram=parts[0];
 }else instagram=instagram.replace(/^@/,'');
 if(instagram&&!/^[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/.test(instagram))throw new Error('Usuário do Instagram inválido.');
 if(instagram.includes('..'))throw new Error('Usuário do Instagram inválido.');
 return {whatsapp,instagram};
}
