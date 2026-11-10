import { Accordion } from "./Accordion";

const faqs = [
  {
    question: "Como funciona um divórcio consensual?",
    answer: (
      <>
        <p>
          O divórcio é consensual quando o casal está de acordo sobre o fim do casamento e sobre questões como partilha
          de bens, pensão, guarda e uso do nome. Ele pode ser feito judicialmente ou, em muitos casos, diretamente em
          cartório, por escritura pública.
        </p>
        <p>
          A via extrajudicial é possível quando não há filhos menores ou incapazes, ou quando as questões relativas a
          eles já foram resolvidas judicialmente. Em qualquer caso, a assistência de advogada é obrigatória.
        </p>
      </>
    ),
  },
  {
    question: "Quem tem direito à pensão alimentícia?",
    answer: (
      <>
        <p>
          Os alimentos são devidos, principalmente, aos filhos menores, em razão do dever de sustento dos pais. Também
          podem ser pedidos por filhos maiores que ainda dependam dos pais, por ex-cônjuges ou ex-companheiros em
          situações específicas e entre outros parentes, conforme o Código Civil.
        </p>
        <p>
          O valor considera a necessidade de quem recebe e a possibilidade de quem paga, de forma proporcional. Cada
          situação exige análise das circunstâncias concretas.
        </p>
      </>
    ),
  },
  {
    question: "Qual o prazo para abrir um inventário?",
    answer: (
      <>
        <p>
          O Código de Processo Civil prevê que o inventário seja aberto em até 2 meses a contar do falecimento. A
          perda desse prazo pode gerar multa sobre o imposto de transmissão (ITCMD), conforme a legislação de cada
          estado.
        </p>
        <p>
          Mesmo após o prazo, o inventário continua sendo necessário para regularizar a transferência dos bens aos
          herdeiros.
        </p>
      </>
    ),
  },
  {
    question: "É possível realizar um inventário extrajudicial?",
    answer: (
      <>
        <p>
          Sim. O inventário pode ser feito em cartório, por escritura pública, quando há acordo entre os herdeiros e
          acompanhamento de advogada. Costuma ser um caminho mais rápido do que a via judicial.
        </p>
        <p>
          A existência de testamento ou de herdeiros menores ou incapazes exige requisitos adicionais, que devem ser
          avaliados caso a caso antes de escolher o procedimento.
        </p>
      </>
    ),
  },
  {
    question: "Como funciona a definição da guarda dos filhos?",
    answer: (
      <>
        <p>
          A regra no Brasil é a guarda compartilhada, em que ambos os pais participam das decisões sobre a vida dos
          filhos. Ela não significa, necessariamente, divisão igual do tempo de convivência: a criança tem uma
          residência de referência e a rotina é organizada conforme a realidade da família.
        </p>
        <p>
          A guarda unilateral é aplicada em situações específicas previstas em lei. Em todas as decisões, prevalece o
          melhor interesse da criança ou do adolescente.
        </p>
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-base py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="faq-title"
              className="text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-primary"
            >
              Perguntas Frequentes
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-primary/75">
              As respostas têm caráter informativo e não substituem a análise individual do seu caso.
            </p>
            <a
              href="#contato"
              className="mt-6 inline-block py-2 text-sm font-medium text-primary underline decoration-accent underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-terracotta"
            >
              Tirar uma dúvida específica
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
