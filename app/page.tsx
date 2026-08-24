import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Layers, Wifi, Wind } from "lucide-react";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { rooms, experiences, galleryPhotos } from "@/lib/data";

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

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6">
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-1">
                Accommodations
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Four Bespoke Staterooms
              </h2>
            </div>

            <Link
              href="/rooms"
              className="coral-btn inline-flex items-center gap-2 group text-white font-semibold text-sm tracking-[-0.01em] self-start md:self-auto"
            >
              <span>View All 4 Staterooms</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/rooms#${room.slug}`}
                className="group bg-[#081218] border border-white/15 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/35 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#040a0e]">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#081218]/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold text-slate-200 uppercase">
                      Suite {room.roomNumber}
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 space-y-1 sm:space-y-2">
                    <span className="font-sans text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
                      {room.category}
                    </span>
                    <h3 className="font-heading text-sm sm:text-xl font-bold text-white tracking-[-0.02em] group-hover:text-slate-200 line-clamp-1">
                      {room.name}
                    </h3>
                    <p className="font-sans text-xs font-normal text-slate-400 line-clamp-2 leading-relaxed hidden sm:block">
                      {room.tone}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-5 pt-0 border-t border-white/[0.08] mt-2 sm:mt-3 flex items-center justify-between">
                  <span className="font-heading text-xs sm:text-sm font-bold text-white">
                    ₹{room.price.toLocaleString("en-IN")}{" "}
                    <span className="text-[9px] sm:text-[10px] font-normal text-slate-400">/ night</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-300 group-hover:text-white flex items-center gap-1">
                    Details <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 04: THE VESSEL TEASER (Links to /vessel) ─── */}
      <section className="relative w-full bg-[#081218] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
                Naval Architecture
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                The 32-Meter Floating Sanctuary
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
              Engineered with silent eco-hybrid propulsion, solar battery arrays, and tri-level panoramic observation decks, Lake Escape delivers pure stillness on Tehri Lake with zero vibration.
            </p>

            <div className="grid grid-cols-2 gap-4 border-y border-white/[0.12] py-4 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2">
                <Wind size={16} className="text-slate-400" />
                <span className="font-semibold">Zero-Emission Propulsion</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-slate-400" />
                <span className="font-semibold">Starlink Maritime 150 Mbps</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-slate-400" />
                <span className="font-semibold">3-Level Viewing Decks</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-slate-400" />
                <span className="font-semibold">VIP Speedboat Transfers</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/vessel" className="btn btn-secondary">
                Explore Naval Architecture
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl group">
              <Image
                src="/images/rooms/suite-room/primary.jpg"
                alt="Lake Escape Architecture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ─── 05: EXPERIENCES & DINING TEASER (Links to /experiences & /dining) ─── */}
      <section className="relative w-full bg-[#0d1b22] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6">
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-1">
                Life on the Lake
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Pursuits & Floating Gastronomy
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/experiences" className="coral-btn text-white font-semibold text-sm tracking-[-0.01em]">
                <span>All Experiences</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/dining" className="coral-btn text-white font-semibold text-sm tracking-[-0.01em]">
                <span>Dining Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <div
                key={exp.id}
                className="bg-[#081218] border border-white/15 rounded-xl p-3 sm:p-6 space-y-3 sm:space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                    <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                  </div>
                  <span className="font-sans text-[10px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
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
                  className="font-sans text-[10px] sm:text-xs font-bold text-white uppercase tracking-[-0.01em] pt-2 flex items-center justify-between border-t border-white/[0.08]"
                >
                  <span>More</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 06: GALLERY PREVIEW (Links to /gallery) ─── */}
      <section className="relative w-full bg-[#081218] py-14 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto space-y-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.12] pb-6">
            <div>
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-1">
                Visual Journal
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
                Interactive Bento Gallery
              </h2>
            </div>

            <Link
              href="/gallery"
              className="btn btn-primary"
            >
              Open Full Interactive Gallery
            </Link>
          </div>

          {/* Quick Bento Teaser Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Link href="/gallery" className="relative rounded-xl overflow-hidden border border-white/15 group md:col-span-2" style={{height: '180px'}}>
              <Image src={galleryPhotos[0].src} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <span className="font-heading text-sm font-bold text-white tracking-tight">Presidential Suite & Decks →</span>
              </div>
            </Link>
            <Link href="/gallery" className="relative rounded-xl overflow-hidden border border-white/15 group" style={{height: '180px'}}>
              <Image src={galleryPhotos[1].src} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <span className="font-heading text-xs font-bold text-white tracking-tight">Overwater Balcony →</span>
              </div>
            </Link>
            <Link href="/gallery" className="relative rounded-xl overflow-hidden border border-white/15 group" style={{height: '180px'}}>
              <Image src={galleryPhotos[2].src} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <span className="font-heading text-xs font-bold text-white tracking-tight">Tehri Lake Reflections →</span>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ─── 07: DIRECT RESERVATIONS FOOTER CTA ─── */}
      <section className="bg-gradient-to-r from-[#0d1b22] to-[#11222c] py-14 sm:py-20 px-6 sm:px-12 border-b border-white/[0.12]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-[-0.01em]">
              Direct Reservations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Begin Your Voyage on Tehri Lake
            </h2>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Check live stateroom availability, explore custom itineraries, or book direct with exclusive Noir privileges.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn btn-primary">
              Reserve Stateroom
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
