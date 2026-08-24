"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0.3, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full min-h-[60vh] sm:min-h-[75vh] flex items-center justify-center bg-[#081218] overflow-hidden py-16 sm:py-24 md:py-32 px-6 sm:px-12 border-t border-b border-white/[0.12]"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d1b22] via-[#081218] to-[#040a0e] opacity-80" />

      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
      >
        <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
          Brand Manifesto
        </span>

        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.12] tracking-[-0.035em]">
          A sanctuary on the water sculpted to reflect the essence of tranquility.
        </h2>

        <div className="max-w-2xl mx-auto pt-2">
          <p className="font-sans text-sm sm:text-base font-normal text-slate-300 tracking-[-0.01em] leading-relaxed">
            Lake Escape is an uncompromising expression of luxury hospitality on water. Designed for travelers who seek stillness in the mountains and accept no substitutes.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/#rooms"
            className="coral-btn inline-flex items-center gap-2 group text-white font-semibold text-sm tracking-[-0.01em] border-b border-slate-400 pb-1 hover:border-white transition"
          >
            <span>Explore the Staterooms</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
