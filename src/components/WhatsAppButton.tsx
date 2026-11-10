import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex animate-rise items-center [animation-delay:900ms] sm:bottom-8 sm:right-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none mr-3 hidden translate-x-2 whitespace-nowrap border border-primary/10 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-primary opacity-0 transition-[opacity,transform] duration-300 ease-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
      >
        Conversar pelo WhatsApp
      </span>
      <span className="flex size-13 sm:size-14 items-center justify-center rounded-full bg-primary text-base shadow-[0_10px_30px_-10px_rgb(64_42_29/0.6)] ring-1 ring-accent/70 transition-[transform,background-color] duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:bg-espresso">
        <WhatsAppIcon className="size-6" />
      </span>
    </a>
  );
}
