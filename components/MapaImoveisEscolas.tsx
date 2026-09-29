"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { escolas, imoveis, distanciaMetros, type Imovel } from "@/lib/imoveis-escolas";
import { getWhatsappUrl } from "@/lib/site";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    L?: any;
  }
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const CENTRO_JOINVILLE: [number, number] = [-26.293, -48.852];

const bairros = Array.from(new Set(imoveis.map((i) => i.bairro))).sort((a, b) => a.localeCompare(b, "pt-BR"));

const moeda = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

const distTexto = (m: number) =>
  m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".0", "").replace(".", ",")} km`;

function carregarLeaflet(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = LEAFLET_CSS;
      document.head.appendChild(css);
    }
    const existente = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS}"]`);
    const script = existente || document.createElement("script");
    script.addEventListener("load", () => resolve(window.L));
    script.addEventListener("error", reject);
    if (!existente) {
      script.src = LEAFLET_JS;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

type ImovelComDistancia = Imovel & {
  escolaMaisProxima: { nome: string; distancia: number };
  distanciaEscolaFiltro?: number;
};

export function MapaImoveisEscolas() {
  const [bairro, setBairro] = useState("todos");
  const [areaMin, setAreaMin] = useState(0);
  const [dormMin, setDormMin] = useState(0);
  const [escolaId, setEscolaId] = useState("");
  const [distMax, setDistMax] = useState(2000);
  const [ordem, setOrdem] = useState<"preco" | "distancia" | "area">("preco");
  const [mapaPronto, setMapaPronto] = useState(false);
  const [erroMapa, setErroMapa] = useState(false);

  const mapaDiv = useRef<HTMLDivElement>(null);
  const mapa = useRef<any>(null);
  const camadaImoveis = useRef<any>(null);
  const camadaEscolas = useRef<any>(null);
  const marcadores = useRef<Record<string, any>>({});

  const escolaSelecionada = escolas.find((e) => e.id === escolaId);

  const lista: ImovelComDistancia[] = useMemo(() => {
    const itens = imoveis
      .map((imovel) => {
        const maisProxima = escolas
          .map((e) => ({ nome: e.unidade ? `${e.nome} · ${e.unidade}` : e.nome, distancia: distanciaMetros(imovel, e) }))
          .sort((a, b) => a.distancia - b.distancia)[0];
        return {
          ...imovel,
          escolaMaisProxima: maisProxima,
          distanciaEscolaFiltro: escolaSelecionada ? distanciaMetros(imovel, escolaSelecionada) : undefined,
        };
      })
      .filter((i) => bairro === "todos" || i.bairro === bairro)
      .filter((i) => i.area >= areaMin)
      .filter((i) => i.dormitorios >= dormMin)
      .filter((i) => !escolaSelecionada || (i.distanciaEscolaFiltro ?? 0) <= distMax);

    return itens.sort((a, b) => {
      if (ordem === "area") return b.area - a.area;
      if (ordem === "distancia") {
        const da = a.distanciaEscolaFiltro ?? a.escolaMaisProxima.distancia;
        const db = b.distanciaEscolaFiltro ?? b.escolaMaisProxima.distancia;
        return da - db;
      }
      return a.preco - b.preco;
    });
  }, [bairro, areaMin, dormMin, escolaSelecionada, distMax, ordem]);

  // Cria o mapa uma vez
  useEffect(() => {
    let cancelado = false;
    carregarLeaflet()
      .then((L) => {
        if (cancelado || !mapaDiv.current || mapa.current) return;
        mapa.current = L.map(mapaDiv.current, { scrollWheelZoom: false }).setView(CENTRO_JOINVILLE, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapa.current);
        camadaEscolas.current = L.layerGroup().addTo(mapa.current);
        camadaImoveis.current = L.layerGroup().addTo(mapa.current);
        setMapaPronto(true);
      })
      .catch(() => setErroMapa(true));
    return () => {
      cancelado = true;
    };
  }, []);

  // Atualiza os marcadores quando os filtros mudam
  useEffect(() => {
    const L = window.L;
    if (!mapaPronto || !L || !mapa.current) return;

    camadaEscolas.current.clearLayers();
    camadaImoveis.current.clearLayers();
    marcadores.current = {};

    escolas.forEach((e) => {
      const ativa = e.id === escolaId;
      const icone = L.divIcon({
        className: "",
        html: `<div style="width:${ativa ? 34 : 28}px;height:${ativa ? 34 : 28}px;border-radius:9999px;background:${ativa ? "#A9823F" : "#D8C39A"};border:3px solid #FFFDF8;box-shadow:0 4px 12px rgba(43,30,23,.35);display:flex;align-items:center;justify-content:center;font:700 13px Inter,Arial,sans-serif;color:#2B1E17">E</div>`,
        iconSize: [ativa ? 34 : 28, ativa ? 34 : 28],
        iconAnchor: [ativa ? 17 : 14, ativa ? 17 : 14],
      });
      L.marker([e.lat, e.lng], { icon: icone, zIndexOffset: ativa ? 500 : 0 })
        .bindPopup(
          `<strong>${e.nome}${e.unidade ? ` · ${e.unidade}` : ""}</strong><br>${e.endereco} · ${e.bairro}<br>${e.niveis}<br>Média ENEM: ${e.enem}`
        )
        .addTo(camadaEscolas.current);
      if (ativa) {
        L.circle([e.lat, e.lng], {
          radius: distMax,
          color: "#A9823F",
          weight: 2,
          fillColor: "#D8C39A",
          fillOpacity: 0.15,
        }).addTo(camadaEscolas.current);
      }
    });

    const limites: [number, number][] = [];
    lista.forEach((i) => {
      const icone = L.divIcon({
        className: "",
        html: `<div style="background:#4B3428;color:#FFFDF8;border:2px solid #FFFDF8;border-radius:9999px;padding:4px 10px;font:600 12px Inter,Arial,sans-serif;white-space:nowrap;box-shadow:0 4px 12px rgba(43,30,23,.35)">${(i.preco / 1_000_000).toFixed(2).replace(".", ",")} mi</div>`,
        iconSize: [72, 26],
        iconAnchor: [36, 13],
      });
      const distTxt =
        i.distanciaEscolaFiltro !== undefined && escolaSelecionada
          ? `${distTexto(i.distanciaEscolaFiltro)} do ${escolaSelecionada.nome}`
          : `${distTexto(i.escolaMaisProxima.distancia)} do ${i.escolaMaisProxima.nome}`;
      const m = L.marker([i.lat, i.lng], { icon: icone, zIndexOffset: 1000 })
        .bindPopup(
          `<div style="width:220px"><img src="${i.foto}" alt="${i.titulo}" style="width:220px;height:130px;object-fit:cover;border-radius:10px"/><div style="margin-top:8px;font:600 15px Inter,Arial,sans-serif">${i.titulo}</div><div style="font:13px Inter,Arial,sans-serif;color:#6F6258">${i.tipo} · ${i.bairro}</div><div style="margin-top:4px;font:700 15px Inter,Arial,sans-serif">${moeda(i.preco)}</div><div style="font:13px Inter,Arial,sans-serif">${i.area} m² · ${i.dormitorios} dorm. (${i.suites} suítes) · ${i.vagas} vagas</div><div style="margin-top:4px;font:12px Inter,Arial,sans-serif;color:#6F6258">${distTxt} (linha reta)</div><a href="${i.link}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;font:600 13px Inter,Arial,sans-serif;color:#A9823F">Ver fotos e anúncio →</a></div>`
        )
        .addTo(camadaImoveis.current);
      marcadores.current[i.codigo] = m;
      limites.push([i.lat, i.lng]);
    });

    if (escolaSelecionada) limites.push([escolaSelecionada.lat, escolaSelecionada.lng]);
    if (limites.length > 1) mapa.current.fitBounds(limites, { padding: [40, 40], maxZoom: 15 });
    else if (limites.length === 1) mapa.current.setView(limites[0], 15);
  }, [lista, mapaPronto, escolaId, escolaSelecionada, distMax]);

  function verNoMapa(codigo: string) {
    const m = marcadores.current[codigo];
    if (!m || !mapa.current) return;
    mapa.current.setView(m.getLatLng(), 16);
    m.openPopup();
    mapaDiv.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function limpar() {
    setBairro("todos");
    setAreaMin(0);
    setDormMin(0);
    setEscolaId("");
    setDistMax(2000);
    setOrdem("preco");
  }

  const campo =
    "w-full rounded-2xl border border-areia bg-begeClaro px-4 py-3 text-base text-cafe outline-none transition focus:border-ouroFosco";
  const rotulo = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-textoSuave";

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      {/* Filtros */}
      <div className="rounded-[2rem] bg-begeClaro p-5 shadow-soft sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <label className="block">
            <span className={rotulo}>Bairro</span>
            <select className={campo} value={bairro} onChange={(e) => setBairro(e.target.value)}>
              <option value="todos">Todos os bairros</option>
              {bairros.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={rotulo}>Metragem</span>
            <select className={campo} value={areaMin} onChange={(e) => setAreaMin(Number(e.target.value))}>
              <option value={0}>Qualquer</option>
              <option value={200}>200 m² ou mais</option>
              <option value={230}>230 m² ou mais</option>
              <option value={250}>250 m² ou mais</option>
            </select>
          </label>
          <label className="block">
            <span className={rotulo}>Quartos</span>
            <select className={campo} value={dormMin} onChange={(e) => setDormMin(Number(e.target.value))}>
              <option value={0}>Qualquer</option>
              <option value={3}>3 ou mais</option>
              <option value={4}>4 ou mais</option>
              <option value={5}>5 ou mais</option>
            </select>
          </label>
          <label className="block sm:col-span-2 lg:col-span-2">
            <span className={rotulo}>Perto do colégio</span>
            <select className={campo} value={escolaId} onChange={(e) => setEscolaId(e.target.value)}>
              <option value="">Qualquer colégio</option>
              {escolas.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                  {e.unidade ? ` · ${e.unidade}` : ""} ({e.bairro})
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={rotulo}>Distância</span>
            <select
              className={`${campo} disabled:opacity-50`}
              value={distMax}
              disabled={!escolaId}
              onChange={(e) => setDistMax(Number(e.target.value))}
            >
              <option value={1000}>Até 1 km</option>
              <option value={2000}>Até 2 km</option>
              <option value={3000}>Até 3 km</option>
              <option value={5000}>Até 5 km</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-areia/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-textoSuave">
            <strong className="text-cafe">{lista.length}</strong> de {imoveis.length} imóveis
            {escolaSelecionada ? ` a até ${distTexto(distMax)} do ${escolaSelecionada.nome}` : ""}
          </p>
          <div className="flex items-center gap-3">
            <select
              aria-label="Ordenar"
              className="rounded-full border border-areia bg-begeClaro px-4 py-2 text-sm text-cafe"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value as typeof ordem)}
            >
              <option value="preco">Menor preço</option>
              <option value="area">Maior metragem</option>
              <option value="distancia">Mais perto do colégio</option>
            </select>
            <button onClick={limpar} className="rounded-full px-4 py-2 text-sm font-semibold text-ouroFosco hover:bg-bege">
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Mapa + lista */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="lg:order-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-card lg:sticky lg:top-24">
            <div ref={mapaDiv} className="h-[55vh] min-h-[320px] w-full bg-areia/40 lg:h-[calc(100vh-8rem)]" />
            {erroMapa && (
              <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-textoSuave">
                Não foi possível carregar o mapa agora. A lista ao lado continua funcionando.
              </p>
            )}
            <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-marrom px-3 py-1 text-begeClaro shadow-soft">Imóvel (preço)</span>
              <span className="rounded-full bg-champagne px-3 py-1 text-cafe shadow-soft">E · Colégio</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 xl:grid-cols-2">
          {lista.length === 0 && (
            <p className="rounded-[2rem] bg-begeClaro p-8 text-textoSuave sm:col-span-2">
              Nenhum imóvel com esses filtros. Tente aumentar a distância ou limpar os filtros.
            </p>
          )}
          {lista.map((i) => {
            const dist = i.distanciaEscolaFiltro ?? i.escolaMaisProxima.distancia;
            const nomeEscola = escolaSelecionada ? escolaSelecionada.nome : i.escolaMaisProxima.nome;
            return (
              <article key={i.codigo} className="flex flex-col overflow-hidden rounded-[1.5rem] bg-begeClaro shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.foto} alt={i.titulo} loading="lazy" className="h-48 w-full object-cover" />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ouroFosco">
                    {i.tipo} · {i.bairro}
                  </p>
                  <h3 className="text-xl font-semibold text-cafe">{i.titulo}</h3>
                  <p className="text-2xl font-semibold text-cafe">{moeda(i.preco)}</p>
                  <p className="text-sm text-texto">
                    {i.area} m² · {i.dormitorios} dorm. ({i.suites} {i.suites === 1 ? "suíte" : "suítes"}) · {i.vagas}{" "}
                    {i.vagas === 1 ? "vaga" : "vagas"}
                  </p>
                  <p className="text-sm leading-6 text-textoSuave">{i.destaque}</p>
                  <p className="mt-1 rounded-2xl bg-bege px-3 py-2 text-sm text-cafe">
                    <strong>{distTexto(dist)}</strong> do {nomeEscola}
                    <span className="text-textoSuave"> (linha reta)</span>
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <button
                      onClick={() => verNoMapa(i.codigo)}
                      className="rounded-full border border-areia px-4 py-2 text-sm font-semibold text-cafe hover:bg-bege"
                    >
                      Ver no mapa
                    </button>
                    <a
                      href={i.link}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full border border-areia px-4 py-2 text-sm font-semibold text-cafe hover:bg-bege"
                    >
                      Fotos
                    </a>
                    <a
                      href={getWhatsappUrl(`Olá, Geovana. Tenho interesse no imóvel ${i.titulo} (cód. ${i.codigo}).`)}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full bg-cafe px-4 py-2 text-sm font-semibold text-champagne hover:bg-marrom"
                    >
                      Tenho interesse
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
