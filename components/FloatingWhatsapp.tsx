import { getWhatsappUrl } from "@/lib/site";

export function FloatingWhatsapp() {
  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      aria-label="Contato direto pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-4 font-semibold text-white shadow-2xl shadow-black/25 transition duration-300 hover:scale-105 hover:brightness-110"
    >
      WhatsApp
    </a>
  );
}
