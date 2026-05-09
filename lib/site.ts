export const siteConfig = {
  name: "Geovana de Oliveira Imóveis",
  shortName: "Geovana Oliveira",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5547988174802",
  whatsappMessage:
    "Olá, Geovana. Gostaria de receber uma curadoria personalizada de imóveis.",
  navigation: [
    { label: "Início", href: "/" },
    { label: "Lançamentos", href: "/lancamentos" },
    { label: "Alto padrão", href: "/alto-padrao" },
    { label: "Curadoria", href: "/curadoria-imobiliaria" },
    { label: "Preciso de auxílio", href: "/busca-personalizada" },
    { label: "Sobre", href: "/sobre-geovana" },
    { label: "Contato", href: "/contato" },
  ],
};

export function getWhatsappUrl(message = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
