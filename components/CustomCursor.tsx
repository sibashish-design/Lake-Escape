"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft spring configuration for premium, cinematic lag feel
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Skip cursor listeners entirely on tablet/mobile
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search for closest element with data-cursor attribute
      const cursorAttr = target.closest("[data-cursor]") as HTMLElement;
      if (cursorAttr) {
        setIsHovered(true);
        setCursorText(cursorAttr.getAttribute("data-cursor") || "Explore");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-cream font-poppins text-[10px] font-bold uppercase tracking-widest backdrop-blur-[2px] lg:flex"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovered ? 80 : 12,
        height: isHovered ? 80 : 12,
        backgroundColor: isHovered ? "rgba(107, 115, 83, 0.95)" : "rgba(107, 115, 83, 0.25)",
        border: isHovered ? "1px solid rgba(250, 247, 240, 0.4)" : "1px solid rgba(107, 115, 83, 0.6)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="text-center px-1"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
