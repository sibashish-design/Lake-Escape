"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Layers, Radio, Wind } from "lucide-react";

export default function VesselPage() {
  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* ─── HERO ─── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
            <Compass size={14} className="text-slate-400" />
            <span>Naval Architecture & Engineering</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.035em]">
            The Floating Resort
          </h1>

          <p className="font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
            Lake Escape is a 32-meter bespoke floating sanctuary crafted specifically for the calm alpine waters of Tehri Lake, Uttarakhand. Engineered for zero-emission quietness, extreme structural stability, and 360-degree panoramic comfort.
          </p>
        </section>

        {/* ─── MAIN VESSEL ARCHITECTURE VISUAL CARD ─── */}
        <section className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0d1b22] shadow-2xl">
          <Image
            src="/images/rooms/suite-room/primary.jpg"
            alt="Lake Escape Luxury Floating Resort Architecture"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-[#081218]/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-sans text-xs font-semibold text-slate-300 uppercase tracking-[-0.01em] block">
                Flagship Vessel
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Lake Escape I • 32 Meters
              </h2>
            </div>

            <Link href="/booking" className="btn btn-primary">
              Reserve Your Stay
            </Link>
          </div>
        </section>

        {/* ─── 3 CORE ENGINEERING PILLARS ─── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Wind size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Silent Eco-Hybrid Propulsion
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Powered by advanced marine solar battery arrays and auxiliary silent generators, ensuring complete acoustic stillness at anchor and zero disturbance to mountain wildlife.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Layers size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Tri-Level Observation Decks
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Three distinct floating levels: private lower stateroom decks, an executive dining salon, and an upper 360-degree observation deck with high-powered stargazing optics.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Radio size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Starlink Maritime Connectivity
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Uninterrupted high-speed low-latency satellite internet across all staterooms and decks, allowing seamless remote work and live connectivity even in remote mountain bays.
            </p>
          </div>

        </section>

        {/* ─── FULL TECHNICAL SPECIFICATIONS MATRIX ─── */}
        <section className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="border-b border-white/[0.12] pb-4">
            <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-[-0.01em] block">
              Technical Documentation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.025em] mt-0.5">
              Vessel Specifications & Amenities Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-sans">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Length Overall</span>
              <p className="text-base font-bold text-white">32 Meters / 105 Feet</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Cruising Waterway</span>
              <p className="text-base font-bold text-white">Tehri Lake, Uttarakhand (840m Elevation)</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Guest Capacity</span>
              <p className="text-base font-bold text-white">4 Private Staterooms (Up to 10 Guests)</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Boarding Transfer</span>
              <p className="text-base font-bold text-white">Dedicated Twin-Engine VIP Speedboat</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Power Management</span>
              <p className="text-base font-bold text-white">Solar Photovoltaic + Lithium Energy Storage</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Safety & Nav</span>
              <p className="text-base font-bold text-white">Garmin Sonar & Full Marine Safety Certified</p>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA ─── */}
        <section className="bg-gradient-to-r from-[#0d1b22] to-[#11222c] border border-white/15 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Board Lake Escape?
            </h3>
            <p className="text-sm text-slate-300 font-normal mt-1">
              Check real-time stateroom availability or plan a private whole-boat charter.
            </p>
          </div>
          <Link href="/booking" className="btn btn-primary whitespace-nowrap">
            Check Availability
          </Link>
        </section>

      </div>
    </main>
  );
}
