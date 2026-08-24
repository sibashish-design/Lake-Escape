"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, ArrowRight } from "lucide-react";
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
        y: -30,
        opacity: 0.8,
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

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#081218] text-white pt-28 pb-8 sm:pb-12"
    >
      {/* Full-bleed Ambient Video Loop — Continuous & Optimized */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          className="h-full w-full object-cover object-center opacity-55 scale-105"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={(e) => e.currentTarget.play()}
          poster="/images/rooms/views/view-1.jpg"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-[#081218]/45 to-[#040a0e]/75" />
      </div>

      {/* Top Spacer */}
      <div className="h-4 sm:h-8" />

      {/* Hero Core Layout — Everleeve & Maryculter House Luxury Grid */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          
          {/* Left Main Typography & CTA Pill */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-xs font-medium text-slate-200 uppercase tracking-wide">
                Luxury Floating Resort • Tehri Lake
              </span>
            </div>

            {/* Serif Regular Width Headline (Everleeve & Maryculter House Editorial Style) */}
            <h1
              ref={titleRef}
              className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-normal text-white leading-[1.08] tracking-tight drop-shadow-xl"
            >
              Relax, <br />
              Recharge, <br />
              <span className="text-slate-300/85 font-light italic">
                and reconnect.
              </span>
            </h1>

            <p className="max-w-lg font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-tight">
              Nestled on the serene waters of Tehri Lake, four bespoke floating staterooms engineered for pure stillness, luxury, and unmatched panoramic views.
            </p>

            {/* Left Pill CTA Button */}
            <div className="pt-2">
              <Link
                href="/booking"
                style={{ color: "#081218", backgroundColor: "#ffffff" }}
                className="inline-flex items-center justify-center gap-3 font-sans text-sm font-bold tracking-tight px-8 py-4 rounded-full border border-white shadow-2xl transition-all duration-300 hover:bg-slate-200 hover:scale-105 group"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Side Floating Glass Video Card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-3.5 shadow-2xl space-y-3 group hover:border-white/40 transition-all duration-300">
              
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
                <Image
                  src="/images/rooftop/Rooftop - 1.JPG"
                  alt="Lake Escape Starlight Lounge Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} className="fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-1 space-y-1">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-300 block">
                  On-Board Preview
                </span>
                <p className="font-sans text-xs font-normal text-slate-200 leading-relaxed">
                  Nestled in serene Himalayan waters, our floating suites offer modern comfort surrounded by breathtaking lake views.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Information Strip — Social Proof Left & Tag Pills Right */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-12 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 mt-8">

        {/* Left Social Proof (Avatars + Text) */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#081218] object-cover"
              src="/images/rooms/room-1/Room - interior - 1.JPG"
              alt="Guest avatar"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#081218] object-cover"
              src="/images/rooms/room-2/Room 2 Interior - 1.JPG"
              alt="Guest avatar"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#081218] object-cover"
              src="/images/rooms/room-3/Room3 Interior - 1.JPG"
              alt="Guest avatar"
            />
          </div>
          <div className="text-left font-sans text-xs">
            <span className="font-medium text-slate-300 block">Booked by over</span>
            <span className="font-bold text-white">500+ luxury guests</span>
          </div>
        </div>

        {/* Right Pill Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-sans text-xs font-semibold text-slate-200 backdrop-blur-md">
            Serenity
          </span>
          <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-sans text-xs font-semibold text-slate-200 backdrop-blur-md">
            Sanctuary
          </span>
          <span className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-sans text-xs font-semibold text-slate-200 backdrop-blur-md">
            Overwater Haven
          </span>
        </div>

      </div>
    </section>
  );
}

