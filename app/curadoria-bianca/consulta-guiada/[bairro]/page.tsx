import type { Metadata } from "next";
import { PaginaRamo } from "@/components/ConsultaGuiadaPaginas";
import { ramoPorSlug, ramos } from "@/lib/curadoria";

const BASE = "/curadoria-bianca/consulta-guiada";

export const dynamicParams = false;

export function generateStaticParams() {
  return ramos.map((r) => ({ bairro: r.slug }));
}

export function generateMetadata({ params }: { params: { bairro: string } }): Metadata {
  const ramo = ramoPorSlug(params.bairro);
  return {
    robots: { index: false, follow: false },
    title: `${ramo?.bairro ?? "Bairro"} · Consulta guiada para a Bianca | Geovana de Oliveira Imóveis`,
  };
}

export default function Page({ params }: { params: { bairro: string } }) {
  return <PaginaRamo nome="Bianca" basePath={BASE} slug={params.bairro} />;
}
