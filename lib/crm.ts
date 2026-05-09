type LeadPayload = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
  sourcePage?: string | null;
  propertyType?: string | null;
  investmentBand?: string | null;
  message?: string | null;
};

export async function sendLeadToCrm(lead: LeadPayload) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const token = process.env.CRM_API_TOKEN;
  const provider = process.env.CRM_PROVIDER || "generic";

  if (!webhookUrl) {
    return {
      sent: false,
      status: "not_configured",
      message: "CRM_WEBHOOK_URL não configurado.",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      provider,
      lead,
      tags: ["site-geovana", "imoveis-alto-padrao", "curadoria-imobiliaria"],
    }),
  });

  const text = await response.text();

  return {
    sent: response.ok,
    status: String(response.status),
    message: text,
  };
}
