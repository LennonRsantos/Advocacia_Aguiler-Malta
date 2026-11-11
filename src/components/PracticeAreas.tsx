import {
  ArrowUpRight,
  Briefcase,
  FileSignature,
  HeartHandshake,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";

type Area = {
  title: string;
  icon: LucideIcon;
  description: string;
  topics: string[];
  featured?: boolean;
};

const areas: Area[] = [
  {
    title: "Direito de Família",
    icon: HeartHandshake,
    featured: true,
    description:
      "Condução cuidadosa de questões familiares, buscando soluções equilibradas e, sempre que possível, construídas em consenso.",
    topics: ["Divórcio", "Guarda", "Pensão alimentícia", "União estável", "Partilha de bens", "Regulamentação de convivência"],
  },
  {
    title: "Direito Penal",
    icon: ShieldCheck,
    featured: true,
    description:
      "Defesa técnica e acompanhamento jurídico ao longo do procedimento criminal, desde a investigação até os recursos.",
    topics: ["Inquérito policial", "Prisão em flagrante", "Audiência de custódia", "Habeas corpus", "Defesa em ação penal", "Recursos"],
  },
  {
    title: "Direito das Sucessões",
    icon: ScrollText,
    description:
      "Organização da transmissão do patrimônio com segurança jurídica, no inventário ou no planejamento feito em vida.",
    topics: ["Inventário judicial", "Inventário extrajudicial", "Testamentos", "Planejamento sucessório", "Partilha de herança"],
  },
  {
    title: "Direito Civil",
    icon: FileSignature,
    description: "Assessoria em relações civis e patrimoniais, da análise de contratos à reparação de danos.",
    topics: ["Contratos", "Indenizações", "Responsabilidade civil", "Cobranças", "Direito de vizinhança"],
  },
  {
    title: "Direito Trabalhista",
    icon: Briefcase,
    description:
      "Orientação sobre direitos e deveres nas relações de trabalho, com análise de vínculo e verbas antes de qualquer decisão.",
    topics: ["Reclamação trabalhista", "Verbas rescisórias", "Horas extras", "Reconhecimento de vínculo", "Assédio moral"],
  },
];

// Base comum aos dois formatos de card: mesma superfície, borda, profundidade e hover.
// isolate: o FillLayer (-z-10) pinta acima do bg-white do card e abaixo do conteúdo.
const cardBase =
  "group relative isolate flex w-[85%] shrink-0 snap-center flex-col md:w-auto overflow-hidden border border-primary/8 bg-white shadow-[0_1px_2px_rgb(64_42_29/0.04)] transition-[border-color,box-shadow,transform] duration-500 ease-soft hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-32px_rgb(64_42_29/0.45)]";

// Cores acompanham a inundação; terracota não tem contraste sobre primary, vira accent.
const fade = "transition-colors duration-1400 ease-soft";

// Efeito color-fill (adaptado do ColorFillCard, 21st.dev): círculo primary cresce do canto inferior esquerdo.
function FillLayer() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-primary transition-[clip-path] duration-1400 ease-soft [clip-path:circle(0%_at_0%_100%)] group-hover:[clip-path:circle(142%_at_0%_100%)]"
    />
  );
}

// Fio terracota no topo: segmento fixo + traço que se estende no hover (transform, sem reflow).
function TopRule() {
  return (
    <>
      <span aria-hidden="true" className={`absolute -left-px -top-px h-px w-12 bg-terracotta group-hover:bg-accent ${fade}`} />
      <span
        aria-hidden="true"
        className="absolute -inset-x-px -top-px h-px origin-left scale-x-0 bg-terracotta transition-[transform,background-color] duration-700 ease-soft group-hover:scale-x-100 group-hover:bg-accent"
      />
    </>
  );
}

function CardHeader({ area, index, large = false }: { area: Area; index: number; large?: boolean }) {
  const Icon = area.icon;
  return (
    <div className="flex items-start justify-between">
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border border-accent/60 text-terracotta ${fade} group-hover:border-accent/60 group-hover:bg-white/5 group-hover:text-accent ${
          large ? "size-14" : "size-12"
        }`}
      >
        <Icon aria-hidden="true" className="size-5.5" strokeWidth={1.25} />
      </span>
      <span
        aria-hidden="true"
        className={`text-sm font-medium tabular-nums tracking-[0.18em] text-primary/35 group-hover:text-white/40 ${fade}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

// CTA no rodapé do card: mt-auto encosta no fundo quando o card estica na linha do grid.
function CardCta({ area, className = "" }: { area: Area; className?: string }) {
  return (
    <div className={`mt-auto pt-6 ${className}`}>
      <a
        href={whatsappLink(`Olá! Gostaria de conversar sobre uma questão de ${area.title}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary underline decoration-accent decoration-1 underline-offset-[6px] transition-[color,text-decoration-color] duration-700 ease-soft group-hover:text-white hover:decoration-sand group-hover:focus-visible:outline-accent"
      >
        Conversar sobre {area.title}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-terracotta transition-[transform,color] duration-300 ease-soft group-hover:text-accent group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          strokeWidth={1.5}
        />
        <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
      </a>
    </div>
  );
}

function FeaturedCard({ area, index }: { area: Area; index: number }) {
  return (
    // Tablet: destaque ocupa a linha inteira (2 colunas estreitas deixavam o card Penal com vazio).
    <article className={`${cardBase} p-7 sm:p-10 md:col-span-2 lg:col-span-3`}>
      <FillLayer />
      <TopRule />
      <CardHeader area={area} index={index} large />
      <p className={`mt-7 flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-terracotta group-hover:text-accent ${fade}`}>
        <span aria-hidden="true" className={`size-1.5 rotate-45 bg-terracotta group-hover:bg-accent ${fade}`} />
        Atuação principal
      </p>
      <h3 className={`mt-3 text-[1.875rem] leading-[1.08] tracking-[-0.012em] text-primary group-hover:text-white sm:text-[2.375rem] ${fade}`}>
        {area.title}
      </h3>
      <p className={`mt-4 max-w-[46ch] leading-[1.7] text-primary/75 group-hover:text-sand/80 ${fade}`}>{area.description}</p>
      <ul className={`mt-7 grid gap-x-8 border-t border-primary/10 group-hover:border-white/15 sm:grid-cols-2 ${fade}`}>
        {area.topics.map((topic) => (
          <li
            key={topic}
            className={`flex items-center gap-3 border-b border-primary/10 py-3.5 text-[0.9375rem] text-primary group-hover:border-white/15 group-hover:text-sand ${fade}`}
          >
            <span aria-hidden="true" className={`size-1.5 shrink-0 rotate-45 bg-terracotta group-hover:bg-accent ${fade}`} />
            {topic}
          </li>
        ))}
      </ul>
      <CardCta area={area} />
    </article>
  );
}

function AreaCard({ area, index, wide = false }: { area: Area; index: number; wide?: boolean }) {
  return (
    <article
      className={`${cardBase} p-6 sm:p-8 lg:col-span-2 ${
        // No tablet o último card ocupa a linha inteira: vira horizontal para não sobrar vazio.
        wide ? "md:col-span-2 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:gap-x-10 lg:flex" : ""
      }`}
    >
      <FillLayer />
      <TopRule />
      <div>
        <CardHeader area={area} index={index} />
        <h3 className={`mt-6 text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-primary group-hover:text-white sm:text-[1.625rem] ${fade}`}>
          {area.title}
        </h3>
        <p className={`mt-3 text-[0.9375rem] leading-[1.7] text-primary/75 group-hover:text-sand/80 ${fade}`}>{area.description}</p>
      </div>
      <ul className={`flex flex-wrap gap-2 pt-7 ${wide ? "md:justify-end md:pt-0 lg:justify-start lg:pt-7" : ""}`}>
        {area.topics.map((topic) => (
          <li
            key={topic}
            className={`border border-primary/10 bg-sand/60 px-3 py-1.5 text-[0.8125rem] font-medium text-primary/85 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-sand ${fade}`}
          >
            {topic}
          </li>
        ))}
      </ul>
      <CardCta area={area} className={wide ? "md:col-span-2" : ""} />
    </article>
  );
}

export function PracticeAreas() {
  const featured = areas.filter((a) => a.featured);
  const others = areas.filter((a) => !a.featured);
  return (
    <section id="areas" aria-labelledby="areas-title" className="bg-sand py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 border-b border-primary/10 pb-10 sm:pb-12 lg:grid-cols-12 lg:items-end">
          <h2 id="areas-title" className="text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] leading-[1.08] tracking-[-0.015em] text-primary lg:col-span-6">
            Nossas Especialidades
          </h2>
          <p className="max-w-lg leading-relaxed text-primary/75 lg:col-span-5 lg:col-start-8">
            Atuamos em diferentes áreas do Direito, com dedicação especial ao Direito de Família e ao Direito
            Penal.
          </p>
        </div>

        {/* Mobile: carrossel horizontal com scroll-snap; md+: grid. */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 pt-1 scrollbar-none sm:-mx-8 sm:mt-12 sm:gap-5 sm:px-8 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:p-0 lg:grid-cols-6 lg:gap-6">
          {featured.map((area) => (
            <FeaturedCard key={area.title} area={area} index={areas.indexOf(area)} />
          ))}
          {others.map((area, i) => (
            <AreaCard key={area.title} area={area} index={areas.indexOf(area)} wide={i === others.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
