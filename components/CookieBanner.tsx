"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lake_escape_consent");
    if (!consent) {
      // Small delay for clean entrance after page loads
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lake_escape_consent", "accepted");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="fixed bottom-6 left-6 right-6 z-[80] mx-auto max-w-xl rounded-full border border-matte-black/5 bg-cream/90 px-6 py-3 shadow-[0_20px_50px_rgba(28,27,25,0.08)] backdrop-blur-md md:bottom-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-sans text-[11px] font-medium tracking-wide uppercase text-matte-black/75 md:text-xs">
              We use minimal cookies to refine your luxury retreat experience.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="rounded-full bg-matte-black px-4 py-1.5 font-poppins text-[10px] font-semibold uppercase tracking-widest text-cream transition hover:bg-olive"
              >
                Accept
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-matte-black/50 transition hover:text-matte-black"
                aria-label="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
