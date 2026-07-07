"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sun, Sparkles, Compass, Utensils } from "lucide-react";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";

export function ExperiencesSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const experiencesList = [
    {
      id: "sunrise",
      title: t.experiences.sunriseSailing.title,
      text: t.experiences.sunriseSailing.text,
      image: media.boatTwo,
      time: "06:00 AM",
      icon: Sun
    },
    {
      id: "laser",
      title: t.experiences.laserShow.title,
      text: t.experiences.laserShow.text,
      image: media.sunset,
      time: "07:30 PM",
      icon: Sparkles
    },
    {
      id: "adventure",
      title: t.experiences.adventure.title,
      text: t.experiences.adventure.text,
      image: media.boatOne,
      time: "10:00 AM",
      icon: Compass
    },
    {
      id: "dining",
      title: t.experiences.floatingDining.title,
      text: t.experiences.floatingDining.text,
      image: media.sunset,
      time: "08:30 PM",
      icon: Utensils
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % experiencesList.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + experiencesList.length) % experiencesList.length);
  };

  return (
    <section id="experiences" className="section bg-beige text-matte-black border-t border-matte-black/5 py-24">
      <div className="container max-w-6xl">
        
        {/* Section Header (Pulso diary title layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="font-cursive text-3xl text-gold mb-1 select-none leading-none">{t.experiences.eyebrow}</p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
              {t.experiences.title}
            </h2>
          </div>
          
          {/* Slider controls next to title */}
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-matte-black/10 hover:bg-cream transition"
              aria-label="Previous slide"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-matte-black/10 hover:bg-cream transition"
              aria-label="Next slide"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Swipe Card Content (Pulso card-agenda replica) */}
        <div className="relative overflow-hidden min-h-[460px] md:min-h-[380px] bg-cream/45 border border-matte-black/5 rounded-[8px] p-6 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center h-full"
            >
              {/* Left Column: Image wrapper with zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-matte-black shadow-sm">
                <Image
                  src={experiencesList[activeSlide].image}
                  alt={experiencesList[activeSlide].title}
                  fill
                  className="image-cover opacity-90 transition-transform duration-[6000ms] ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute top-3 left-3 bg-cream/90 backdrop-blur-sm px-2.5 py-1 rounded-[4px] border border-matte-black/5 flex items-center gap-1.5 text-olive font-poppins text-[9px] font-bold tracking-wider">
                  <GlobeIcon active={activeSlide} />
                  <span>{experiencesList[activeSlide].time}</span>
                </div>
              </div>

              {/* Right Column: Experience Details */}
              <div className="flex flex-col justify-between h-full py-2">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-light text-matte-black">
                    {experiencesList[activeSlide].title}
                  </h3>
                  <p className="font-sans text-xs font-light text-matte-black/70 leading-relaxed">
                    {experiencesList[activeSlide].text}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-matte-black/5 flex justify-between items-center text-olive font-poppins text-[9px] font-bold uppercase tracking-wider">
                  <span>0{activeSlide + 1} / 0{experiencesList.length}</span>
                  <a href="/experiences" className="hover:text-matte-black transition flex items-center gap-1">
                    Explore Details <ArrowRight size={10} />
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function GlobeIcon({ active }: { active: number }) {
  // Simple helper to return the matching icon dynamically
  return (
    <span className="shrink-0 mt-0.5">
      {active === 0 && <span className="block h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />}
      {active === 1 && <span className="block h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />}
      {active === 2 && <span className="block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />}
      {active === 3 && <span className="block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
    </span>
  );
}
