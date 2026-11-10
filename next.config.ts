import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
  console.warn("NEXT_PUBLIC_WEB3FORMS_KEY ausente: o formulário de contato vai falhar em produção.");
}

// CSP parcial sem script-src: CSP completa exige nonce (render dinâmico), incompatível com cacheComponents.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // Evita que o Turbopack use um package-lock.json de diretórios acima como raiz.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
