import Image from "next/image";
import sociais from "../../public/img/malta e aguiler.jpeg";
import { site } from "@/lib/site";
import { Accordion } from "./Accordion";

const principles = [
  {
    question: "Ética",
    answer: "Atuação pautada pelo Estatuto da Advocacia e pelo Código de Ética e Disciplina da OAB.",
  },
  {
    question: "Transparência",
    answer: "Informação clara sobre etapas, prazos, riscos e custos envolvidos em cada caso.",
  },
  {
    question: "Responsabilidade",
    answer: "Cuidado técnico em cada documento e sigilo sobre tudo o que nos é confiado.",
  },
];

const lawyers = [
  { name: "Dra. Daiane Aguiler", oab: site.oab.daiane },
  { name: "Dra. Eduarda Gautério Malta", oab: site.oab.malta },
];

export function About() {
  return (
    <section
      id="quem-somos"
      aria-labelledby="sobre-title"
      className="on-dark relative overflow-hidden bg-primary py-20 text-base sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5">
          <h2
            id="sobre-title"
            className="text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-white"
          >
            Quem Somos
          </h2>
          <p className="mt-6 font-serif text-xl leading-snug text-accent sm:text-2xl">
            Um escritório conduzido por advogadas, onde a técnica jurídica caminha junto com a escuta.
          </p>

          <figure className="mt-12">
            <div className="relative mx-auto w-4/5 sm:w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-4 translate-y-4 border border-accent/50 sm:-translate-x-5 sm:translate-y-5"
              />
              <div className="relative aspect-4/5 overflow-hidden bg-espresso">
                <Image
                  src={sociais}
                  alt="Advogadas Aguiler e Malta lado a lado no escritório"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_25%] filter-[sepia(0.22)_saturate(0.75)]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-primary/15 mix-blend-multiply" />
              </div>
            </div>
            <figcaption className="mt-12 grid gap-5 sm:grid-cols-2">
              {lawyers.map((l) => (
                <div key={l.name} className="border-l border-accent/60 pl-4">
                  <p className="font-serif font-semibold text-lg text-white">{l.name}</p>
                  <p className="mt-1 text-xs font-medium tracking-wide text-accent">{l.oab}</p>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <div className="space-y-5 leading-relaxed text-base/85">
            <p>
              O {site.fullName} atua em Direito de Família, Penal, Sucessões, Civil e Trabalhista, com dedicação
              especial às questões familiares e à defesa criminal. Acreditamos que cada demanda jurídica envolve, antes de
              tudo, pessoas e histórias.
            </p>
            <p>
              Muitas dessas situações chegam em momentos delicados. Por isso, o atendimento começa pela escuta:
              compreender o contexto, explicar cada etapa com clareza e construir, junto com você, o caminho jurídico
              mais adequado para o seu caso.
            </p>
          </div>

          <div className="mt-12">
            <Accordion items={principles} tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
