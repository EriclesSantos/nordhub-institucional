# Nördhub — Site institucional

**Site:** https://ericlessantos.github.io/nordhub-institucional/

Site institucional da Nördhub publicado a partir deste repositório no GitHub Pages, com React, TypeScript, Vite, Tailwind CSS e Motion. A versão pública funciona sem autenticação ou hospedagem do ChatGPT.

## Visual e interações

- Emblema original com perspectiva ao ponteiro, flutuação, rotação e iluminação na rolagem.
- Névoa nas entradas, digitação progressiva e LED percorrendo as bordas dos projetos.
- Menu fixo e menu mobile, filtros, detalhes dos projetos em diálogos e acesso à plataforma de gestão.
- Imagens, fontes, texturas e símbolos originais incluídos no projeto.
- Formulário que prepara e copia uma solicitação localmente, como na versão original. Ele não envia mensagens nem armazena dados em um servidor.

## Executar e validar

Use Node.js 24 e npm:

```bash
npm ci
npm run dev
```

O endereço local inclui `/nordhub-institucional/`. Para gerar a versão pública e conferir a compilação TypeScript:

```bash
npm run build
npm run preview
```

## Publicação automática

O workflow `.github/workflows/deploy-pages.yml` instala as dependências, valida o TypeScript, gera `dist/` e publica no GitHub Pages após cada push em `main`. Em **Settings → Pages**, a origem deve ser **GitHub Actions**. Falhas podem ser consultadas na aba **Actions**.

Os caminhos das imagens e fontes respeitam o subdiretório do repositório. Para publicar em outro repositório ou domínio, ajuste `base` em `vite.config.ts`, ou defina `SITE_BASE_PATH` no ambiente de build.

## Alterar os contatos

Edite `src/contacts.json` e faça um commit. `whatsapp` recebe somente o número internacional com DDI e DDD, sem espaços ou pontuação. `instagram` recebe o nome do perfil, sem `@`. Um campo vazio aparece como “Em breve”. A configuração inicial preserva o perfil `_nordhub` e o WhatsApp ainda não informado no código original.

## Código original e painel administrativo

`original-sites/` preserva uma cópia integral dos arquivos versionados do projeto original, no commit `6ee9faf6fb7b339e0fc4877e860f3b4069c186fb`. Ela fica fora da compilação do GitHub Pages e contém o painel `/admin/contatos`, a API e o esquema D1.

O GitHub Pages não executa esse backend. O painel original usa autenticação do ambiente ChatGPT/Sites e um segredo de servidor; ele não está ativo na publicação estática. Esta versão usa o arquivo de contatos do repositório. Para voltar a editar contatos por um painel online independente do ChatGPT, será necessário implementar autenticação e banco em um backend próprio. Nenhuma credencial ou conteúdo do banco foi incluído nesta cópia.

O botão Entrar continua encaminhando à plataforma de gestão existente. As prévias dos produtos continuam identificadas como interfaces conceituais.
