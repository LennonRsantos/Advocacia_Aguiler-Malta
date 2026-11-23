import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import advogadas from "@/assets/images/advogadas-foto2.webp";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Logo } from "@/components/Logo";
import { ShineBorder } from "@/components/magicui/ShineBorder";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links",
  description: `Canais oficiais do ${site.fullName}: WhatsApp, Instagram e site.`,
  alternates: { canonical: "/links" },
  // Página de bio: não compete com a home nos buscadores.
  robots: { index: false, follow: true },
};

// Linha secundária: preenchimento terracotta entra da esquerda no hover (texto base sobre terracotta: 5,2:1).
const rowClass =
  "group relative flex min-h-16 items-center gap-4 overflow-hidden px-5 text-left text-primary transition-colors duration-500 ease-soft hover:text-base before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-terracotta before:transition-transform before:duration-500 before:ease-soft hover:before:scale-x-100 active:before:bg-terracotta-deep";
const rowIconClass = "relative size-5 shrink-0 text-terracotta transition-colors duration-500 group-hover:text-base";
const rowArrowClass =
  "relative ml-auto size-4 shrink-0 text-primary/50 transition-[color,transform] duration-500 ease-soft group-hover:text-base";

export default function LinksPage() {
  const host = new URL(site.url).host.replace(/^www\./, "");
  const handle = `@${new URL(site.instagram).pathname.replaceAll("/", "")}`;

  return (
    <main id="conteudo" className="flex min-h-dvh flex-col items-center overflow-x-clip bg-base px-5">
      <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center py-10 text-center">
        {/* Miniatura do Hero: arco sand, contorno deslocado com brilho e as advogadas saindo do arco.
            Foto mais estreita que o arco para o contorno aparecer dos dois lados; a base dissolve no fundo da página. */}
        <div className="relative aspect-square w-80 max-w-full mask-[linear-gradient(to_bottom,#000_72%,transparent)]">
          <div aria-hidden="true" className="absolute inset-x-3 bottom-0 top-[24%] animate-fade rounded-t-full border border-accent/50 bg-sand" />
          <div
            aria-hidden="true"
            className="absolute inset-x-3 bottom-0 top-[24%] translate-x-3 -translate-y-3 animate-fade rounded-t-full border border-accent [animation-delay:200ms]"
          >
            <ShineBorder color="var(--color-terracotta)" />
          </div>
          <div className="absolute inset-x-9 inset-y-0">
            <Image
              src={advogadas}
              alt="Dra. Daiane Aguiler e Dra. Eduarda Gauterio Malta, sócias do escritório"
              fill
              preload
              sizes="16rem"
              className="animate-blur-fade object-cover object-top [animation-delay:300ms] filter-[sepia(0.12)_saturate(0.92)]"
            />
          </div>
        </div>

        <h1 className="-mt-2 animate-blur-fade text-primary [animation-delay:450ms] [&>span]:items-center">
          <Logo />
        </h1>
        <p className="mt-5 animate-blur-fade font-serif text-lg leading-snug text-primary [animation-delay:550ms]">
          Dra. Daiane Aguiler
          <br />
          Dra. Eduarda Gauterio Malta
        </p>
        <p className="mt-3 max-w-[30ch] animate-blur-fade text-sm leading-relaxed text-primary/70 [animation-delay:600ms]">
          Direito de Família, Penal, Sucessões, Civil e Trabalhista em Rio Grande/RS.
        </p>

        <nav aria-label="Canais do escritório" className="mt-9 w-full animate-blur-fade space-y-3 [animation-delay:700ms]">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-15 items-center justify-center gap-3 overflow-hidden bg-primary px-6 text-sm font-medium tracking-wide text-base transition-colors duration-300 hover:bg-terracotta active:bg-terracotta-deep"
          >
            {/* Shimmer Button (21st.dev / Magic UI) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-white/25 to-transparent motion-safe:animate-shimmer-sweep motion-reduce:hidden"
            />
            <WhatsAppIcon className="size-5 text-accent transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-base" />
            Agendar consulta pelo WhatsApp
            <span className="sr-only">(abre em nova aba)</span>
          </a>

          <ul className="divide-y divide-primary/15 border border-primary/15">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={rowClass}>
                <InstagramIcon className={rowIconClass} />
                <span className="relative flex flex-col">
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs opacity-70">{handle}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`${rowArrowClass} group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
            <li>
              <Link href="/" className={rowClass}>
                <Globe aria-hidden="true" strokeWidth={1.5} className={rowIconClass} />
                <span className="relative flex flex-col">
                  <span className="text-sm font-medium">Site do escritório</span>
                  <span className="text-xs opacity-70">{host}</span>
                </span>
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className={`${rowArrowClass} group-hover:translate-x-1`} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <footer className="animate-fade pb-8 text-center text-xs leading-relaxed text-primary/65 [animation-delay:900ms]">
        <p>{site.oab.daiane}</p>
        <p>{site.oab.eduarda}</p>
        <Link href="/politica-de-privacidade" className="mt-3 inline-block py-2 underline underline-offset-4 hover:text-terracotta">
          Política de Privacidade
        </Link>
      </footer>
    </main>
  );
}
