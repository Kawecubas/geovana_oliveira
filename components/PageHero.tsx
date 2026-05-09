import Link from "next/link";
import { getWhatsappUrl } from "@/lib/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-br from-cafe via-marrom to-[#8A6A3D] px-6 py-20 text-begeClaro lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ouro">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-bege/85">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={getWhatsappUrl()}
            target="_blank"
            className="rounded-full bg-ouro px-7 py-4 text-center font-semibold text-cafe transition hover:bg-ouroFosco"
          >
            Falar com a Geovana
          </a>
          <Link
            href="/curadoria-imobiliaria"
            className="rounded-full border border-bege/40 px-7 py-4 text-center font-semibold text-begeClaro transition hover:bg-white/10"
          >
            Entender a curadoria
          </Link>
        </div>
      </div>
    </section>
  );
}
