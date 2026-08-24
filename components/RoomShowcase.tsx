"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, ChevronLeft, ChevronRight, Expand, Maximize2, Users, X } from "lucide-react";
import { rooms, RoomData } from "@/lib/data";

export function RoomShowcase() {
  const [selectedRoom, setSelectedRoom] = useState<RoomData>(rooms[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoomSelect = (room: RoomData) => {
    setSelectedRoom(room);
    setActiveImageIndex(0);
  };

  return (
    <section
      id="rooms"
      className="relative w-full bg-[#081218] py-14 sm:py-24 md:py-32 px-6 sm:px-12 text-white border-b border-white/[0.12] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-white/[0.12]">
          <div>
            <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-2">
              Accommodations Portfolio
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-[-0.035em]">
              Four Bespoke Staterooms
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className={`font-sans text-xs font-semibold tracking-[-0.01em] px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${selectedRoom.id === room.id
                    ? "bg-white text-[#081218] shadow-sm font-bold"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
              >
                {room.roomNumber} • {room.name.split(" ")[1] || room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Room View */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-10">

          {/* Main Large Visual Display */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/15 bg-[#0d1b22] shadow-2xl group">
              <Image
                src={selectedRoom.gallery[activeImageIndex] || selectedRoom.image}
                alt={selectedRoom.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081218]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#081218]/80 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/15">
                <span className="font-sans text-[11px] font-semibold text-slate-200 tracking-[-0.01em]">
                  Stateroom {selectedRoom.roomNumber} • {selectedRoom.category}
                </span>
              </div>

              {/* Expand View Trigger */}
              <button
                onClick={() => setModalOpen(true)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center bg-[#081218]/80 text-white backdrop-blur-md rounded-md border border-white/15 transition hover:bg-white hover:text-[#081218]"
                title="Expand Gallery"
              >
                <Maximize2 size={14} />
              </button>

              {/* Gallery Arrow Controls */}
              {selectedRoom.gallery.length > 1 && (
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? selectedRoom.gallery.length - 1 : prev - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center bg-[#081218]/80 backdrop-blur-md rounded-md border border-white/15 text-white hover:bg-white hover:text-[#081218] transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === selectedRoom.gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center bg-[#081218]/80 backdrop-blur-md rounded-md border border-white/15 text-white hover:bg-white hover:text-[#081218] transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails Strip */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {selectedRoom.gallery.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative min-w-[25%] aspect-[16/10] overflow-hidden rounded-lg border transition-all duration-200 ${activeImageIndex === idx
                      ? "border-white opacity-100 ring-2 ring-white/50"
                      : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
                Stateroom {selectedRoom.roomNumber}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
                {selectedRoom.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm font-normal text-slate-300 tracking-[-0.01em] leading-relaxed">
                {selectedRoom.description}
              </p>
            </div>

            {/* Room Specs */}
            <div className="grid grid-cols-2 gap-3 border-y border-white/[0.12] py-4 font-sans text-xs font-medium text-slate-300 tracking-[-0.01em]">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-slate-400" />
                <span>{selectedRoom.guests}</span>
              </div>
              <div className="flex items-center gap-2">
                <Expand size={15} className="text-slate-400" />
                <span>{selectedRoom.size}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-slate-200">
                <BedDouble size={15} className="text-slate-400" />
                <span>{selectedRoom.bedType}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-2.5">
              <span className="font-sans text-[11px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block">
                Included Privileges
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-normal text-slate-200 tracking-[-0.01em]">
                {selectedRoom.amenities.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Reservation CTA */}
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/[0.12]">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase text-slate-400 block tracking-[-0.01em]">Estimated Rate</span>
                <p className="font-heading text-2xl font-bold text-white tracking-[-0.02em]">
                  ₹{selectedRoom.price.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-sans font-normal text-slate-400 lowercase">/ night</span>
                </p>
              </div>

              <Link
                href={`/booking?room=${selectedRoom.slug}`}
                className="btn btn-primary"
              >
                Reserve Suite
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-xl"
            onClick={() => setModalOpen(false)}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center bg-white/15 text-white rounded-full hover:bg-white hover:text-black transition"
            >
              <X size={20} />
            </button>

            <div
              className="relative w-full max-w-5xl aspect-[16/10] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedRoom.gallery[activeImageIndex] || selectedRoom.image}
                alt={selectedRoom.name}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
