import { escolas, imoveis, distanciaMetros, VALOR_DESTAQUE, type Imovel } from "@/lib/imoveis-escolas";

export type EscolaPerto = { id: string; nome: string; nomeCurto: string; distancia: number; enem: number };

export type Ramo = {
  bairro: string;
  slug: string;
  itens: Imovel[];
  min: number;
  max: number;
  areaMin: number;
  areaMax: number;
  abaixo2mi: number;
  escolasPerto: EscolaPerto[];
};

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const moedaCurta = (v: number) =>
  v >= 1_000_000 ? `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")} mi` : `R$ ${Math.round(v / 1000)} mil`;

export const moeda = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

export const distTexto = (m: number) =>
  m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".0", "").replace(".", ",")} km`;

export const nomeCurtoEscola = (nome: string) =>
  nome
    .replace("Colégio Bom Jesus IELUSC (Bonja)", "Bonja")
    .replace("Colégio dos ", "")
    .replace("Colégio Católica ", "")
    .replace(" de Joinville", "")
    .replace("Colégio ", "")
    .replace(" Joinville", "")
    .replace(" International School", "")
    .replace(" Curso e Colégio", "");

/** Colégios mais próximos de um ponto (uma entrada por colégio). */
export function escolasProximas(ponto: { lat: number; lng: number }, limite = 3): EscolaPerto[] {
  const vistos = new Set<string>();
  return escolas
    .map((e) => ({
      id: e.id,
      nome: e.nome,
      nomeCurto: nomeCurtoEscola(e.nome),
      distancia: distanciaMetros(ponto, e),
      enem: e.enem,
    }))
    .sort((a, b) => a.distancia - b.distancia)
    .filter((e) => (vistos.has(e.nome) ? false : (vistos.add(e.nome), true)))
    .slice(0, limite);
}

export function montarRamos(): Ramo[] {
  const porBairro = new Map<string, Imovel[]>();
  imoveis.forEach((i) => porBairro.set(i.bairro, [...(porBairro.get(i.bairro) ?? []), i]));
  return Array.from(porBairro.entries())
    .map(([bairro, itens]) => {
      const ordenados = [...itens].sort((a, b) => a.preco - b.preco);
      const centro = {
        lat: itens.reduce((s, i) => s + i.lat, 0) / itens.length,
        lng: itens.reduce((s, i) => s + i.lng, 0) / itens.length,
      };
      return {
        bairro,
        slug: slugify(bairro),
        itens: ordenados,
        min: ordenados[0].preco,
        max: ordenados[ordenados.length - 1].preco,
        areaMin: Math.min(...itens.map((i) => i.area)),
        areaMax: Math.max(...itens.map((i) => i.area)),
        abaixo2mi: itens.filter((i) => i.preco < VALOR_DESTAQUE).length,
        escolasPerto: escolasProximas(centro),
      };
    })
    .sort((a, b) => b.itens.length - a.itens.length);
}

export const ramos = montarRamos();

export const ramoPorSlug = (slug: string) => ramos.find((r) => r.slug === slug);

export const slugImovel = (i: Imovel) => slugify(i.codigo);
