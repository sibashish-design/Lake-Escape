"use client";

import { Calendar, Minus, Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const base = 14500;

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const [guests, setGuests] = useState(2);
  const [coupon, setCoupon] = useState("");
  const total = useMemo(() => {
    const weekend = 2800;
    const guestFee = Math.max(0, guests - 2) * 1800;
    const discount = coupon.toLowerCase() === "TEHRI10".toLowerCase() ? 0.1 : 0;
    return Math.round((base + weekend + guestFee) * (1 - discount));
  }, [coupon, guests]);

  return (
    <div className={compact ? "glass rounded-[8px] p-5 text-[#1B1B1B]" : "glass rounded-[8px] p-5 text-[#1B1B1B] shadow-2xl"}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Reserve</p>
          <h3 className="font-display text-2xl text-[#1B1B1B]">Floating stay</h3>
        </div>
        <Calendar className="text-[#556B2F]" size={24} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Check in
          <input className="rounded-[8px] border border-black/10 bg-white/80 px-3 py-3" type="date" defaultValue="2026-08-14" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Check out
          <input className="rounded-[8px] border border-black/10 bg-white/80 px-3 py-3" type="date" defaultValue="2026-08-16" />
        </label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[8px] border border-black/10 bg-white/80 p-3">
          <p className="text-sm font-semibold">Guests</p>
          <div className="mt-2 flex items-center justify-between">
            <button className="btn btn-secondary h-9 min-h-0 w-9 p-0" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Decrease guests">
              <Minus size={15} />
            </button>
            <strong>{guests}</strong>
            <button className="btn btn-secondary h-9 min-h-0 w-9 p-0" onClick={() => setGuests(Math.min(8, guests + 1))} aria-label="Increase guests">
              <Plus size={15} />
            </button>
          </div>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Coupon
          <div className="flex items-center rounded-[8px] border border-black/10 bg-white/80 px-3">
            <Tag size={15} className="text-[#B79C62]" />
            <input className="w-full bg-transparent px-2 py-3 outline-none" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Try TEHRI10" />
          </div>
        </label>
      </div>
      <div className="my-4 h-px bg-black/10" />
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-black/55">Estimated total</p>
          <p className="font-display text-3xl text-[#1B1B1B]">{formatCurrency(total)}</p>
        </div>
        <a className="btn btn-primary" href="/booking">
          Continue
        </a>
      </div>
    </div>
  );
}
