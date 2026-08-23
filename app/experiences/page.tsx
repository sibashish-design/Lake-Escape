"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Compass, ShieldCheck, Sparkles, Sun, Utensils, Bike, Wine } from "lucide-react";
import { experiences } from "@/lib/data";

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* ─── HERO ─── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
            <Sparkles size={14} className="text-slate-400" />
            <span>Curated Nautical Pursuits</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.035em]">
            Lake Adventures & Pursuits
          </h1>

          <p className="font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
            Whether you seek sunrise mist sailing, adrenaline-filled jet ski tours, or private 5-course dinners anchored under the unpolluted dark skies of Tehri Lake, every itinerary is tailored around you.
          </p>
        </section>

        {/* ─── EXPERIENCES GRID ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <article
              key={exp.id}
              className="bg-[#0d1b22] border border-white/15 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-white/30 space-y-6 flex flex-col justify-between p-6 sm:p-8"
            >
              <div className="space-y-6">
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#081218] border border-white/10 group">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4 bg-[#081218]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[11px] font-semibold text-slate-200 uppercase tracking-[-0.01em]">
                    0{idx + 1} • {exp.tag}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-sans">
                    <Clock size={14} className="text-slate-400" />
                    <span>Duration: {exp.duration}</span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-white tracking-[-0.025em]">
                    {exp.title}
                  </h2>

                  <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.12] pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase">Complimentary for All Stays</span>
                <Link
                  href="/booking"
                  className="btn btn-primary"
                >
                  Reserve Stay & Pursuit
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* ─── CUSTOM ITINERARIES CARD ─── */}
        <section className="bg-gradient-to-r from-[#0d1b22] to-[#11222c] border border-white/15 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.03em]">
              Looking for a Customized Voyage?
            </h3>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Our reservation concierge can organize helicopter airport transfers, guided Himalayan trekking guides, and private live music ensembles on deck.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary whitespace-nowrap self-start md:self-auto">
            Contact Concierge
          </Link>
        </section>

      </div>
    </main>
  );
}
