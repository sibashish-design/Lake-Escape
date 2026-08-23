"use client";

import { motion } from "framer-motion";
import { BentoImageItem } from "@/lib/roomShowcaseData";
import { RoomImage } from "./RoomImage";

interface RoomBentoProps {
  bentoImages: BentoImageItem[];
  progress?: number;
  isActive: boolean;
}

export function RoomBento({ bentoImages, isActive }: RoomBentoProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {bentoImages.map((item, idx) => (
        <motion.div
          key={item.src}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={
            isActive
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 30 }
          }
          transition={{
            duration: 0.8,
            delay: idx * 0.15 + 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute pointer-events-auto hidden sm:block ${item.position}`}
        >
          <RoomImage
            src={item.src}
            alt={item.alt}
            aspect={item.aspect}
            caption={item.caption}
            className="shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] transition-shadow duration-500"
          />
        </motion.div>
      ))}

      {/* Mobile stacked bento gallery */}
      <div className="sm:hidden flex flex-col gap-4 mt-6 pointer-events-auto">
        {bentoImages.map((item, idx) => (
          <motion.div
            key={`mobile-${item.src}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <RoomImage
              src={item.src}
              alt={item.alt}
              aspect="aspect-[16/10]"
              caption={item.caption}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
