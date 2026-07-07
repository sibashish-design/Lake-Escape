"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";

export function DiningSection() {
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Apply vertical parallax scrolling to all cards with .parallax-img class
    const parallaxImages = gsap.utils.toArray(".parallax-img") as HTMLElement[];
    parallaxImages.forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );
    });
  }, []);

  return (
    <section id="dining" className="section bg-olive text-cream border-t border-matte-black/5">
      <div className="container max-w-6xl">
        
        {/* Gastronomy Section Title (Pulso style) */}
        <div className="reveal mb-16 max-w-2xl">
          <p className="eyebrow text-gold/90 mb-3">{t.dining.eyebrow}</p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-cream md:text-4xl leading-tight">
            {t.dining.title}
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-cream/70 leading-relaxed">
            {t.dining.text}
          </p>
        </div>

        {/* Asymmetric Cards Grid (Pulso gastronomia-wrap replica) */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Card 1: Charlô Bistrô style */}
          <div className="reveal flex flex-col gap-5">
            {/* Image Container with Parallax scroll */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[8px] border border-cream/5 bg-matte-black shadow-sm">
              <div className="parallax-img relative h-[120%] w-full -top-[10%]">
                <Image
                  src={media.boatTwo}
                  alt={t.dining.bistro}
                  fill
                  className="image-cover opacity-90 object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
            {/* Content info */}
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-cream">{t.dining.bistro}</h3>
              <p className="font-sans text-xs font-light text-cream/70 leading-relaxed max-w-md">
                {t.dining.bistroDesc}
              </p>
              <div className="pt-2">
                <Link
                  href="/dining"
                  className="font-poppins text-[10px] font-bold uppercase tracking-widest text-gold hover:text-cream transition link-underline"
                >
                  {t.dining.learnMore} &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Cha Cha Boulangerie style */}
          <div className="reveal flex flex-col gap-5 lg:mt-12">
            {/* Image Container with Parallax scroll */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[8px] border border-cream/5 bg-matte-black shadow-sm">
              <div className="parallax-img relative h-[120%] w-full -top-[10%]">
                <Image
                  src={media.sunset}
                  alt={t.dining.boulangerie}
                  fill
                  className="image-cover opacity-90 object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
            {/* Content info */}
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-normal text-cream">{t.dining.boulangerie}</h3>
              <p className="font-sans text-xs font-light text-cream/70 leading-relaxed max-w-md">
                {t.dining.boulangerieDesc}
              </p>
              <div className="pt-2">
                <Link
                  href="/dining"
                  className="font-poppins text-[10px] font-bold uppercase tracking-widest text-gold hover:text-cream transition link-underline"
                >
                  {t.dining.learnMore} &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
