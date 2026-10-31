# Domínio principal e Google

Domínio desejado: **https://nordhub.app.br/**.

## Estado confirmado em 30/10/2026

- Domínio principal salvo nas configurações do GitHub Pages.
- Os quatro registros A da raiz e o CNAME de `www` abaixo foram salvos no Registro.br. Os servidores autoritativos já respondem com o novo apontamento.
- `api.nordhub.app.br` foi preservado como CNAME para `nordhub-api.onrender.com`.
- Página institucional aberta e validada em `http://nordhub.app.br/`.
- Propriedade `sc-domain:nordhub.app.br` verificada no Google Search Console por registro TXT. Mantenha o TXT `google-site-verification` na zona DNS para preservar essa verificação.
- Sitemap `https://nordhub.app.br/sitemap.xml` cadastrado no Google Search Console em 30/10/2026. O Google confirmou o envio e informou que processará o sitemap periodicamente; a primeira leitura retornou “Não foi possível buscar o sitemap”.
- Solicitação individual de indexação tentada e recusada. O teste em tempo real informou “Falha: Robots.txt inacessível” para o endereço HTTPS. O `robots.txt` foi conferido por HTTP com resposta 200 e rastreamento permitido.
- Certificado HTTPS ainda pendente de emissão pelo GitHub. A ativação de HTTPS foi tentada e a API respondeu “The certificate does not exist yet”. Após a liberação do certificado, ativar HTTPS e repetir a inspeção/solicitação de indexação. A solicitação recusada não está em uma fila de indexação.

## Conectar ao GitHub Pages

O DNS público consultado em 30/10/2026 usa o Registro.br. Na consulta, o registro A da raiz era `216.24.57.1` e o CNAME de `www` era `nordhub-web-beta.onrender.com`. Eles apontavam ao Render e precisam ser substituídos para que o site institucional se torne a página principal.

No GitHub, em **Settings → Pages → Custom domain**, configure `nordhub.app.br` antes de salvar o novo apontamento no Registro.br.

No Registro.br, na zona DNS avançada do domínio, configure:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | raiz / campo de nome vazio | 185.199.108.153 |
| A | raiz / campo de nome vazio | 185.199.109.153 |
| A | raiz / campo de nome vazio | 185.199.110.153 |
| A | raiz / campo de nome vazio | 185.199.111.153 |
| CNAME | www | ericlessantos.github.io |

Na raiz, esses quatro registros A substituem o apontamento anterior `216.24.57.1`. Em `www`, o CNAME acima substitui `nordhub-web-beta.onrender.com`. Os demais registros e subdomínios não precisam ser alterados. O botão de entrada da Gestão continua apontando a `https://nordhub-web-beta.onrender.com/`.

Após a propagação, confirme que a raiz e `www` chegam ao site institucional. Aguarde o certificado do GitHub Pages e ative **Enforce HTTPS** quando disponível. O endereço principal escolhido é a versão sem `www`.

O arquivo `public/CNAME` registra o domínio desejado no código; em publicações por GitHub Actions, a configuração do domínio também precisa estar salva em Settings → Pages.

## Solicitar a indexação

1. Entre no Google Search Console com a conta que administrará o site.
2. Adicione a propriedade de domínio `nordhub.app.br`.
3. Copie o registro TXT de verificação fornecido pelo Google para a raiz da zona DNS no Registro.br e conclua a verificação.
4. Em **Sitemaps**, envie `https://nordhub.app.br/sitemap.xml`.
5. Em **Inspeção de URL**, inspecione `https://nordhub.app.br/` e solicite a indexação.

O Google decide se e quando a página entra nos resultados. A solicitação não garante inclusão imediata nem primeira posição.

## Referências

- [Domínio próprio no GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Solicitar rastreamento ao Google](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
