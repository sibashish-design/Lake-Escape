"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";

export function DesignStorySection() {
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".wellness-parallax-img",
      { yPercent: 0 },
      {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".wellness-parallax-img",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      }
    );
  }, []);

  return (
    <section className="section bg-olive text-cream border-t border-matte-black/5 py-24">
      <div className="container max-w-6xl grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
        
        {/* Left Column: Text Info */}
        <div className="flex flex-col justify-center space-y-6">
          <p className="eyebrow text-gold/90">{t.wellness.eyebrow}</p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-cream md:text-4xl leading-tight">
            {t.wellness.title}
          </h2>
          <p className="font-sans text-xs font-light text-cream/70 leading-relaxed max-w-md">
            {t.wellness.desc}
          </p>

          <div className="flex gap-4 pt-4 font-sans text-[10px] font-bold uppercase tracking-widest text-cream/40">
            <span className="text-gold">{t.wellness.tabs.spa}</span>
            <span>&bull;</span>
            <span className="text-gold">{t.wellness.tabs.pool}</span>
            <span>&bull;</span>
            <span className="text-gold">{t.wellness.tabs.yoga}</span>
          </div>

          <div className="pt-6">
            <Link
              href="/experiences"
              className="btn border border-cream/20 bg-cream/10 text-cream backdrop-blur-sm transition hover:bg-cream hover:text-matte-black hover:border-cream text-[10px] tracking-wider py-2.5 h-auto min-h-0"
            >
              {t.rooms.learnMore} &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Parallax Image */}
        <div className="reveal relative aspect-[16/11] w-full overflow-hidden rounded-[8px] border border-cream/5 bg-matte-black shadow-lg lg:aspect-[1.2/1]">
          <div className="wellness-parallax-img relative h-[120%] w-full -top-[10%]">
            <Image
              src={media.boatOne}
              alt="Lake Escape wellness and yoga deck"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="image-cover opacity-90 object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
