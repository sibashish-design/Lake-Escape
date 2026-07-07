"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, UserPlus, Minus, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function BookingBar() {
  const { t } = useLanguage();
  const router = useRouter();

  // Local states
  const [checkIn, setCheckIn] = useState("2026-08-14");
  const [checkOut, setCheckOut] = useState("2026-08-16");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close guest modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setGuestModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format guest text localized
  const getGuestLabel = () => {
    const adultsText = adults === 1 ? `1 ${t.booking.adult}` : `${adults} ${t.booking.adults}`;
    const kidsText = kids === 0 ? `0 ${t.booking.children}` : (kids === 1 ? `1 ${t.booking.child}` : `${kids} ${t.booking.children}`);
    return `${adultsText}, ${kidsText}`;
  };

  const handleBookRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(adults + kids),
      coupon: ""
    }).toString();
    router.push(`/booking?${query}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-matte-black/10 bg-cream/95 py-3 shadow-[0_-4px_30px_rgba(28,27,25,0.06)] backdrop-blur-md lg:block">
      <div className="mx-auto max-w-7xl px-6">
        <form onSubmit={handleBookRedirect} className="flex items-center justify-between gap-6">
          
          {/* Calendar Check In */}
          <div className="flex-1">
            <label className="flex flex-col gap-0.5 cursor-pointer">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-matte-black/50">
                {t.booking.checkin}
              </span>
              <div className="flex items-center gap-2 border-b border-matte-black/10 pb-1 pt-0.5 hover:border-olive transition">
                <Calendar size={13} className="text-olive" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent font-sans text-xs outline-none text-matte-black font-semibold cursor-pointer"
                  min="2026-07-07"
                />
              </div>
            </label>
          </div>

          {/* Calendar Check Out */}
          <div className="flex-1">
            <label className="flex flex-col gap-0.5 cursor-pointer">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-matte-black/50">
                {t.booking.checkout}
              </span>
              <div className="flex items-center gap-2 border-b border-matte-black/10 pb-1 pt-0.5 hover:border-olive transition">
                <Calendar size={13} className="text-olive" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent font-sans text-xs outline-none text-matte-black font-semibold cursor-pointer"
                  min={checkIn || "2026-07-07"}
                />
              </div>
            </label>
          </div>

          {/* Guest selector dropdown */}
          <div className="flex-1 relative" ref={modalRef}>
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-matte-black/50">
                {t.booking.guests}
              </span>
              <button
                type="button"
                onClick={() => setGuestModalOpen(!guestModalOpen)}
                className="flex items-center justify-between border-b border-matte-black/10 pb-1.5 pt-1 hover:border-olive transition w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <UserPlus size={13} className="text-olive" />
                  <span className="font-sans text-xs font-semibold text-matte-black">
                    {getGuestLabel()}
                  </span>
                </div>
                {guestModalOpen ? <ChevronUp size={12} className="text-matte-black/45" /> : <ChevronDown size={12} className="text-matte-black/45" />}
              </button>
            </div>

            {/* Custom Popover Modal (Adults/Kids increment) */}
            {guestModalOpen && (
              <div className="absolute bottom-full mb-3 left-0 w-64 rounded-[6px] border border-matte-black/10 bg-cream p-4 shadow-xl z-50">
                <div className="space-y-4">
                  {/* Adults Row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-xs font-semibold text-matte-black">{t.booking.adults}</p>
                      <p className="font-sans text-[9px] text-matte-black/45">Age 13+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 hover:bg-beige transition disabled:opacity-30"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-sans text-xs font-bold text-matte-black w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(4, adults + 1))}
                        disabled={adults >= 4}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 hover:bg-beige transition disabled:opacity-30"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Kids Row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-xs font-semibold text-matte-black">{t.booking.children}</p>
                      <p className="font-sans text-[9px] text-matte-black/45">Age 0-12</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setKids(Math.max(0, kids - 1))}
                        disabled={kids <= 0}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 hover:bg-beige transition disabled:opacity-30"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-sans text-xs font-bold text-matte-black w-4 text-center">{kids}</span>
                      <button
                        type="button"
                        onClick={() => setKids(Math.min(3, kids + 1))}
                        disabled={kids >= 3}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 hover:bg-beige transition disabled:opacity-30"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Book Submit Trigger */}
          <button
            type="submit"
            className="btn btn-olive px-8 h-10 min-h-0 py-0 flex items-center text-[11px] font-bold uppercase tracking-wider"
          >
            {t.booking.btnBook}
          </button>

        </form>
      </div>
    </div>
  );
}
