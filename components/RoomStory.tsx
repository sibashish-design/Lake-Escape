"use client";

import { motion } from "framer-motion";
import { RoomShowcaseItem } from "@/lib/roomShowcaseData";
import { RoomImage } from "./RoomImage";
import { RoomBento } from "./RoomBento";

interface RoomStoryProps {
  room: RoomShowcaseItem;
  index: number;
  isActive: boolean;
  isFirst: boolean;
}

export function RoomStory({ room, index, isActive, isFirst }: RoomStoryProps) {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-12 md:py-20 select-none">

      {/* Editorial Minimal Typography (Floating outside main card) */}
      <div className="w-full max-w-[85vw] md:max-w-[78vw] flex items-center justify-between mb-4 md:mb-6 px-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-charcoal/80 uppercase font-medium">
            {room.tag}
          </span>
          <span className="h-[1px] w-8 bg-charcoal/20 hidden sm:inline-block" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-charcoal/50 uppercase font-light hidden sm:inline-block">
            {room.subtitle}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs md:text-sm tracking-[0.4em] text-charcoal/40 font-light"
        >
          0{index + 1} / 04
        </motion.div>
      </div>

      {/* Main Room Showcase Image Container with Bento reveals */}
      <div className="relative w-[92vw] sm:w-[85vw] md:w-[78vw] max-w-6xl mx-auto">
        <RoomImage
          src={room.primaryImage}
          alt={room.primaryAlt}
          priority={isFirst}
          isMain={true}
          aspect="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
          className="w-full shadow-2xl"
        />

        {/* Floating Asymmetrical Bento Reveal Grid */}
        <RoomBento bentoImages={room.bentoImages} isActive={isActive} />
      </div>

      {/* Minimal Footer Accent Line */}
      <div className="w-full max-w-[85vw] md:max-w-[78vw] mt-6 md:mt-8 flex items-center justify-between px-2">
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">
          LAKE ESCAPE ACCOMMODATIONS
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">
            TEHRI LAKE
          </span>
        </div>
      </div>

    </div>
  );
}
