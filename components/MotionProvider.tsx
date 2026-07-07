"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider() {
  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean slow cubic ease
      lerp: 0.08,
      infinite: false,
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis scroll events via GSAP ticker loop (removes the duplicate requestAnimationFrame loop)
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // convert GSAP seconds to milliseconds
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Find and animate all individual reveal elements when they enter the viewport
    const reveals = gsap.utils.toArray(".reveal") as HTMLElement[];
    reveals.forEach((elem) => {
      gsap.set(elem, { opacity: 0, y: 24 });

      gsap.to(elem, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Clean up all ticker listeners and scroll triggers on unmount
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return null;
}
