"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialsSection() {
  const { locale } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsEN: Testimonial[] = [
    {
      quote: "The boat felt private, cinematic and calm. Sunrise from the deck was the highlight of our Uttarakhand trip.",
      name: "Ananya Mehra",
      role: "Guest from Delhi"
    },
    {
      quote: "Lake Escape gave us a celebration that did not feel like a hotel package. The team handled every detail.",
      name: "Rohan Batra",
      role: "Anniversary stay"
    },
    {
      quote: "The setting is spectacular, but the real luxury is how quietly everything works around you.",
      name: "Nikita Sharma",
      role: "Family weekend"
    }
  ];

  const testimonialsHI: Testimonial[] = [
    {
      quote: "नौका बहुत ही निजी, सुंदर और शांत महसूस हुई। डेक से सूर्योदय देखना हमारी उत्तराखंड यात्रा का सबसे खास पल था।",
      name: "अनन्या मेहरा",
      role: "दिल्ली से अतिथि"
    },
    {
      quote: "लेक एस्केप ने हमें एक ऐसा उत्सव दिया जो किसी पारंपरिक होटल पैकेज जैसा नहीं था। टीम ने हर छोटी बात का ध्यान रखा।",
      name: "रोहन बत्रा",
      role: "सालगिरह का प्रवास"
    },
    {
      quote: "यहाँ का वातावरण अद्भुत है, लेकिन असली विलासिता यह है कि सब कुछ आपके आसपास कितनी शांति से काम करता है।",
      name: "निकिता शर्मा",
      role: "पारिवारिक सप्ताहांत"
    }
  ];

  const testimonials = locale === "hi" ? testimonialsHI : testimonialsEN;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(nextSlide, 7000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isHovered, nextSlide]);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -50) {
      nextSlide();
    } else if (swipe > 50) {
      prevSlide();
    }
  };

  const current = testimonials[index];

  return (
    <section 
      className="section bg-beige text-matte-black border-t border-matte-black/5 py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container max-w-4xl animate-fade">
        {/* Section Header */}
        <div className="reveal mb-12 text-center">
          <p className="eyebrow mb-3">
            {locale === "hi" ? "अतिथि समीक्षा" : "Guest Notes"}
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
            {locale === "hi" ? "शोरगुल से दूर। सब कुछ याद रखने योग्य।" : "Nothing loud. Everything remembered."}
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative min-h-[280px] flex items-center justify-center overflow-hidden px-8"
          data-cursor="Drag Reviews"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? "30%" : "-30%",
                  opacity: 0,
                  scale: 0.97
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 }
                  }
                },
                exit: (direction: number) => ({
                  x: direction < 0 ? "30%" : "-30%",
                  opacity: 0,
                  scale: 0.97,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 }
                  }
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="w-full flex flex-col items-center text-center cursor-grab active:cursor-grabbing select-none"
            >
              {/* Quote Icon */}
              <Quote className="text-olive/20 mb-6" size={32} />

              {/* Quote */}
              <blockquote className="font-serif text-lg md:text-xl font-light italic leading-relaxed text-matte-black/90 max-w-2xl">
                &ldquo;{current?.quote}&rdquo;
              </blockquote>

              {/* Author Details */}
              <cite className="mt-6 not-italic">
                <span className="font-serif text-base font-normal text-olive">
                  {current?.name}
                </span>
                <span className="block mt-1 font-sans text-[9px] uppercase tracking-widest text-matte-black/45">
                  {current?.role}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-matte-black/10 text-matte-black/60 hover:text-matte-black hover:bg-cream/40 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-matte-black/10 text-matte-black/60 hover:text-matte-black hover:bg-cream/40 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === index ? "w-6 bg-olive" : "w-1.5 bg-matte-black/15"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
