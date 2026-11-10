# Design System — Aguiler & Malta

Identidade visual sóbria, acolhedora e editorial: tons de areia e café, tipografia serifada de alto contraste e um único acento terracota. A fonte da verdade é [`src/app/globals.css`](src/app/globals.css); este documento explica como usar cada token.

## Princípios

1. **Acolhimento com firmeza** — paleta quente e neutra; contraste forte só onde importa.
2. **Um acento só** — a terracota marca ícones, linhas, hovers e destaques. Nada compete com ela.
3. **Clareza antes de ornamento** — textos curtos, hierarquia tipográfica clara, muito respiro.
4. **Movimento discreto** — animações suaves de entrada; tudo desliga com `prefers-reduced-motion`.
5. **Acessível por padrão** — contraste AA, foco visível, alvos de toque ≥ 44px.

## Cores

### Tokens principais (não alterar)

| Token | Hex | Uso |
| --- | --- | --- |
| `base` | `#e8dcd1` | Fundo padrão da página, `theme-color` |
| `primary` | `#402a1d` | Texto principal, botões primários, seções escuras |
| `accent` | `#bea491` | Bordas, sublinhados, ícones sobre fundo escuro, seleção de texto |
| `white` | `#ffffff` | Superfícies elevadas, texto sobre `primary` |

### Variações complementares

| Token | Hex | Uso |
| --- | --- | --- |
| `sand` | `#f3ece5` | Superfície clara entre `base` e `white` (cards, arco do Hero) |
| `bronze` | `#6f5544` | `accent` escurecido para texto sobre fundo claro (contraste 5:1); cor do foco |
| `espresso` | `#2e1e14` | `primary` aprofundado, usado no rodapé |
| `terracotta` | `#8b4a34` | Cor de assinatura: ícones, linhas, hovers (5,2:1 sobre `base`) |
| `terracotta-deep` | `#6f3a28` | Estado hover/pressed da terracota |

**Regras**

- Não usar `terracotta` sobre `primary` ou `espresso`; em fundo escuro, use `accent`.
- Texto secundário sobre fundo claro: `text-primary/80` ou `text-bronze`, nunca `accent`.
- Seções escuras recebem a classe `.on-dark` para trocar a cor do anel de foco para `accent`.

Uso no Tailwind: `bg-base`, `text-primary`, `border-accent/50`, `hover:bg-terracotta` etc.

## Tipografia

| Papel | Fonte | Token | Aplicação |
| --- | --- | --- | --- |
| Títulos | Noto Serif Display | `font-serif` | `h1`, `h2`, `h3` (aplicado na camada base) |
| Texto e UI | Montserrat | `font-sans` | Corpo, botões, navegação |

Carregadas via `next/font/google` com `display: swap`. Fallbacks: Georgia/Times New Roman e `system-ui`.

**Escala de referência**

| Elemento | Tamanho | Peso | Entrelinha |
| --- | --- | --- | --- |
| H1 (Hero) | `clamp(2.1rem, 1.2rem + 3.4vw, 3.65rem)` | 300, ênfase 600 | 1.14, `tracking-[-0.012em]` |
| Corpo destaque | `1.0625rem` → `text-lg` | 400 | 1.7 |
| Botões | `text-sm` | 500 | `tracking-wide` |

- Títulos usam `text-wrap: balance`; parágrafos, `text-wrap: pretty`.
- Ênfase no título: peso leve (300) contrastado com `font-semibold` (600) — não usar o `bolder` padrão.

## Espaçamento e layout

- **Container:** `mx-auto max-w-7xl`, com gutter `px-5` → `sm:px-8` → `lg:px-12`.
- **Grid:** 12 colunas no desktop (`lg:grid-cols-12`); coluna única no mobile.
- **Ritmo vertical das seções:** `pb-16` → `lg:pb-24`; âncoras com `scroll-margin-top: 5rem` para compensar o header fixo.
- **Raio:** o sistema é majoritariamente reto (botões e cards sem cantos arredondados). A curva aparece como elemento de marca: o arco `rounded-t-full` atrás das fotos.
- **Linhas finas:** filetes `h-px` em `terracotta` ou bordas `border-accent` substituem sombras.

## Componentes

### Botão primário

Fundo `primary`, texto `base`, altura mínima `min-h-13`, `px-8`, sem raio.
Hover: `bg-terracotta`; ativo: `bg-terracotta-deep`; transição de cor 300ms.

```tsx
<a className="inline-flex min-h-13 items-center gap-3 bg-primary px-8 text-sm font-medium tracking-wide text-base transition-colors duration-300 hover:bg-terracotta active:bg-terracotta-deep">
  Agendar Consulta via WhatsApp
</a>
```

### Link de texto (secundário)

Texto `primary` com sublinhado `decoration-accent` (offset 6px). Hover muda texto e sublinhado para `terracotta`; ícone de seta desliza `translate-x-1`.

### Cards de área de atuação

Ícone em `terracotta`, título serifado, link "saiba mais" sublinhado em `accent`.
Hover: fundo `primary` preenche o card a partir do canto inferior esquerdo (`clip-path: circle()`, 1,4s `ease-soft`), um filete `terracotta` cresce no topo e textos/ícones passam a `white`/`accent`.

### Acordeão (FAQ)

Componente `Accordion` acessível (botão com `aria-expanded`), divisores finos em `accent`.

### Botão flutuante de WhatsApp

`WhatsAppButton`: fixo no canto inferior direito (respeita `safe-area-inset`), abre `wa.me` em nova aba com aviso `sr-only`.

### Banner de cookies

`CookieConsent`: salva a escolha em `localStorage` (com fallback em memória) e dispara o evento `cookie-consent`.

### Ícones

- Lucide React com `strokeWidth={1.5}` para combinar com o traço fino da tipografia.
- Ícones próprios em `components/icons/PillarIcons.tsx` (escuta, pena, carta selada, bússola, anéis).
- Decorativos sempre com `aria-hidden="true"`.

## Movimento

| Token | Definição | Uso |
| --- | --- | --- |
| `ease-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Curva padrão de todas as transições |
| `animate-rise` | sobe 18px + fade, 0.9s | Parágrafos e CTAs |
| `animate-fade` | fade, 1.2s | Elementos decorativos |
| `animate-blur-fade` | desfoque 10px + sobe 14px, 1s | Linhas do título |
| `animate-shiny-text` | reflexo de luz, 9s em loop | Frase de ênfase do Hero |
| `animate-shine` | brilho percorrendo a borda, 14s | Contorno do arco (`ShineBorder`) |

- Encadear entradas com `[animation-delay:180ms]`, `320ms`, `440ms`…
- Hovers: 300ms para cor, 500ms para deslocamento.
- `prefers-reduced-motion: reduce` zera animações, transições e o scroll suave.

## Acessibilidade

- Foco visível global: contorno 2px `bronze`, offset 3px (`accent` em `.on-dark`).
- Seleção de texto: fundo `accent`, texto `primary`.
- Links externos com `rel="noopener noreferrer"` e aviso `(abre em nova aba)` para leitores de tela.
- Seções com `aria-labelledby` apontando para o título.
- Contraste mínimo 4,5:1 para texto; tokens `bronze` e `terracotta` foram escolhidos para isso.
