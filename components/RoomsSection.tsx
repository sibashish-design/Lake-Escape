"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Sparkles, LayoutGrid, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";

type Room = typeof rooms[0];

export function RoomsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"deluxe" | "suite">("deluxe");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  // Group rooms based on categories
  const deluxeRooms = rooms.filter((r) => r.slug === "sunset-cabin" || r.slug === "mountain-deck-room");
  const signatureSuites = rooms.filter((r) => r.slug === "lake-view-suite" || r.slug === "captains-residence");

  const currentRoomsList = activeTab === "deluxe" ? deluxeRooms : signatureSuites;

  // Localized texts helper
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
    <section id="rooms" className="section bg-cream text-matte-black border-t border-matte-black/5">
      <div className="container max-w-6xl">
        
        {/* Section Header (Pulso accommodations title) */}
        <div className="reveal mb-12 max-w-xl">
          <p className="eyebrow mb-3">{t.rooms.eyebrow}</p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
            {t.rooms.title}
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-matte-black/60 leading-relaxed">
            {t.rooms.subtitle}
          </p>
        </div>

        {/* Tab switch buttons (Pulso tab navigation structure) */}
        <div className="flex border-b border-matte-black/10 mb-10 pb-2 gap-8">
          <button
            onClick={() => setActiveTab("deluxe")}
            className={`font-sans text-xs font-semibold uppercase tracking-widest pb-3 transition relative ${
              activeTab === "deluxe" ? "text-olive font-bold" : "text-matte-black/40 hover:text-matte-black"
            }`}
          >
            {t.rooms.deluxe}
            {activeTab === "deluxe" && (
              <motion.div
                layoutId="activeRoomTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-olive"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("suite")}
            className={`font-sans text-xs font-semibold uppercase tracking-widest pb-3 transition relative ${
              activeTab === "suite" ? "text-olive font-bold" : "text-matte-black/40 hover:text-matte-black"
            }`}
          >
            {t.rooms.suites}
            {activeTab === "suite" && (
              <motion.div
                layoutId="activeRoomTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-olive"
              />
            )}
          </button>
        </div>

        {/* Dynamic slides list container */}
        <div className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="wait">
            {currentRoomsList.map((room) => (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="reveal group cursor-pointer overflow-hidden rounded-[8px] border border-matte-black/5 bg-beige/10 hover:shadow-md transition duration-500"
                onClick={() => setActiveRoom(room)}
                data-cursor="View Room"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-matte-black">
                  <Image
                    src={room.image}
                    alt={getLocalizedName(room.slug)}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="image-cover opacity-95 transition-transform duration-[8000ms] ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent opacity-75" />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 right-4 z-20 rounded-full bg-cream/95 px-3 py-1 backdrop-blur-sm border border-matte-black/5">
                    <p className="font-poppins text-[10px] font-bold uppercase tracking-widest text-olive">
                      {formatCurrency(room.price)} / {t.rooms.night}
                    </p>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 relative z-20">
                  <h3 className="font-serif text-xl font-light text-matte-black tracking-wide">
                    {getLocalizedName(room.slug)}
                  </h3>
                  <div className="flex gap-3 mt-2 text-olive font-poppins text-[9px] font-bold uppercase tracking-widest">
                    <span>{room.size}</span>
                    <span>&bull;</span>
                    <span>{room.guests === "2 guests" ? `2 ${t.rooms.guests}` : `3 ${t.rooms.guests}`}</span>
                  </div>
                  <p className="mt-3 font-sans text-xs font-light text-matte-black/65 leading-relaxed line-clamp-2">
                    {getLocalizedTone(room.slug)}
                  </p>
                  <div className="mt-5 pt-3 border-t border-matte-black/5 flex items-center justify-between">
                    <span className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/80 flex items-center gap-1 group-hover:text-olive transition">
                      {t.rooms.learnMore} <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox / Detail Side Panel Modal */}
      <AnimatePresence>
        {activeRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-end bg-matte-black/60 p-0 md:p-4 backdrop-blur-sm"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={() => setActiveRoom(null)} />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 210 }}
              className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-cream shadow-2xl md:h-[calc(100vh-32px)] md:rounded-[12px] overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full shrink-0 bg-matte-black md:h-80">
                <Image
                  src={activeRoom.image}
                  alt={getLocalizedName(activeRoom.slug)}
                  fill
                  className="image-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <button
                  type="button"
                  onClick={() => setActiveRoom(null)}
                  className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-matte-black shadow-lg hover:bg-cream"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div>
                  <span className="font-poppins text-[10px] font-bold uppercase tracking-widest text-olive">
                    Tehri Lake, Uttarakhand
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-matte-black mt-1.5">
                    {getLocalizedName(activeRoom.slug)}
                  </h3>
                  
                  {/* Details strip */}
                  <div className="mt-4 flex flex-wrap gap-4 border-y border-matte-black/5 py-3">
                    <div className="flex items-center gap-2 text-matte-black/70">
                      <LayoutGrid size={14} className="text-olive" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">{t.rooms.size}: {activeRoom.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-matte-black/70">
                      <Users size={14} className="text-olive" />
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">{t.rooms.guests}: {activeRoom.guests === "2 guests" ? `2 ${t.rooms.guests}` : `3 ${t.rooms.guests}`}</span>
                    </div>
                  </div>

                  <p className="mt-6 font-sans text-xs font-light text-matte-black/75 leading-relaxed">
                    {getLocalizedTone(activeRoom.slug)}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mt-8">
                  <h4 className="font-poppins text-[9px] font-bold uppercase tracking-widest text-matte-black/50 mb-3">
                    {t.rooms.includes}
                  </h4>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {activeRoom.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 rounded-[6px] border border-matte-black/5 bg-beige/10 p-2.5"
                      >
                        <Sparkles size={11} className="text-gold" />
                        <span className="font-sans text-xs text-matte-black/80">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky booking footer inside panel */}
              <div className="border-t border-matte-black/5 bg-beige/10 p-6 md:p-8 flex items-center justify-between shrink-0">
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-widest text-matte-black/40">Estimated Rate</p>
                  <p className="font-serif text-xl text-olive font-light">{formatCurrency(activeRoom.price)} <span className="text-xs font-sans text-matte-black/50">/ {t.rooms.night}</span></p>
                </div>
                <Link
                  href="/booking"
                  onClick={() => setActiveRoom(null)}
                  className="btn btn-olive text-[10px] tracking-wider py-2.5 h-auto min-h-0"
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
