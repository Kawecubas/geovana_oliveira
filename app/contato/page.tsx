import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { getWhatsappUrl } from "@/lib/site";

export default function ContatoPage() {
  return (
    <main className="bg-bege text-cafe">
      <PageHero
        eyebrow="Contato"
        title="Fale diretamente com a Geovana e receba uma seleção personalizada."
        description="Envie seu perfil de busca ou chame diretamente pelo WhatsApp para iniciar uma curadoria imobiliária."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8A6A3D]">
            WhatsApp direto
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Prefere falar agora?
          </h2>
          <p className="mt-4 leading-7 text-[#5C4534]">
            O botão abaixo abre uma conversa direta com a Geovana para atendimento
            consultivo e personalizado.
          </p>
          <a
            href={getWhatsappUrl("Olá, Geovana. Vim pelo site e gostaria de atendimento personalizado.")}
            target="_blank"
            className="mt-6 inline-flex rounded-full bg-cafe px-7 py-4 font-semibold text-ouro transition hover:bg-marrom"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <LeadForm sourcePage="contato" interest="Contato pelo site" />
      </section>
    </main>
  );
}
