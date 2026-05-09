import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/properties";
import { LeadForm } from "@/components/LeadForm";
import { getWhatsappUrl } from "@/lib/site";

type PropertyPageProps = {
  params: {
    slug: string;
  };
};

function formatPrice(price: any) {
  if (!price) return "Valor sob consulta";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const cover = property.images.find((image) => image.isCover) || property.images[0];

  return (
    <main className="bg-bege text-cafe">
      <section className="bg-cafe px-6 py-16 text-begeClaro lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ouro">
            {property.category}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">
            {property.title}
          </h1>

          <p className="mt-5 text-lg text-bege/80">
            {property.neighborhood ? `${property.neighborhood} • ` : ""}
            {property.city}
          </p>

          <p className="mt-5 text-3xl font-semibold text-ouro">
            {formatPrice(property.price)}
          </p>
        </div>
      </section>

      {cover && (
        <section
          className="h-[520px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(42,28,20,.10),rgba(42,28,20,.35)),url('${cover.url}')`,
          }}
        />
      )}

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <div className="grid gap-4 rounded-[2rem] bg-begeClaro p-6 shadow-lg md:grid-cols-4">
            {property.area && (
              <div>
                <p className="text-sm text-[#8A6A3D]">Área</p>
                <p className="text-xl font-semibold">{property.area} m²</p>
              </div>
            )}

            {property.bedrooms && (
              <div>
                <p className="text-sm text-[#8A6A3D]">Quartos</p>
                <p className="text-xl font-semibold">{property.bedrooms}</p>
              </div>
            )}

            {property.suites && (
              <div>
                <p className="text-sm text-[#8A6A3D]">Suítes</p>
                <p className="text-xl font-semibold">{property.suites}</p>
              </div>
            )}

            {property.parkingSpaces && (
              <div>
                <p className="text-sm text-[#8A6A3D]">Vagas</p>
                <p className="text-xl font-semibold">{property.parkingSpaces}</p>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold">Sobre o imóvel</h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-8 text-[#5C4534]">
              {property.description}
            </p>
          </div>

          {property.highlights && (
            <div className="mt-10">
              <h2 className="text-3xl font-semibold">Diferenciais</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {property.highlights.split(";").map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-begeClaro px-5 py-4 font-medium shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {property.images.length > 1 && (
            <div className="mt-10">
              <h2 className="text-3xl font-semibold">Galeria</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {property.images.map((image) => (
                  <div
                    key={image.id}
                    className="h-72 rounded-3xl bg-cover bg-center shadow-lg"
                    style={{
                      backgroundImage: `url('${image.url}')`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-[2rem] bg-[#8A6A3D] p-6 text-begeClaro shadow-xl">
          <h2 className="text-2xl font-semibold">
            Tenho interesse neste imóvel
          </h2>

          <p className="mt-3 leading-7 text-begeClaro/85">
            Envie seus dados ou fale diretamente com a Geovana para receber
            atendimento personalizado sobre este imóvel.
          </p>

          <a
            href={getWhatsappUrl(`Olá, Geovana. Tenho interesse no imóvel: ${property.title}`)}
            target="_blank"
            className="mt-5 inline-flex w-full justify-center rounded-full bg-cafe px-6 py-4 font-semibold text-ouro transition hover:bg-marrom"
          >
            Chamar no WhatsApp
          </a>

          <div className="mt-6">
            <LeadForm
              sourcePage={`imovel-${property.slug}`}
              interest={property.title}
            />
          </div>
        </aside>
      </section>
    </main>
  );
}