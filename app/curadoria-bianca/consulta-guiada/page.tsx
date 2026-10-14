import type { Metadata } from "next";
import { PaginaImoveisEscolas } from "@/components/PaginaImoveisEscolas";

// Versão guiada (mapa mental) da curadoria da Bianca. Fora do Google.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Consulta guiada para a Bianca | Geovana de Oliveira Imóveis",
  description: "Mapa mental dos bairros, colégios e imóveis selecionados em Joinville.",
};

export default function CuradoriaBiancaGuiadaPage() {
  return (
    <PaginaImoveisEscolas
      eyebrow="Consulta guiada · Joinville"
      titulo="Bianca, vamos escolher juntas, passo a passo"
      descricao="Siga o mapa mental: escolha o bairro, veja os colégios mais próximos e os imóveis de cada ramo, confira no mapa e fale direto com a Geovana."
      origem="curadoria-bianca-guiada"
      guiadaPara="Bianca"
      linkAlternativo={{ href: "/curadoria-bianca", texto: "Prefere filtrar por conta própria? Ver a lista completa →" }}
    />
  );
}
