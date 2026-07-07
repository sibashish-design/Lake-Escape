"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { media } from "@/lib/data";

const images = [
  media.boatOne,
  media.sunset,
  media.boatTwo,
  media.boatOne,
  media.sunset,
  media.boatTwo,
  media.boatOne,
  media.sunset
];

export default function GalleryPage() {
  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <PageHero 
        eyebrow="Gallery" 
        title="A visual journal from Tehri Lake." 
        text="Moments captured on and around the boat: morning reflections, warm evenings, and local adventures across Tehri Lake, Uttarakhand." 
      />

      {/* Grid Section */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[280px]">
            {images.map((image, index) => (
              <div 
                className={`reveal group relative overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black ${
                  index % 3 === 0 ? "md:row-span-2" : ""
                } ${index === 5 ? "md:col-span-2" : ""}`} 
                key={`${image}-${index}`}
                data-cursor="Zoom View"
              >
                {/* Ken Burns image zooming */}
                <div className="relative h-full w-full overflow-hidden">
                  <Image 
                    src={image} 
                    alt="Lake Escape luxury scenery view" 
                    fill 
                    className="image-cover opacity-90 transition-transform duration-[10000ms] ease-out group-hover:scale-108 animate-kenburns" 
                    sizes="(max-width: 768px) 100vw, 25vw" 
                  />
                </div>

                {/* Darken Overlay */}
                <div className="absolute inset-0 bg-matte-black/10 transition duration-500 group-hover:bg-matte-black/30" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
