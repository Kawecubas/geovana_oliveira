"use client";

import { useEffect, useRef, useState } from "react";
import { fotosDoImovel } from "@/lib/fotos";

type Props = {
  codigo: string;
  fotoPrincipal: string;
  titulo: string;
  /** Classe de altura da foto grande (ex.: "h-60 sm:h-96"). */
  altura?: string;
  selo?: React.ReactNode;
};

/** Carrossel de fotos com miniaturas e tela cheia; desliza com o dedo no celular. */
export function GaleriaFotos({ codigo, fotoPrincipal, titulo, altura = "h-60 sm:h-96", selo }: Props) {
  const fotos = fotosDoImovel(codigo, fotoPrincipal);
  const [atual, setAtual] = useState(0);
  const [cheia, setCheia] = useState(false);
  const trilho = useRef<HTMLDivElement>(null);
  const trilhoCheio = useRef<HTMLDivElement>(null);

  function irPara(i: number, alvo = trilho.current) {
    const n = (i + fotos.length) % fotos.length;
    setAtual(n);
    alvo?.scrollTo({ left: n * alvo.clientWidth, behavior: "smooth" });
  }

  function aoRolar(el: HTMLDivElement | null) {
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== atual) setAtual(i);
  }

  useEffect(() => {
    if (!cheia) return;
    trilhoCheio.current?.scrollTo({ left: atual * (trilhoCheio.current?.clientWidth ?? 0) });
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCheia(false);
      if (e.key === "ArrowRight") irPara(atual + 1, trilhoCheio.current);
      if (e.key === "ArrowLeft") irPara(atual - 1, trilhoCheio.current);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cheia, atual]);

  const seta =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-begeClaro/90 text-xl text-cafe shadow-soft hover:bg-begeClaro";

  return (
    <div>
      <div className="relative">
        <div
          ref={trilho}
          onScroll={(e) => aoRolar(e.currentTarget)}
          className={`flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${altura}`}
        >
          {fotos.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setAtual(i);
                setCheia(true);
              }}
              className="h-full w-full shrink-0 snap-center"
              aria-label={`Ampliar foto ${i + 1} de ${fotos.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f}
                alt={`${titulo} · foto ${i + 1}`}
                loading={i < 2 ? "eager" : "lazy"}
                onError={(e) => {
                  if (e.currentTarget.src !== new URL(fotoPrincipal, window.location.href).href) e.currentTarget.src = fotoPrincipal;
                }}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        {selo}
        {fotos.length > 1 && (
          <>
            <button type="button" onClick={() => irPara(atual - 1)} className={`${seta} left-3`} aria-label="Foto anterior">
              ‹
            </button>
            <button type="button" onClick={() => irPara(atual + 1)} className={`${seta} right-3`} aria-label="Próxima foto">
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-cafe/80 px-3 py-1 text-xs font-semibold text-begeClaro">
              {atual + 1} / {fotos.length} · toque para ampliar
            </span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-1 pt-2 [scrollbar-width:thin]">
          {fotos.map((f, i) => (
            <button
              key={`m-${f}`}
              type="button"
              onClick={() => irPara(i)}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                i === atual ? "ring-[#A9823F]" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {cheia && (
        <div className="fixed inset-0 z-[3000] flex flex-col bg-[#0d0907]" role="dialog" aria-modal="true" aria-label={`Fotos de ${titulo}`}>
          <div className="flex items-center justify-between px-4 py-3 text-sm text-[#e9e1d6]">
            <span>
              {atual + 1} / {fotos.length} · {titulo}
            </span>
            <button
              type="button"
              onClick={() => setCheia(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff1a] text-2xl text-[#fff]"
              aria-label="Fechar fotos"
            >
              ×
            </button>
          </div>
          <div className="relative flex-1">
            <div
              ref={trilhoCheio}
              onScroll={(e) => aoRolar(e.currentTarget)}
              className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {fotos.map((f, i) => (
                <div key={`c-${f}`} className="flex h-full w-full shrink-0 snap-center items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f} alt={`${titulo} · foto ${i + 1}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
            <button type="button" onClick={() => irPara(atual - 1, trilhoCheio.current)} className={`${seta} left-3`} aria-label="Foto anterior">
              ‹
            </button>
            <button type="button" onClick={() => irPara(atual + 1, trilhoCheio.current)} className={`${seta} right-3`} aria-label="Próxima foto">
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
