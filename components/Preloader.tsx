"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const word = "LAKE ESCAPE";
  const letters = word.split("");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
      y: 10,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Prevent server-side render to avoid hydration mismatch crashes
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-olive text-cream"
        >
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="font-cursive text-3xl text-gold mb-2 tracking-wide"
          >
            designed for still waters
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex items-center gap-1.5 md:gap-3"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={
                  char === " "
                    ? "w-4"
                    : "font-serif text-3xl md:text-5xl lg:text-6xl tracking-widest font-light text-cream select-none"
                }
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <div className="relative mt-8 h-[1px] w-36 overflow-hidden bg-cream/15">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-full bg-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
