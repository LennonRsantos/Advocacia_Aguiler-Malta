# Aguiler & Malta Advocacia — Landing Page

Landing page institucional do escritório **Aguiler & Malta Advocacia** (Rio Grande/RS), conduzido pelas advogadas Daiane Aguiler e Eduarda Malta. O site apresenta o escritório, as áreas de atuação e a equipe, e leva o visitante ao contato por WhatsApp ou formulário.

> Guia visual completo (cores, tipografia, componentes, animações): [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

## Destaques

- **Áreas de atuação:** Direito de Família, Penal, Sucessões, Civil e Trabalhista.
- **Contato direto:** botão flutuante e CTAs para WhatsApp (link `wa.me`, sem expor o número em texto) e formulário via Web3Forms.
- **SEO:** metadados, Open Graph, JSON-LD `LegalService`, `robots.txt` e `sitemap.xml` gerados pelo Next.js.
- **LGPD:** banner de consentimento de cookies e página de Política de Privacidade.
- **Acessibilidade:** HTML semântico, foco visível, contraste AA, textos para leitores de tela e respeito a `prefers-reduced-motion`.
- **Segurança:** cabeçalhos HTTP (`X-Frame-Options`, `nosniff`, CSP parcial, `Permissions-Policy`).

## Tecnologias

| Camada | Ferramenta |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS 4 (tokens via `@theme`) |
| Animação | Framer Motion + keyframes CSS (efeitos adaptados do Magic UI) |
| Ícones | Lucide React + ícones SVG próprios |
| Formulário | Web3Forms |

## Seções da página

1. **Header** — navegação fixa com âncoras.
2. **Hero** — chamada principal, CTA de WhatsApp e foto das advogadas em arco.
3. **Áreas de Atuação** — cards por especialidade.
4. **Quem Somos** — história e apresentação das sócias.
5. **Nossa Equipe** — apresentação da equipe em carrossel circular.
6. **FAQ** — perguntas frequentes em acordeão.
7. **Contato** — dados do escritório e formulário.
8. **Footer** — OAB, endereço, horário e links legais.

## Como rodar

Requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # build de produção
npm run start       # servir o build
npm run lint
npm run typecheck
```

Os scripts chamam `node node_modules/...` diretamente porque o `&` no nome da pasta quebra os atalhos de `node_modules/.bin` no Windows.

### Variáveis de ambiente

Crie um `.env.local` (não versionado):

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=sua-chave-publica-web3forms
```

Sem essa chave o formulário de contato falha em produção (o build emite um aviso).

## Estrutura

```
src/
  app/
    layout.tsx                  fontes, metadados, JSON-LD, banner de cookies
    page.tsx                    composição das seções
    globals.css                 tokens do design system e estilos base
    politica-de-privacidade/    página da política de privacidade
    robots.ts, sitemap.ts       SEO
  components/                   Header, Hero, PracticeAreas, About, Team, Faq,
                                Accordion, Contact, ContactForm, Footer,
                                WhatsAppButton, CookieConsent, Logo
    icons/                      ícones SVG próprios (pilares, WhatsApp)
    magicui/                    AnimatedShinyText, ShineBorder
    ui/                         carrossel circular de depoimentos
  assets/images/                fotos e logo otimizados (.webp)
  lib/site.ts                   dados do escritório, navegação e link do WhatsApp
```

## Personalização

- **Dados do escritório** (WhatsApp, e-mail, endereço, horário, OAB, URL): `src/lib/site.ts` — fonte única, usada em todo o site.
- **Advogadas:** `src/components/About.tsx` (`lawyers`).
- **Equipe:** `src/components/Team.tsx` ainda contém dados provisórios.
- **Política de privacidade:** `src/app/politica-de-privacidade/page.tsx` traz texto-base a ser revisado pelas advogadas.
- **Publicidade OAB:** o subtítulo do Hero usa "Especialistas em…". Pelo Provimento 205/2021 do CFOAB, o termo deve corresponder a títulos de especialização obtidos; caso contrário, prefira "Atuação em…".

## Licença

Projeto privado do escritório Aguiler & Malta Advocacia. Efeitos visuais adaptados do [Magic UI](https://magicui.design) (licença MIT).
