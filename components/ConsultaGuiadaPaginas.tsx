import Link from "next/link";
import { notFound } from "next/navigation";
import { Etapas } from "@/components/CuradoriaGuiada";
import { FichaCorpo } from "@/components/DetalhesImovel";
import { MapaBairroControlado } from "@/components/MapaBairroControlado";
import { GaleriaFotos } from "@/components/GaleriaFotos";
import { VALOR_DESTAQUE } from "@/lib/imoveis-escolas";
import { distTexto, moeda, moedaCurta, ramoPorSlug, ramos, slugImovel } from "@/lib/curadoria";
import { getWhatsappUrl } from "@/lib/site";

type Base = { nome: string; basePath: string };

function Trilha({ nome, basePath, passos }: Base & { passos: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Caminho" className="flex flex-wrap items-center gap-1.5 text-sm">
      <Link href={basePath} className="rounded-full bg-begeClaro/10 px-3 py-1 font-semibold text-champagne hover:bg-begeClaro/20">
        ● {nome}
      </Link>
      {passos.map((p) => (
        <span key={p.label} className="flex items-center gap-1.5">
          <span className="text-champagne/70" aria-hidden>
            ─
          </span>
          {p.href ? (
            <Link href={p.href} className="rounded-full bg-begeClaro/10 px-3 py-1 font-semibold text-begeClaro hover:bg-begeClaro/20">
              {p.label}
            </Link>
          ) : (
            <span className="rounded-full bg-[#A9823F] px-3 py-1 font-semibold text-begeClaro">{p.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function Cabecalho({ children, titulo, subtitulo }: { children: React.ReactNode; titulo: string; subtitulo: string }) {
  return (
    <section className="bg-gradient-to-br from-cafe via-marrom to-[#8A6A3D] px-4 py-6 text-begeClaro sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {children}
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{titulo}</h1>
        <p className="mt-2 text-sm text-bege/85 sm:text-base">{subtitulo}</p>
      </div>
    </section>
  );
}

/* --------------------------- Página do bairro --------------------------- */

export function PaginaRamo({ nome, basePath, slug }: Base & { slug: string }) {
  const ramo = ramoPorSlug(slug);
  if (!ramo) notFound();
  const idx = ramos.findIndex((r) => r.slug === slug);
  const anterior = ramos[(idx - 1 + ramos.length) % ramos.length];
  const proximo = ramos[(idx + 1) % ramos.length];
  const faixa = ramo.min === ramo.max ? moedaCurta(ramo.min) : `${moedaCurta(ramo.min)} a ${moedaCurta(ramo.max)}`;
  const area = ramo.areaMin === ramo.areaMax ? `${ramo.areaMin} m²` : `${ramo.areaMin} a ${ramo.areaMax} m²`;

  return (
    <main className="bg-bege text-cafe">
      <Cabecalho
        titulo={ramo.bairro}
        subtitulo={`${ramo.itens.length} ${ramo.itens.length === 1 ? "imóvel" : "imóveis"} · ${faixa} · ${area}`}
      >
        <Trilha nome={nome} basePath={basePath} passos={[{ label: ramo.bairro }]} />
      </Cabecalho>

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
        <Etapas passo={2} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] [&>*]:min-w-0">
          {/* Ramo: colégios */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Colégios mais próximos</p>
            <ul className="ml-3 mt-3 border-l-2 border-[#A9823F]">
              {ramo.escolasPerto.map((e) => (
                <li key={e.id} className="relative pb-3 pl-6 last:pb-0">
                  <span className="absolute left-0 top-6 h-0.5 w-6 bg-[#A9823F]" aria-hidden />
                  <div className="rounded-2xl bg-cafe px-4 py-3 text-begeClaro">
                    <span className="block font-semibold">{e.nome}</span>
                    <span className="block text-sm text-bege/75">
                      {distTexto(e.distancia)} do centro do bairro · ENEM {e.enem}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Ramo: imóveis */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ouroFosco">Imóveis deste ramo</p>
            <ul className="ml-3 mt-3 border-l-2 border-[#A9823F] sm:ml-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:border-l-0">
              {ramo.itens.map((i) => {
                const destaque = i.preco < VALOR_DESTAQUE;
                return (
                  <li key={i.codigo} className="relative pb-3 pl-6 last:pb-0 sm:p-0">
                    <span className="absolute left-0 top-10 h-0.5 w-6 bg-[#A9823F] sm:hidden" aria-hidden />
                    <Link
                      href={`${basePath}/${slug}/${slugImovel(i)}`}
                      className={`flex h-full gap-3 overflow-hidden rounded-2xl bg-begeClaro p-2 shadow-soft transition hover:-translate-y-0.5 sm:flex-col sm:p-0 ${
                        destaque ? "ring-2 ring-[#A9823F]" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={i.foto}
                        alt={i.titulo}
                        loading="lazy"
                        className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-40 sm:w-full sm:rounded-none"
                      />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:p-4">
                        {destaque && (
                          <span className="w-fit rounded-full bg-[#A9823F] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-begeClaro">
                            Abaixo de R$ 2 mi
                          </span>
                        )}
                        <span className="truncate font-semibold">{i.titulo}</span>
                        <span className="text-sm font-semibold">{moeda(i.preco)}</span>
                        <span className="text-xs text-textoSuave">
                          {i.area} m² · {i.suites} {i.suites === 1 ? "suíte" : "suítes"} · {i.vagas}{" "}
                          {i.vagas === 1 ? "vaga" : "vagas"}
                        </span>
                        <span className="mt-1 text-xs font-semibold text-ouroFosco">Ver imóvel e arredores ›</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href={getWhatsappUrl(`Olá, Geovana. Gostei das opções no bairro ${ramo.bairro}. Podemos agendar visitas?`)}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-cafe px-5 py-2.5 text-sm font-semibold text-champagne hover:bg-marrom"
          >
            Agendar visitas neste bairro
          </a>
          <Link href={`${basePath}/${anterior.slug}`} className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold hover:bg-begeClaro">
            ‹ {anterior.bairro}
          </Link>
          <Link href={`${basePath}/${proximo.slug}`} className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold hover:bg-begeClaro">
            {proximo.bairro} ›
          </Link>
          <Link href={basePath} className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold hover:bg-begeClaro">
            Todos os bairros
          </Link>
        </div>
      </section>

      <MapaBairroControlado bairro={ramo.bairro} basePath={basePath} />
    </main>
  );
}

/* --------------------------- Página do imóvel --------------------------- */

export function PaginaImovel({ nome, basePath, slug, imovelSlug }: Base & { slug: string; imovelSlug: string }) {
  const ramo = ramoPorSlug(slug);
  const imovel = ramo?.itens.find((i) => slugImovel(i) === imovelSlug);
  if (!ramo || !imovel) notFound();
  const idx = ramo.itens.indexOf(imovel);
  const anterior = ramo.itens[idx - 1];
  const proximo = ramo.itens[idx + 1];

  return (
    <main className="bg-bege text-cafe">
      <Cabecalho titulo={imovel.titulo} subtitulo={`${imovel.tipo} · ${imovel.bairro} · ${moeda(imovel.preco)}`}>
        <Trilha
          nome={nome}
          basePath={basePath}
          passos={[{ label: ramo.bairro, href: `${basePath}/${slug}` }, { label: imovel.titulo }]}
        />
      </Cabecalho>

      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-10">
        <Etapas passo={3} />

        <article className="mt-6 overflow-hidden rounded-[2rem] bg-begeClaro shadow-soft">
          <GaleriaFotos
            codigo={imovel.codigo}
            fotoPrincipal={imovel.foto}
            titulo={imovel.titulo}
            altura="h-64 sm:h-[28rem]"
            selo={
              imovel.preco < VALOR_DESTAQUE ? (
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#A9823F] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-begeClaro">
                  Abaixo de R$ 2 mi
                </span>
              ) : null
            }
          />
          <div className="p-5 sm:p-8">
            <FichaCorpo imovel={imovel} />
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={getWhatsappUrl(`Olá, Geovana. Tenho interesse no imóvel ${imovel.titulo} (cód. ${imovel.codigo}).`)}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-cafe px-5 py-2.5 text-sm font-semibold text-champagne hover:bg-marrom"
              >
                Tenho interesse
              </a>
<a
              href={getWhatsappUrl(
                `Olá, Geovana. Gostaria de receber mais informações sobre o imóvel ${imovel.titulo} (cód. ${imovel.codigo}): planta, condomínio e disponibilidade de visita.`
              )}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-[#25D366] px-5 py-2.5 text-sm font-semibold text-cafe hover:bg-[#25D366]/10"
            >
              Mais informações pelo WhatsApp
            </a>
              <Link
                href={`${basePath}/${slug}?imovel=${encodeURIComponent(imovel.codigo)}#mapa-imoveis`}
                className="rounded-full border border-areia px-5 py-2.5 text-sm font-semibold hover:bg-bege"
              >
                Ver no mapa
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {anterior ? (
            <Link
              href={`${basePath}/${slug}/${slugImovel(anterior)}`}
              className="rounded-2xl bg-begeClaro p-4 text-sm shadow-soft hover:-translate-y-0.5"
            >
              <span className="block text-xs text-textoSuave">‹ Anterior no ramo</span>
              <span className="block truncate font-semibold">{anterior.titulo}</span>
            </Link>
          ) : (
            <Link href={`${basePath}/${slug}`} className="rounded-2xl bg-begeClaro p-4 text-sm shadow-soft">
              <span className="block text-xs text-textoSuave">‹ Voltar</span>
              <span className="block font-semibold">{ramo.bairro}</span>
            </Link>
          )}
          {proximo ? (
            <Link
              href={`${basePath}/${slug}/${slugImovel(proximo)}`}
              className="rounded-2xl bg-begeClaro p-4 text-right text-sm shadow-soft hover:-translate-y-0.5"
            >
              <span className="block text-xs text-textoSuave">Próximo no ramo ›</span>
              <span className="block truncate font-semibold">{proximo.titulo}</span>
            </Link>
          ) : (
            <Link href={basePath} className="rounded-2xl bg-begeClaro p-4 text-right text-sm shadow-soft">
              <span className="block text-xs text-textoSuave">Outro bairro ›</span>
              <span className="block font-semibold">Mapa mental</span>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
