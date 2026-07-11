"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // Slower counter for luxury feel

      const tick = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease out
        setCount(Math.floor(ease * value));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-3xl font-light text-gold md:text-4xl">
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function IntroSection() {
  const { t } = useLanguage();
  
  const spaces = [
    { image: media.boatOne, name: t.intro.living },
    { image: media.boatTwo, name: t.intro.livingBar },
    { image: media.sunset, name: t.intro.livingGarden }
  ];

  return (
    <section id="intro" className="section bg-matte-black text-cream py-32 relative z-10">
      <div className="container max-w-7xl">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Sticky Text & Stats */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            <div className="relative pt-8 md:pt-12">
              <FadeIn delay={0.1}>
                <p className="font-cursive text-6xl md:text-[7rem] text-gold select-none leading-none drop-shadow-lg absolute -top-4 md:-top-6 -left-4 md:-left-8 z-0 opacity-80 transform -rotate-3">
                  {t.intro.eyebrow}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-4xl font-light tracking-wide text-cream md:text-5xl leading-tight mb-8 relative z-10">
                  Lake Escape Tehri
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="font-sans text-sm md:text-base text-cream/70 leading-relaxed font-light tracking-wide max-w-md">
                  {t.intro.text}
                </p>
              </FadeIn>
            </div>

            {/* Minimalist Stats footer Row */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md">
                <div>
                  <Counter value={4} />
                  <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.2em] text-cream/50 font-bold">
                    {t.intro.statRooms}
                  </p>
                </div>
                <div>
                  <Counter value={2} />
                  <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.2em] text-cream/50 font-bold">
                    {t.intro.statDecks}
                  </p>
                </div>
                <div>
                  <Counter value={5} />
                  <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.2em] text-cream/50 font-bold">
                    {t.intro.statCrew}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Scrolling Parallax Images */}
          <div className="lg:col-span-7 space-y-12 md:space-y-24 mt-12 lg:mt-0">
            {spaces.map((space, index) => (
              <div key={index} className="relative aspect-[4/5] md:aspect-[16/10] w-full rounded-sm overflow-hidden">
                <ParallaxImage src={space.image} alt={space.name} />
                
                {/* Image Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <FadeIn delay={0.2} direction="right">
                    <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold font-semibold">
                      0{index + 1} — {space.name}
                    </p>
                  </FadeIn>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
