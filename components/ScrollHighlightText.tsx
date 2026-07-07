"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/providers/LanguageProvider";

export function ScrollHighlightText() {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const reflections = {
    en: {
      eyebrow: "Reflections",
      text: "At Lake Escape, time is measured not by clocks, but by the movement of mountain shadows across still water. Each hour brings a new quality of stillness, inviting you to pause, listen, and breathe."
    },
    hi: {
      eyebrow: "विचार-मंथन",
      text: "लेक एस्केप में, समय घड़ियों से नहीं, बल्कि शांत पानी पर पहाड़ों की परछाइयों के चलने से मापा जाता है। हर घंटा स्थिरता की एक नई अनुभूति लाता है, जो आपको रुकने, सुनने और सांस लेने के लिए आमंत्रित करता है।"
    }
  };

  const r = locale === "hi" ? reflections.hi : reflections.en;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const words = wordsRef.current;

    if (!container || !words) return;

    const spanElements = words.querySelectorAll(".highlight-word");

    gsap.to(spanElements, {
      opacity: 1,
      color: "#1C1B19", // Matte Black highlight
      stagger: 0.15,
      scrollTrigger: {
        trigger: container,
        start: "top 78%",
        end: "bottom 38%",
        scrub: 1.2
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [locale]); // re-trigger animation if language changes (words re-split)

  // Split text by spaces to isolate individual words
  const wordsArray = r.text.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="section bg-cream text-matte-black border-t border-matte-black/5"
    >
      <div className="container max-w-4xl py-12">
        {/* Eyebrow */}
        <div className="mb-6">
          <p className="eyebrow">{r.eyebrow}</p>
        </div>

        {/* Word Split Paragraph */}
        <p 
          ref={wordsRef} 
          className="font-serif text-2xl font-light leading-relaxed md:text-3xl text-matte-black/20 flex flex-wrap gap-x-2.5 gap-y-1.5 select-none"
        >
          {wordsArray.map((word, idx) => (
            <span 
              key={idx} 
              className="highlight-word opacity-20 inline-block transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
