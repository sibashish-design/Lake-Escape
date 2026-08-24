"use client";

import Image from "next/image";
import { galleryPhotos } from "@/lib/data";

export function GallerySection() {
  const marqueeItems = [...galleryPhotos, ...galleryPhotos];

  return (
    <section
      id="gallery"
      className="relative w-full bg-[#081218] py-14 sm:py-24 md:py-32 overflow-hidden text-white border-b border-white/[0.12]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-2">
            Visual Portfolio
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
            Life Aboard Lake Escape
          </h2>
        </div>

        <span className="font-sans text-xs font-semibold text-slate-400 tracking-[-0.01em]">
          Horizontal Perspectives
        </span>
      </div>

      {/* Horizontal Marquee Strip */}
      <div className="w-full overflow-hidden">
        <div className="animate-marquee flex gap-3 sm:gap-5 px-4 items-center">
          {marqueeItems.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="relative shrink-0 overflow-hidden rounded-xl border border-white/15 group bg-[#0d1b22]"
              style={{
                width: index % 3 === 0 ? "clamp(200px, 35vw, 500px)" : index % 3 === 1 ? "clamp(140px, 22vw, 320px)" : "clamp(170px, 28vw, 420px)",
                height: "clamp(180px, 25vw, 340px)",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 300px, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081218]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                <span className="font-sans text-xs font-semibold text-white tracking-[-0.01em]">
                  {photo.title}
                </span>
                <span className="font-sans text-[11px] text-slate-300 font-medium">Tehri Lake</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
