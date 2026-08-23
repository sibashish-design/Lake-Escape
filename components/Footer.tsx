"use client";

import Link from "next/link";
import { ArrowUp, Compass, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "@/lib/data";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="location" className="relative w-full bg-[#040a0e] text-white pt-20 pb-12 px-6 sm:px-12 border-t border-white/[0.12]">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Top Centered Brand Logo & Tagline */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/White%20logo.png"
            alt="Lake Escape"
            className="h-14 mx-auto object-contain"
          />
          <p className="font-sans text-xs font-medium text-slate-400 tracking-[-0.01em]">
            The Ultra-Luxury Floating Resort • Tehri Lake, Uttarakhand
          </p>
        </div>

        {/* 3-Column Info & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-y border-white/[0.12] py-10">
          
          {/* Column 1: Location & Coordinates */}
          <div className="space-y-3">
            <span className="font-sans text-[12px] font-bold text-slate-300 uppercase block tracking-[-0.01em]">
              Anchorage & Location
            </span>
            <div className="space-y-2 text-xs font-normal text-slate-300 tracking-[-0.01em]">
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                <span>Koti Colony Bay, Tehri Lake, New Tehri, Uttarakhand 249001, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Compass size={15} className="text-slate-400 shrink-0" />
                <span>30.4002° N, 78.4357° E • Elevation 840m</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3 text-center md:text-left">
            <span className="font-sans text-[12px] font-bold text-slate-300 uppercase block tracking-[-0.01em]">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold tracking-[-0.01em] text-slate-300">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/profile" className="hover:text-white transition-colors">
                Guest Portal
              </Link>
              <Link href="/booking" className="hover:text-white transition-colors">
                Reserve Suite
              </Link>
            </div>
          </div>

          {/* Column 3: Direct Reservations */}
          <div className="space-y-3 md:text-right">
            <span className="font-sans text-[12px] font-bold text-slate-300 uppercase block tracking-[-0.01em]">
              Direct Concierge
            </span>
            <div className="space-y-2 text-xs font-normal text-slate-300 tracking-[-0.01em]">
              <p className="flex items-center gap-2.5 justify-start md:justify-end">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</a>
              </p>
              <p className="flex items-center gap-2.5 justify-start md:justify-end">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <a href="mailto:stay@lakeescape.in" className="hover:text-white transition">stay@lakeescape.in</a>
              </p>
              <p className="text-[11px] font-sans text-slate-400 pt-1">
                24/7 Stays & Private Boat Buyout Inquiries
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 font-sans text-xs tracking-[-0.01em]">
          <p>© {new Date().getFullYear()} Lake Escape Resorts. All rights reserved.</p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 hover:text-white transition group font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="transition-transform duration-200 group-hover:-translate-y-1" />
          </button>
        </div>

      </div>
    </footer>
  );
}
