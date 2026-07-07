"use client";

import Image from "next/image";
import { media } from "@/lib/data";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
}

export function PageHero({ eyebrow, title, text, image = media.boatOne }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-matte-black px-6 pb-16 pt-32 text-cream">
      {/* Background Image with Ken Burns zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="image-cover opacity-60 animate-kenburns"
        />
      </div>

      {/* Subtle dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-matte-black/85 via-matte-black/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="eyebrow mb-4 text-gold/90 tracking-[0.25em] font-medium">
            {eyebrow}
          </p>

          {/* Medium Headline */}
          <h1 className="font-serif text-3xl font-light leading-snug tracking-wide md:text-4xl lg:text-5xl text-cream">
            {title}
          </h1>

          {/* Subcopy */}
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/80 max-w-xl">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
