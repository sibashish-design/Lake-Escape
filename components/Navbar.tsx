"use client";

import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/providers/LanguageProvider";

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const localizedLinks = [
    { label: t.nav.rooms, href: "/rooms" },
    { label: t.nav.experiences, href: "/experiences" },
    { label: t.nav.dining, href: "/dining" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.journey, href: "/#journey" },
    { label: t.nav.contact, href: "/contact" }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: "afterChildren"
      }
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.06
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 15 },
    opened: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-cream/95 py-3.5 shadow-[0_4px_30px_rgba(28,27,25,0.03)] border-b border-matte-black/5 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif font-semibold text-matte-black tracking-wide transition-all duration-500 ${
              isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
            }`}
          >
            Lake Escape
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {localizedLinks.map((item) => (
              <Link
                className="font-sans text-[11px] font-semibold uppercase tracking-widest text-matte-black transition duration-300 hover:text-olive link-underline"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Top Right: Languages Switcher & Book Now */}
          <div className="flex items-center gap-4">
            {/* Custom Language Toggles */}
            <div className="flex items-center gap-1.5 border-r border-matte-black/10 pr-4 mr-0.5">
              <Globe size={11} className="text-matte-black/45 mt-0.5" />
              <button
                onClick={() => setLocale("en")}
                className={`font-sans text-[10px] font-bold tracking-wider transition ${
                  locale === "en" ? "text-olive border-b border-olive/50" : "text-matte-black/40 hover:text-matte-black"
                }`}
              >
                EN
              </button>
              <span className="text-[9px] text-matte-black/20">|</span>
              <button
                onClick={() => setLocale("hi")}
                className={`font-sans text-[10px] font-bold tracking-wider transition ${
                  locale === "hi" ? "text-olive border-b border-olive/50" : "text-matte-black/40 hover:text-matte-black"
                }`}
              >
                HI
              </button>
            </div>

            {/* Book Now Button (Desktop only) */}
            <div className="hidden sm:block">
              <Link href="/booking" className="btn btn-olive h-9 min-h-0 py-0 flex items-center text-[10px] tracking-wider">
                {t.nav.book}
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-matte-black/10 bg-cream/30 text-matte-black transition hover:bg-cream/80 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-cream p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-5 pt-4">
              {localizedLinks.map((item) => (
                <motion.div key={item.label} variants={linkVariants}>
                  <Link
                    className="font-serif text-2xl font-light text-matte-black transition duration-300 hover:text-olive"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={linkVariants} className="mt-6 flex flex-col gap-4">
              <Link
                className="btn btn-olive w-full text-center py-3 min-h-0 h-auto"
                href="/booking"
                onClick={() => setOpen(false)}
              >
                {t.nav.book}
              </Link>
              <div className="h-px bg-matte-black/5" />
              <div className="flex justify-between items-center">
                <p className="font-sans text-[9px] uppercase tracking-widest text-matte-black/45">
                  Tehri Lake, Uttarakhand, India
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setLocale("en"); setOpen(false); }}
                    className={`text-[10px] font-bold ${locale === "en" ? "text-olive underline" : "text-matte-black/40"}`}
                  >
                    English
                  </button>
                  <span className="text-[10px] text-matte-black/20">|</span>
                  <button 
                    onClick={() => { setLocale("hi"); setOpen(false); }}
                    className={`text-[10px] font-bold ${locale === "hi" ? "text-olive underline" : "text-matte-black/40"}`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
