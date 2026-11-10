import Link from "next/link";
import { navItems, site, whatsappLink } from "@/lib/site";
import { CookiePreferencesButton } from "./CookieConsent";
import { Logo } from "./Logo";

const areas = [
  "Direito de Família",
  "Direito Penal",
  "Direito das Sucessões",
  "Direito Civil",
  "Direito Trabalhista",
];

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass = "transition-colors duration-300 hover:text-white";

export async function Footer({ home = "" }: { home?: string }) {
  const year = await getYear();
  return (
    <footer className="on-dark bg-primary text-[0.9375rem] text-base/75">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-8 pt-10 sm:grid-cols-2 sm:gap-12 sm:pb-12 sm:pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <span className="text-white">
            <Logo tone="light" />
          </span>
          <p className="mt-6 hidden max-w-xs leading-relaxed sm:block">
            Escritório conduzido por advogadas, com atuação em Direito de Família, Penal, Sucessões, Civil e
            Trabalhista.
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-accent">
            {site.oab.daiane} · {site.oab.eduarda}
          </p>
        </div>

        <nav aria-label="Rodapé" className="hidden sm:block lg:col-span-2 lg:col-start-6">
          <h2 className="font-serif text-lg text-white">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={`${home}${item.href}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden sm:block lg:col-span-2">
          <h2 className="font-serif text-lg text-white">Áreas de Atuação</h2>
          <ul className="mt-5 space-y-3">
            {areas.map((a) => (
              <li key={a}>
                <a href={`${home}#areas`} className={linkClass}>
                  {a}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden sm:col-span-2 sm:block lg:col-span-3">
          <h2 className="font-serif text-lg text-white">Contato</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
            <li>
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city}/{site.address.state} · CEP {site.address.zip}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-28 pt-6 text-xs text-base/65 sm:px-8 sm:pt-8 sm:text-sm md:flex-row md:items-center md:justify-between md:pb-8 lg:px-12">
          <div>
            <p>
              © {year} {site.fullName}. Todos os direitos reservados.
            </p>
            <p className="mt-1 text-xs text-base/50">
              Desenvolvido por{" "}
              <a
                href="https://lennonrsantoslinks.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-white"
              >
                Lennon Santos
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p>Conteúdo informativo, conforme o Provimento nº 205/2021 do CFOAB.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-8">
              <Link href="/politica-de-privacidade" className="-my-3 py-3 text-base/80 underline underline-offset-4 hover:text-white">
                Política de Privacidade
              </Link>
              <CookiePreferencesButton className="-my-3 py-3 text-left text-base/80 underline underline-offset-4 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
