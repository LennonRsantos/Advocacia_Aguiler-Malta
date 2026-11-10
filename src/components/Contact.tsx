import { Clock, MapPin, Mail, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { site, whatsappLink } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

type Row = { label: string; icon: LucideIcon | typeof WhatsAppIcon; value: ReactNode; desktopOnly?: boolean };

const linkClass =
  "underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-300 hover:decoration-terracotta";

const rows: Row[] = [
  {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    desktopOnly: true,
    value: (
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Falar pelo WhatsApp
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    ),
  },
  {
    label: "E-mail",
    icon: Mail,
    value: (
      <a href={`mailto:${site.email}`} className={`${linkClass} wrap-anywhere`}>
        {site.email}
      </a>
    ),
  },
  {
    label: "Horário de atendimento",
    icon: Clock,
    desktopOnly: true,
    value: site.hours,
  },
  {
    label: "Endereço",
    icon: MapPin,
    value: (
      <>
        {site.address.street}
        <br />
        {site.address.district}, {site.address.city}/{site.address.state}
        <br />
        CEP {site.address.zip}
      </>
    ),
  },
];

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-sand py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5">
          <h2
            id="contato-title"
            className="text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-primary"
          >
            Contato
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-primary/75">
            Conte brevemente a sua situação. Retornamos{" "}
            <span className="hidden sm:inline"> para entender a demanda e indicar os próximos passos,</span> com
            discrição e sigilo.
          </p>
          <div className="mt-8 sm:mt-10 hidden sm:flex sm:flex-row sm:flex-wrap gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-7 text-sm font-medium tracking-wide text-base transition-colors duration-300 hover:bg-terracotta active:bg-terracotta-deep"
            >
              <WhatsAppIcon className="size-4.5 text-accent transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-base" />
              Iniciar Conversa
              <span className="sr-only">pelo WhatsApp (abre em nova aba)</span>
            </a>
          </div>
          <dl className="mt-8 sm:mt-10 space-y-4 border-primary/10 sm:border-t sm:pt-8">
            {rows.map(({ label, icon: Icon, value, desktopOnly }) => (
              <div key={label} className={`${desktopOnly ? "hidden sm:flex" : "flex"} gap-4`}>
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta" strokeWidth={1.5} />
                <div className="min-w-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-sm leading-relaxed tabular-nums text-primary">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
