import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ara-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ara-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARA Entre Jardins | Casa de campo em Campo Alegre, SC | Geovana de Oliveira Imóveis",
  description:
    "Sua casa no campo. Outro ritmo. Residência de alto padrão em Campo Alegre (SC), mobiliada e pronta para viver, com participação a partir de 1/8 e escritura da sua fração.",
  openGraph: {
    title: "ARA Entre Jardins | Campo Alegre, SC",
    description:
      "Os melhores dias do ano têm um endereço. Casa de campo completa, com piscina aquecida, spa e fire pit.",
    images: ["/empreendimentos/ara-entre-jardins/fachada-6.webp"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function AraLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>;
}
