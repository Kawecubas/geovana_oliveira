import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { PropertyCard } from "@/components/PropertyCard";
import { getLuxuryProperties } from "@/lib/properties";

export default async function AltoPadraoPage() {
  const properties = await getLuxuryProperties();

  return (
    <main className="bg-bege text-cafe">
      <PageHero
        eyebrow="Imóveis de alto padrão"
        title="Imóveis para quem valoriza localização, privacidade, arquitetura e experiência."
        description="Uma curadoria reservada para clientes que procuram apartamentos, casas e empreendimentos com padrão superior."
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