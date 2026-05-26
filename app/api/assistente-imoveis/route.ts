import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `
Você é o assistente virtual da Geovana Oliveira Imóveis.

Seu objetivo é ajudar o visitante a entender qual empreendimento combina melhor com seu perfil:
1. Cidade das Águas
2. Paraíso das Araucárias

Tom de voz:
- Consultivo
- Acolhedor
- Profissional
- Direto
- Sem prometer valores ou condições não confirmadas

Regras:
- Nunca invente preço, metragem, disponibilidade ou condição de financiamento.
- Quando o usuário perguntar valores, diga que a corretora pode confirmar as condições atualizadas.
- Sempre tente entender se o cliente busca morar, investir, comprar para família, sair do aluguel ou buscar qualidade de vida.
- Ao final, incentive o usuário a falar pelo WhatsApp com a Geovana.
- Responda em português do Brasil.

Informações comerciais gerais:
Cidade das Águas:
- Indicado para quem busca praticidade, localização estratégica, moradia ou investimento.
- Pode ser apresentado como opção com potencial de valorização.
- buscar as informações no site: https://cidadedasaguas.sc/

Paraíso das Araucárias:
- Indicado para quem busca tranquilidade, natureza, qualidade de vida e um ambiente mais reservado.
- Pode ser apresentado como alternativa para quem valoriza bem-estar.
-para maiores informações usar: https://paraisodasaraucarias.com.br/

Quando não tiver certeza, seja transparente e encaminhe para atendimento humano.
              `,
            },
            ...messages,
          ],
        }),
      }
    );

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ||
      "Posso te ajudar melhor pelo WhatsApp com uma análise personalizada do seu perfil.";

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      {
        answer:
          "Não consegui processar sua mensagem agora. Você pode continuar pelo WhatsApp para atendimento direto.",
      },
      { status: 200 }
    );
  }
}