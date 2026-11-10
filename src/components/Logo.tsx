import { site } from "@/lib/site";

type LogoProps = { tone?: "dark" | "light" };

export function Logo({ tone = "dark" }: LogoProps) {
  const ampersand = tone === "dark" ? "text-terracotta" : "text-accent";
  return (
    <span className="flex flex-col leading-none" translate="no">
      <span className="font-serif text-[1.35rem] tracking-[-0.01em] sm:text-2xl">
        Aguiler <span className={`${ampersand} italic`}>&amp;</span> Malta
      </span>
      <span
        className={`mt-1.5 text-[0.6875rem] font-medium tracking-[0.32em] ${
          tone === "dark" ? "text-primary/70" : "text-base/75"
        }`}
      >
        advocacia
      </span>
      <span className="sr-only">{site.fullName}</span>
    </span>
  );
}
