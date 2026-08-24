"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -40,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToContent = () => {
    const target = document.getElementById("manifesto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#081218] text-white pt-28 pb-10"
    >
      {/* Full-bleed Ambient Video Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          className="h-full w-full object-cover object-center opacity-50 animate-kenburns"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/rooms/views/view-1.jpg"
        />
        {/* Clean Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-[#081218]/40 to-[#040a0e]/75" />
      </div>

      {/* Top Spacer */}
      <div />

      {/* Hero Typography — Raleway Bold, Negative Kerning, No Gold */}
      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-[12px] font-semibold text-slate-200 uppercase tracking-[-0.01em]">
              Floating Luxury Resort • Tehri Lake
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.08] tracking-[-0.04em] drop-shadow-xl"
          >
            A New Era of Floating <br />
            <span className="font-black text-slate-100">
              Luxury on Water
            </span>
          </h1>

          <p className="mx-auto max-w-xl font-sans text-sm sm:text-base font-normal text-slate-300 tracking-[-0.01em] leading-relaxed">
            Four bespoke staterooms crafted for those who demand stillness, comfort, and uncompromising luxury on the water.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/booking"
              className="btn btn-primary shadow-lg"
            >
              Reserve Your Stay
            </a>
            <a
              href="#vessel"
              className="btn btn-secondary shadow-md"
            >
              Explore the Vessel
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Information Strip — Clean light grey lines & text */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 pt-8 sm:pt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-white/[0.12]">
        
        {/* Geographic Coordinates */}
        <div className="flex items-center gap-2 text-slate-400 font-sans text-[12px] font-medium tracking-[-0.01em]">
          <Compass size={14} className="text-slate-300" />
          <span>30.4002° N, 78.4357° E • 840m Altitude</span>
        </div>

        {/* Scroll Cue */}
        <button
          onClick={handleScrollToContent}
          className="group flex flex-col items-center gap-1.5 text-slate-400 transition-colors duration-200 hover:text-white"
          aria-label="Scroll down"
        >
          <span className="font-sans text-[11px] font-semibold tracking-[-0.01em]">Scroll</span>
          <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-1 animate-bounce text-slate-300" />
        </button>

        {/* Staterooms count */}
        <div className="hidden sm:block text-slate-400 font-sans text-[12px] font-medium tracking-[-0.01em] text-right">
          <span>4 Private Staterooms • 360° Decks</span>
        </div>

      </div>
    </section>
  );
}
