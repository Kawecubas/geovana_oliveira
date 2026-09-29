import type { Metadata } from "next";
import { PaginaImoveisEscolas } from "@/components/PaginaImoveisEscolas";

export const metadata: Metadata = {
  title: "Imóveis perto das melhores escolas de Joinville | Geovana de Oliveira Imóveis",
  description:
    "Mapa de apartamentos e casas de alto padrão em Joinville com a distância até Bonja, Positivo, Santos Anjos, Coree e outros colégios particulares.",
};

export default function ImoveisPertoDeEscolasPage() {
  return (
    <PaginaImoveisEscolas
      eyebrow="Curadoria para famílias"
      titulo="Imóveis de alto padrão perto das melhores escolas de Joinville"
      descricao="Filtre por bairro, metragem, número de quartos e distância até o colégio dos seus filhos. Veja tudo no mapa e fale direto com a Geovana."
      origem="imoveis-perto-de-escolas"
    />
  );
}
