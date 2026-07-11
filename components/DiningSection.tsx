"use client";

import Link from "next/link";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function DiningSection() {
  const { t } = useLanguage();

  return (
    <section id="dining" className="bg-matte-black text-cream border-t border-white/5 pt-32 pb-0">
      
      {/* Section Header */}
      <div className="container max-w-7xl px-6 mb-20 text-center mx-auto">
        <FadeIn delay={0.1} direction="up">
          <p className="font-cursive text-4xl text-gold mb-3 select-none leading-none drop-shadow-sm">{t.dining.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.2} direction="up">
          <h2 className="font-serif text-4xl font-light tracking-wider text-cream md:text-5xl leading-tight">
            {t.dining.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.3} direction="up">
          <p className="mt-6 font-sans text-sm font-light text-cream/60 leading-relaxed max-w-2xl mx-auto tracking-wide">
            {t.dining.text}
          </p>
        </FadeIn>
      </div>

      {/* Edge-to-Edge Restaurant Blocks */}
      <div className="flex flex-col w-full">
        
        {/* Restaurant 1: Bistrô */}
        <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
          <ParallaxImage src={media.boatTwo} alt={t.dining.bistro} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent pointer-events-none opacity-80" />
          
          {/* Floating Dark Content Box */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 z-10 container max-w-7xl mx-auto">
            <div className="max-w-xl">
              <FadeIn delay={0.1}>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-cream mb-4">{t.dining.bistro}</h3>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-sm md:text-base font-light text-cream/80 leading-relaxed tracking-wide">
                  {t.dining.bistroDesc}
                </p>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.3} direction="left">
              <Link
                href="/dining"
                className="btn btn-primary bg-gold text-matte-black min-w-[200px]"
              >
                {t.dining.learnMore}
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Restaurant 2: Boulangerie */}
        <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
          <ParallaxImage src={media.sunset} alt={t.dining.boulangerie} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent pointer-events-none opacity-80" />
          
          {/* Floating Dark Content Box */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 z-10 container max-w-7xl mx-auto">
            <div className="max-w-xl">
              <FadeIn delay={0.1}>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-cream mb-4">{t.dining.boulangerie}</h3>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-sm md:text-base font-light text-cream/80 leading-relaxed tracking-wide">
                  {t.dining.boulangerieDesc}
                </p>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.3} direction="left">
              <Link
                href="/dining"
                className="btn btn-primary bg-gold text-matte-black min-w-[200px]"
              >
                {t.dining.learnMore}
              </Link>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
}
