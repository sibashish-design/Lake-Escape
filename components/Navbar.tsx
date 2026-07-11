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
            ? "bg-matte-black/95 py-0 shadow-2xl border-b border-white/5 backdrop-blur-xl text-cream"
            : "bg-transparent py-0 text-cream"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="transition-all duration-500 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/White%20logo.png"
              alt="Lake Escape Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-30 md:h-30" : "h-30 md:h-30"
              }`}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {localizedLinks.map((item) => (
              <Link
                className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] transition duration-300 link-underline text-cream hover:text-gold"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Top Right: Languages Switcher & Book Now */}
          <div className="flex items-center gap-6">
            {/* Custom Language Toggles */}
            <div className={`flex items-center gap-1.5 border-r pr-5 mr-1 transition duration-500 ${
              isScrolled ? "border-white/10" : "border-white/20"
            }`}>
              <Globe size={11} className="mt-0.5 text-cream/50 transition duration-500" />
              <button
                onClick={() => setLocale("en")}
                className={`font-sans text-[9px] font-bold tracking-widest transition ${
                  locale === "en" 
                    ? "text-gold border-b border-gold/50" 
                    : "text-cream/50 hover:text-cream"
                }`}
              >
                EN
              </button>
              <span className="text-[9px] text-white/20 transition duration-500 mx-1">|</span>
              <button
                onClick={() => setLocale("hi")}
                className={`font-sans text-[9px] font-bold tracking-widest transition ${
                  locale === "hi" 
                    ? "text-gold border-b border-gold/50" 
                    : "text-cream/50 hover:text-cream"
                }`}
              >
                HI
              </button>
            </div>

            {/* Book Now Button (Desktop only) */}
            <div className="hidden sm:block">
              <Link 
                href="/booking" 
                className={`btn h-10 min-h-0 py-0 flex items-center text-[9px] font-bold tracking-[0.2em] transition-all duration-500 ${
                  isScrolled ? "btn-primary" : "btn-primary"
                }`}
              >
                {t.nav.book}
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-sm border transition lg:hidden border-white/20 bg-white/5 text-cream hover:bg-white/10`}
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-matte-black p-8 pt-32 lg:hidden text-cream"
          >
            <div className="flex flex-col gap-6 pt-4">
              {localizedLinks.map((item) => (
                <motion.div key={item.label} variants={linkVariants}>
                  <Link
                    className="font-serif text-3xl font-light text-cream transition duration-300 hover:text-gold"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={linkVariants} className="mt-8 flex flex-col gap-6">
              <Link
                className="btn btn-primary w-full text-center py-1 min-h-0 h-auto"
                href="/booking"
                onClick={() => setOpen(false)}
              >
                {t.nav.book}
              </Link>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <p className="font-sans text-[10px] uppercase tracking-widest text-cream/50">
                  Tehri Lake, Uttarakhand, India
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-cream/50 hover:text-gold transition"><Globe size={16} /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
