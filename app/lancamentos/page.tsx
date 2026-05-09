import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { PropertyCard } from "@/components/PropertyCard";
import { getLaunchProperties } from "@/lib/properties";

export default async function LancamentosPage() {
  const properties = await getLaunchProperties();

  return (
    <main className="bg-bege text-cafe">
      <PageHero
        eyebrow="Lançamentos imobiliários"
        title="Lançamentos selecionados para quem busca valorização, conforto e exclusividade."
        description="A Geovana acompanha oportunidades em empreendimentos novos, plantas inteligentes e projetos com potencial de valorização."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <CtaSection />
    </main>
  );
}