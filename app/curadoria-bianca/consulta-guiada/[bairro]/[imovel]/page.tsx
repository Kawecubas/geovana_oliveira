import type { Metadata } from "next";
import { PaginaImovel } from "@/components/ConsultaGuiadaPaginas";
import { ramoPorSlug, ramos, slugImovel } from "@/lib/curadoria";

const BASE = "/curadoria-bianca/consulta-guiada";

export const dynamicParams = false;

export function generateStaticParams() {
  return ramos.flatMap((r) => r.itens.map((i) => ({ bairro: r.slug, imovel: slugImovel(i) })));
}

type Params = { params: { bairro: string; imovel: string } };

export function generateMetadata({ params }: Params): Metadata {
  const imovel = ramoPorSlug(params.bairro)?.itens.find((i) => slugImovel(i) === params.imovel);
  return {
    robots: { index: false, follow: false },
    title: `${imovel?.titulo ?? "Imóvel"} · Consulta guiada para a Bianca | Geovana de Oliveira Imóveis`,
  };
}

export default function Page({ params }: Params) {
  return <PaginaImovel nome="Bianca" basePath={BASE} slug={params.bairro} imovelSlug={params.imovel} />;
}
