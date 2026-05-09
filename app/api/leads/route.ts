import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendLeadToCrm } from "@/lib/crm";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  phone: z.string().min(8, "Informe um telefone ou WhatsApp válido."),
  email: z.string().email("Informe um e-mail válido.").optional().or(z.literal("")),
  interest: z.string().optional(),
  sourcePage: z.string().optional(),
  propertyType: z.string().optional(),
  investmentBand: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        interest: data.interest || null,
        sourcePage: data.sourcePage || null,
        propertyType: data.propertyType || null,
        investmentBand: data.investmentBand || null,
        message: data.message || null,
      },
    });

    try {
      const crm = await sendLeadToCrm(lead);
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          crmStatus: crm.sent ? "sent" : crm.status,
          crmResponse: crm.message,
        },
      });
    } catch (crmError) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          crmStatus: "crm_error",
          crmResponse:
            crmError instanceof Error ? crmError.message : "Erro desconhecido no CRM.",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      message: "Lead cadastrado com sucesso.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, message: "Erro ao cadastrar lead." },
      { status: 500 }
    );
  }
}
