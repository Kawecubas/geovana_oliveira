import { getWhatsappUrl } from "@/lib/site";

type CtaProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Receba uma seleção personalizada para o seu perfil.",
  description = "A Geovana acompanha sua jornada com atendimento direto, criterioso e consultivo.",
}: CtaProps) {
  return (
    <section className="bg-bege px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#8A6A3D] p-8 text-begeClaro md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D58C]">
              Atendimento personalizado
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-begeClaro/85">
              {description}
            </p>
          </div>
          <a
            href={getWhatsappUrl()}
            target="_blank"
            className="rounded-full bg-cafe px-7 py-4 text-center font-semibold text-ouro transition hover:bg-marrom"
          >
            Contato direto via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
