"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";
import { ShowreelModal } from "./ShowreelModal";
import { useLanguage } from "@/providers/LanguageProvider";

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
      scale: 0.65,
      opacity: 0,
      y: -50,
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
        {/* Full-bleed ambient video background */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={media.boatOne}
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black/60 via-matte-black/25 to-matte-black/80" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 text-center">
          <div className="mx-auto max-w-3xl flex flex-col items-center justify-center min-h-[50vh]">
            
            {/* Centered Logo text that zooms on scroll */}
            <div className="hero-logo-text select-none cursor-default mb-8">
              <p className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.18em] uppercase font-light text-cream leading-none drop-shadow-sm">
                {t.hero.title}
              </p>
              <div className="h-[1px] w-24 bg-cream/30 mx-auto mt-6" />
            </div>

            {/* Localized Subcopy & Buttons */}
            <div className="space-y-6 max-w-xl mx-auto mt-4">
              <p className="eyebrow text-gold/90 font-medium tracking-[0.25em]">
                {t.hero.eyebrow}
              </p>
              <p className="font-sans text-sm font-light leading-relaxed tracking-wide text-cream/70 md:text-base">
                {t.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setShowreelOpen(true)}
                  className="btn border border-cream/20 bg-cream/10 text-cream backdrop-blur-sm transition hover:bg-cream hover:text-matte-black hover:border-cream"
                  data-cursor="Play"
                >
                  <Play size={12} className="fill-current" /> Play Showreel
                </button>
                <a
                  href="/booking"
                  className="btn btn-olive"
                >
                  {t.nav.book}
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-20 lg:bottom-28 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 transition-colors hover:text-cream"
          aria-label="Scroll down to introduction"
        >
          <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest">Explore</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </section>

      {/* Cinematic Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
}
