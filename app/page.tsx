import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { LeadForm } from "@/components/LeadForm";
import { PropertyCard } from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/properties";
import { getWhatsappUrl } from "@/lib/site";

const steps = [
  "Entendimento do perfil, momento de vida e objetivo patrimonial",
  "Curadoria de imóveis compatíveis com o que realmente faz sentido",
  "Acompanhamento único em visitas, negociação e tomada de decisão",
  "Suporte até a assinatura, entrega das chaves e pós-venda",
];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <main className="min-h-screen bg-bege text-cafe">
      <section className="relative overflow-hidden bg-gradient-to-br from-cafe via-marrom to-oliva text-begeClaro">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-champagne text-cafe hover:bg-champagne text-cafe hover:bg-ouro blur-3xl" />
          <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-bege blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-ouro/50 bg-white/5 px-4 py-2 text-sm text-[#E7D5B3] backdrop-blur">
              Imóveis de alto padrão • Lançamentos • Atendimento exclusivo
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Seu imóvel de alto padrão com uma consultoria tão próxima quanto
              um médico da família.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-bege/85">
              A Geovana de Oliveira conduz cada cliente com atenção individual,
              curadoria criteriosa e acompanhamento único do primeiro contato à
              escolha do imóvel ideal.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                className="rounded-full bg-champagne text-cafe hover:bg-ouro px-7 py-4 text-center font-semibold text-cafe shadow-xl shadow-black/20 transition hover:bg-champagne text-cafe hover:bg-ouroFosco"
              >
                Contato direto via WhatsApp
              </a>

              <Link
                href="/lancamentos"
                className="rounded-full border border-bege/40 px-7 py-4 text-center font-semibold text-begeClaro transition hover:bg-white/10"
              >
                Ver lançamentos
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-ouro/40 bg-begeClaro/10 p-4 shadow-2xl backdrop-blur">
              <div
                className="h-[520px] rounded-[1.5rem] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(42,28,20,.15),rgba(42,28,20,.45)),url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop')",
                }}
              />
            </div>

            <div className="absolute -bottom-7 -left-5 max-w-xs rounded-3xl bg-begeClaro p-5 text-cafe shadow-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#8A6A3D]">
                Atendimento exclusivo
              </p>
              <p className="mt-2 text-xl font-semibold">
                Um único consultor para entender, orientar e acompanhar você.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="curadoria" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6A3D]">
              Arquétipo da marca
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              A especialista próxima: sofisticação com cuidado humano.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5C4534]">
              O posicionamento une a autoridade de uma consultora especialista
              com a proximidade de quem conhece a história, preferências e
              prioridades de cada cliente. Não é uma busca genérica por imóveis;
              é uma jornada personalizada de decisão patrimonial.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-[#D7C4A5] bg-begeClaro p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cafe text-ouro">
                  {index + 1}
                </span>

                <p className="mt-5 text-lg font-medium leading-7">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cafe px-6 py-20 text-begeClaro lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <p className="text-4xl font-semibold text-ouro">01</p>
            <h3 className="mt-4 text-xl font-semibold">
              Curadoria, não catálogo
            </h3>
            <p className="mt-3 leading-7 text-bege/75">
              Seleção de imóveis com aderência real ao perfil, orçamento, estilo
              de vida e objetivo de investimento.
            </p>
          </div>

          <div>
            <p className="text-4xl font-semibold text-ouro">02</p>
            <h3 className="mt-4 text-xl font-semibold">
              Alto padrão com discrição
            </h3>
            <p className="mt-3 leading-7 text-bege/75">
              Atendimento elegante, reservado e consultivo para compradores
              exigentes.
            </p>
          </div>

          <div>
            <p className="text-4xl font-semibold text-ouro">03</p>
            <h3 className="mt-4 text-xl font-semibold">Decisão segura</h3>
            <p className="mt-3 leading-7 text-bege/75">
              Apoio na comparação de oportunidades, negociação e clareza sobre
              diferenciais de cada empreendimento.
            </p>
          </div>
        </div>
      </section>

      <section id="imoveis" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6A3D]">
              Oportunidades selecionadas
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Lançamentos e imóveis para quem busca mais do que endereço.
            </h2>
          </div>

          <Link
            href="/contato"
            className="rounded-full bg-cafe px-6 py-3 text-center font-semibold text-ouro transition hover:bg-marrom"
          >
            Solicitar seleção personalizada
          </Link>
        </div>

        {featuredProperties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-begeClaro p-8 text-center shadow-sm">
            <h3 className="text-2xl font-semibold">
              Nenhum imóvel em destaque cadastrado ainda.
            </h3>
            <p className="mt-3 text-[#5C4534]">
              Cadastre imóveis no banco de dados com o campo{" "}
              <strong>isFeatured</strong> marcado como verdadeiro.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-[2rem] bg-[#8A6A3D] p-8 text-begeClaro md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D58C]">
                Contato direto
              </p>

              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
                Converse com a Geovana e receba uma seleção pensada para você.
              </h2>

              <p className="mt-5 text-lg leading-8 text-begeClaro/85">
                O formulário grava o lead no MySQL e também pode enviar os dados
                para o CRM configurado.
              </p>
            </div>

            <LeadForm sourcePage="home" interest="Curadoria geral" />
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}