"use client";

import Image from "next/image";
import Link from "next/link";
import { Utensils, Wine, Coffee, Flame } from "lucide-react";
import { cuisines } from "@/lib/data";

export default function DiningPage() {
  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* ─── HERO ─── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
            <Utensils size={14} className="text-slate-400" />
            <span>Floating Deck Gastronomy</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.035em]">
            Culinary Artistry on the Lake
          </h1>

          <p className="font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
            Dine surrounded by mountain waters and morning mist. Our dedicated on-board chef prepares bespoke multi-course menus featuring wild-foraged Garhwali ingredients, wood-fired deck grilling, and international wine pairings.
          </p>
        </section>

        {/* ─── FEATURED BANNER ─── */}
        <section className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0d1b22] shadow-2xl">
          <Image
            src="/images/rooms/suite-room/interior-2.jpg"
            alt="Lake Escape Private Deck Gastronomy"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-[#081218]/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-sans text-xs font-semibold text-slate-300 uppercase tracking-[-0.01em] block">
                Signature On-Board Dining
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Private Chef & Mountain Harvest Menus
              </h2>
            </div>

            <Link href="/booking" className="btn btn-primary">
              Reserve Dining Stay
            </Link>
          </div>
        </section>

        {/* ─── 3 DINING CONCEPTS ─── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Coffee size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Daily Sunrise Breakfast Hamper
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Served directly to your private overwater balcony or the bow observation deck, including fresh cold-pressed hill juices, artisan breads, farm butter, and hot herbal brews.
            </p>
          </div>

          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Flame size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Wood-Fired Deck Grills
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Fresh mountain trout, seasonal organic hill vegetables, and Himalayan marinades grilled over charcoal embers under the evening starlight.
            </p>
          </div>

          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-4 shadow-lg">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Wine size={22} className="text-slate-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
              Curated Sommelier Cellar
            </h3>
            <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              International vintage wines and mountain fruit cocktails tailored to match each course of your personalized on-board tasting menu.
            </p>
          </div>

        </section>

        {/* ─── SAMPLE DISHES LIST ─── */}
        <section className="space-y-6">
          <div className="border-b border-white/[0.12] pb-4">
            <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-[-0.01em] block">
              Sample Culinary Diary
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.025em] mt-0.5">
              Heritage Garhwali & Contemporary Plates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cuisines.map((item) => (
              <div
                key={item.id}
                className="bg-[#0d1b22] border border-white/15 rounded-xl p-5 flex gap-5 items-center shadow-sm"
              >
                <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[-0.01em]">
                    {item.category}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white tracking-[-0.02em]">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs font-normal text-slate-300 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="font-sans text-xs font-bold text-white block pt-1">
                    ₹{item.price} • On-Board Selection
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
