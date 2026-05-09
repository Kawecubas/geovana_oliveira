import Image from "next/image";
import Link from "next/link";
import { getWhatsappUrl, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-cafe px-6 py-12 text-begeClaro lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-champagne/60 bg-begeClaro">
              <Image
                src="/images/logo-geovana.png"
                alt="Logo Geovana de Oliveira Imóveis"
                fill
                className="object-contain p-2"
              />
            </div>

            <div>
              <p className="text-lg font-semibold tracking-[0.22em] text-champagne">
                GEOVANA
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-bege/70">
                Oliveira Imóveis
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm leading-7 text-bege/75">
            Consultoria imobiliária personalizada para lançamentos, imóveis de
            alto padrão e decisões patrimoniais mais seguras.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-champagne">Navegação</h3>
          <div className="mt-4 grid gap-2">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-bege/75 transition hover:text-champagne"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-champagne">Contato direto</h3>
          <p className="mt-4 leading-7 text-bege/75">
            Receba uma seleção personalizada de imóveis de acordo com seu perfil,
            momento de vida e objetivo de investimento.
          </p>

          <a
            href={getWhatsappUrl(
              "Olá, Geovana. Quero falar sobre imóveis de alto padrão."
            )}
            target="_blank"
            className="mt-5 inline-flex rounded-full border border-champagne/60 px-5 py-3 font-semibold text-champagne transition hover:bg-champagne hover:text-cafe"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}