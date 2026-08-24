"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Check, Expand, Sparkles, Users, ArrowRight } from "lucide-react";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({
    "room-1": 0,
    "room-2": 0,
    "room-3": 0,
    "room-4": 0,
  });

  const handleThumbnailClick = (roomId: string, index: number) => {
    setActiveImageMap((prev) => ({
      ...prev,
      [roomId]: index,
    }));
  };

  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* ─── PAGE HERO ─── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
            <Sparkles size={14} className="text-slate-400" />
            <span>Accommodations Portfolio</span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.035em]">
            Four Bespoke Staterooms
          </h1>

          <p className="font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
            Each stateroom on Lake Escape is an individually curated floating sanctuary, blending warm natural cedar finishes, floor-to-ceiling panoramic glass, and private cantilevered balconies over Tehri Lake.
          </p>
        </section>

        {/* ─── SUITES SHOWCASE LIST ─── */}
        <section className="space-y-16">
          {rooms.map((room, index) => {
            const currentImgIndex = activeImageMap[room.id] || 0;
            const isReversed = index % 2 === 1;

            return (
              <article
                key={room.id}
                id={room.slug}
                className="bg-[#0d1b22] rounded-2xl border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8"
              >
                {/* Suite Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.12] pb-6">
                  <div>
                    <span className="font-sans text-[11px] font-bold text-slate-400 uppercase block tracking-[-0.01em]">
                      Stateroom {room.roomNumber} • {room.category}
                    </span>
                    <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-[-0.03em] mt-0.5">
                      {room.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-[-0.01em]">
                        From
                      </span>
                      <p className="font-heading text-2xl font-bold text-white tracking-tight">
                        ₹{room.price.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-sans font-normal text-slate-400 lowercase">/ night</span>
                      </p>
                    </div>

                    <Link
                      href={`/booking?room=${room.slug}`}
                      className="btn btn-primary whitespace-nowrap"
                    >
                      Reserve Suite
                    </Link>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Left Column: Interactive Image Gallery Carousel */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#081218] shadow-md group">
                      <Image
                        src={room.gallery[currentImgIndex] || room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081218]/80 via-transparent to-transparent opacity-40" />
                      
                      {/* Photo Counter */}
                      <div className="absolute bottom-4 left-4 z-10 bg-[#081218]/85 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[11px] font-bold text-slate-200">
                        Photo {currentImgIndex + 1} of {room.gallery.length}
                      </div>

                      {/* Carousel Arrow Controls */}
                      {room.gallery.length > 1 && (
                        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleThumbnailClick(
                                room.id,
                                currentImgIndex === 0 ? room.gallery.length - 1 : currentImgIndex - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center bg-[#081218]/85 backdrop-blur-md rounded-md border border-white/15 text-white hover:bg-white hover:text-black transition"
                            title="Previous Photo"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() =>
                              handleThumbnailClick(
                                room.id,
                                currentImgIndex === room.gallery.length - 1 ? 0 : currentImgIndex + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center bg-[#081218]/85 backdrop-blur-md rounded-md border border-white/15 text-white hover:bg-white hover:text-black transition"
                            title="Next Photo"
                          >
                            ›
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Carousel Scroll Strip */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {room.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => handleThumbnailClick(room.id, i)}
                          className={`relative min-w-[20%] aspect-[16/10] overflow-hidden rounded-lg border transition-all duration-200 shrink-0 ${
                            currentImgIndex === i
                              ? "border-white ring-2 ring-white/50 opacity-100"
                              : "border-white/15 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt={`Gallery thumb ${i + 1}`} fill className="object-cover" sizes="15vw" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Suite Specifications & Amenities */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-heading text-xl font-bold text-white tracking-[-0.02em]">
                        The Sanctuary Experience
                      </h3>
                      <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
                        {room.description}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-3.5 border-y border-white/[0.12] py-4 text-xs font-sans text-slate-300">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-semibold">{room.guests}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Expand size={16} className="text-slate-400" />
                        <span className="font-semibold">{room.size}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <BedDouble size={16} className="text-slate-400" />
                        <span className="font-semibold">{room.bedType}</span>
                      </div>
                    </div>

                    {/* Amenities List */}
                    <div className="space-y-2.5">
                      <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-[-0.01em] block">
                        Included Privileges & Features
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-200">
                        {room.amenities.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <Check size={14} className="text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/booking?room=${room.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-slate-300 tracking-[-0.01em] uppercase border-b border-white pb-1 transition"
                      >
                        <span>Check Availability for {room.name}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </section>

        {/* ─── WHOLE BOAT BUYOUT OPTION ─── */}
        <section className="bg-gradient-to-r from-[#0d1b22] to-[#11222c] border border-white/15 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-[-0.01em]">
              Private Charter & Buyout
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.03em]">
              Reserve the Entire Floating Resort
            </h2>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Secure all four staterooms exclusively for family celebrations, intimate corporate retreats, or private luxury escapes with dedicated chef and vessel crew.
            </p>
          </div>

          <Link href="/contact" className="btn btn-primary whitespace-nowrap self-start md:self-auto">
            Inquire Whole Boat Buyout
          </Link>
        </section>

      </div>
    </main>
  );
}
