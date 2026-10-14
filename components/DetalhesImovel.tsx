"use client";

import { useEffect, useState } from "react";
import { escolas, imoveis, distanciaMetros, VALOR_DESTAQUE, type Imovel } from "@/lib/imoveis-escolas";
import { TIPOS_LUGAR, lugaresProximos, type TipoLugar } from "@/lib/proximidades";
import { getWhatsappUrl } from "@/lib/site";

/** Abre a ficha do imóvel de qualquer lugar da página. */
export function abrirDetalhesImovel(codigo: string) {
  window.dispatchEvent(new CustomEvent("curadoria:detalhes", { detail: codigo }));
}

const moeda = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

const distTexto = (m: number) =>
  m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".0", "").replace(".", ",")} km`;

// ~80 m por minuto a pé, arredondado para cima
const aPe = (m: number) => `${Math.max(1, Math.ceil(m / 80))} min a pé`;

const ICONES: Record<TipoLugar, string> = {
  padaria: "🥖",
  mercado: "🛒",
  restaurante: "🍽️",
  academia: "🏋️",
};

const BUSCA_GOOGLE: Record<TipoLugar, string> = {
  padaria: "padaria",
  mercado: "supermercado",
  restaurante: "restaurante",
  academia: "academia",
};


/** Conteúdo da ficha (usado no modal e na página do imóvel). */
export function FichaCorpo({ imovel }: { imovel: Imovel }) {
  const vistos = new Set<string>();
  const escolasPerto = escolas
    .map((e) => ({ ...e, distancia: distanciaMetros(imovel, e) }))
    .sort((a, b) => a.distancia - b.distancia)
    .filter((e) => (vistos.has(e.nome) ? false : (vistos.add(e.nome), true)))
    .slice(0, 3);
  return (
    <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ouroFosco">
        {imovel.tipo} · {imovel.bairro} · {imovel.rua}
      </p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-2xl font-semibold sm:text-3xl">{imovel.titulo}</h3>
        <p className="text-2xl font-semibold">{moeda(imovel.preco)}</p>
      </div>
      <p className="mt-2 text-sm text-texto">
        {imovel.area} m² · {imovel.dormitorios} dorm. ({imovel.suites} {imovel.suites === 1 ? "suíte" : "suítes"}) ·{" "}
        {imovel.vagas} {imovel.vagas === 1 ? "vaga" : "vagas"}
        {imovel.condominio ? ` · Cond. ${moeda(imovel.condominio)}` : ""}
        {imovel.iptu ? ` · IPTU ${moeda(imovel.iptu)}` : ""}
      </p>
      <p className="mt-2 text-sm leading-6 text-textoSuave">{imovel.destaque}</p>

      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Colégios mais próximos</h4>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {escolasPerto.map((e) => (
          <div key={e.id} className="rounded-2xl bg-cafe px-4 py-3 text-begeClaro">
            <span className="block text-sm font-semibold">{e.nome}</span>
            <span className="block text-xs text-bege/75">
              {distTexto(e.distancia)} · ENEM {e.enem}
            </span>
          </div>
        ))}
      </div>

      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">No dia a dia, perto do imóvel</h4>
      <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TIPOS_LUGAR.map(({ tipo, titulo }) => {
          const lista = lugaresProximos(imovel, tipo);
          return (
            <div key={tipo} className="rounded-2xl bg-bege p-4">
              <p className="font-semibold">
                <span aria-hidden className="mr-1.5">
                  {ICONES[tipo]}
                </span>
                {titulo}
              </p>
              {lista.length === 0 ? (
                <p className="mt-2 text-sm text-textoSuave">Nenhum mapeado a até 2 km.</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {lista.map((l) => (
                    <li key={l.nome + l.lat} className="text-sm leading-5">
                      <span className="block text-cafe">{l.nome}</span>
                      <span className="block text-xs text-textoSuave">
                        {distTexto(l.distancia)} · {aPe(l.distancia)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={`https://www.google.com/maps/search/${BUSCA_GOOGLE[tipo]}/@${imovel.lat},${imovel.lng},16z`}
                target="_blank"
                rel="noopener"
                style={{ fontSize: 12 }}
                className="mt-3 inline-block font-semibold text-ouroFosco hover:underline"
              >
                Ver todos no Google Maps →
              </a>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs leading-5 text-textoSuave">
        Distâncias em linha reta a partir da localização do imóvel{imovel.aproximado ? " (aproximada na rua)" : ""}.
        Lugares mapeados no OpenStreetMap; a lista pode não incluir todos.
      </p>

    </>
  );
}

export function DetalhesImovelHost() {
  const [codigo, setCodigo] = useState<string | null>(null);
  const imovel = imoveis.find((i) => i.codigo === codigo);

  useEffect(() => {
    const abrir = (ev: Event) => setCodigo((ev as CustomEvent<string>).detail);
    window.addEventListener("curadoria:detalhes", abrir);
    return () => window.removeEventListener("curadoria:detalhes", abrir);
  }, []);

  useEffect(() => {
    if (!imovel) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setCodigo(null);
    window.addEventListener("keydown", fechar);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fechar);
      document.body.style.overflow = overflow;
    };
  }, [imovel]);

  if (!imovel) return null;

  function verNoMapa() {
    const c = imovel!.codigo;
    setCodigo(null);
    document.getElementById("mapa-imoveis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("curadoria:ver-imovel", { detail: c }));
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end justify-center bg-cafe/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setCodigo(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do ${imovel.titulo}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-begeClaro shadow-premium sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imovel.foto} alt={imovel.titulo} className="h-56 w-full object-cover sm:h-72" />
          <button
            onClick={() => setCodigo(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-begeClaro/90 text-xl text-cafe shadow-soft"
          >
            ×
          </button>
          {imovel.preco < VALOR_DESTAQUE && (
            <span className="absolute left-4 top-4 rounded-full bg-[#A9823F] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-begeClaro">
              Abaixo de R$ 2 mi
            </span>
          )}
        </div>

        <div className="p-5 sm:p-8">
          <FichaCorpo imovel={imovel} />
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={verNoMapa}
              className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold text-cafe hover:bg-bege"
            >
              Ver no mapa
            </button>
            <a
              href={imovel.link}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold text-cafe hover:bg-bege"
            >
              Fotos e anúncio
            </a>
            <a
              href={getWhatsappUrl(`Olá, Geovana. Tenho interesse no imóvel ${imovel.titulo} (cód. ${imovel.codigo}).`)}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-cafe px-5 py-2.5 text-sm font-semibold text-champagne hover:bg-marrom"
            >
              Tenho interesse
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
