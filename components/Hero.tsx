"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";
import { ShowreelModal } from "./ShowreelModal";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  const { t } = useLanguage();
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scale and fade out the centered logo as we scroll down
    gsap.to(".hero-logo-text", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom 30%",
        scrub: 1,
        invalidateOnRefresh: true
      },
      scale: 0.85,
      opacity: 0,
      y: -40,
      ease: "power1.inOut"
    });
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("intro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        className="hero-container relative flex min-h-screen items-center justify-center overflow-hidden bg-matte-black text-cream"
        data-cursor="Explore"
      >
        {/* Full-bleed ambient video background with Ken Burns effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="h-full w-full object-cover opacity-60 animate-kenburns"
            src={media.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={media.boatOne}
          />
        </div>

        {/* Subtle dark gradient overlay for Dark Luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black/70 via-matte-black/40 to-matte-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 text-center">
          <div className="mx-auto max-w-3xl flex flex-col items-center justify-center min-h-[50vh]">
            
            {/* Centered Logo text that zooms on scroll */}
            <div className="hero-logo-text select-none cursor-default relative z-10">
              <FadeIn delay={0.2} duration={1.5}>
                <p className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] tracking-[0.15em] uppercase font-light text-cream leading-none drop-shadow-lg">
                  {t.hero.title}
                </p>
              </FadeIn>
            </div>

            {/* Huge overlapping cursive in Copper */}
            <div className="relative z-20 -mt-6 md:-mt-12 lg:-mt-20 mb-12">
              <FadeIn delay={0.8} direction="up" duration={1.2}>
                <p className="font-cursive text-6xl md:text-[7rem] lg:text-[10rem] text-gold select-none lowercase leading-none drop-shadow-2xl opacity-95 transform -rotate-2">
                  {t.hero.eyebrow}
                </p>
              </FadeIn>
            </div>

            {/* Localized Subcopy & Buttons */}
            <div className="space-y-8 max-w-xl mx-auto mt-4">
              <FadeIn delay={1.0} direction="up" duration={1.2}>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed text-cream/70 md:text-xs max-w-sm mx-auto">
                  {t.hero.subtitle}
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn delay={1.2} direction="up" duration={1.2}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 pt-4">
                  <button
                    onClick={() => setShowreelOpen(true)}
                    className="btn border-fine bg-transparent text-cream backdrop-blur-sm transition-all hover:bg-cream/5"
                    data-cursor="Play"
                  >
                    <Play size={12} className="fill-current" /> Play Showreel
                  </button>
                  <a
                    href="/booking"
                    className="btn btn-primary"
                  >
                    {t.nav.book}
                  </a>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <FadeIn delay={1.8} direction="up" className="absolute bottom-12 lg:bottom-16 left-1/2 z-10 -translate-x-1/2">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-3 text-gold/60 transition-colors hover:text-gold"
            aria-label="Scroll down to introduction"
          >
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em]">Discover</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </FadeIn>
      </section>

      {/* Cinematic Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
}
