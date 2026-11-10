import type { ComponentPropsWithoutRef } from "react";

// Adaptado do Animated Shiny Text (Magic UI, MIT): gradiente recortado no texto faz um reflexo dourado passar sobre o primary.
// print: a impressão descarta fundos; sem isso o texto transparente sumiria no papel.
export function AnimatedShinyText({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={`animate-shiny-text bg-[linear-gradient(110deg,var(--color-primary)_45%,var(--color-accent)_50%,var(--color-primary)_55%)] bg-size-[250%_100%] bg-clip-text text-transparent print:bg-none print:text-primary ${className}`}
      {...props}
    />
  );
}
