# Único, amado e aprovado — Landing Page

Landing page do devocional **"Único, amado e aprovado"**, um livro com 30 mensagens para adolescentes e jovens, escrito por Alysson Bruno F. Barros e Christiane Fernanda N. Barros.

A página apresenta o livro, seus autores e o propósito da obra, com um visual jovem e vibrante, e direciona o visitante para a compra.

**Demo:** https://devocional-page.vercel.app

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [@paper-design/shaders-react](https://github.com/paper-design/shaders) — textura de papel animada no hero
- CSS puro com design tokens (sem framework de UI)

## Como rodar

Pré-requisitos: Node.js `^20.19` ou `>=22.12` (exigência do Vite 8) e npm.

```bash
# instalar dependências
npm install

# servidor de desenvolvimento (http://localhost:5173)
npm run dev

# build de produção (typecheck + bundle)
npm run build

# pré-visualizar o build
npm run preview

# lint
npm run lint
```

## Estrutura

```
public/
  assets/              Imagens, mockups e adesivos (servidos em /assets/...)
src/
  sections/            Seções da página (Nav, Hero, Divisor, Skyline, ParaQuem,
                       Frase, Sobre, Autores, Comprar)
  components/
    reactbits/         Componentes animados (ScrollExpand, TextLoop)
    ui/                Componente de efeito ASCII (Asciify)
    Stickers.tsx       Adesivos com parallax
    Ux.tsx             Barra de progresso de leitura
  content.ts           Textos, preços e links da página
  config.ts            Configurações pontuais (imagem de fundo do hero)
  index.css            Tokens de design, layout e estilos das seções
  App.tsx              Composição das seções
```

## Personalização

### Textos e informações

Praticamente todo o conteúdo está centralizado em `src/content.ts`: título, subtítulo do hero, textos de cada seção, nomes dos autores, preço e link de compra. Altere ali sem tocar nos componentes.

### Link de compra

O botão de compra usa `CHECKOUT_URL` em `src/content.ts`. Enquanto estiver vazio, os CTAs levam para a âncora `#comprar` da própria página. Para ativar o checkout externo, basta preencher:

```ts
export const CHECKOUT_URL = "https://loja.exemplo.com/produto";
```

### Imagens

As imagens ficam em `public/assets/` e são referenciadas no código com o caminho absoluto `/assets/nome-do-arquivo`. **Não** use `../../public/assets/...` nem `/public/assets/...` — no Vite, tudo em `public/` é servido a partir da raiz, então esses caminhos resultam em 404.

Para trocar a arte de fundo do hero, defina `HERO_BG` em `src/config.ts`; vazio usa apenas a textura de papel.

## Deploy

O projeto está publicado na [Vercel](https://vercel.com/) como site estático gerado pelo Vite.

Configuração do projeto na Vercel:

- **Build Command:** `vite build` (a Vercel detecta o framework automaticamente)
- **Output Directory:** `dist`

Deploy manual via CLI:

```bash
npm i -g vercel
vercel --prod
```

Para deploy automático a cada push, conecte o repositório do GitHub pela integração da Vercel (Project → Settings → Git).

## Observações

- `npm run build` executa o typecheck (`tsc -b`) antes do bundle. Mantenha-o passando para evitar erros silenciosos no deploy.
- `npm run lint` ainda acusa avisos no componente vendorizado `src/components/ui/asciify-react.tsx` (código de terceiros).
- As imagens em `public/assets/` somam cerca de 10 MB. Converter os PNGs grandes para WebP melhora bastante o carregamento em conexões móveis.

## Licença

Uso pessoal do projeto. Os textos e as imagens do livro pertencem aos seus autores.