"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  Check,
  X,
  Play,
  Expand,
  Volume2,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  MEDIA,
  img,
  dreamSlides,
  houseSlides,
  videos,
  specs,
  equipment,
  lifestyle,
  fractions,
  faq,
  gallery,
  allFacades,
} from "./data";

const serif = { fontFamily: "var(--font-ara-serif), Georgia, serif" };

const WHATSAPP_BASE = `https://wa.me/${siteConfig.whatsappNumber}`;
function waLink(text: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}
const WA_DEFAULT = waLink(
  "Olá, Geovana! Vi a página do ARA Entre Jardins, em Campo Alegre, e gostaria de receber mais informações."
);

/* ---------- helpers ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ara-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Vídeo sempre mudo, que só carrega/toca quando aparece na tela. */
function MutedVideo({
  name,
  className = "",
  eager = false,
}: {
  name: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src) v.src = `${MEDIA}/${name}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [name]);

  return (
    <video
      ref={ref}
      className={className}
      poster={`${MEDIA}/${name}-poster.jpg`}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate"
    />
  );
}

function Eyebrow({ n, children, light = false }: { n: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] ${
        light ? "text-[#c9ad83]" : "text-[#8c6d45]"
      }`}
    >
      <span className={light ? "text-[#f3eee4]/60" : "text-[#14231b]/50"}>{n}</span>
      <span className={`h-px w-10 ${light ? "bg-[#c9ad83]/60" : "bg-[#8c6d45]/50"}`} />
      {children}
    </p>
  );
}

/* ---------- page ---------- */

export function AraLanding() {
  useReveal();
  const [houseIdx, setHouseIdx] = useState(0);
  const [fraction, setFraction] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: LbItem[]; index: number } | null>(null);
  const [film, setFilm] = useState<{ src: string; label: string } | null>(null);
  const openLb = (items: LbItem[], index: number) => setLightbox({ items, index });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = houseSlides[houseIdx];
  const nights = fractions.find((f) => f.fraction === fraction)!.nights;

  return (
    <main
      className="bg-[#f3eee4] text-[#14231b] antialiased"
      style={{ fontFamily: "var(--font-ara-sans), system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity 1s ease,transform 1s cubic-bezier(.2,.7,.2,1)}
        [data-reveal].ara-in{opacity:1;transform:none}
        @keyframes araZoom{from{transform:scale(1.08)}to{transform:scale(1)}}
        .ara-zoom{animation:araZoom 14s ease-out both}
        .ara-strike{position:relative}
        .ara-strike::after{content:"";position:absolute;left:-4%;right:-4%;top:52%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .9s ease .3s}
        .ara-in .ara-strike::after{transform:scaleX(1)}
        .ara-noscroll::-webkit-scrollbar{display:none}
        .ara-noscroll{scrollbar-width:none}
        .ara-btn{display:inline-flex!important;align-items:center;justify-content:center;text-align:center;line-height:1;white-space:nowrap}
        .ara-btn .ara-t{margin-right:-0.2em;line-height:1}
        .ara-cta{color:#fff}.ara-cta:hover{color:#14231b;background:#c9ad83}
        .ara-nav a{color:#fff;transition:color .2s}.ara-nav a:hover{color:#d9bf94}
        @media (prefers-reduced-motion: reduce){[data-reveal]{opacity:1;transform:none;transition:none}.ara-zoom{animation:none}}
      ` }} />

      {/* ---------- Header ---------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0f1a14]/90 py-3 backdrop-blur-md" : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#topo" style={{ color: "#ffffff" }} className="flex items-center gap-3 md:gap-4" aria-label="Geovana de Oliveira Imóveis apresenta ARA Entre Jardins">
            {/* no topo o logo aparece grande no hero; ao rolar, vai para o cabeçalho */}
            <span
              className={`flex items-center gap-3 overflow-hidden transition-all duration-500 md:gap-4 ${
                scrolled ? "max-w-[300px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-geovana-claro.png" alt="Geovana de Oliveira Imóveis" style={{ height: 44, width: "auto", flexShrink: 0 }} />
              <span style={serif} className="hidden whitespace-nowrap text-lg italic text-[#c9ad83] sm:inline">
                apresenta
              </span>
              <span className="h-8 w-px shrink-0 bg-[#f3eee4]/25 sm:hidden" />
            </span>
            <span className="flex flex-col leading-none">
              <span style={serif} className="text-2xl font-semibold tracking-[0.25em] md:text-3xl">
                ARA
              </span>
              <span className="mt-1 hidden text-[9px] uppercase tracking-[0.35em] text-[#c9ad83] sm:inline">
                Entre Jardins
              </span>
            </span>
          </a>
          <nav className="ara-nav hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.2em] lg:flex">
            <a href="#casa" className="hover:text-[#c9ad83]">A casa</a>
            <a href="#filmes" className="hover:text-[#c9ad83]">Filmes</a>
            <a href="#localizacao" className="hover:text-[#c9ad83]">Localização</a>
            <a href="#participacao" className="hover:text-[#c9ad83]">Participação</a>
            <a href="#duvidas" className="hover:text-[#c9ad83]">Dúvidas</a>
          </nav>
          <a
            style={{ color: "#ffffff" }}
            href="#contato"
            className="ara-btn ara-cta rounded-full border border-[#c9ad83]/80 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9ad83] hover:text-[#14231b]"
          >
            <span className="ara-t sm:hidden">Contato</span>
            <span className="ara-t hidden sm:inline">Fale com a Geovana</span>
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section
        id="topo"
        className="relative overflow-hidden bg-[#0f1a14]"
        style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
      >
        <img
          src={img("fachada-6")}
          alt="Fachada do ARA Entre Jardins ao entardecer, com fire pit no jardim"
          className="ara-zoom absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.42, objectPosition: "60% center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,18,14,.85) 0%, rgba(10,18,14,.45) 55%, rgba(10,18,14,.15) 100%), linear-gradient(180deg, rgba(10,18,14,.6) 0%, rgba(10,18,14,.1) 40%, rgba(10,18,14,.9) 100%)",
          }}
        />

        <div
          className="relative z-10 mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-24"
          style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "clamp(130px, 16vh, 170px)" }}
        >
          <div className="mb-8 flex items-center gap-4" style={{ marginTop: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-geovana-claro.png"
              alt="Geovana de Oliveira Imóveis"
              style={{ height: "clamp(72px, 7.5vw, 104px)", width: "auto", filter: "drop-shadow(0 4px 18px rgba(0,0,0,.55))" }}
            />
            <span style={{ ...serif, color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,.6)" }} className="text-3xl font-semibold italic md:text-4xl">
              apresenta
            </span>
          </div>
          <p style={{ color: "#d9bf94", textShadow: "0 2px 10px rgba(0,0,0,.6)" }} className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] md:text-sm">
            <MapPin size={16} strokeWidth={2.4} /> Campo Alegre · Santa Catarina
            <span className="mx-1 hidden text-[#f3eee4]/40 sm:inline">|</span><span className="w-full sm:w-auto">Somente 8 casas</span>
          </p>
          <h1
            style={{ ...serif, color: "#ffffff", textShadow: "0 4px 24px rgba(0,0,0,.55)" }}
            className="max-w-5xl text-6xl font-bold leading-[0.98] md:text-8xl lg:text-[7.5rem]"
          >
            Sua casa no campo.
            <br />
            <em style={{ color: "#d9bf94" }}>Outro ritmo.</em>
          </h1>
          <p style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,.6)" }} className="mt-7 max-w-xl text-xl font-medium md:text-2xl">
            Os melhores dias do ano têm um endereço.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#sonho"
              style={{ padding: "16px 32px", gap: 12 }}
              className="ara-btn group gap-3 rounded-full bg-[#c9ad83] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#14231b] transition hover:bg-[#f3eee4]"
            >
              <span className="ara-t">Descubra o ARA</span>
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "16px 32px", gap: 12 }}
              className="ara-btn gap-3 rounded-full border border-[#f3eee4]/60 bg-[#0f1a14]/30 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#f3eee4] backdrop-blur transition hover:border-[#f3eee4]"
            >
              <MessageCircle size={16} /> <span className="ara-t">WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 01 Sonho ---------- */}
      <section id="sonho" className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div data-reveal>
            <Eyebrow n="01">O sonho</Eyebrow>
          </div>
          <div className="ara-noscroll -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
            {dreamSlides.map((s, i) => (
              <figure
                key={s.title}
                data-reveal
                style={{ transitionDelay: `${i * 120}ms` }}
                className="group relative aspect-[3/4] w-[78%] shrink-0 cursor-zoom-in snap-center overflow-hidden rounded-sm md:w-auto"
                onClick={() => openLb(dreamSlides.map((d) => ({ src: img(d.image), caption: d.title })), i)}
              >
                <img src={img(s.image)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-[1.5s] group-hover:scale-105" />
                <ZoomHint />
                <figcaption
                  style={serif}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-2xl italic text-[#f3eee4]"
                >
                  {s.title}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mx-auto mt-28 max-w-4xl text-center" data-reveal>
            <p style={serif} className="text-3xl font-light leading-snug md:text-5xl">
              Ter uma casa de campo é maravilhoso.
              <br />
              <span className="text-[#14231b]/55">Tudo o que vem junto com ela, nem sempre.</span>
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm uppercase tracking-[0.35em] text-[#8c6d45]">
              {["Construir", "Mobiliar", "Cuidar", "Manter"].map((w) => (
                <span key={w} className="ara-strike">
                  {w}
                </span>
              ))}
            </div>
            <p style={serif} className="mt-14 text-2xl italic md:text-4xl">
              E se fosse possível ficar só com a melhor parte?
            </p>
            <p className="mt-4 text-[12px] uppercase tracking-[0.35em] text-[#8c6d45]">Agora, ela existe.</p>
          </div>
        </div>
      </section>

      {/* ---------- Apresentação + logo ---------- */}
      <section className="relative overflow-hidden bg-[#14231b] text-[#f3eee4]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div data-reveal>
            <img src={img("logo-ara")} alt="ARA Entre Jardins — Campo Alegre, SC" className="w-full rounded-sm" loading="lazy" />
          </div>
          <div data-reveal>
            <p style={serif} className="text-3xl font-light leading-snug md:text-4xl">
              Uma casa de campo contemporânea, completa e pronta para viver.
            </p>
            <p className="mt-6 font-light leading-relaxed text-[#f3eee4]/75">
              Arquitetura, jardins e conforto pensados como uma única experiência. Próxima à cachoeira do Salto, em
              Campo Alegre, a residência é entregue totalmente mobiliada, equipada e com enxoval completo.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#c9ad83]/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#c9ad83]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9ad83]" /> Empreendimento exclusivo · somente 8 casas
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px sm:grid-cols-3 overflow-hidden rounded-sm bg-[#f3eee4]/10">
              {specs.map((s) => (
                <div key={s.value} className="bg-[#14231b] p-5">
                  <dt style={serif} className="text-3xl text-[#c9ad83]">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-[#f3eee4]/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- 02 A casa (carrossel) ---------- */}
      <section id="casa" className="bg-[#0f1a14] py-24 text-[#f3eee4] md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <Eyebrow n="02" light>
                A casa
              </Eyebrow>
              <h2 style={serif} className="max-w-xl text-4xl font-light md:text-6xl">
                O luxo de chegar e encontrar tudo pronto.
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                aria-label="Anterior"
                onClick={() => setHouseIdx((houseIdx - 1 + houseSlides.length) % houseSlides.length)}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#f3eee4]/30 transition hover:bg-[#f3eee4] hover:text-[#14231b]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Próximo"
                onClick={() => setHouseIdx((houseIdx + 1) % houseSlides.length)}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#f3eee4]/30 transition hover:bg-[#f3eee4] hover:text-[#14231b]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end" data-reveal>
            <div
              className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-sm"
              onClick={() => openLb(houseSlides.map((h) => ({ src: img(h.image), caption: `${h.tag} — ${h.title}` })), houseIdx)}
            >
              <ZoomHint />
              {houseSlides.map((s, i) => (
                <img
                  key={s.image + i}
                  src={img(s.image)}
                  alt={s.tag}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === houseIdx ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9ad83]">
                {String(houseIdx + 1).padStart(2, "0")} / {String(houseSlides.length).padStart(2, "0")} · {slide.tag}
              </p>
              <h3 style={serif} className="mt-4 text-3xl font-light md:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-4 font-light leading-relaxed text-[#f3eee4]/70">{slide.text}</p>
              <div className="mt-8 flex gap-1.5">
                {houseSlides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir para ${i + 1}`}
                    onClick={() => setHouseIdx(i)}
                    className={`h-[3px] flex-1 rounded-full transition ${i === houseIdx ? "bg-[#c9ad83]" : "bg-[#f3eee4]/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* equipamentos */}
          <div className="mt-24 grid gap-px overflow-hidden rounded-sm bg-[#f3eee4]/10 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((g, i) => (
              <div key={g.title} data-reveal style={{ transitionDelay: `${(i % 3) * 100}ms` }} className="bg-[#0f1a14] p-8">
                <h4 style={serif} className="text-2xl text-[#c9ad83]">
                  {g.title}
                </h4>
                <ul className="mt-5 space-y-3 text-sm font-light text-[#f3eee4]/75">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#c9ad83]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={serif} className="mt-16 text-center text-2xl italic text-[#f3eee4]/80 md:text-3xl" data-reveal>
            Uma casa para viver, não para administrar.
          </p>
        </div>
      </section>

      {/* ---------- Filmes (vídeos sem som) ---------- */}
      <section id="filmes" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow n="03">Filmes</Eyebrow>
            <h2 style={serif} className="text-4xl font-light md:text-6xl">
              Alguns lugares não pedem pressa.
            </h2>
          </div>
          <div className="ara-noscroll -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:px-0">
            {videos.map((v, i) => (
              <figure
                key={v.src}
                data-reveal
                style={{ transitionDelay: `${i * 120}ms` }}
                className="w-[70%] shrink-0 snap-center sm:w-[45%] md:w-auto"
              >
                <button
                  type="button"
                  onClick={() => setFilm(v)}
                  aria-label={`Assistir ${v.label} em tela cheia com som`}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-sm bg-[#14231b] shadow-[0_30px_60px_-30px_rgba(20,35,27,.6)]"
                >
                  <MutedVideo name={v.src} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f3eee4]/85 text-[#14231b] opacity-90 shadow-lg transition group-hover:scale-110 group-hover:opacity-100">
                    <Play size={22} className="ml-1" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#f3eee4] backdrop-blur">
                    <Volume2 size={12} /> Assistir com som
                  </span>
                </button>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.3em] text-[#8c6d45]">{v.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 04 Estilo de vida ---------- */}
      <section className="bg-[#e8dfcf] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-2" data-reveal>
            <div>
              <Eyebrow n="04">Estilo de vida</Eyebrow>
              <h2 style={serif} className="text-4xl font-light md:text-6xl">
                Você não precisa esperar as férias para estar aqui.
              </h2>
            </div>
            <p className="self-end font-light leading-relaxed text-[#14231b]/75">
              Um fim de semana. Um feriado. Alguns dias trabalhando de outro lugar. Uma semana sem pressa. O ARA foi
              pensado para caber em diferentes momentos da vida.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {lifestyle.map((l, i) => (
              <article key={l.title} data-reveal style={{ transitionDelay: `${(i % 2) * 120}ms` }} className="group">
                <div
                  className="relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-sm"
                  onClick={() => openLb(lifestyle.map((x) => ({ src: img(x.image), caption: x.title })), i)}
                >
                  <ZoomHint />
                  <img src={img(l.image)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-[1.5s] group-hover:scale-105" />
                </div>
                <h3 style={serif} className="mt-5 text-2xl md:text-3xl">
                  {l.title}
                </h3>
                <p className="mt-2 font-light text-[#14231b]/70">{l.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 05 Localização ---------- */}
      <section id="localizacao" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <Eyebrow n="05">Localização</Eyebrow>
            <h2 style={serif} className="text-4xl font-light md:text-5xl">
              Perto o suficiente para fazer parte da vida. <em className="text-[#8c6d45]">Longe o bastante para mudar o ritmo.</em>
            </h2>
            <p className="mt-8 font-light leading-relaxed text-[#14231b]/75">
              Na Serra Dona Francisca, entre araucárias, jardins e manhãs frias, o ARA está na região do Salto, a poucos
              minutos do centro de Campo Alegre.
            </p>
            <p className="mt-4 font-light leading-relaxed text-[#14231b]/75">
              Não é uma casa para aquela viagem que acontece uma ou duas vezes por ano. É uma casa para o fim de semana,
              para o feriado, para ficar mais um dia — e para decidir ir de novo, quando você quiser.
            </p>
          </div>
          <div data-reveal className="overflow-hidden rounded-sm border border-[#14231b]/10">
            <iframe
              title="Mapa — Salto, Campo Alegre, SC"
              src="https://www.google.com/maps?q=Cachoeira+do+Salto,+Campo+Alegre+-+SC&z=12&output=embed"
              className="h-[420px] w-full grayscale-[40%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ---------- 06 Participação ---------- */}
      <section id="participacao" className="bg-[#14231b] py-24 text-[#f3eee4] md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow n="06" light>
              Modelo de participação
            </Eyebrow>
            <h2 style={serif} className="text-4xl font-light md:text-6xl">
              Você não precisa investir na casa inteira para viver ela por completo.
            </h2>
            <p className="mt-6 font-light leading-relaxed text-[#f3eee4]/70">
              Escolha uma participação compatível com a maneira como pretende viver sua segunda residência. A experiência
              é inteira. A participação, na medida do uso.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center" data-reveal>
            {/* 8 frações */}
            <div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm border transition-all duration-500 ${
                      i < fraction ? "border-[#c9ad83] bg-[#c9ad83]" : "border-[#f3eee4]/20 bg-transparent"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {fractions.map((f) => (
                  <button
                    key={f.fraction}
                    onClick={() => setFraction(f.fraction)}
                    className={`rounded-full border py-3 text-sm tracking-[0.15em] transition ${
                      fraction === f.fraction
                        ? "border-[#c9ad83] bg-[#c9ad83] text-[#14231b]"
                        : "border-[#f3eee4]/25 hover:border-[#c9ad83]"
                    }`}
                  >
                    {f.fraction}/8
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:pl-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9ad83]">Com {fraction}/8 da casa</p>
              <p style={serif} className="mt-2 text-7xl font-light md:text-9xl">
                {nights}
              </p>
              <p className="text-lg font-light text-[#f3eee4]/80">noites por ano para aproveitar</p>
              <ul className="mt-8 space-y-3 text-sm font-light text-[#f3eee4]/75">
                <li className="flex gap-3"><Check size={15} className="mt-0.5 text-[#c9ad83]" />Fração com matrícula e escritura em seu nome</li>
                <li className="flex gap-3"><Check size={15} className="mt-0.5 text-[#c9ad83]" />Somente 8 casas no empreendimento, com no máximo 8 proprietários cada</li>
                <li className="flex gap-3"><Check size={15} className="mt-0.5 text-[#c9ad83]" />Reservas com menos de 30 dias não descontam da franquia</li>
              </ul>
              <a
                href={waLink(`Olá, Geovana! Tenho interesse em uma participação de ${fraction}/8 no ARA Entre Jardins (${nights} noites/ano). Pode me enviar valores e condições?`)}
                target="_blank"
                rel="noreferrer"
                className="ara-btn mt-10 gap-3 rounded-full bg-[#c9ad83] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#14231b] transition hover:bg-[#f3eee4]"
              >
                <span className="ara-t">Consultar valores de {fraction}/8</span> <ArrowRight size={16} />
              </a>
              <p className="mt-4 text-xs text-[#f3eee4]/45">Direitos de uso e condições conforme os documentos da operação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Renda + gestão ---------- */}
      <section className="grid md:grid-cols-2">
        <div
          className="group relative min-h-[420px] cursor-zoom-in overflow-hidden"
          onClick={() => openLb([{ src: img("spa"), caption: "Piscina aquecida e spa com hidromassagem" }], 0)}
        >
          <ZoomHint />
          <img src={img("spa")} alt="Piscina aquecida e spa à noite" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="bg-[#e8dfcf] px-5 py-20 md:px-16 md:py-28" data-reveal>
          <p style={serif} className="text-2xl italic text-[#8c6d45]">Você aproveita a casa.</p>
          <h2 style={serif} className="mt-2 text-4xl font-light md:text-5xl">
            As noites que sobram <strong className="font-medium">podem gerar renda.</strong>
          </h2>
          <p className="mt-6 font-light leading-relaxed text-[#14231b]/75">
            Nos períodos em que você não pretende usar, sua casa pode receber outros hóspedes — e gerar uma renda
            complementar. Você escolhe as datas; a administradora cuida da locação.
          </p>
          <div className="my-10 h-px bg-[#14231b]/15" />
          <h3 style={serif} className="text-3xl font-light">
            Quando você chega, a casa está pronta. Quando vai embora, alguém continua cuidando dela.
          </h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Preparação", "Limpeza", "Manutenção", "Enxoval", "Organização da estadia"].map((s) => (
              <span key={s} className="rounded-full border border-[#14231b]/20 px-4 py-2 text-xs uppercase tracking-[0.15em]">
                {s}
              </span>
            ))}
          </div>
          <p style={serif} className="mt-8 text-2xl italic">A sua parte é chegar.</p>
        </div>
      </section>

      {/* ---------- Galeria ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 style={serif} className="text-center text-4xl font-light md:text-5xl" data-reveal>
            Arquitetura entre araucárias.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((g, i) => (
              <div
                key={g}
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
                className={`group relative cursor-zoom-in overflow-hidden rounded-sm ${i === 0 ? "col-span-2 row-span-2 aspect-[3/2] md:aspect-auto" : "aspect-[3/2]"}`}
                onClick={() => openLb(allFacades.map((f) => ({ src: img(f), caption: "ARA Entre Jardins — fachada" })), allFacades.indexOf(g))}
              >
                <ZoomHint />
                <img src={img(g)} alt="Fachada do ARA Entre Jardins" loading="lazy" className="h-full w-full object-cover transition duration-[1.5s] group-hover:scale-105" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => openLb(allFacades.map((f) => ({ src: img(f), caption: "ARA Entre Jardins — fachada" })), 0)}
              className="ara-btn gap-3 rounded-full border border-[#14231b]/25 px-6 py-3 text-[11px] uppercase tracking-[0.25em] transition hover:bg-[#14231b] hover:text-[#f3eee4]"
            >
              <Expand size={14} /> <span className="ara-t">Ver as {allFacades.length} imagens</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- 07 FAQ ---------- */}
      <section id="duvidas" className="bg-[#f8f5ef] py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal>
            <Eyebrow n="07">Dúvidas frequentes</Eyebrow>
            <h2 style={serif} className="text-4xl font-light md:text-5xl">
              Tudo o que você precisa saber.
            </h2>
          </div>
          <div className="divide-y divide-[#14231b]/10 border-y border-[#14231b]/10" data-reveal>
            {faq.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span style={serif} className="text-xl md:text-2xl">
                      <span className="mr-4 text-sm text-[#8c6d45]">{String(i + 1).padStart(2, "0")}</span>
                      {f.q}
                    </span>
                    {open ? <Minus size={18} className="shrink-0" /> : <Plus size={18} className="shrink-0" />}
                  </button>
                  <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden font-light leading-relaxed text-[#14231b]/75">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Contato ---------- */}
      <section id="contato" className="relative overflow-hidden bg-[#0f1a14] text-[#f3eee4]">
        <img src={img("fachada-7")} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <Eyebrow n="08" light>
              Fale com uma especialista
            </Eyebrow>
            <h2 style={serif} className="text-4xl font-light md:text-6xl">
              Um projeto pensado para durar mais do que um fim de semana.
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-[#f3eee4]/75">
              Receba valores, condições de pagamento e agende uma apresentação com a Geovana de Oliveira Imóveis.
            </p>
          </div>
          <div data-reveal>
            <LeadCard />
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-[#0a120e] px-5 py-14 text-[#f3eee4]/60 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 text-sm md:grid-cols-3">
            <div>
              <p style={serif} className="text-3xl tracking-[0.25em] text-[#f3eee4]">ARA</p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9ad83]">Entre Jardins · Campo Alegre, SC</p>
            </div>
            <div className="space-y-1">
              <p><span className="text-[#f3eee4]/40">Incorporação e construção:</span> Innpar</p>
              <p><span className="text-[#f3eee4]/40">Administração:</span> ZOZO</p>
              <p><span className="text-[#f3eee4]/40">Comercialização:</span> {siteConfig.name} · CRECI 43844</p>
            </div>
            <div className="space-y-2 md:text-right">
              <a href="/" className="block hover:text-[#c9ad83]">geooliveiraimoveis.com.br</a>
              <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="block hover:text-[#c9ad83]">WhatsApp</a>
              <a href="#topo" className="block hover:text-[#c9ad83]">Voltar ao topo ↑</a>
            </div>
          </div>
          <p className="mt-12 border-t border-[#f3eee4]/10 pt-6 text-[11px] leading-relaxed text-[#f3eee4]/40">
            Imagens meramente ilustrativas. Consulte a empresa responsável para conhecer os projetos e o memorial descritivo
            do empreendimento. Itens de decoração, mobiliário e equipamentos poderão receber ajustes ou substituições,
            preservando o padrão de qualidade. A vegetação é representada em porte adulto; seu desenvolvimento dependerá do
            tempo, das condições ambientais e dos cuidados de manutenção. Direitos de uso e condições conforme os documentos
            da operação.
          </p>
        </div>
      </footer>

      {/* botão flutuante */}
      <a
        href={WA_DEFAULT}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#c9ad83] text-[#14231b] shadow-xl transition hover:scale-105"
      >
        <MessageCircle size={24} />
      </a>
      {lightbox && (
        <Lightbox items={lightbox.items} start={lightbox.index} onClose={() => setLightbox(null)} />
      )}
      {film && <FilmModal src={film.src} label={film.label} onClose={() => setFilm(null)} />}
    </main>
  );
}

/* ---------- formulário ---------- */

function LeadCard() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const fracao = String(fd.get("fracao") || "");
    if (!fd.get("consent")) {
      setError("Confirme o consentimento para continuar.");
      return;
    }
    setError("");
    setStatus("sending");

    const message = [
      "Olá, Geovana! Tenho interesse no ARA Entre Jardins (Campo Alegre).",
      `Nome: ${name}`,
      city && `Cidade: ${city}`,
      fracao && `Participação de interesse: ${fracao}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Abre a janela antes do await para não ser bloqueada como pop-up.
    const win = window.open("", "_blank");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          sourcePage: "/ara-entre-jardins",
          interest: "ARA Entre Jardins - Campo Alegre",
          propertyType: "Casa de campo (fração)",
          message: [city && `Cidade: ${city}`, fracao && `Participação: ${fracao}`].filter(Boolean).join(" | "),
        }),
      });
    } catch {
      // mesmo se o cadastro falhar, o WhatsApp segue abrindo
    }

    const url = waLink(message);
    if (win) win.location.href = url;
    else window.location.href = url;
    setStatus("done");
    form.reset();
  }

  const field =
    "mt-2 w-full rounded-sm border border-[#f3eee4]/20 bg-[#f3eee4]/5 px-4 py-3.5 text-[#f3eee4] placeholder:text-[#f3eee4]/35 outline-none transition focus:border-[#c9ad83]";

  return (
    <form onSubmit={onSubmit} className="rounded-sm border border-[#f3eee4]/15 bg-[#0f1a14]/80 p-7 backdrop-blur md:p-10">
      <label className="block text-[11px] uppercase tracking-[0.25em] text-[#f3eee4]/60">
        Nome
        <input name="name" required minLength={2} className={field} placeholder="Seu nome" />
      </label>
      <label className="mt-5 block text-[11px] uppercase tracking-[0.25em] text-[#f3eee4]/60">
        WhatsApp com DDD
        <input name="phone" required minLength={10} inputMode="tel" className={field} placeholder="(47) 90000-0000" />
      </label>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#f3eee4]/60">
          Cidade (opcional)
          <input name="city" className={field} placeholder="Joinville" />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#f3eee4]/60">
          Participação
          <select name="fracao" className={field} defaultValue="">
            <option value="" className="text-[#14231b]">Ainda não sei</option>
            {fractions.map((f) => (
              <option key={f.fraction} value={`${f.fraction}/8 (${f.nights} noites/ano)`} className="text-[#14231b]">
                {f.fraction}/8 · {f.nights} noites
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-6 flex items-start gap-3 text-xs font-light leading-relaxed text-[#f3eee4]/60">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#c9ad83]" />
        Concordo com o contato sobre o ARA e com o uso dos meus dados para este atendimento.
      </label>
      {error && <p className="mt-3 text-sm text-[#e8a88a]">{error}</p>}
      <button
        disabled={status === "sending"}
        className="ara-btn mt-7 w-full gap-3 rounded-full bg-[#c9ad83] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#14231b] transition hover:bg-[#f3eee4] disabled:opacity-60"
      >
        <MessageCircle size={16} />
        <span className="ara-t">{status === "sending" ? "Enviando..." : "Falar pelo WhatsApp"}</span>
      </button>
      {status === "done" && (
        <p className="mt-4 text-center text-sm text-[#c9ad83]">Recebemos seu contato. Continue a conversa no WhatsApp.</p>
      )}
      <p className="mt-4 text-center text-[11px] text-[#f3eee4]/40">Ao continuar, você será levado ao WhatsApp para enviar sua mensagem.</p>
    </form>
  );
}

/* ---------- ampliação de imagens ---------- */

type LbItem = { src: string; caption?: string };

function ZoomHint() {
  return (
    <span className="pointer-events-none absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-[#f3eee4] opacity-0 backdrop-blur transition group-hover:opacity-100 max-md:opacity-80">
      <Expand size={15} />
    </span>
  );
}

function useModalLock(onClose: () => void, extraKeys?: (e: KeyboardEvent) => void) {
  const closeRef = useRef(onClose);
  const keysRef = useRef(extraKeys);
  closeRef.current = onClose;
  keysRef.current = extraKeys;
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      keysRef.current?.(e);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);
}

function Lightbox({ items, start, onClose }: { items: LbItem[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const touchX = useRef<number | null>(null);
  const n = items.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  useModalLock(onClose, (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
  const item = items[i];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Imagem ampliada"
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a120e]/97"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-[#f3eee4]/70">
        <span className="text-[11px] uppercase tracking-[0.3em]">
          {n > 1 ? `${i + 1} / ${n}` : ""}
        </span>
        <button aria-label="Fechar" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-[#f3eee4]/25 text-[#f3eee4] hover:bg-[#f3eee4] hover:text-[#14231b]">
          <X size={18} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          src={item.src}
          alt={item.caption || ""}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full select-none rounded-sm object-contain shadow-2xl"
          style={{ animation: "araFade .35s ease" }}
        />
        {n > 1 && (
          <>
            <button
              aria-label="Anterior"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[#f3eee4]/25 text-[#f3eee4] hover:bg-[#f3eee4] hover:text-[#14231b] md:grid"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Próxima"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[#f3eee4]/25 text-[#f3eee4] hover:bg-[#f3eee4] hover:text-[#14231b] md:grid"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <p style={serif} className="px-5 py-5 text-center text-lg italic text-[#f3eee4]/80 md:text-xl">
        {item.caption}
      </p>
      <style dangerouslySetInnerHTML={{ __html: "@keyframes araFade{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:none}}" }} />
    </div>
  );
}

/* ---------- vídeo em tela cheia, com a trilha ---------- */

function FilmModal({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  useModalLock(onClose);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      // se o navegador bloquear o som, toca mudo e o usuário ativa nos controles
      v.muted = true;
      v.play().catch(() => {});
    });
    // tenta tela cheia real (desktop/Android); no iPhone o overlay já ocupa a tela
    const box = boxRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    try {
      if (box?.requestFullscreen) box.requestFullscreen().catch(() => {});
      else box?.webkitRequestFullscreen?.();
    } catch {}
    return () => {
      v.pause();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  return (
    <div
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      onClick={onClose}
    >
      <video
        ref={ref}
        src={`${MEDIA}/${src}.mp4`}
        poster={`${MEDIA}/${src}-poster.jpg`}
        controls
        playsInline
        autoPlay
        controlsList="nodownload"
        onClick={(e) => e.stopPropagation()}
        onEnded={onClose}
        className="h-full max-h-[100svh] w-auto max-w-full object-contain"
      />
      <button
        aria-label="Fechar vídeo"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/50 text-[#f3eee4] ring-1 ring-[#f3eee4]/30 backdrop-blur hover:bg-[#f3eee4] hover:text-[#14231b]"
      >
        <X size={18} />
      </button>
      <p className="pointer-events-none absolute left-4 top-6 text-[11px] uppercase tracking-[0.3em] text-[#f3eee4]/70">{label}</p>
    </div>
  );
}
