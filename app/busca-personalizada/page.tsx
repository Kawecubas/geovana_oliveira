import { PropertyCard } from "@/components/PropertyCard";
import { getRecommendedProperties } from "@/lib/properties";
import { getWhatsappUrl } from "@/lib/site";

export const metadata = {
  title: "Busca Personalizada de Imóveis | Geovana de Oliveira Imóveis",
  description:
    "Responda algumas perguntas e encontre imóveis de alto padrão, lançamentos e oportunidades compatíveis com seu perfil.",
};

type BuscaPersonalizadaPageProps = {
  searchParams: {
    propertyType?: string;
    city?: string;
    objective?: string;
    minBedrooms?: string;
    maxPrice?: string;
  };
};

function getObjectiveLabel(objective?: string) {
  const labels: Record<string, string> = {
    morar: "Morar com conforto",
    investimento: "Investimento",
    lancamento: "Lançamento imobiliário",
    "alto-padrao": "Imóvel de alto padrão",
  };

  return objective ? labels[objective] : "";
}

export default async function BuscaPersonalizadaPage({
  searchParams,
}: BuscaPersonalizadaPageProps) {
  const hasSearch =
    searchParams.propertyType ||
    searchParams.city ||
    searchParams.objective ||
    searchParams.minBedrooms ||
    searchParams.maxPrice;

  const properties = hasSearch
    ? await getRecommendedProperties({
        propertyType: searchParams.propertyType,
        city: searchParams.city,
        objective: searchParams.objective,
        minBedrooms: searchParams.minBedrooms
          ? Number(searchParams.minBedrooms)
          : undefined,
        maxPrice: searchParams.maxPrice
          ? Number(searchParams.maxPrice)
          : undefined,
      })
    : [];

  const whatsappMessage = `Olá, Geovana. Fiz uma busca personalizada no site e gostaria de atendimento.

Perfil da busca:
Tipo de imóvel: ${searchParams.propertyType || "Não informado"}
Cidade: ${searchParams.city || "Não informada"}
Objetivo: ${getObjectiveLabel(searchParams.objective) || "Não informado"}
Quartos mínimos: ${searchParams.minBedrooms || "Não informado"}
Valor máximo: ${
    searchParams.maxPrice
      ? Number(searchParams.maxPrice).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "Não informado"
  }`;

  return (
    <main className="bg-bege text-cafe">
      <section className="bg-gradient-to-br from-cafe via-marrom to-oliva px-6 py-20 text-begeClaro lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-champagne">
            Busca personalizada
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Encontre imóveis compatíveis com seu perfil, momento de vida e
            objetivo.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-bege/85">
            Responda algumas perguntas e veja oportunidades mais próximas do que
            você procura. A Geovana pode complementar essa seleção com uma
            curadoria personalizada.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <aside className="h-fit rounded-[2rem] border border-areia/70 bg-begeClaro p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ouroFosco">
            Perfil de busca
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            O que você está procurando?
          </h2>

          <form className="mt-8 grid gap-5">
            <div>
              <label className="premium-label">Tipo de imóvel</label>
              <select
                name="propertyType"
                defaultValue={searchParams.propertyType || ""}
                className="premium-input mt-2"
              >
                <option value="">Todos os tipos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa em condomínio">Casa em condomínio</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Terreno">Terreno</option>
              </select>
            </div>

            <div>
              <label className="premium-label">Cidade desejada</label>
              <input
                name="city"
                defaultValue={searchParams.city || ""}
                className="premium-input mt-2"
                placeholder="Ex.: Joinville, Balneário Camboriú..."
              />
            </div>

            <div>
              <label className="premium-label">Objetivo principal</label>
              <select
                name="objective"
                defaultValue={searchParams.objective || ""}
                className="premium-input mt-2"
              >
                <option value="">Selecione</option>
                <option value="morar">Morar com conforto</option>
                <option value="investimento">Investimento</option>
                <option value="lancamento">Lançamento imobiliário</option>
                <option value="alto-padrao">Alto padrão</option>
              </select>
            </div>

            <div>
              <label className="premium-label">Quartos mínimos</label>
              <select
                name="minBedrooms"
                defaultValue={searchParams.minBedrooms || ""}
                className="premium-input mt-2"
              >
                <option value="">Indiferente</option>
                <option value="1">1 quarto ou mais</option>
                <option value="2">2 quartos ou mais</option>
                <option value="3">3 quartos ou mais</option>
                <option value="4">4 quartos ou mais</option>
              </select>
            </div>

            <div>
              <label className="premium-label">Faixa máxima de investimento</label>
              <select
                name="maxPrice"
                defaultValue={searchParams.maxPrice || ""}
                className="premium-input mt-2"
              >
                <option value="">Sem limite definido</option>
                <option value="800000">Até R$ 800 mil</option>
                <option value="1500000">Até R$ 1,5 milhão</option>
                <option value="3000000">Até R$ 3 milhões</option>
                <option value="5000000">Até R$ 5 milhões</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-cafe px-7 py-4 font-semibold text-champagne shadow-soft transition hover:bg-marrom"
            >
              Buscar imóveis
            </button>

            {hasSearch && (
              <a
                href="/busca-personalizada"
                className="text-center text-sm font-semibold text-textoSuave transition hover:text-ouroFosco"
              >
                Limpar busca
              </a>
            )}
          </form>
        </aside>

        <div>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ouroFosco">
                Resultado da curadoria
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                {hasSearch
                  ? `${properties.length} imóvel(is) relacionado(s)`
                  : "Responda às perguntas para iniciar a busca"}
              </h2>
            </div>

            {hasSearch && (
              <a
                href={getWhatsappUrl(whatsappMessage)}
                target="_blank"
                className="rounded-full bg-ouro px-6 py-3 text-center font-semibold text-white shadow-soft transition hover:bg-ouroFosco"
              >
                Enviar busca para Geovana
              </a>
            )}
          </div>

          {!hasSearch && (
            <div className="rounded-[2rem] bg-begeClaro p-8 shadow-card">
              <h3 className="text-2xl font-semibold">
                Sua seleção personalizada começa pelas perguntas ao lado.
              </h3>

              <p className="mt-4 leading-7 text-textoSuave">
                O sistema irá comparar suas respostas com os imóveis cadastrados
                no banco e apresentar opções relacionadas. Para uma análise mais
                completa, a Geovana pode fazer uma curadoria manual considerando
                detalhes como estilo de vida, rotina, família, investimento e
                preferências pessoais.
              </p>
            </div>
          )}

          {hasSearch && properties.length === 0 && (
            <div className="rounded-[2rem] bg-begeClaro p-8 shadow-card">
              <h3 className="text-2xl font-semibold">
                Nenhum imóvel encontrado com esses filtros.
              </h3>

              <p className="mt-4 leading-7 text-textoSuave">
                Isso não significa que não exista uma boa oportunidade. A
                Geovana pode analisar seu perfil e buscar alternativas que ainda
                não estão cadastradas no site.
              </p>

              <a
                href={getWhatsappUrl(whatsappMessage)}
                target="_blank"
                className="mt-6 inline-flex rounded-full bg-cafe px-7 py-4 font-semibold text-champagne transition hover:bg-marrom"
              >
                Falar com a Geovana
              </a>
            </div>
          )}

          {properties.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}