"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { experiences } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperiencesPage() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <PageHero 
        eyebrow="Experiences" 
        title="The lake sets the itinerary." 
        text="Whether you seek quiet morning sails in the mist or private afternoon kayaking sessions, each activity is paced around the natural rhythm of Tehri Lake." 
      />

      {/* Experiences Grid */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {experiences.map((experience) => {
              const Icon = experience.icon;
              const isHovered = hoveredTitle === experience.title;
              return (
                <article 
                  className="reveal group overflow-hidden rounded-[8px] border border-matte-black/5 bg-beige/30 hover:shadow-md transition-all duration-500" 
                  key={experience.title}
                  onMouseEnter={() => setHoveredTitle(experience.title)}
                  onMouseLeave={() => setHoveredTitle(null)}
                  data-cursor="Play Experience"
                >
                  {/* Image Container with Hover Video */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-matte-black">
                    <Image 
                      src={experience.image} 
                      alt={experience.title} 
                      fill 
                      className="image-cover transition-transform duration-[8000ms] ease-out group-hover:scale-108" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />

                    {/* Hover Video Reveal */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 z-10"
                        >
                          <video
                            src="/media/header-video-1.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-matte-black/40 to-transparent" />
                  </div>

                  {/* Content details */}
                  <div className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-olive border border-matte-black/5">
                      <Icon size={16} className="text-gold" />
                    </div>
                    
                    <h2 className="font-serif text-xl font-light text-matte-black mt-4 tracking-wide">
                      {experience.title}
                    </h2>
                    
                    <p className="mt-3 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                      {experience.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
