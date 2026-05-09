import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";

const items = ["Relacionamento de longo prazo", "Atenção real ao perfil do cliente", "Comunicação clara e objetiva", "Um único consultor acompanhando tudo"];

export default function Page() {
  return (
    <main className="bg-bege text-cafe">
      <PageHero
        eyebrow="Sobre a Geovana"
        title="Uma corretora próxima, consultiva e comprometida com a melhor decisão do cliente."
        description="O atendimento da Geovana é baseado em confiança, escuta ativa e acompanhamento individualizado em toda a jornada imobiliária."
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
