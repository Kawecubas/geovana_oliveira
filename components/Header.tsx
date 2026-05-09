import Image from "next/image";
import Link from "next/link";
import { getWhatsappUrl, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-champagne/30 bg-begeClaro/90 text-cafe shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-champagne/70 bg-white shadow-soft">
            <Image
              src="/images/G.svg"
              alt="Logo Geovana de Oliveira Imóveis"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-semibold tracking-[0.20em] text-cafe">
              GEOVANA
            </p>
            <p className="text-xs uppercase tracking-[0.26em] text-textoSuave">
              Oliveira Imóveis
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-textoSuave transition hover:text-ouroFosco"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={getWhatsappUrl()}
          target="_blank"
          className="rounded-full bg-cafe px-5 py-2.5 text-sm font-semibold text-champagne shadow-soft transition hover:bg-marrom"
        >
          WhatsApp direto
        </a>
      </div>
    </header>
  );
}