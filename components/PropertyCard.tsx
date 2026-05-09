import Link from "next/link";

type PropertyImage = {
  url: string;
  alt: string | null;
  isCover: boolean;
};

type PropertyCardProps = {
  property: {
    title: string;
    slug: string;
    propertyType: string;
    category: string;
    city: string;
    neighborhood: string | null;
    price: any;
    area: number | null;
    bedrooms: number | null;
    suites: number | null;
    parkingSpaces: number | null;
    images: PropertyImage[];
  };
};

function formatPrice(price: any) {
  if (!price) return "Valor sob consulta";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price));
}

export function PropertyCard({ property }: PropertyCardProps) {
  const cover =
    property.images.find((image) => image.isCover) || property.images[0];

  return (
    <article className="overflow-hidden rounded-[2rem] bg-begeClaro shadow-lg shadow-cafe/10">
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(42,28,20,.05),rgba(42,28,20,.35)),url('${cover?.url || ""}')`,
        }}
      />

      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8A6A3D]">
          {property.category}
        </p>

        <h3 className="mt-3 text-2xl font-semibold">{property.title}</h3>

        <p className="mt-2 text-[#5C4534]">
          {property.neighborhood ? `${property.neighborhood} • ` : ""}
          {property.city}
        </p>

        <p className="mt-4 text-xl font-semibold text-cafe">
          {formatPrice(property.price)}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#5C4534]">
          {property.area && <span>{property.area} m²</span>}
          {property.bedrooms && <span>{property.bedrooms} quartos</span>}
          {property.suites && <span>{property.suites} suítes</span>}
          {property.parkingSpaces && (
            <span>{property.parkingSpaces} vagas</span>
          )}
        </div>

        <Link
          href={`/imoveis/${property.slug}`}
          className="mt-6 inline-flex rounded-full bg-cafe px-5 py-3 font-semibold text-ouro transition hover:bg-marrom"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}