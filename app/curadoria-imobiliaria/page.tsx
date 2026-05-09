import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";

const items = ["Entendimento do momento de vida", "Filtro de oportunidades aderentes", "Comparativo entre imóveis", "Acompanhamento único e personalizado"];

export default function Page() {
  return (
    <main className="bg-bege text-cafe">
      <PageHero
        eyebrow="Curadoria imobiliária"
        title="Mais do que mostrar imóveis: entender o cliente e filtrar o que realmente faz sentido."
        description="A curadoria imobiliária transforma a busca em uma jornada mais segura, elegante e eficiente."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item}
              className="rounded-3xl border border-[#D7C4A5] bg-begeClaro p-7 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cafe text-ouro">
                {index + 1}
              </span>
              <h2 className="mt-5 text-2xl font-semibold">{item}</h2>
              <p className="mt-3 leading-7 text-[#5C4534]">
                Atendimento com olhar consultivo, linguagem clara e foco em
                uma experiência imobiliária mais segura e personalizada.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
