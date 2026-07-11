"use client";

import Link from "next/link";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function DesignStorySection() {
  const { t } = useLanguage();

  return (
    <section className="section bg-matte-black text-cream border-t border-white/5 py-32">
      <div className="container max-w-7xl grid gap-16 lg:gap-24 lg:grid-cols-2 items-center">
        
        {/* Left Column: Parallax Image */}
        <div className="order-2 lg:order-1 relative aspect-[4/5] lg:aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/5 shadow-2xl">
          <ParallaxImage src={media.boatOne} alt="Lake Escape wellness and yoga deck" />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent pointer-events-none opacity-50" />
        </div>

        {/* Right Column: Text Info */}
        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8 lg:pl-12">
          <FadeIn delay={0.1}>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t.wellness.eyebrow}</p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-4xl font-light tracking-wider text-cream md:text-5xl leading-tight">
              {t.wellness.title}
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="font-sans text-sm font-light text-cream/70 leading-relaxed max-w-md tracking-wide">
              {t.wellness.desc}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-6 pt-4 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/40">
              <span className="text-gold border-b border-gold/30 pb-1">{t.wellness.tabs.spa}</span>
              <span className="text-gold border-b border-gold/30 pb-1">{t.wellness.tabs.pool}</span>
              <span className="text-gold border-b border-gold/30 pb-1">{t.wellness.tabs.yoga}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="pt-8">
              <Link
                href="/experiences"
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream flex items-center gap-3 hover:text-gold transition-colors"
              >
                {t.rooms.learnMore} <span className="text-gold">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
