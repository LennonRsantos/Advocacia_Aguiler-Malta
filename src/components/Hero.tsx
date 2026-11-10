import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { whatsappLink } from "@/lib/site";
import advogadas from "@/assets/images/advogadas-foto2.webp";
import logoAM from "@/assets/images/logo-am.webp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { CompassIcon, LinkedRingsIcon, ListeningIcon, NibIcon, SealedLetterIcon } from "./icons/PillarIcons";
import { AnimatedShinyText } from "./magicui/AnimatedShinyText";
import { ShineBorder } from "./magicui/ShineBorder";
import "./hero-marquee.css";

const commitments = [
  { title: "Escuta atenta", text: "Cada história é compreendida antes de qualquer orientação.", icon: ListeningIcon },
  { title: "Linguagem clara", text: "Etapas, prazos e possibilidades explicados sem juridiquês.", icon: NibIcon },
  { title: "Sigilo profissional", text: "Discrição em todas as conversas e documentos.", icon: SealedLetterIcon },
  { title: "Estratégia sob medida", text: "Cada caso recebe um plano próprio, do acordo à via judicial.", icon: CompassIcon },
  { title: "Acompanhamento próximo", text: "Você sabe o que acontece em cada etapa do processo.", icon: LinkedRingsIcon },
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-base pt-18">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7 xl:pr-6">
          <span aria-hidden="true" className="mb-8 block h-px w-12 animate-fade bg-terracotta" />
          <h1
            id="hero-title"
            className="max-w-[15em] text-[clamp(2.1rem,1.2rem+3.4vw,3.65rem)] lg:text-[clamp(2.6rem,0.6rem+3.5vw,3.65rem)] font-light leading-[1.14] tracking-[-0.012em] [word-spacing:0.03em] text-primary"
          >
            <span className="block animate-blur-fade">Sensibilidade para ouvir.</span>{" "}
            {/* font-semibold explícito: o bolder padrão sobre peso 300 só chega a 400; 600 marca a ênfase. */}
            <strong className="mt-1 block animate-blur-fade font-semibold [animation-delay:180ms]">
              <AnimatedShinyText className="[animation-delay:1.6s]">
                Firmeza para proteger sua família e seu patrimônio.
              </AnimatedShinyText>
            </strong>
          </h1>
          <p
            className="mt-8 max-w-lg animate-rise text-[1.0625rem] leading-[1.7] text-primary/80 sm:text-lg [animation-delay:320ms]"
          >
            Especialistas em Direito de Família, Divórcios, Pensão Alimentícia e Inventários.
          </p>
          <div className="mt-10 flex animate-rise flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9 [animation-delay:440ms]">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-8 text-sm font-medium tracking-wide text-base transition-colors duration-300 hover:bg-terracotta active:bg-terracotta-deep sm:whitespace-nowrap"
            >
              <WhatsAppIcon className="size-4.5 text-accent transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-base" />
              Agendar Consulta via WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <a
              href="#areas"
              className="group inline-flex items-center gap-2.5 self-start py-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-terracotta sm:self-auto"
            >
              <span className="underline decoration-accent decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-terracotta">
                Conhecer as áreas de atuação
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 ease-soft group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>

        {/* Arco começa a 20% da altura: as cabeças passam da linha do arco. Centro do arco = 20% + metade da largura = 60% da altura. */}
        <div className="relative mx-auto aspect-4/5 w-full max-w-104 sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[20%] animate-fade rounded-t-full border border-accent/50 bg-sand" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-[20%] translate-x-4 -translate-y-4 rounded-t-full border border-accent sm:translate-x-5 sm:-translate-y-5"
          >
            <ShineBorder color="var(--color-terracotta)" />
          </div>
          {/* Anel do logo fica a 47% da altura da imagem: ancorado no centro do arco, os dois círculos ficam concêntricos.
              O clip corta só o que passaria da base, onde as fotos terminam. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 [clip-path:inset(-60%_-60%_0_-60%)]">
            <Image
              src={logoAM}
              alt=""
              sizes="(min-width: 1024px) 62vw, 153vw"
              className="absolute left-1/2 top-[60%] h-auto w-[143%] max-w-none -translate-x-1/2 translate-y-[-47%] animate-fade opacity-45 [animation-delay:150ms] sm:w-[153%]"
            />
          </div>
          <Image
            src={advogadas}
            alt="As advogadas Aguiler e Malta, sócias do escritório"
            fill
            preload
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
            // Escala a partir das cabeças (14%) mantém o alinhamento com o arco; o clip corta o excesso abaixo da base (0,14 + 0,86/1,08).
            className="z-10 origin-[50%_14%] scale-[1.08] animate-rise object-contain object-bottom [animation-delay:300ms] [clip-path:inset(0_0_6.4%_0)] filter-[sepia(0.12)_saturate(0.92)_drop-shadow(0_16px_24px_rgb(46_30_20/0.18))]"
          />
        </div>
      </div>

      {/* Bordas esmaecidas indicam que a faixa continua; pausa no hover para leitura. Sem animação: rolagem manual. */}
      <div className="relative overflow-hidden border-t border-primary/15 py-10 mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
        <div className="hero-marquee flex w-max">
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined} className={`flex ${copy ? "motion-reduce:hidden" : ""}`}>
              {commitments.map(({ title, text, icon: Icon }) => (
                <li
                  key={title}
                  className="flex w-76 shrink-0 gap-4 border-l border-primary/15 px-6 sm:w-88 lg:gap-5 lg:px-10"
                >
                  <Icon className="mt-0.5 size-8 shrink-0 text-terracotta" />
                  <div>
                    <p className="font-serif text-xl text-primary">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-primary/75">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
