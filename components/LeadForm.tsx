"use client";

import { useState } from "react";

type LeadFormProps = {
  sourcePage: string;
  interest?: string;
};

export function LeadForm({ sourcePage, interest }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      propertyType: String(formData.get("propertyType") || ""),
      investmentBand: String(formData.get("investmentBand") || ""),
      message: String(formData.get("message") || ""),
      sourcePage,
      interest,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setErrorMessage("Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-begeClaro p-6 text-cafe shadow-xl">
      <label className="text-sm font-semibold">Nome</label>
      <input
        name="name"
        required
        className="mt-2 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
        placeholder="Seu nome"
      />

      <label className="mt-4 block text-sm font-semibold">WhatsApp</label>
      <input
        name="phone"
        required
        className="mt-2 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
        placeholder="(00) 00000-0000"
      />

      <label className="mt-4 block text-sm font-semibold">E-mail</label>
      <input
        name="email"
        type="email"
        className="mt-2 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
        placeholder="seuemail@exemplo.com"
      />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold">Tipo de imóvel</label>
          <select
            name="propertyType"
            className="mt-2 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
          >
            <option value="">Selecione</option>
            <option value="Lançamento">Lançamento</option>
            <option value="Apartamento alto padrão">Apartamento alto padrão</option>
            <option value="Casa em condomínio">Casa em condomínio</option>
            <option value="Investimento">Investimento</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold">Faixa de investimento</label>
          <select
            name="investmentBand"
            className="mt-2 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
          >
            <option value="">Selecione</option>
            <option value="Até R$ 800 mil">Até R$ 800 mil</option>
            <option value="R$ 800 mil a R$ 1,5 mi">R$ 800 mil a R$ 1,5 mi</option>
            <option value="R$ 1,5 mi a R$ 3 mi">R$ 1,5 mi a R$ 3 mi</option>
            <option value="Acima de R$ 3 mi">Acima de R$ 3 mi</option>
          </select>
        </div>
      </div>

      <label className="mt-4 block text-sm font-semibold">O que você procura?</label>
      <textarea
        name="message"
        className="mt-2 min-h-28 w-full rounded-2xl border border-[#D7C4A5] bg-white px-4 py-3 outline-none focus:border-[#8A6A3D]"
        placeholder="Ex.: lançamento alto padrão, casa em condomínio, apartamento com vista..."
      />

      <button
        disabled={status === "sending"}
        className="mt-5 w-full rounded-full bg-cafe px-6 py-4 font-semibold text-ouro transition hover:bg-marrom disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Enviando..." : "Enviar interesse"}
      </button>

      {status === "success" && (
        <p className="mt-4 rounded-2xl bg-green-100 px-4 py-3 text-sm text-green-800">
          Interesse enviado com sucesso. A Geovana poderá retornar pelo WhatsApp.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
