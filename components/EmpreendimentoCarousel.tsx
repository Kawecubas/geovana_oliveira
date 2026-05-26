"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export type CarouselImage = {
  src: string;
  alt: string;
};

type EmpreendimentoCarouselProps = {
  title: string;
  subtitle: string;
  location?: string;
  logoSrc?: string;
  logoAlt?: string;
  images: CarouselImage[];
};

export function EmpreendimentoCarousel({
  title,
  subtitle,
  location,
  logoSrc,
  logoAlt,
  images,
}: EmpreendimentoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return null;
  }

  const currentImage = images[currentIndex];

  function previousImage() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function nextImage() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-xl">
      <div className="relative h-[320px] overflow-hidden md:h-[430px]">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="h-full w-full object-cover transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {logoSrc && (
          <div className="absolute left-5 top-5 flex min-h-16 max-w-[210px] items-center justify-center rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
            <img
              src={logoSrc}
              alt={logoAlt || title}
              className="max-h-14 w-auto object-contain"
            />
          </div>
        )}

        <button
          type="button"
          onClick={previousImage}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2933] shadow-lg transition hover:bg-white"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={nextImage}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2933] shadow-lg transition hover:bg-white"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d8c39a]">
            Empreendimento
          </p>

          <h3 className="mt-2 text-3xl font-bold">{title}</h3>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
            {subtitle}
          </p>

          {location && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <MapPin size={16} />
              {location}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto p-4">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.src}
            onClick={() => setCurrentIndex(index)}
            className={`h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${
              currentIndex === index
                ? "border-[#a87945] ring-2 ring-[#a87945]/30"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`Selecionar imagem ${index + 1} de ${title}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
