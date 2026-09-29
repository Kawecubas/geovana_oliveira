import type { Metadata } from "next";
import { PaginaImoveisEscolas } from "@/components/PaginaImoveisEscolas";

// Página personalizada: fica fora do Google (só abre para quem tem o link).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Curadoria exclusiva para a Bianca | Geovana de Oliveira Imóveis",
  description: "Seleção de imóveis de alto padrão em Joinville perto das melhores escolas.",
};

export default function CuradoriaBiancaPage() {
  return (
    <PaginaImoveisEscolas
      eyebrow="Curadoria exclusiva · Joinville"
      titulo="Bianca, segue uma curadoria das melhores opções para sua família"
      descricao="Imóveis de alto padrão selecionados perto das melhores escolas de Joinville. Filtre por bairro, metragem, quartos e distância até o colégio, veja tudo no mapa e fale direto com a Geovana."
      origem="curadoria-bianca"
    />
  );
}
