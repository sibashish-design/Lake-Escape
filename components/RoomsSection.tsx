"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Sparkles, LayoutGrid, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type Room = typeof rooms[0];

export function RoomsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"deluxe" | "suite">("deluxe");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  const deluxeRooms = rooms.filter((r) => r.slug === "sunset-cabin" || r.slug === "mountain-deck-room");
  const signatureSuites = rooms.filter((r) => r.slug === "lake-view-suite" || r.slug === "captains-residence");

  const currentRoomsList = activeTab === "deluxe" ? deluxeRooms : signatureSuites;

  const getLocalizedName = (slug: string) => {
    if (slug === "lake-view-suite") return t.rooms.lakeViewSuite.name;
    if (slug === "sunset-cabin") return t.rooms.sunsetCabin.name;
    if (slug === "mountain-deck-room") return t.rooms.mountainDeck.name;
    return t.rooms.captainsResidence.name;
  };

  const getLocalizedTone = (slug: string) => {
    if (slug === "lake-view-suite") return t.rooms.lakeViewSuite.tone;
    if (slug === "sunset-cabin") return t.rooms.sunsetCabin.tone;
    if (slug === "mountain-deck-room") return t.rooms.mountainDeck.tone;
    return t.rooms.captainsResidence.tone;
  };

  return (
    <section id="rooms" className="section bg-matte-black text-cream border-t border-white/5 py-32">
      <div className="container max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-20 max-w-xl text-center mx-auto">
          <FadeIn delay={0.1} direction="up">
            <p className="font-cursive text-4xl text-gold mb-3 select-none leading-none drop-shadow-sm">{t.rooms.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <h2 className="font-serif text-4xl font-light tracking-wider text-cream md:text-5xl leading-tight">
              {t.rooms.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.3} direction="up">
            <p className="mt-6 font-sans text-sm font-light text-cream/60 leading-relaxed tracking-wide">
              {t.rooms.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Tab switch buttons */}
        <FadeIn delay={0.4} direction="up">
          <div className="flex justify-center border-b border-white/10 mb-20 pb-2 gap-12">
            <button
              onClick={() => setActiveTab("deluxe")}
              className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] pb-3 transition relative ${
                activeTab === "deluxe" ? "text-gold" : "text-cream/40 hover:text-cream"
              }`}
            >
              {t.rooms.deluxe}
              {activeTab === "deluxe" && (
                <motion.div
                  layoutId="activeRoomTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab("suite")}
              className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] pb-3 transition relative ${
                activeTab === "suite" ? "text-gold" : "text-cream/40 hover:text-cream"
              }`}
            >
              {t.rooms.suites}
              {activeTab === "suite" && (
                <motion.div
                  layoutId="activeRoomTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                />
              )}
            </button>
          </div>
        </FadeIn>

        {/* Staggered Vertical List */}
        <div className="flex flex-col gap-24 md:gap-32">
          <AnimatePresence mode="wait">
            {currentRoomsList.map((room, index) => (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
              >
                {/* Media Container */}
                <div className={`w-full md:w-3/5 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-matte-black cursor-pointer" onClick={() => setActiveRoom(room)}>
                    <ParallaxImage src={room.image} alt={getLocalizedName(room.slug)} />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent opacity-50" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-matte-black/20 backdrop-blur-[2px]">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-cream border border-cream/20 px-6 py-3 rounded-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className={`w-full md:w-2/5 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1 md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                  <FadeIn delay={0.1} direction={index % 2 === 1 ? "left" : "right"}>
                    <p className="font-poppins text-[10px] font-bold uppercase tracking-widest text-gold mb-3">
                      {formatCurrency(room.price)} / {t.rooms.night}
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.2} direction={index % 2 === 1 ? "left" : "right"}>
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-cream tracking-wide">
                      {getLocalizedName(room.slug)}
                    </h3>
                  </FadeIn>
                  <FadeIn delay={0.3} direction={index % 2 === 1 ? "left" : "right"}>
                    <div className={`flex gap-3 mt-4 text-cream/50 font-sans text-[9px] font-bold uppercase tracking-widest ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                      <span>{room.size}</span>
                      <span>&mdash;</span>
                      <span>{room.guests === "2 guests" ? `2 ${t.rooms.guests}` : `3 ${t.rooms.guests}`}</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.4} direction={index % 2 === 1 ? "left" : "right"}>
                    <p className="mt-6 font-sans text-xs font-light text-cream/70 leading-relaxed max-w-md">
                      {getLocalizedTone(room.slug)}
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.5} direction={index % 2 === 1 ? "left" : "right"}>
                    <button onClick={() => setActiveRoom(room)} className="mt-8 font-sans text-[10px] font-bold uppercase tracking-widest text-cream flex items-center gap-2 group-hover:text-gold transition">
                      {t.rooms.learnMore} <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeIn>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox / Detail Side Panel Modal (Dark Luxury Theme) */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-end bg-matte-black/80 p-0 md:p-4 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setActiveRoom(null)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 210 }}
              className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-matte-black border-l border-white/5 shadow-2xl md:h-[calc(100vh-32px)] md:rounded-[4px] overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-72 w-full shrink-0 bg-matte-black md:h-96">
                <Image
                  src={activeRoom.image}
                  alt={getLocalizedName(activeRoom.slug)}
                  fill
                  className="image-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                <button
                  type="button"
                  onClick={() => setActiveRoom(null)}
                  className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-cream backdrop-blur-md border border-white/10 hover:bg-black/60 transition"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    Tehri Lake, Uttarakhand
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-light text-cream mt-2 tracking-wide">
                    {getLocalizedName(activeRoom.slug)}
                  </h3>
                  
                  {/* Details strip */}
                  <div className="mt-6 flex flex-wrap gap-6 border-y border-white/10 py-4">
                    <div className="flex items-center gap-2 text-cream/70">
                      <LayoutGrid size={14} className="text-gold" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-widest">{t.rooms.size}: {activeRoom.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cream/70">
                      <Users size={14} className="text-gold" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-widest">{t.rooms.guests}: {activeRoom.guests === "2 guests" ? `2 ${t.rooms.guests}` : `3 ${t.rooms.guests}`}</span>
                    </div>
                  </div>

                  <p className="mt-8 font-sans text-xs font-light text-cream/70 leading-relaxed tracking-wide">
                    {getLocalizedTone(activeRoom.slug)}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mt-12">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream/50 mb-4">
                    {t.rooms.includes}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeRoom.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-sm border border-white/5 bg-white/5 p-3"
                      >
                        <Sparkles size={11} className="text-gold" />
                        <span className="font-sans text-[11px] font-light text-cream/90">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky booking footer inside panel */}
              <div className="border-t border-white/10 bg-matte-black p-6 md:p-8 flex items-center justify-between shrink-0">
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-cream/40 mb-1">Estimated Rate</p>
                  <p className="font-serif text-2xl text-gold font-light">{formatCurrency(activeRoom.price)} <span className="text-xs font-sans text-cream/40">/ {t.rooms.night}</span></p>
                </div>
                <Link
                  href="/booking"
                  onClick={() => setActiveRoom(null)}
                  className="btn btn-primary text-[10px]"
                >
                  {t.rooms.book}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
