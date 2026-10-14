import Link from "next/link";
import { MapaImoveisEscolas } from "@/components/MapaImoveisEscolas";
import { imoveis, VALOR_DESTAQUE } from "@/lib/imoveis-escolas";
import { moedaCurta, ramos } from "@/lib/curadoria";

type Props = {
  /** Nome que aparece no centro do mapa mental. */
  nomeCentro: string;
  /** Caminho base das subpáginas (ex.: /curadoria-bianca/consulta-guiada). */
  basePath: string;
};

// Geometria do mapa mental radial (telas médias e grandes)
const W = 1000;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const RX = 365;
const RY = 225;
const NO_W = 230;
const NO_H = 76;

export function Etapas({ passo }: { passo: 1 | 2 | 3 }) {
  const etapas = [
    { n: 1, t: "Escolha um bairro", d: "Cada ramo é um bairro com imóveis selecionados." },
    { n: 2, t: "Veja colégios e imóveis", d: "Os colégios mais próximos e as opções do ramo." },
    { n: 3, t: "Abra o imóvel", d: "Ficha completa, o que tem por perto e contato." },
  ];
  return (
    <ol className="grid grid-cols-3 gap-2 sm:gap-3">
      {etapas.map((e) => {
        const ativa = e.n === passo;
        const feita = e.n < passo;
        return (
          <li
            key={e.n}
            className={`flex flex-col items-center gap-1 rounded-[1.25rem] p-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:p-4 sm:text-left ${
              ativa ? "bg-cafe text-begeClaro shadow-soft" : "bg-begeClaro text-cafe"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:h-8 sm:w-8 ${
                ativa ? "bg-[#A9823F] text-begeClaro" : feita ? "bg-cafe text-champagne" : "bg-bege text-ouroFosco"
              }`}
            >
              {feita ? "✓" : e.n}
            </span>
            <span>
              <span className="block text-xs font-semibold leading-4 sm:text-base">{e.t}</span>
              <span className={`hidden text-sm sm:block ${ativa ? "text-bege/80" : "text-textoSuave"}`}>{e.d}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function CuradoriaGuiada({ nomeCentro, basePath }: Props) {
  const total = imoveis.length;
  const totalAbaixo = imoveis.filter((i) => i.preco < VALOR_DESTAQUE).length;
  const posicoes = ramos.map((r, idx) => {
    const ang = -Math.PI / 2 + (idx * 2 * Math.PI) / ramos.length;
    return { r, x: CX + RX * Math.cos(ang), y: CY + RY * Math.sin(ang) };
  });

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-10 lg:pt-14">
        <Etapas passo={1} />

        {/* Mapa mental em árvore (celular) */}
        <div className="mt-6 md:hidden">
          <div className="mx-auto w-fit rounded-full bg-cafe px-6 py-3 text-center text-begeClaro shadow-soft">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne">Curadoria</span>
            <span className="block text-xl font-semibold">{nomeCentro}</span>
            <span className="block text-xs text-bege/75">
              {total} imóveis · {totalAbaixo} abaixo de R$ 2 mi
            </span>
          </div>
          <div className="mx-auto h-5 w-0.5 bg-[#A9823F]" />
          <ul className="relative ml-4 border-l-2 border-[#A9823F] pl-0">
            {ramos.map((r, idx) => (
              <li key={r.slug} className={`relative pl-6 ${idx === ramos.length - 1 ? "pb-0" : "pb-3"}`}>
                <span className="absolute left-0 top-8 h-0.5 w-6 bg-[#A9823F]" aria-hidden />
                {idx === ramos.length - 1 && (
                  <span className="absolute -left-[2px] top-[34px] bottom-0 w-[3px] bg-bege" aria-hidden />
                )}
                <Link
                  href={`${basePath}/${r.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-begeClaro p-4 shadow-soft active:scale-[0.99]"
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold text-cafe">{r.bairro}</span>
                    <span className="block text-sm text-textoSuave">
                      {r.itens.length} {r.itens.length === 1 ? "imóvel" : "imóveis"} · desde {moedaCurta(r.min)}
                    </span>
                    <span className="mt-1 block truncate text-xs text-ouroFosco">
                      Perto de {r.escolasPerto.slice(0, 2).map((e) => e.nomeCurto).join(" e ")}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1">
                    {r.abaixo2mi > 0 && (
                      <span className="rounded-full bg-[#A9823F] px-2 py-0.5 text-[10px] font-semibold uppercase text-begeClaro">
                        {r.abaixo2mi} &lt; R$ 2 mi
                      </span>
                    )}
                    <span className="text-2xl leading-none text-ouroFosco">›</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mapa mental radial (telas médias e grandes) */}
        <div className="mt-6 hidden gap-6 md:grid lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
          <div className="self-start rounded-[2rem] bg-begeClaro p-4 shadow-soft">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Mapa mental dos bairros">
              {posicoes.map(({ r, x, y }) => (
                <path
                  key={`l-${r.slug}`}
                  d={`M ${CX} ${CY} Q ${(CX + x) / 2} ${(CY + y) / 2 - 18} ${x} ${y}`}
                  fill="none"
                  stroke="#D8C9B2"
                  strokeWidth={2.5}
                />
              ))}
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
              {posicoes.map(({ r, x, y }) => (
                <Link key={r.slug} href={`${basePath}/${r.slug}`} aria-label={`${r.bairro}: ${r.itens.length} imóveis`}>
                  <g className="cursor-pointer transition hover:opacity-80">
                    <rect
                      x={x - NO_W / 2}
                      y={y - NO_H / 2}
                      width={NO_W}
                      height={NO_H}
                      rx={18}
                      fill="#FFFDF8"
                      stroke="#E2D5C1"
                      strokeWidth={2}
                    />
                    <text x={x} y={y - 6} textAnchor="middle" fontSize={23} fontWeight={600} fill="#2B1E17">
                      {r.bairro}
                    </text>
                    <text x={x} y={y + 22} textAnchor="middle" fontSize={16} fill="#6F6258">
                      {r.itens.length} {r.itens.length === 1 ? "imóvel" : "imóveis"} · desde {moedaCurta(r.min)}
                    </text>
                    {r.abaixo2mi > 0 && (
                      <g>
                        <circle cx={x + NO_W / 2 - 6} cy={y - NO_H / 2 + 4} r={15} fill="#A9823F" />
                        <text x={x + NO_W / 2 - 6} y={y - NO_H / 2 + 9} textAnchor="middle" fontSize={15} fontWeight={700} fill="#FFFDF8">
                          {r.abaixo2mi}
                        </text>
                      </g>
                    )}
                  </g>
                </Link>
              ))}
            </svg>
            <p className="px-2 pb-1 text-xs text-textoSuave">
              Clique num bairro para abrir o ramo. O número dourado indica quantos imóveis custam menos de R$ 2 mi.
            </p>
          </div>

          <div className="rounded-[2rem] bg-begeClaro p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Visão geral</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {total} imóveis em {ramos.length} bairros
            </h2>
            <p className="mt-2 text-sm leading-6 text-textoSuave">
              {totalAbaixo} opções custam menos de R$ 2 milhões. Escolha um bairro para ver os colégios mais próximos e os
              imóveis daquele ramo.
            </p>
            <ul className="mt-5 divide-y divide-areia/70">
              {ramos.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`${basePath}/${r.slug}`}
                    className="flex items-center justify-between gap-3 py-3 hover:text-ouroFosco"
                  >
                    <span>
                      <span className="block font-semibold">{r.bairro}</span>
                      <span className="block text-xs text-textoSuave">
                        Perto de {r.escolasPerto.slice(0, 2).map((e) => e.nomeCurto).join(" e ")}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-sm">
                      <span className="block font-semibold">{r.itens.length} ›</span>
                      <span className="block text-xs text-textoSuave">desde {moedaCurta(r.min)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MapaImoveisEscolas />
    </>
  );
}
