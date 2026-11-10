import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Serif_Display } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Direito de Família e Penal`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  keywords: [
    "advogada direito de família",
    "divórcio",
    "pensão alimentícia",
    "guarda de filhos",
    "inventário",
    "planejamento sucessório",
    "testamento",
    "advogada criminalista",
    "defesa criminal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.fullName,
    title: `${site.fullName} | Direito de Família e Penal`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e8dcd1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.fullName,
  url: site.url,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "BR",
  },
  image: `${site.url}/opengraph-image.jpg`,
  areaServed: "BR",
  openingHours: "Mo-Fr 09:00-18:00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
