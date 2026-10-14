"use client";

import { useMemo, useState } from "react";
import { MapaImoveisEscolas } from "@/components/MapaImoveisEscolas";
import { escolas, imoveis, distanciaMetros, VALOR_DESTAQUE, type Imovel } from "@/lib/imoveis-escolas";
import { getWhatsappUrl } from "@/lib/site";

type Props = {
  /** Nome que aparece no centro do mapa mental. */
  nomeCentro: string;
};

type Ramo = {
  bairro: string;
  itens: Imovel[];
  min: number;
  max: number;
  areaMin: number;
  areaMax: number;
  abaixo2mi: number;
  escolasPerto: { id: string; nome: string; distancia: number; enem: number }[];
};

const moedaCurta = (v: number) =>
  v >= 1_000_000
    ? `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")} mi`
    : `R$ ${Math.round(v / 1000)} mil`;

const moeda = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

const distTexto = (m: number) =>
  m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".0", "").replace(".", ",")} km`;

const nomeCurtoEscola = (nome: string) =>
  nome
    .replace("Colégio Bom Jesus IELUSC (Bonja)", "Bonja")
    .replace("Colégio dos ", "")
    .replace("Colégio Católica ", "")
    .replace("Colégio ", "")
    .replace(" Joinville", "")
    .replace(" International School", "")
    .replace(" Curso e Colégio", "");

function montarRamos(): Ramo[] {
  const porBairro = new Map<string, Imovel[]>();
  imoveis.forEach((i) => porBairro.set(i.bairro, [...(porBairro.get(i.bairro) ?? []), i]));

  return Array.from(porBairro.entries())
    .map(([bairro, itens]) => {
      const ordenados = [...itens].sort((a, b) => a.preco - b.preco);
      const centro = {
        lat: itens.reduce((s, i) => s + i.lat, 0) / itens.length,
        lng: itens.reduce((s, i) => s + i.lng, 0) / itens.length,
      };
      // uma entrada por colégio (o Bonja tem duas unidades)
      const vistos = new Set<string>();
      const escolasPerto = escolas
        .map((e) => ({ id: e.id, nome: nomeCurtoEscola(e.nome), distancia: distanciaMetros(centro, e), enem: e.enem }))
        .sort((a, b) => a.distancia - b.distancia)
        .filter((e) => (vistos.has(e.nome) ? false : (vistos.add(e.nome), true)))
        .slice(0, 3);
      return {
        bairro,
        itens: ordenados,
        min: ordenados[0].preco,
        max: ordenados[ordenados.length - 1].preco,
        areaMin: Math.min(...itens.map((i) => i.area)),
        areaMax: Math.max(...itens.map((i) => i.area)),
        abaixo2mi: itens.filter((i) => i.preco < VALOR_DESTAQUE).length,
        escolasPerto,
      };
    })
    .sort((a, b) => b.itens.length - a.itens.length);
}

// Geometria do mapa mental (SVG)
const W = 1000;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const RX = 365;
const RY = 225;
const NO_W = 230;
const NO_H = 76;

export function CuradoriaGuiada({ nomeCentro }: Props) {
  const ramos = useMemo(montarRamos, []);
  const [bairro, setBairro] = useState("todos");
  const ramo = ramos.find((r) => r.bairro === bairro);
  const total = imoveis.length;
  const totalAbaixo = imoveis.filter((i) => i.preco < VALOR_DESTAQUE).length;
  const passo = !ramo ? 1 : 2;

  const posicoes = ramos.map((r, idx) => {
    const ang = -Math.PI / 2 + (idx * 2 * Math.PI) / ramos.length;
    return { r, x: CX + RX * Math.cos(ang), y: CY + RY * Math.sin(ang) };
  });

  function irParaMapa(codigo?: string) {
    document.getElementById("mapa-imoveis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (codigo) window.dispatchEvent(new CustomEvent("curadoria:ver-imovel", { detail: codigo }));
  }

  function escolher(b: string) {
    setBairro((atual) => (atual === b ? "todos" : b));
  }

  const etapas = [
    { n: 1, t: "Escolha um bairro", d: "Cada ramo é um bairro com imóveis selecionados." },
    { n: 2, t: "Veja escolas e imóveis", d: "Os colégios mais próximos e as opções do ramo." },
    { n: 3, t: "Confira no mapa", d: "Distâncias reais e contato direto com a Geovana." },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ouroFosco">Consulta guiada</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Comece pelo bairro, siga pelos colégios e chegue ao imóvel</h2>

        <ol className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-3">
          {etapas.map((e) => {
            const ativa = e.n === passo;
            return (
              <li
                key={e.n}
                className={`flex items-center gap-3 rounded-[1.25rem] p-3 transition sm:items-start sm:p-4 ${
                  ativa ? "bg-cafe text-begeClaro shadow-soft" : "bg-begeClaro text-cafe"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    ativa ? "bg-[#A9823F] text-begeClaro" : "bg-bege text-ouroFosco"
                  }`}
                >
                  {e.n}
                </span>
                <span>
                  <span className="block font-semibold">{e.t}</span>
                  <span className={`hidden text-sm sm:block ${ativa ? "text-bege/80" : "text-textoSuave"}`}>{e.d}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Mapa mental (telas médias e grandes) */}
          <div className="hidden self-start rounded-[2rem] bg-begeClaro p-4 shadow-soft md:block lg:sticky lg:top-24">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Mapa mental dos bairros">
              {posicoes.map(({ r, x, y }) => {
                const ativo = r.bairro === bairro;
                const mx = (CX + x) / 2;
                const my = (CY + y) / 2 - 18;
                return (
                  <path
                    key={`l-${r.bairro}`}
                    d={`M ${CX} ${CY} Q ${mx} ${my} ${x} ${y}`}
                    fill="none"
                    stroke={ativo ? "#A9823F" : "#D8C9B2"}
                    strokeWidth={ativo ? 4 : 2}
                    opacity={bairro === "todos" || ativo ? 1 : 0.45}
                  />
                );
              })}

              <g
                role="button"
                tabIndex={0}
                aria-label="Ver todos os bairros"
                onClick={() => setBairro("todos")}
                onKeyDown={(e) => e.key === "Enter" && setBairro("todos")}
                className="cursor-pointer outline-none focus-visible:opacity-80"
              >
                <circle cx={CX} cy={CY} r={96} fill="#2B1E17" />
                <circle cx={CX} cy={CY} r={105} fill="none" stroke="#A9823F" strokeWidth={2} strokeDasharray="4 6" />
                <text x={CX} y={CY - 14} textAnchor="middle" fill="#D8C39A" fontSize={14} fontWeight={600} letterSpacing={2}>
                  CURADORIA
                </text>
                <text x={CX} y={CY + 12} textAnchor="middle" fill="#FFFDF8" fontSize={28} fontWeight={600}>
                  {nomeCentro}
                </text>
                <text x={CX} y={CY + 40} textAnchor="middle" fill="#CDBFA9" fontSize={15}>
                  {total} imóveis · {ramos.length} bairros
                </text>
              </g>

              {posicoes.map(({ r, x, y }) => {
                const ativo = r.bairro === bairro;
                const apagado = bairro !== "todos" && !ativo;
                return (
                  <g
                    key={r.bairro}
                    role="button"
                    tabIndex={0}
                    aria-pressed={ativo}
                    aria-label={`${r.bairro}: ${r.itens.length} imóveis`}
                    onClick={() => escolher(r.bairro)}
                    onKeyDown={(e) => e.key === "Enter" && escolher(r.bairro)}
                    className="cursor-pointer outline-none focus-visible:opacity-80"
                    opacity={apagado ? 0.55 : 1}
                  >
                    <rect
                      x={x - NO_W / 2}
                      y={y - NO_H / 2}
                      width={NO_W}
                      height={NO_H}
                      rx={18}
                      fill={ativo ? "#A9823F" : "#FFFDF8"}
                      stroke={ativo ? "#8A6A2F" : "#E2D5C1"}
                      strokeWidth={2}
                    />
                    <text x={x} y={y - 6} textAnchor="middle" fontSize={23} fontWeight={600} fill={ativo ? "#FFFDF8" : "#2B1E17"}>
                      {r.bairro}
                    </text>
                    <text x={x} y={y + 22} textAnchor="middle" fontSize={16} fill={ativo ? "#F4EFE7" : "#6F6258"}>
                      {r.itens.length} {r.itens.length === 1 ? "imóvel" : "imóveis"} · desde {moedaCurta(r.min)}
                    </text>
                    {r.abaixo2mi > 0 && (
                      <g>
                        <circle cx={x + NO_W / 2 - 6} cy={y - NO_H / 2 + 4} r={15} fill="#2B1E17" />
                        <text
                          x={x + NO_W / 2 - 6}
                          y={y - NO_H / 2 + 9}
                          textAnchor="middle"
                          fontSize={15}
                          fontWeight={700}
                          fill="#D8C39A"
                        >
                          {r.abaixo2mi}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            <p className="px-2 pb-1 text-xs text-textoSuave">
              Toque num bairro para abrir o ramo. O número escuro indica quantos imóveis custam menos de R$ 2 mi.
            </p>
          </div>

          {/* Bairros em lista (celular) */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:hidden">
            <button
              onClick={() => setBairro("todos")}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                bairro === "todos" ? "bg-cafe text-begeClaro" : "bg-begeClaro text-cafe"
              }`}
            >
              Todos · {total}
            </button>
            {ramos.map((r) => (
              <button
                key={r.bairro}
                onClick={() => escolher(r.bairro)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                  r.bairro === bairro ? "bg-[#A9823F] text-begeClaro" : "bg-begeClaro text-cafe"
                }`}
              >
                {r.bairro} · {r.itens.length}
              </button>
            ))}
          </div>

          {/* Ramo aberto */}
          <div className="rounded-[2rem] bg-begeClaro p-5 shadow-soft sm:p-6">
            {!ramo ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Visão geral</p>
                <h3 className="mt-2 text-2xl font-semibold">{total} imóveis em {ramos.length} bairros</h3>
                <p className="mt-2 text-sm leading-6 text-textoSuave">
                  {totalAbaixo} opções custam menos de R$ 2 milhões. Escolha um bairro no mapa mental para ver os
                  colégios mais próximos e os imóveis daquele ramo.
                </p>
                <ul className="mt-5 divide-y divide-areia/70">
                  {ramos.map((r) => (
                    <li key={r.bairro}>
                      <button
                        onClick={() => escolher(r.bairro)}
                        className="flex w-full items-center justify-between gap-3 py-3 text-left hover:text-ouroFosco"
                      >
                        <span>
                          <span className="block font-semibold">{r.bairro}</span>
                          <span className="block text-xs text-textoSuave">
                            Perto de {r.escolasPerto.slice(0, 2).map((e) => e.nome).join(" e ")}
                          </span>
                        </span>
                        <span className="shrink-0 text-right text-sm">
                          <span className="block font-semibold">{r.itens.length}</span>
                          <span className="block text-xs text-textoSuave">desde {moedaCurta(r.min)}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <button onClick={() => setBairro("todos")} style={{ fontSize: 14 }} className="font-semibold text-ouroFosco hover:underline">
                  ← Todos os bairros
                </button>
                <h3 className="mt-2 text-2xl font-semibold">{ramo.bairro}</h3>
                <p className="mt-1 text-sm text-textoSuave">
                  {ramo.itens.length} {ramo.itens.length === 1 ? "imóvel" : "imóveis"} ·{" "}
                  {ramo.min === ramo.max ? moedaCurta(ramo.min) : `${moedaCurta(ramo.min)} a ${moedaCurta(ramo.max)}`} ·{" "}
                  {ramo.areaMin === ramo.areaMax ? `${ramo.areaMin} m²` : `${ramo.areaMin} a ${ramo.areaMax} m²`}
                </p>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Colégios mais próximos</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {ramo.escolasPerto.map((e) => (
                    <div key={e.id} className="rounded-2xl bg-cafe px-3 py-2 text-begeClaro">
                      <span className="block text-sm font-semibold">{e.nome}</span>
                      <span className="block text-xs text-bege/75">
                        {distTexto(e.distancia)} · ENEM {e.enem}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Imóveis deste ramo</p>
                <ul className="mt-2 max-h-[26rem] space-y-2 overflow-y-auto pr-1">
                  {ramo.itens.map((i) => {
                    const destaque = i.preco < VALOR_DESTAQUE;
                    return (
                      <li
                        key={i.codigo}
                        className={`flex gap-3 rounded-2xl bg-bege p-2 ${destaque ? "ring-2 ring-[#A9823F]" : ""}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={i.foto} alt={i.titulo} loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{i.titulo}</p>
                          <p className="text-sm font-semibold">{moeda(i.preco)}</p>
                          <p className="text-xs text-textoSuave">
                            {i.area} m² · {i.suites} {i.suites === 1 ? "suíte" : "suítes"} · {i.vagas}{" "}
                            {i.vagas === 1 ? "vaga" : "vagas"}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {destaque && (
                              <span className="rounded-full bg-[#A9823F] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-begeClaro">
                                Abaixo de R$ 2 mi
                              </span>
                            )}
                            <button
                              onClick={() => irParaMapa(i.codigo)}
                              style={{ fontSize: 12 }}
                              className="font-semibold text-ouroFosco hover:underline"
                            >
                              Ver no mapa
                            </button>
                            <a href={i.link} target="_blank" rel="noopener" style={{ fontSize: 12 }} className="font-semibold text-cafe hover:underline">
                              Fotos
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => irParaMapa()}
                    className="rounded-full bg-cafe px-5 py-2.5 text-sm font-semibold text-champagne hover:bg-marrom"
                  >
                    Ver {ramo.bairro} no mapa ↓
                  </button>
                  <a
                    href={getWhatsappUrl(`Olá, Geovana. Gostei das opções no bairro ${ramo.bairro}. Podemos agendar visitas?`)}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold text-cafe hover:bg-bege"
                  >
                    Agendar visitas neste bairro
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <MapaImoveisEscolas bairroSelecionado={bairro} onBairroChange={setBairro} />
    </>
  );
}
