"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sun, Sparkles, Compass, Utensils } from "lucide-react";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/FadeIn";

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
    <section id="experiences" className="relative bg-matte-black text-cream min-h-[90vh] md:min-h-screen flex items-center overflow-hidden border-t border-white/5">
      
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={experiencesList[activeSlide].image}
            alt={experiencesList[activeSlide].title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-matte-black/90 via-matte-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="container max-w-7xl relative z-10 grid md:grid-cols-2 gap-12 lg:gap-24 px-6 py-24">
        
        {/* Left Column: Fixed Headers & Controls */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <FadeIn delay={0.1}>
              <p className="font-cursive text-4xl text-gold mb-4 select-none leading-none drop-shadow-sm">{t.experiences.eyebrow}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-4xl font-light tracking-wider text-cream md:text-5xl leading-tight">
                {t.experiences.title}
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="flex gap-4 mt-12 md:mt-24">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-cream hover:text-matte-black hover:border-transparent transition-all duration-300"
                aria-label="Previous slide"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-cream hover:text-matte-black hover:border-transparent transition-all duration-300"
                aria-label="Next slide"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Floating Dark Content Box */}
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-matte-black/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 w-full rounded-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gold/20 text-gold">
                  {(() => {
                    const Icon = experiencesList[activeSlide].icon;
                    return <Icon size={14} />;
                  })()}
                </div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  {experiencesList[activeSlide].time}
                </span>
              </div>

              <h3 className="font-serif text-3xl font-light text-cream mb-6 tracking-wide">
                {experiencesList[activeSlide].title}
              </h3>
              
              <p className="font-sans text-sm font-light text-cream/70 leading-relaxed tracking-wide mb-10">
                {experiencesList[activeSlide].text}
              </p>
              
              <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-cream/40">
                  0{activeSlide + 1} / 0{experiencesList.length}
                </span>
                <Link 
                  href="/experiences" 
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-cream transition flex items-center gap-2"
                >
                  Explore <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
