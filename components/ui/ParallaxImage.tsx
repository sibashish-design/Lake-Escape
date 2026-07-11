"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ParallaxImage({ src, alt, className, priority = false }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const animation = gsap.fromTo(
      image,
      {
        yPercent: -15,
      },
      {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover scale-[1.3] transform-origin-center"
        priority={priority}
      />
    </div>
  );
}
