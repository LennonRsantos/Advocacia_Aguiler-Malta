import type { SVGProps } from "react";

// Ícones line art desenhados para os pilares do Hero: traço fino, cor herdada de currentColor.
function LineIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

// Escuta atenta: orelha recebendo ondas sonoras.
export function ListeningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <path d="M12.5 13.5C12.5 8.6 15.9 5 20 5c4.2 0 7.5 3.3 7.5 7.9 0 3.5-1.9 5.3-3.5 6.7-1.4 1.2-2 2.4-2.2 4.2-.3 2.6-2.2 4.2-4.4 4.2-1.8 0-3.2-1-3.9-2.4" />
      <path d="M16.3 13.6c0-2.6 1.6-4.6 3.8-4.6s3.7 1.8 3.7 4c0 1.9-1.4 2.8-2.6 3.4-1.1.6-1.8 1.4-1.8 2.8" />
      <path d="M8 11c-1.3 2-1.3 5.3 0 7.3" />
      <path d="M4.5 8.5c-2.3 3.5-2.3 8.8 0 12.3" />
    </LineIcon>
  );
}

// Linguagem clara: pena de escrita.
export function NibIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <path d="M12 4h8v5l4 5c0 5-4.5 9.5-8 15-3.5-5.5-8-10-8-15l4-5Z" />
      <path d="M12 9h8" />
      <path d="M16 29V18" />
      <circle cx="16" cy="16" r="1.6" />
    </LineIcon>
  );
}

// Sigilo profissional: envelope fechado com selo.
export function SealedLetterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <rect x="4.5" y="8" width="23" height="16" rx="1" />
      <path d="M4.5 9 16 15.8 27.5 9" />
      <circle cx="16" cy="19.5" r="3.2" />
      <circle cx="16" cy="19.5" r="1.2" />
    </LineIcon>
  );
}

// Estratégia sob medida: bússola com agulha.
export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <circle cx="16" cy="16" r="11.5" />
      <path d="M16 4.5v2M16 25.5v2M4.5 16h2M25.5 16h2" />
      <path d="m20.5 11.5-2.6 6.4-6.4 2.6 2.6-6.4Z" />
      <circle cx="16" cy="16" r="1" />
    </LineIcon>
  );
}

// Acompanhamento próximo: dois anéis entrelaçados.
export function LinkedRingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <LineIcon {...props}>
      <circle cx="12.5" cy="16" r="7" />
      <circle cx="19.5" cy="16" r="7" />
    </LineIcon>
  );
}
