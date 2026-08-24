"use client";

import Link from "next/link";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out ${isScrolled || !isHome
            ? "bg-[#081218]/95 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-b border-white/[0.15] backdrop-blur-xl"
            : "bg-[#081218]/80 py-4 border-b border-white/10 backdrop-blur-md shadow-lg"
          }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-10">

          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/White%20logo.png"
              alt="Lake Escape Luxury Floating Resort"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links — High contrast bold text */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans text-[13px] font-bold tracking-[-0.01em] text-white hover:text-slate-300 transition-colors duration-200 drop-shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">

            {/* Guest Portal / Profile Access */}
            <Link
              href="/profile"
              className="flex items-center gap-1.5 font-sans text-xs sm:text-[13px] font-semibold text-white hover:bg-white/20 transition-all duration-200 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm"
              title="My Reservations & Profile"
            >
              <User size={14} className="text-white shrink-0" />
              <span>Guest Portal</span>
            </Link>

            {/* Book Stateroom CTA - Sleek White Pill Button */}
            <Link
              href="/booking"
              style={{ color: "#081218", backgroundColor: "#ffffff" }}
              className="inline-flex items-center justify-center font-sans text-xs sm:text-[13px] font-bold tracking-[-0.01em] px-5 sm:px-6 py-2 rounded-full border border-white transition-all duration-200 hover:bg-slate-200 hover:scale-105 shadow-md"
            >
              Reserve Suite
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Dark Luxury Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#081218]/98 p-8 pt-24 backdrop-blur-2xl lg:hidden text-white border-b border-white/[0.12]"
          >
            <div className="flex flex-col gap-5 pt-2">
              <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em]">
                Explore Lake Escape
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl font-bold tracking-[-0.02em] text-white transition hover:text-slate-300"
                >
                  {item.label}
                </Link>
              ))}

              <div className="h-px w-full bg-white/[0.12] my-2" />

              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 font-sans text-sm font-semibold tracking-[-0.01em] text-slate-300 hover:text-white"
              >
                <User size={16} className="text-slate-400" />
                <span>My Reservations & Profile</span>
              </Link>
            </div>

            <div className="space-y-4 pt-6">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                style={{ color: "#081218", backgroundColor: "#ffffff" }}
                className="flex w-full items-center justify-center gap-2 py-3.5 rounded-lg text-center font-sans text-[14px] font-extrabold tracking-[-0.01em] shadow-md"
              >
                <span>Book a Suite</span>
                <ArrowRight size={15} />
              </Link>
              <p className="text-center font-sans text-[11px] text-slate-500 font-medium">
                Tehri Lake • Uttarakhand, India
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
