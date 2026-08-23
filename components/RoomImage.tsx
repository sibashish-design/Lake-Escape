"use client";

import Image from "next/image";
import { useState } from "react";

interface RoomImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspect?: string;
  caption?: string;
  isMain?: boolean;
}

export function RoomImage({
  src,
  alt,
  className = "",
  priority = false,
  aspect = "aspect-[16/10]",
  caption,
  isMain = false,
}: RoomImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl bg-[#e8e4dc]/50 border border-charcoal/10 shadow-2xl backdrop-blur-sm transition-all duration-700 ${aspect} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={isMain ? "(max-width: 1200px) 90vw, 80vw" : "(max-width: 768px) 50vw, 30vw"}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`object-cover object-center transition-all duration-1000 ease-out group-hover:scale-105 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
          }`}
      />

      {/* Subtle vignette gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-black/10 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Minimal caption tag for bento detail shots */}
      {caption && (
        <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-cream/90 uppercase font-light drop-shadow-md">
            {caption}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/80 animate-pulse" />
        </div>
      )}
    </div>
  );
}
