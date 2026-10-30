# Nördhub Studio

Site institucional da Nördhub, com React, TypeScript, Vite/Vinext, Tailwind CSS, Three.js, React Three Fiber, GSAP e Motion.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

```bash
pnpm exec tsc --noEmit
pnpm build
```

## Conteúdo e comportamento

- Seções: início, produtos, serviços, projetos, sobre e contato.
- Martelo 3D em três quartos, com corpo sólido, bordas chanfradas, circuitos metálicos planos e interação sutil com o ponteiro.
- Neon roxo percorre as bordas; circuitos ciano e roxos se iluminam progressivamente com a rolagem no início e na seção Sobre.
- Logos frontais seguem a imagem aprovada, sem inclinação.
- Animações de entrada e rolagem; respeita a preferência por movimento reduzido.
- Portfólio filtrável com detalhes em diálogos acessíveis.
- Interfaces dos produtos são demonstrações conceituais, identificadas na página.
- Status dos projetos identificados; sem depoimentos ou métricas comerciais inventadas.
- Links de login apontam para a tela ativa e verificada em `https://nordhub-web-beta.onrender.com/`. O subdomínio planejado `app.nordhub.app.br` não respondeu no teste desta atualização.
- O formulário prepara um briefing local e permite copiá-lo. Não envia nem armazena informações em servidor. Integrar um canal comercial antes do lançamento público.
- Marca frontal: arte transparente aprovada em WebP. O favicon e a geometria 3D usam uma construção vetorial frontal simétrica do símbolo.
- Preferência por movimento reduzido interrompe o percurso do neon e os movimentos do modelo. A renderização pausa quando o modelo sai da área visível.

A hospedagem gerenciada preserva seu próprio adaptador. A publicação no domínio `nordhub.app.br` requer configuração do domínio; esta versão não altera DNS.

## Identidade visual e contatos

A página usa cenário original de fantasia nórdica, texturas de pergaminho lavanda, divisões irregulares e tipografia editorial, com a paleta roxa/ciano da Nördhub. A faixa de ferramentas foi removida e o copyright foi centralizado.

O rodapé mostra WhatsApp e Instagram. A administração em `/admin/contatos` persiste os contatos em D1 e os publica para todos os visitantes. O acesso de escrita exige a identidade ChatGPT cujo e-mail corresponde ao segredo de ambiente `NORDHUB_ADMIN_EMAIL`; a verificação ocorre no servidor. Campos vazios são exibidos como “Em breve”. Nenhum número ou perfil comercial foi inventado.

A tabela `site_contacts` é criada pela migração em `drizzle/`. Os links aceitam somente números internacionais e perfis oficiais do Instagram.

O martelo tem detecção de WebGL e uma alternativa visual otimizada em três quartos. A página continua acessível quando o dispositivo não oferece aceleração 3D, preservando o brilho e a animação de passagem de luz.

## Navegação e apresentação dos produtos

Menu fixo durante a rolagem. O botão Entrar apresenta a Nördhub Gestão antes de encaminhar para `https://nordhub-web-beta.onrender.com/`, endereço ativo verificado na tela de login. O destino fica centralizado em `app/product-access.tsx` para atualização quando o subdomínio definitivo estiver disponível. O login e senha continuam sendo tratados pela plataforma de gestão. O mesmo acesso aparece no produto, no rodapé e nos detalhes.

Informações entram com um efeito de névoa (desfoque, nuvens suaves, transparência e deslocamento), acionado pela rolagem. Cada entrada ocorre uma vez por visita, respeitando a preferência por movimento reduzido. Textos informativos, rótulos e navegação receberam tamanhos maiores; as miniaturas conceituais preservam sua escala.
