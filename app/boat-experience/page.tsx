"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { media } from "@/lib/data";
import { Ship, Anchor, Wind } from "lucide-react";

const specs = [
  { label: "Overall Length", value: "85 Feet" },
  { label: "Guest Capacity", value: "8 - 10 Guests" },
  { label: "Decks", value: "2 (Lounge & Stargazing)" },
  { label: "Staff", value: "5 Dedicated Members" },
  { label: "Interior Design", value: "FBI Furniture Collaboration" },
  { label: "Power", value: "Hybrid Silent Solar Grid" }
];

export default function BoatExperiencePage() {
  return (
    <main className="bg-cream text-matte-black">
      {/* Page Hero */}
      <PageHero 
        eyebrow="The Vessel" 
        title="Private water moments, arranged beautifully." 
        text="A refined, architect-designed floating property engineered for still waters, silent operations, and expansive panoramic views." 
        image={media.boatOne}
      />

      {/* Structural Philosophy */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr] items-center">
          
          {/* Left Column: Details */}
          <div className="space-y-6">
            <p className="eyebrow">Architecture</p>
            <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
              Engineering Quiet Exclusivity
            </h2>
            <p className="font-sans text-sm font-light text-matte-black/70 leading-relaxed">
              Designed as a modern floating sanctuary, the vessel combines a steel-stabilized catamaran hull with a lightweight glass-and-wood superstructure. Powered by a hybrid solar grid, it remains anchored silently, ensuring your rest is never interrupted by generator noise.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="flex gap-2.5 items-start">
                <Ship className="text-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-serif text-sm font-normal text-matte-black">Upper Sun Deck</h4>
                  <p className="mt-1 font-sans text-xs text-matte-black/60 leading-relaxed">Open-air rooftop lounge for sunset teas and stargazing.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Anchor className="text-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-serif text-sm font-normal text-matte-black">Private Lake Decks</h4>
                  <p className="mt-1 font-sans text-xs text-matte-black/60 leading-relaxed">Direct balcony water access from individual suites.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications Table */}
          <div className="reveal rounded-[8px] border border-matte-black/5 bg-beige/20 p-6 md:p-8 shadow-sm">
            <h3 className="font-serif text-xl font-light text-matte-black mb-6">
              Vessel Specifications
            </h3>
            <div className="divide-y divide-matte-black/10 font-sans text-sm">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3.5">
                  <span className="font-light text-matte-black/60">{spec.label}</span>
                  <span className="font-semibold text-olive">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Speed Launch Transfer Details */}
      <section className="section bg-beige text-matte-black border-t border-matte-black/5">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1fr] items-center">
          
          {/* Left: Asymmetric Image */}
          <div className="reveal relative aspect-[16/10] overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black shadow-sm lg:aspect-[1.2/1]">
            <Image 
              src={media.sunset} 
              alt="Speedboat transfer at golden hour" 
              fill 
              className="image-cover opacity-90 transition-transform duration-[10000ms] ease-out hover:scale-108 animate-kenburns" 
              sizes="(max-width: 1024px) 100vw, 45vw" 
            />
          </div>

          {/* Right: Content details */}
          <div className="space-y-6">
            <p className="eyebrow">The Transit</p>
            <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
              Your Speed Launch Awaits
            </h2>
            <p className="font-sans text-sm font-light text-matte-black/70 leading-relaxed">
              Arrival is part of the experience. Our private speed launch coordinates directly with your arrival time at the dock. The brief 10-minute transit across Tehri Lake separates you from the shore and transports you into complete stillness.
            </p>
            <div className="flex gap-3 items-center text-olive font-poppins text-[10px] font-bold uppercase tracking-widest pt-4">
              <Wind size={14} />
              <span>Complimentary transfers for all check-ins & check-outs</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
