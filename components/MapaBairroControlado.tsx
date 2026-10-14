"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapaImoveisEscolas } from "@/components/MapaImoveisEscolas";
import { slugify } from "@/lib/curadoria";

/** Mapa já filtrado no bairro da página; trocar o bairro no filtro leva à página do outro bairro. */
export function MapaBairroControlado({ bairro, basePath }: { bairro: string; basePath: string }) {
  const router = useRouter();

  // ?imovel=CODIGO abre o marcador assim que o mapa estiver pronto
  useEffect(() => {
    const codigo = new URLSearchParams(window.location.search).get("imovel");
    if (!codigo) return;
    let tentativas = 0;
    const timer = window.setInterval(() => {
      tentativas += 1;
      const pronto = document.querySelector("#mapa-imoveis .leaflet-marker-icon");
      if (pronto || tentativas > 20) {
        window.clearInterval(timer);
        window.dispatchEvent(new CustomEvent("curadoria:ver-imovel", { detail: codigo }));
      }
    }, 300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <MapaImoveisEscolas
      bairroSelecionado={bairro}
      onBairroChange={(b) => router.push(b === "todos" ? basePath : `${basePath}/${slugify(b)}`)}
    />
  );
}
