"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { site, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const fieldClass =
  "peer mt-2 w-full border-0 border-b border-primary/20 bg-transparent py-3 text-[1.0625rem] text-primary outline-none placeholder:text-primary/35";

function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <motion.label variants={item} className={`group relative block ${className}`}>
      <span className="text-xs font-medium tracking-wide text-primary/65 transition-colors duration-300 group-focus-within:text-terracotta">
        {label}
      </span>
      {children}
      {/* Linha terracota que se desenha da esquerda ao focar o campo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-terracotta motion-safe:transition-transform motion-safe:duration-500 peer-focus:scale-x-100"
      />
    </motion.label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
        signal: AbortSignal.timeout(15000),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error();
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      aria-labelledby="form-title"
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="border border-primary/10 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_24px_48px_-24px_rgb(46_30_20/0.25)] sm:p-10 lg:col-span-7 lg:col-start-6"
    >
      <motion.div variants={item}>
        <h3 id="form-title" className="text-2xl font-semibold text-primary">
          Envie sua mensagem
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-primary/65">Todos os campos são obrigatórios.</p>
      </motion.div>

      <input type="hidden" name="access_key" value={site.web3formsKey} />
      <input type="hidden" name="from_name" value={`Site ${site.name}`} />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <Field label="Nome">
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Seu nome completo" className={fieldClass} />
        </Field>
        <Field label="Título do assunto">
          <input name="subject" required maxLength={150} placeholder="Ex.: Pensão alimentícia" className={fieldClass} />
        </Field>
        <Field label="Descrição" className="sm:col-span-2">
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={6}
            placeholder="Conte brevemente a sua situação"
            className={`${fieldClass} block resize-y`}
          />
        </Field>
      </div>

      <motion.div variants={item} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-primary/65">
          Seus dados são tratados com sigilo.{" "}
          <Link href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-terracotta">
            Política de privacidade
          </Link>
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 bg-primary px-7 text-sm font-medium tracking-wide text-base transition-colors duration-300 hover:bg-terracotta active:bg-terracotta-deep disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar Mensagem"}
          {status === "sending" ? (
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" strokeWidth={1.5} />
          ) : (
            <Send
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          )}
        </button>
      </motion.div>

      {/* Região sempre montada para o leitor de tela anunciar a mudança. */}
      <div role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {(status === "ok" || status === "error") && (
            <motion.p
              key={status}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className={`mt-6 border-l-2 pl-4 text-sm leading-relaxed text-primary ${
                status === "ok" ? "border-terracotta" : "border-primary/40"
              }`}
            >
              {status === "ok" ? (
                "Mensagem enviada. Retornaremos em breve."
              ) : (
                <>
                  Não foi possível enviar agora. Tente novamente ou{" "}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    fale pelo WhatsApp
                  </a>
                  .
                </>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
