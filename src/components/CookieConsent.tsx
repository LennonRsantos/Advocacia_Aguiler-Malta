"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent-v1";
const OPEN_EVENT = "cookie-preferences-open";
// Disparado ao salvar a escolha: scripts opcionais (GA, Pixel) devem ouvir este evento.
export const COOKIE_CONSENT_EVENT = "cookie-consent";

export type CookieConsentState = { analytics: boolean; marketing: boolean };

const rejectAll: CookieConsentState = { analytics: false, marketing: false };
const acceptAll: CookieConsentState = { analytics: true, marketing: true };

// Fallback em memória para quando o localStorage estiver bloqueado.
let memoryChoice: CookieConsentState | null = null;

function readConsent(): CookieConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsentState) : memoryChoice;
  } catch {
    return memoryChoice;
  }
}

function writeConsent(state: CookieConsentState) {
  memoryChoice = state;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Armazenamento bloqueado: a escolha vale só para esta visita.
  }
  window.dispatchEvent(new CustomEvent<CookieConsentState>(COOKIE_CONSENT_EVENT, { detail: state }));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Preferências de cookies
    </button>
  );
}

const btnBase =
  "inline-flex items-center justify-center px-5 py-3 text-sm font-medium transition-colors duration-300 ease-soft";
const btnPrimary = `${btnBase} bg-primary text-white hover:bg-espresso`;
const btnSecondary = `${btnBase} border border-primary/25 text-primary hover:border-primary hover:bg-primary/5`;

function subscribeConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function CookieConsent() {
  // Servidor assume "já escolheu" (banner oculto); no cliente lê a escolha salva.
  const hasChoice = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() !== null,
    () => true,
  );
  const [reopened, setReopened] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<CookieConsentState>(rejectAll);
  const open = !hasChoice || reopened;

  useEffect(() => {
    const onOpen = () => {
      setCustomizing(false);
      setReopened(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open || !customizing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCustomizing(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, customizing]);

  function save(state: CookieConsentState) {
    writeConsent(state);
    setReopened(false);
    setCustomizing(false);
  }

  function startCustomizing() {
    setDraft(readConsent() ?? rejectAll);
    setCustomizing(true);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="animate-rise fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 max-w-md border border-primary/10 bg-sand p-5 shadow-[0_18px_40px_-18px_rgb(64_42_29/0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:p-6"
    >
      <h2 id="cookie-title" className="font-serif text-xl text-primary">
        Sua privacidade
      </h2>
      <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-primary/80">
        Usamos o armazenamento do seu navegador para registrar esta escolha. Cookies de estatística e marketing só
        serão usados com a sua permissão. Saiba mais na{" "}
        <Link href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-terracotta">
          Política de Privacidade
        </Link>
        .
      </p>

      {customizing ? (
        <div className="mt-5 space-y-4">
          <Option
            label="Necessários"
            description="Essenciais para o funcionamento do site e para registrar a sua escolha."
            checked
            disabled
          />
          <Option
            label="Estatísticas"
            description="Medição de visitas e de uso do site."
            checked={draft.analytics}
            onChange={(analytics) => setDraft({ ...draft, analytics })}
          />
          <Option
            label="Marketing"
            description="Anúncios e acompanhamento de campanhas."
            checked={draft.marketing}
            onChange={(marketing) => setDraft({ ...draft, marketing })}
          />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="button" onClick={() => save(draft)} className={btnPrimary}>
              Salvar preferências
            </button>
            <button type="button" onClick={() => setCustomizing(false)} className={btnSecondary}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => save(acceptAll)} className={btnPrimary}>
              Aceitar todos
            </button>
            <button type="button" onClick={() => save(rejectAll)} className={btnSecondary}>
              Recusar não essenciais
            </button>
          </div>
          <button
            type="button"
            onClick={startCustomizing}
            className="mt-1 py-3 text-sm font-medium text-primary underline decoration-accent underline-offset-[6px] hover:decoration-terracotta"
          >
            Personalizar
          </button>
        </>
      )}
    </div>
  );
}

function Option({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-primary">
          {label}
        </label>
        <p className="mt-0.5 text-xs leading-relaxed text-primary/70">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-primary disabled:opacity-60"
      />
    </div>
  );
}
