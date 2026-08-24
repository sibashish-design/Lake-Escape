"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Layers, Sparkles, Star, Wifi, Wind } from "lucide-react";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { rooms, experiences } from "@/lib/data";

const vesselHighlights = [
  {
    title: "Sky Deck & Starlight Lounge",
    subtitle: "Rooftop Observation Deck",
    image: "/images/rooftop/Rooftop - 1.JPG",
    desc: "360-degree open-air panoramic deck with stargazing telescopes, lounge sunbeds, and outdoor cinema screenings."
  },
  {
    title: "The Panoramic Salon",
    subtitle: "Indoor Air-Conditioned Lounge",
    image: "/images/lounge/Lounge - 1.JPG",
    desc: "Floor-to-ceiling glass sanctuary with plush seating, artisan tea bar, and surround acoustics on the main deck."
  },
  {
    title: "Naval Cockpit & Bridge",
    subtitle: "Precision Navigation",
    image: "/images/hallway/cockpit.JPG",
    desc: "State-of-the-art radar, hybrid electric drive control, and high-precision GPS positioning for smooth anchoring."
  }
];

export default function Home() {
  return (
    <main className="relative bg-[#081218] text-white overflow-hidden font-sans">

      {/* ─── 01: HERO SECTION ─── */}
      <Hero />

      {/* ─── 02: BRAND MANIFESTO ─── */}
      <BrandStatement />

      {/* ─── 03: STATEROOMS TEASER SECTION (Links to /rooms) ─── */}
      <section className="relative w-full bg-[#0d1b22] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto space-y-12">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6"
          >
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-300 uppercase tracking-[-0.01em] block mb-1">
                Accommodations Portfolio
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Four Bespoke Staterooms
              </h2>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-white font-bold text-sm tracking-[-0.01em] hover:text-slate-300 transition-colors group"
            >
              <span>View All 4 Staterooms &amp; Galleries</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {rooms.map((room, idx) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link
                  href={`/rooms#${room.slug}`}
                  className="group bg-[#081218] border border-white/15 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/40 hover:-translate-y-1 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#040a0e]">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#081218]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">
                        Suite {room.roomNumber}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold text-slate-200">
                        {room.gallery.length} Photos
                      </div>
                    </div>

                    <div className="p-3 sm:p-5 space-y-1 sm:space-y-2">
                      <span className="font-sans text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-[-0.01em] block">
                        {room.category}
                      </span>
                      <h3 className="font-heading text-sm sm:text-xl font-bold text-white tracking-[-0.02em] group-hover:text-slate-200 line-clamp-1">
                        {room.name}
                      </h3>
                      <p className="font-sans text-xs font-medium text-slate-300 line-clamp-2 leading-relaxed hidden sm:block">
                        {room.tone}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 pt-0 border-t border-white/[0.1] mt-2 sm:mt-3 flex items-center justify-between">
                    <span className="font-heading text-xs sm:text-sm font-bold text-white">
                      ₹{room.price.toLocaleString("en-IN")}{" "}
                      <span className="text-[9px] sm:text-[10px] font-semibold text-slate-300 lowercase">/ night</span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-white group-hover:underline flex items-center gap-1">
                      View Gallery <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 04: SKY DECK & LOUNGE SHOWCASE ─── */}
      <section className="relative w-full bg-[#081218] py-14 sm:py-24 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6"
          >
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-300 uppercase tracking-[-0.01em] block mb-1">
                On-Board Common Spaces
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Sky Deck, Lounge &amp; Cockpit
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              Designed for immersion—from 360° open-air rooftop sunbeds to climate-controlled panoramic indoor salons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vesselHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="bg-[#0d1b22] border border-white/15 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-white/35 transition-all"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b22] via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-2.5">
                  <span className="font-sans text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs font-normal text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 05: THE VESSEL TEASER (Links to /vessel) ─── */}
      <section className="relative w-full bg-[#0d1b22] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="font-sans text-[12px] font-semibold text-slate-300 uppercase tracking-[-0.01em] block">
                Naval Architecture
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                The 32-Meter Floating Sanctuary
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base font-medium text-slate-200 leading-relaxed tracking-[-0.01em]">
              Engineered with silent eco-hybrid propulsion, solar battery arrays, and tri-level panoramic observation decks, Lake Escape delivers pure stillness on Tehri Lake with zero vibration.
            </p>

            <div className="grid grid-cols-2 gap-4 border-y border-white/[0.12] py-4 text-xs font-sans text-slate-200">
              <div className="flex items-center gap-2">
                <Wind size={16} className="text-slate-300" />
                <span className="font-bold">Zero-Emission Propulsion</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-slate-300" />
                <span className="font-bold">Starlink Maritime 150 Mbps</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-slate-300" />
                <span className="font-bold">3-Level Viewing Decks</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-slate-300" />
                <span className="font-bold">VIP Speedboat Transfers</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/vessel" className="btn btn-secondary text-white border-white/20 hover:bg-white/10">
                Explore Naval Architecture
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl group">
              <Image
                src="/images/boat/Front View.JPG"
                alt="Lake Escape Vessel Front View"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white">
                Front Exterior View
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── 06: EXPERIENCES & DINING TEASER ─── */}
      <section className="relative w-full bg-[#081218] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto space-y-12">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6"
          >
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-300 uppercase tracking-[-0.01em] block mb-1">
                Life on the Lake
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Pursuits &amp; Floating Gastronomy
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/experiences" className="inline-flex items-center gap-1.5 text-white font-bold text-sm tracking-[-0.01em] hover:text-slate-300">
                <span>All Experiences</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/dining" className="inline-flex items-center gap-1.5 text-white font-bold text-sm tracking-[-0.01em] hover:text-slate-300">
                <span>Dining Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {experiences.slice(0, 3).map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#0d1b22] border border-white/15 rounded-xl p-3 sm:p-6 space-y-3 sm:space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                    <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                  </div>
                  <span className="font-sans text-[10px] font-bold text-slate-300 uppercase tracking-[-0.01em] block">
                    {exp.tag}
                  </span>
                  <h3 className="font-heading text-base sm:text-xl font-bold text-white tracking-tight line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-xs font-normal text-slate-300 leading-relaxed hidden sm:block line-clamp-3">
                    {exp.description}
                  </p>
                  <p className="font-sans text-xs font-normal text-slate-300 leading-relaxed sm:hidden line-clamp-2">
                    {exp.text}
                  </p>
                </div>

                <Link
                  href="/experiences"
                  className="font-sans text-[10px] sm:text-xs font-bold text-white uppercase tracking-[-0.01em] pt-2 flex items-center justify-between border-t border-white/[0.1]"
                >
                  <span>More Details</span>
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 07: DIRECT RESERVATIONS FOOTER CTA ─── */}
      <section className="bg-gradient-to-r from-[#0d1b22] to-[#11222c] py-14 sm:py-20 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans text-xs font-semibold text-slate-300 uppercase tracking-[-0.01em]">
              Direct Reservations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Begin Your Voyage on Tehri Lake
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              Check live stateroom availability, explore custom itineraries, or book direct with exclusive Noir privileges.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn btn-primary bg-white text-[#081218] font-bold hover:bg-slate-200">
              Reserve Stateroom
            </Link>
            <Link href="/contact" className="btn btn-secondary text-white border-white/20 hover:bg-white/10">
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
