// Contatos ficam só aqui. Número nunca aparece como texto: o WhatsApp abre por link wa.me.
export const site = {
  name: "Aguiler & Malta",
  fullName: "Aguiler & Malta Advocacia",
  url: "https://www.aguilermalta.adv.br",
  description:
    "Escritório de advocacia conduzido por advogadas, com atuação em Direito de Família, Penal, Sucessões, Civil e Trabalhista. Atendimento humanizado e orientação jurídica clara.",
  oab: {
    daiane: "OAB/RS nº 139.679",
    eduarda: "OAB/RS nº 139.428",
  },
  whatsapp: { number: "5553984021235" },
  email: "aguilermalta.adv@gmail.com",
  address: {
    street: "Rua República do Líbano, 35",
    district: "Centro",
    city: "Rio Grande",
    state: "RS",
    zip: "96200-360",
  },
  // Chave pública do Web3Forms (vinculada ao e-mail que recebe as mensagens do formulário).
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
  hours: "Segunda a sexta, das 9h às 18h",
} as const;

export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#areas", label: "Áreas de Atuação" },
  { href: "#quem-somos", label: "Quem Somos" },
  { href: "#equipe", label: "Nossa Equipe" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
] as const;

export function whatsappLink(
  message = "Olá! Gostaria de agendar uma consulta com o escritório Aguiler & Malta.",
) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
