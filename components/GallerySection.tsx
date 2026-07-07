"use client";

import Image from "next/image";
import { media } from "@/lib/data";

interface GalleryItem {
  src: string;
  alt: string;
  spanClass: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: media.boatOne,
    alt: "Lake Escape floating hotel exterior in morning mist",
    spanClass: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
    category: "Architecture"
  },
  {
    src: media.sunset,
    alt: "Tehri Lake mountain peaks at golden hour",
    spanClass: "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto",
    category: "Landscape"
  },
  {
    src: media.boatTwo,
    alt: "Private deck lounge overlooking the lake",
    spanClass: "md:col-span-1 md:row-span-1 aspect-[1.2/1] md:aspect-auto",
    category: "Interiors"
  },
  {
    src: media.boatOne,
    alt: "Speedboat transit towards Lake Escape",
    spanClass: "md:col-span-1 md:row-span-1 aspect-[1.2/1] md:aspect-auto",
    category: "Adventure"
  },
  {
    src: media.sunset,
    alt: "Candlelit dining table setup on the outer deck",
    spanClass: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto",
    category: "Dining"
  },
  {
    src: media.boatTwo,
    alt: "Morning tea served on a private balcony",
    spanClass: "md:col-span-1 md:row-span-1 aspect-[1.2/1] md:aspect-auto",
    category: "Lifestyle"
  }
];

export function GallerySection() {
  return (
    <section id="gallery" className="section bg-cream text-matte-black border-t border-matte-black/5">
      <div className="container">
        {/* Section Header */}
        <div className="reveal mb-16 max-w-xl">
          <p className="eyebrow mb-4">Visual Stills</p>
          <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
            Cinematic moments on the lake.
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-matte-black/60 leading-relaxed">
            Stills from Tehri Lake capturing the architecture of our boat, the shifting mountain lights, and local adventures.
          </p>
        </div>

        {/* Masonry-like Staggered Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px]">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`reveal group relative overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black ${item.spanClass}`}
              data-cursor="Zoom View"
            >
              {/* Image Container with Ken Burns effect */}
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="image-cover opacity-85 transition-transform duration-[12000ms] ease-out group-hover:scale-108 animate-kenburns"
                />
              </div>

              {/* Hover Overlay Detail */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-matte-black/80 via-matte-black/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold">
                  {item.category}
                </p>
                <h3 className="font-serif text-base font-light text-cream mt-1 leading-snug">
                  {item.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
