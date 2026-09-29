import { MapaImoveisEscolas } from "@/components/MapaImoveisEscolas";
import { LeadForm } from "@/components/LeadForm";
import { escolas } from "@/lib/imoveis-escolas";

type Props = {
  eyebrow: string;
  titulo: string;
  descricao: string;
  origem: string;
};

export function PaginaImoveisEscolas({ eyebrow, titulo, descricao, origem }: Props) {
  return (
    <main className="bg-bege text-cafe">
      <section className="bg-gradient-to-br from-cafe via-marrom to-[#8A6A3D] px-4 py-14 text-begeClaro sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ouro sm:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
            {titulo}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-bege/85 sm:text-lg sm:leading-8">
            {descricao}
          </p>
        </div>
      </section>

      <MapaImoveisEscolas />

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Colégios no mapa</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-textoSuave">
          Colégios particulares com Ensino Médio e entre as maiores médias no ENEM em Joinville (ranking do portal
          MelhorEscola). Confirme séries, vagas e mensalidades direto com cada escola.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {escolas.map((e) => (
            <div key={e.id} className="rounded-[1.5rem] bg-begeClaro p-5 shadow-soft">
              <p className="font-semibold text-cafe">
                {e.nome}
                {e.unidade ? ` · ${e.unidade}` : ""}
              </p>
              <p className="mt-1 text-sm text-textoSuave">
                {e.endereco} · {e.bairro}
              </p>
              <p className="mt-2 text-sm text-cafe">
                {e.niveis} · <span className="font-semibold text-ouroFosco">ENEM {e.enem}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-5 text-textoSuave">
          Distâncias em linha reta, calculadas a partir da localização dos endereços no OpenStreetMap; alguns imóveis têm
          localização aproximada na rua. Valores dos anúncios em setembro de 2026, sujeitos a alteração.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-10">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">Quer uma seleção feita para a sua família?</h2>
        <p className="mt-3 text-center text-textoSuave">
          Conte o colégio, o bairro e o tamanho que você procura. A Geovana monta a lista e o roteiro de visitas.
        </p>
        <div className="mt-8">
          <LeadForm sourcePage={origem} interest="Imóvel perto de escola" />
        </div>
      </section>
    </main>
  );
}
