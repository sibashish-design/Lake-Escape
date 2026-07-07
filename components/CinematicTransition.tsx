"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const targetLetterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const text = textRef.current;
    const targetLetter = targetLetterRef.current;

    if (!container || !text || !targetLetter) return;

    // Reset initial states
    gsap.set(text, { y: 200, opacity: 0, scale: 0.8 });
    gsap.set(targetLetter, { transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Slide text up from bottom and scale to normal
    tl.to(text, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    // 2. Add a small pause for focus
    tl.to(text, {
      duration: 0.5
    });

    // 3. Stagger-fade other letters while scaling the whole text block
    tl.to(".other-letter", {
      opacity: 0,
      scale: 0.5,
      y: -20,
      duration: 1,
      stagger: {
        amount: 0.3,
        from: "center"
      },
      ease: "power2.inOut"
    }, "+=0.2");

    // 4. Massive zoom on the target letter "A" so it covers the entire viewport
    // The letter has color #6B7353 (Olive Green), which matches the Dining background.
    tl.to(targetLetter, {
      scale: 240,
      color: "#6B7353",
      x: () => {
        // Adjust center alignment during scaling if needed
        const rect = targetLetter.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const letterX = rect.left + rect.width / 2;
        return centerX - letterX;
      },
      y: () => {
        const rect = targetLetter.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const letterY = rect.top + rect.height / 2;
        return centerY - letterY;
      },
      duration: 3,
      ease: "power3.in"
    }, "<");

    // 5. Fade out container background to let the new section merge
    tl.to(container, {
      backgroundColor: "#6B7353", // match target letter color
      duration: 0.8
    }, "-=0.8");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative z-20 h-[300vh] w-full bg-cream transition-colors duration-500 overflow-hidden"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(28,27,25,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Cinematic Zoom Header */}
        <h2 
          ref={textRef} 
          className="flex select-none items-center justify-center font-serif text-[6.5vw] font-light uppercase tracking-widest text-olive md:text-[5vw] gap-x-2"
        >
          {/* L-A-K-E */}
          <span className="other-letter inline-block">L</span>
          <span className="other-letter inline-block">A</span>
          <span className="other-letter inline-block">K</span>
          <span className="other-letter inline-block">E</span>
          
          <span className="inline-block w-4 md:w-8" /> {/* Space */}
          
          {/* E-S-C-A-P-E */}
          <span className="other-letter inline-block">E</span>
          <span className="other-letter inline-block">S</span>
          <span className="other-letter inline-block">C</span>
          
          {/* Zoom target letter */}
          <span 
            ref={targetLetterRef} 
            className="inline-block font-medium text-gold"
            style={{ display: "inline-block" }}
          >
            A
          </span>
          
          <span className="other-letter inline-block">P</span>
          <span className="other-letter inline-block">E</span>
        </h2>

        {/* Scroll helper cue overlay */}
        <div className="absolute bottom-12 text-center pointer-events-none">
          <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-matte-black/40 animate-pulse">
            Keep scrolling to enter
          </p>
        </div>

      </div>
    </div>
  );
}
