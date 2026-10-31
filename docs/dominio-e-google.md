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

### Diagnóstico atualizado do bloqueio de indexação

No novo teste em tempo real do Search Console, em **30/10/2026 às 22:55 (Brasília)**, a busca da página HTTPS retornou **“Falha: Certificado SSL do servidor inválido”**. O rastreamento aparece como permitido; a permissão de indexação e a URL canônica ficam como N/D porque o Google não conseguiu obter a página. A mensagem “O URL só será indexado se certas condições forem atendidas” é um aviso geral da ferramenta; o erro concreto deste teste é o certificado SSL.

As verificações realizadas nesta revisão confirmaram:

- DNS autoritativo e Google Public DNS: os quatro registros A corretos do GitHub Pages e `www` como CNAME de `ericlessantos.github.io`.
- Consulta pública da raiz: nenhum registro AAAA ou CAA. Não foi identificado apontamento IPv6 conflitante nem restrição CAA na raiz.
- HTTP: página principal, `robots.txt` e `sitemap.xml` retornam 200. O robots permite `/`, e os três endereços não retornam cabeçalho `X-Robots-Tag` de bloqueio.
- Código da página: metadado robots `index, follow, max-image-preview:large` e canonical `https://nordhub.app.br/`.
- HTTPS: a validação normal de TLS falha por incompatibilidade entre o certificado apresentado e o domínio, tanto na raiz quanto em `www`.
- GitHub Pages: domínio salvo, `https_certificate: null`, HTTPS obrigatório desativado e painel mostrando “DNS Check in Progress”. A verificação interna de saúde do GitHub ainda não reconhece o atendimento pelo Pages, embora o HTTP público já responda com servidor `GitHub.com`; a causa dessa divergência não foi confirmada.

O domínio já foi removido e recolocado uma vez para reiniciar a emissão, conforme a orientação do GitHub. Evite repetir essa operação enquanto a verificação estiver em andamento, pois ela reinicia o processo. Não é necessário bloquear/desbloquear o robots nem mudar o canonical para HTTP.

Para concluir após a emissão: verificar HTTPS válido na raiz e em `www`, ativar **Enforce HTTPS**, conferir `https://nordhub.app.br/robots.txt` e `/sitemap.xml` com resposta 200, repetir o teste ao vivo do Google e solicitar indexação quando o teste permitir. A inclusão efetiva na busca depende do processamento do Google e não é garantida pela solicitação.

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
