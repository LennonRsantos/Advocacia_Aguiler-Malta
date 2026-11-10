import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como o ${site.fullName} trata os dados pessoais recebidos pelos canais de contato.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  {
    title: "Dados coletados",
    text: "Este site não possui ferramentas de rastreamento. Os dados pessoais que recebemos são apenas aqueles que você nos envia voluntariamente pelo formulário de contato, por telefone, WhatsApp ou e-mail, como nome, assunto, contato e informações sobre a sua situação.",
  },
  {
    title: "Finalidade",
    text: "As informações são utilizadas exclusivamente para responder ao seu contato, avaliar a demanda e, se houver contratação, prestar os serviços jurídicos, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
  },
  {
    title: "Sigilo e compartilhamento",
    text: "Todas as informações estão protegidas pelo sigilo profissional da advocacia. Não vendemos dados. As mensagens enviadas pelo formulário de contato são processadas pela Web3Forms, prestadora de serviço que apenas as repassa por e-mail ao escritório. Fora isso, só compartilhamos dados quando necessário para a condução do caso ou por determinação legal.",
  },
  {
    title: "Cookies",
    text: "Utilizamos apenas o armazenamento local do seu navegador para registrar a sua escolha sobre cookies. Não utilizamos, no momento, cookies de estatística ou de marketing; se passarmos a utilizá-los, solicitaremos o seu consentimento antes. Você pode alterar a sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé do site.",
  },
  {
    title: "Seus direitos",
    text: `Você pode solicitar a confirmação, correção ou exclusão dos seus dados a qualquer momento, pelo e-mail ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-primary/10">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="-m-2 p-2" aria-label="Aguiler & Malta Advocacia, página inicial">
            <Logo />
          </Link>
          <Link
            href="/"
            className="py-2 text-sm font-medium text-primary underline decoration-accent underline-offset-[6px] hover:decoration-terracotta"
          >
            Voltar ao site
          </Link>
        </div>
      </header>
      <main id="conteudo" className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <h1 className="text-[clamp(2.25rem,1.8rem+2vw,3.5rem)] font-light leading-[1.08] tracking-[-0.015em]">
          Política de Privacidade
        </h1>
        <p className="mt-6 leading-relaxed text-primary/75">
          Texto-base provisório. Recomenda-se revisão final pelas advogadas responsáveis antes da publicação.
        </p>
        <div className="mt-14 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-primary/80">{s.text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer home="/" />
    </>
  );
}
