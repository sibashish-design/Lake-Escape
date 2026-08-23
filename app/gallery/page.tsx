"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "suites" | "scenery" | "balconies" | "details";
  categoryLabel: string;
  aspect: string;
  sizeClass: string; // Bento span
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/rooms/suite-room/primary.jpg",
    title: "Presidential Master Suite",
    category: "suites",
    categoryLabel: "Signature Stateroom",
    aspect: "aspect-[16/10]",
    sizeClass: "md:col-span-2 md:row-span-2",
    description: "The crown jewel living quarters with wrap-around water panorama."
  },
  {
    id: "gal-2",
    src: "/images/rooms/views/view-1.jpg",
    title: "Morning Mist on Tehri Lake",
    category: "scenery",
    categoryLabel: "Lake Scenery",
    aspect: "aspect-[4/3]",
    sizeClass: "md:col-span-1 md:row-span-1",
    description: "Mirror reflections across the 42 sq km mountain waterway."
  },
  {
    id: "gal-3",
    src: "/images/rooms/room-1/balcony-1.jpg",
    title: "Morning Dew Private Deck",
    category: "balconies",
    categoryLabel: "Overwater Balcony",
    aspect: "aspect-[3/4]",
    sizeClass: "md:col-span-1 md:row-span-2",
    description: "Direct overwater cantilevered terrace facing sunrise."
  },
  {
    id: "gal-4",
    src: "/images/rooms/suite-room/washroom-1.jpg",
    title: "En-Suite Soaking Tub",
    category: "details",
    categoryLabel: "Sanctuary Bath",
    aspect: "aspect-[4/3]",
    sizeClass: "md:col-span-1 md:row-span-1",
    description: "Freestanding panoramic soaking tub overlooking the water."
  },
  {
    id: "gal-5",
    src: "/images/rooms/room-2/primary.jpg",
    title: "Tehri Vista Stateroom",
    category: "suites",
    categoryLabel: "Signature Stateroom",
    aspect: "aspect-[16/9]",
    sizeClass: "md:col-span-2 md:row-span-1",
    description: "Golden hour orientation with natural oak and leather detailing."
  },
  {
    id: "gal-6",
    src: "/images/rooms/views/view-2.jpg",
    title: "Sunset Himalayan Horizon",
    category: "scenery",
    categoryLabel: "Lake Scenery",
    aspect: "aspect-[4/3]",
    sizeClass: "md:col-span-1 md:row-span-1",
    description: "Evening skies over the Garhwal Himalayan ridge."
  },
  {
    id: "gal-7",
    src: "/images/rooms/room-3/primary.jpg",
    title: "Azure Deck Cabin",
    category: "suites",
    categoryLabel: "Signature Stateroom",
    aspect: "aspect-[4/3]",
    sizeClass: "md:col-span-1 md:row-span-1",
    description: "Dual-aspect glass stateroom with direct upper observation deck access."
  },
  {
    id: "gal-8",
    src: "/images/rooms/suite-room/interior-2.jpg",
    title: "Executive Lounge & Salon",
    category: "suites",
    categoryLabel: "Private Salon",
    aspect: "aspect-[16/10]",
    sizeClass: "md:col-span-2 md:row-span-1",
    description: "Spacious relaxation quarters with custom lighting and Bose acoustics."
  },
  {
    id: "gal-9",
    src: "/images/rooms/room-2/balcony-1.jpg",
    title: "Sunset Veranda Seating",
    category: "balconies",
    categoryLabel: "Overwater Balcony",
    aspect: "aspect-[3/4]",
    sizeClass: "md:col-span-1 md:row-span-2",
    description: "Sunken deck lounge crafted for quiet evening wine tastings."
  },
  {
    id: "gal-10",
    src: "/images/rooms/room-1/washroom-1.jpg",
    title: "Morning Dew Artisan Bath",
    category: "details",
    categoryLabel: "Sanctuary Bath",
    aspect: "aspect-[4/3]",
    sizeClass: "md:col-span-1 md:row-span-1",
    description: "Custom stone vanity and high-pressure rainshower."
  },
  {
    id: "gal-11",
    src: "/images/rooms/room-3/interior-2.jpg",
    title: "Azure Stateroom Interior",
    category: "suites",
    categoryLabel: "Signature Stateroom",
    aspect: "aspect-[16/9]",
    sizeClass: "md:col-span-2 md:row-span-1",
    description: "Minimalist Japanese-Scandinavian design with panoramic reservoir glass."
  },
  {
    id: "gal-12",
    src: "/images/rooms/suite-room/balcony-1.jpg",
    title: "360° Wrap-Around Terrace",
    category: "balconies",
    categoryLabel: "Observation Deck",
    aspect: "aspect-[16/10]",
    sizeClass: "md:col-span-2 md:row-span-1",
    description: "Expansive bow deck for private morning yoga and stargazing."
  }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "suites" | "scenery" | "balconies" | "details">("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = filter === "all" ? galleryData : galleryData.filter((item) => item.category === filter);

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const cards = gridContainerRef.current.querySelectorAll(".bento-item");

    // Interactive Scroll Zoom Reaction: subtle initial scale that smoothly settles on scroll
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { scale: 1.04, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    }, gridContainerRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      
      {/* ─── GALLERY HERO ─── */}
      <section className="max-w-[1400px] mx-auto mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
          <Sparkles size={14} className="text-slate-400" />
          <span>Interactive Visual Portfolio</span>
        </div>
        
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.035em]">
          Life Aboard Lake Escape
        </h1>

        <p className="max-w-2xl font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
          An immersive photographic journey across our four bespoke staterooms, panoramic cantilevered balconies, and the tranquil waters of Tehri Lake.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-b border-white/[0.12] pb-4">
          {[
            { id: "all", label: "All Visuals" },
            { id: "suites", label: "Staterooms & Suites" },
            { id: "balconies", label: "Overwater Balconies" },
            { id: "scenery", label: "Lake & Mountains" },
            { id: "details", label: "Artisan Baths" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as "all" | "suites" | "scenery" | "balconies" | "details")}
              className={`font-sans text-xs font-semibold tracking-[-0.01em] px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === tab.id
                  ? "bg-white text-[#081218] font-bold shadow-md"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE BENTO GRID ─── */}
      <section
        ref={gridContainerRef}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]"
      >
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(index)}
            className={`bento-item group relative overflow-hidden rounded-xl border border-white/15 bg-[#0d1b22] cursor-pointer shadow-lg transition-all duration-500 hover:border-white/40 hover:shadow-2xl ${item.sizeClass}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Ambient Dark Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081218]/90 via-[#081218]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 z-10 bg-[#081218]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/15">
              <span className="font-sans text-[10px] font-semibold text-slate-200 tracking-[-0.01em] uppercase">
                {item.categoryLabel}
              </span>
            </div>

            {/* Expand Icon */}
            <div className="absolute top-4 right-4 z-10 h-8 w-8 rounded-md bg-[#081218]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={13} />
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="font-sans text-xs font-normal text-slate-300 line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── FULLSCREEN LIGHTBOX INSPECTION MODAL ─── */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-2xl"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 h-10 w-10 bg-white/15 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition"
            >
              <X size={20} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev === 0 || prev === null ? filteredItems.length - 1 : prev - 1
                );
              }}
              className="absolute left-6 z-50 h-12 w-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition hidden sm:flex"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev === filteredItems.length - 1 || prev === null ? 0 : prev + 1
                );
              }}
              className="absolute right-6 z-50 h-12 w-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition hidden sm:flex"
            >
              <ChevronRight size={24} />
            </button>

            <div
              className="relative w-full max-w-5xl aspect-[16/10] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[activeLightboxIndex]?.src || ""}
                alt={filteredItems[activeLightboxIndex]?.title || ""}
                fill
                priority
                className="object-contain"
              />

              <div className="absolute bottom-4 left-6 right-6 bg-[#081218]/80 backdrop-blur-md p-4 rounded-xl border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-sans text-slate-400 uppercase font-semibold">
                    {filteredItems[activeLightboxIndex]?.categoryLabel}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white tracking-tight">
                    {filteredItems[activeLightboxIndex]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-normal">
                    {filteredItems[activeLightboxIndex]?.description}
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="bg-white text-[#081218] font-sans text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition whitespace-nowrap"
                >
                  Book Stateroom
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA Strip */}
      <section className="max-w-[1400px] mx-auto mt-20 p-8 sm:p-12 rounded-2xl bg-[#0d1b22] border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
            Experience Lake Escape in Person
          </h3>
          <p className="text-sm text-slate-300 font-normal mt-1">
            Reserve your stateroom on Tehri Lake with direct booking privileges.
          </p>
        </div>
        <Link href="/booking" className="btn btn-primary">
          Reserve Stateroom
        </Link>
      </section>

    </main>
  );
}
