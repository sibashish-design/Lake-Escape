"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";


function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 1500;

      const tick = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * value));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-2xl font-light text-olive md:text-3xl">
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function IntroSection() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);

  const spaces = [
    { image: media.boatOne, name: t.intro.living },
    { image: media.boatTwo, name: t.intro.livingBar },
    { image: media.sunset, name: t.intro.livingGarden }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % spaces.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + spaces.length) % spaces.length);
  };

  const progressPercent = ((activeSlide + 1) / spaces.length) * 100;

  return (
    <section id="intro" className="section bg-beige text-matte-black py-20" ref={containerRef}>
      <div className="container max-w-6xl">
        
        {/* Pulso style section title & content */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-start mb-16">
          <div className="reveal">
            <p className="eyebrow mb-3">{t.intro.eyebrow}</p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
              Lake Escape Tehri
            </h2>
          </div>
          <div className="reveal">
            <p className="font-serif text-lg md:text-xl text-matte-black/80 leading-relaxed font-light">
              {t.intro.text}
            </p>
          </div>
        </div>

        {/* Spaces Swiper Slider (Pulso is-slider-1 replica) */}
        <div className="relative overflow-hidden rounded-[8px] border border-matte-black/5 bg-cream/45 p-4 md:p-6 mb-12 shadow-sm">
          <div className="relative aspect-[16/10] md:aspect-[2.1/1] w-full overflow-hidden rounded-[6px] bg-matte-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={spaces[activeSlide].image}
                  alt={spaces[activeSlide].name}
                  fill
                  className="image-cover opacity-90 transition-transform duration-[8000ms] ease-out hover:scale-105"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <p className="font-sans text-xs uppercase tracking-widest text-cream/90 font-semibold">
                    {spaces[activeSlide].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <div className="absolute right-4 bottom-4 z-10 flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream border border-cream/10 hover:bg-cream hover:text-matte-black transition backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream border border-cream/10 hover:bg-cream hover:text-matte-black transition backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Custom Horizontal Progress Bar */}
          <div className="mt-4 flex items-center justify-between gap-6">
            <div className="relative h-[2px] flex-1 bg-matte-black/10 rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-olive rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
            <span className="font-sans text-[10px] font-bold text-matte-black/60 tracking-wider">
              0{activeSlide + 1} / 0{spaces.length}
            </span>
          </div>
        </div>

        {/* Minimalist Stats footer Row */}
        <div className="grid grid-cols-3 gap-4 border-t border-matte-black/10 pt-10">
          <div className="text-center">
            <Counter value={4} />
            <p className="mt-1.5 font-sans text-[9px] uppercase tracking-widest text-matte-black/55 font-bold">
              {t.intro.statRooms}
            </p>
          </div>
          <div className="text-center">
            <Counter value={2} />
            <p className="mt-1.5 font-sans text-[9px] uppercase tracking-widest text-matte-black/55 font-bold">
              {t.intro.statDecks}
            </p>
          </div>
          <div className="text-center">
            <Counter value={5} />
            <p className="mt-1.5 font-sans text-[9px] uppercase tracking-widest text-matte-black/55 font-bold">
              {t.intro.statCrew}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
