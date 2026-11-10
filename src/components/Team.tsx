import daiane from "../../public/img/Daiane.jpeg";
import Malta from "@/assets/images/malta.jpg";
import { CircularTestimonials, type Testimonial } from "@/components/ui/circular-testimonials";
import { site } from "@/lib/site";

// Dados provisórios: substituir pelos nomes, OAB, bios e fotos reais.
const team: Testimonial[] = [
  {
    name: "Dra. Daiane Aguiler",
    designation: `Sócia fundadora · ${site.oab.daiane}`,
    quote:
      "Dedica-se à advocacia criminal, atuando na defesa de seus clientes desde a fase investigativa até o julgamento, com compromisso com a ampla defesa, atuação estratégica e acompanhamento atento de cada etapa processual. Sua prática é pautada pela firmeza técnica, responsabilidade e busca pela garantia dos direitos e das liberdades individuais.",
    src: daiane,
  },
  {
    name: "Dra. Eduarda Gauterio Malta",
    designation: `Sócia fundadora · ${site.oab.eduarda}`,
    quote:
      "Atua nas áreas do Direito Civil, Família e Sucessões, com foco na resolução de conflitos, proteção patrimonial e defesa dos direitos individuais e familiares. Conduz cada demanda com responsabilidade, estratégia e atenção às particularidades de cada caso, aliando conhecimento jurídico, atendimento humanizado e atuação firme.",
    src: Malta,
  },
];

export function Team() {
  return (
    <section
      id="equipe"
      aria-labelledby="equipe-title"
      className="relative overflow-hidden bg-sand py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <h2
          id="equipe-title"
          className="text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-primary"
        >
          Nossa Equipe
        </h2>
        <p className="mt-6 max-w-2xl font-serif text-xl leading-snug text-bronze sm:text-2xl">
          Conheça as advogadas que acompanham cada caso de perto.
        </p>
        <div className="mt-24 flex justify-center">
          <CircularTestimonials testimonials={team} />
        </div>
      </div>
    </section>
  );
}
