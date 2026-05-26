"use client";

import { useState } from "react";
import {
  MessageCircle,
  Trees,
  Building2,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import { EmpreendimentoCarousel } from "@/components/EmpreendimentoCarousel";
import {
  cidadeDasAguasImages,
  paraisoDasAraucariasImages,
} from "@/components/empreendimentos-data";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LandingEmpreendimentos() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente da Geovana Oliveira Imóveis. Posso te ajudar a entender qual empreendimento combina melhor com seu perfil: Cidade das Águas ou Paraíso das Araucárias.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message?: string) {
    const text = message || input;

    if (!text.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: text,
      },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistente-imoveis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            data.answer ||
            "Posso te ajudar a entender melhor os empreendimentos e encaminhar seu atendimento.",
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Tive uma instabilidade ao responder agora. Você pode me chamar pelo WhatsApp para receber atendimento direto.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const whatsappText = encodeURIComponent(
    "Olá, Geovana! Vim pela landing page e gostaria de saber mais sobre os empreendimentos Cidade das Águas e Paraíso das Araucárias."
  );

  const whatsappUrl = `https://wa.me/5547988174802?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#1f2933]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#d8b98c]/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#8fb6a7]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a87945]">
              Geovana Oliveira Imóveis
            </p>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8b98c] bg-white/60 px-4 py-2 text-sm text-[#8a6538]">
              <Sparkles size={16} />
              Assistente inteligente para escolha do seu imóvel
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#1f2933] md:text-6xl">
              Encontre o empreendimento ideal para o seu próximo imóvel.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5f6b76]">
              Conheça as oportunidades nos empreendimentos Cidade das Águas e
              Paraíso das Araucárias com atendimento personalizado, análise de
              perfil e direcionamento rápido pelo WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#assistente"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a87945] px-7 py-4 font-semibold text-white transition hover:bg-[#8d6335]"
              >
                Usar assistente
                <ArrowRight size={18} />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1f2933]/15 bg-white px-7 py-4 font-semibold text-[#1f2933] transition hover:bg-[#f1eadf]"
              >
                <MessageCircle size={18} />
                Atendimento direto
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoBadge text="Atendimento consultivo" />
              <InfoBadge text="Opções para morar" />
              <InfoBadge text="Investimento imobiliário" />
            </div>
          </div>

          {/* Hero Images */}
          <div className="grid gap-5">
            <HeroImageCard
              imageSrc="/empreendimentos/cidade-das-aguas/foto-1.jpg"
              logoSrc="/empreendimentos/logos/logo-cda.png"
              title="Cidade das Águas"
              description="Uma oportunidade para quem busca praticidade, conforto e potencial de valorização."
            />

            <HeroImageCard
              imageSrc="/empreendimentos/paraiso-das-araucarias/foto-1.webp"
              logoSrc="/empreendimentos/logos/logo-pda.png"
              title="Paraíso das Araucárias"
              description="Uma opção para quem valoriza natureza, tranquilidade e qualidade de vida."
            />
          </div>
        </div>
      </section>

      {/* Empreendimentos */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#a87945]">
            Empreendimentos
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Conheça as opções em destaque
          </h2>
          <p className="mt-4 text-[#5f6b76]">
            Uma página pensada para gerar interesse, tirar dúvidas iniciais e
            levar o cliente rapidamente para o atendimento comercial.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <EnterpriseCard
            imageSrc="/empreendimentos/cidade-das-aguas/foto-2.jpg"
            logoSrc="/empreendimentos/logos/logo-cda.png"
            icon={<Building2 size={28} />}
            title="Cidade das Águas"
            description="Empreendimento para quem busca praticidade, localização estratégica e uma opção moderna para morar ou investir."
            bullets={[
              "Boa opção para famílias e investidores",
              "Potencial de valorização",
              "Atendimento para simulação e condições",
            ]}
            buttonText="Quero saber sobre o Cidade das Águas"
            whatsappUrl={`https://wa.me/5547988174802?text=${encodeURIComponent(
              "Olá, Geovana! Gostaria de saber mais sobre o empreendimento Cidade das Águas."
            )}`}
          />

          <EnterpriseCard
            imageSrc="/empreendimentos/paraiso-das-araucarias/foto-2.webp"
            logoSrc="/empreendimentos/logos/logo-pda.png"
            icon={<Trees size={28} />}
            title="Paraíso das Araucárias"
            description="Empreendimento com apelo de tranquilidade, contato com a natureza e qualidade de vida para quem busca um novo estilo de morar."
            bullets={[
              "Ambiente com proposta mais tranquila",
              "Ideal para quem busca qualidade de vida",
              "Informações comerciais sob consulta",
            ]}
            buttonText="Quero saber sobre o Paraíso das Araucárias"
            whatsappUrl={`https://wa.me/5547988174802?text=${encodeURIComponent(
              "Olá, Geovana! Gostaria de saber mais sobre o empreendimento Paraíso das Araucárias."
            )}`}
          />
        </div>
      </section>

      {/* Galeria */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#a87945]">
            Galeria dos empreendimentos
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Veja imagens do Cidade das Águas e Paraíso das Araucárias
          </h2>

          <p className="mt-4 text-[#5f6b76]">
            Conheça os detalhes visuais dos empreendimentos e escolha qual
            combina melhor com seu momento de vida ou investimento.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <EmpreendimentoCarousel
            title="Cidade das Águas"
            subtitle="Um empreendimento urbano, moderno e planejado para quem busca praticidade, conforto e valorização."
            location="Cidade das Águas"
            logoSrc="/empreendimentos/logos/logo-cda.png"
            logoAlt="Logo Cidade das Águas"
            images={cidadeDasAguasImages}
          />

          <EmpreendimentoCarousel
            title="Paraíso das Araucárias"
            subtitle="Um condomínio integrado à natureza, com áreas verdes, lago e uma proposta voltada à qualidade de vida."
            location="Paraíso das Araucárias"
            logoSrc="/empreendimentos/logos/logo-pda.png"
            logoAlt="Logo Paraíso das Araucárias"
            images={paraisoDasAraucariasImages}
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white/70 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <Benefit
              title="Atendimento rápido"
              description="O cliente recebe orientação inicial e é direcionado para o WhatsApp."
            />
            <Benefit
              title="Escolha mais segura"
              description="O assistente ajuda a entender o perfil antes do contato comercial."
            />
            <Benefit
              title="Mais conversão"
              description="Reduz a perda de leads que chegam fora do horário comercial."
            />
            <Benefit
              title="Lead mais qualificado"
              description="A corretora recebe o cliente com contexto sobre interesse e perfil."
            />
          </div>
        </div>
      </section>

      {/* Assistente */}
      <section id="assistente" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#a87945]">
              Assistente de imóveis
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Descubra qual empreendimento combina com você.
            </h2>

            <p className="mt-4 text-[#5f6b76]">
              Responda algumas perguntas e receba uma recomendação inicial.
              Depois, fale direto com a Geovana pelo WhatsApp.
            </p>

            <div className="mt-8 space-y-3">
              <QuickQuestion
                text="Quero morar, qual empreendimento combina comigo?"
                onClick={sendMessage}
              />
              <QuickQuestion
                text="Estou buscando investimento, qual opção faz mais sentido?"
                onClick={sendMessage}
              />
              <QuickQuestion
                text="Quero entender valores, entrada e possibilidade de financiamento."
                onClick={sendMessage}
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-black/5 px-4 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a87945] text-white">
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Assistente Geovana Imóveis</h3>
                <p className="text-sm text-[#6b7280]">
                  Online para te orientar
                </p>
              </div>
            </div>

            <div className="h-[430px] space-y-4 overflow-y-auto px-4 py-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-[#1f2933] text-white"
                        : "bg-[#f1eadf] text-[#1f2933]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-[#f1eadf] px-4 py-3 text-sm text-[#1f2933]">
                    Analisando seu perfil...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-black/5 p-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Digite sua dúvida..."
                className="flex-1 rounded-full border border-black/10 bg-[#f7f3ec] px-5 py-3 text-sm outline-none focus:border-[#a87945]"
              />

              <button
                onClick={() => sendMessage()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a87945] text-white transition hover:bg-[#8d6335]"
                aria-label="Enviar mensagem"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="px-4 pb-4">
              <a
                href={whatsappUrl}
                target="_blank"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle size={18} />
                Continuar atendimento pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#1f2933] p-10 text-white md:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#d8b98c]">
                Atendimento personalizado
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Quer receber as informações completas?
              </h2>
              <p className="mt-4 max-w-2xl text-white/75">
                Fale com a Geovana e receba detalhes sobre disponibilidade,
                valores, condições, localização e perfil de cada empreendimento.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-[#1f2933] transition hover:bg-[#f1eadf]"
            >
              Chamar no WhatsApp
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoBadge({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-black/5 bg-white/70 px-4 py-2 text-center text-sm text-[#5f6b76]">
      {text}
    </div>
  );
}

function HeroImageCard({
  imageSrc,
  logoSrc,
  title,
  description,
}: {
  imageSrc: string;
  logoSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl">
      <div className="relative h-[245px] overflow-hidden rounded-[1.5rem]">
        <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex min-h-14 max-w-[180px] items-center justify-center rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
          <img src={logoSrc} alt={`Logo ${title}`} className="max-h-12 w-auto object-contain" />
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm uppercase tracking-[0.25em] text-[#a87945]">
          Empreendimento
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[#1f2933]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5f6b76]">
          {description}
        </p>
      </div>
    </div>
  );
}

function EnterpriseCard({
  imageSrc,
  logoSrc,
  icon,
  title,
  description,
  bullets,
  buttonText,
  whatsappUrl,
}: {
  imageSrc: string;
  logoSrc: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  buttonText: string;
  whatsappUrl: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-xl">
      <div className="relative h-[280px] overflow-hidden">
        <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 flex min-h-14 max-w-[190px] items-center justify-center rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
          <img src={logoSrc} alt={`Logo ${title}`} className="max-h-12 w-auto object-contain" />
        </div>

        <div className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-[#a87945] shadow-lg backdrop-blur">
          {icon}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 leading-relaxed text-[#5f6b76]">{description}</p>

        <div className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 text-[#8fb6a7]" size={18} />
              <p className="text-sm text-[#5f6b76]">{bullet}</p>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f2933] px-6 py-4 font-semibold text-white transition hover:bg-[#111827]"
        >
          {buttonText}
          <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-[#f7f3ec] p-6">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5f6b76]">
        {description}
      </p>
    </div>
  );
}

function QuickQuestion({
  text,
  onClick,
}: {
  text: string;
  onClick: (text: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white px-5 py-4 text-left text-sm font-medium text-[#1f2933] shadow-sm transition hover:bg-[#f1eadf]"
    >
      {text}
      <ArrowRight size={16} />
    </button>
  );
}
