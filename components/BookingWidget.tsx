"use client";

import { useMemo, useState, useEffect, startTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Minus, Plus, Tag, ShieldCheck, User, Mail, Phone, Home, ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { rooms } from "@/lib/data";
import { createBooking } from "@/actions/booking";
import { useLanguage } from "@/providers/LanguageProvider";

interface BookingWidgetProps {
  compact?: boolean;
  isCheckoutPage?: boolean;
  selectedRoomSlug?: string;
  onRoomSlugChange?: (slug: string) => void;
}

export function BookingWidget({ 
  isCheckoutPage = false,
  selectedRoomSlug,
  onRoomSlugChange
}: BookingWidgetProps) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill state from search parameters
  const [checkIn, setCheckIn] = useState("2026-08-14");
  const [checkOut, setCheckOut] = useState("2026-08-16");
  const [guests, setGuests] = useState(2);
  const [localRoomSlug, setLocalRoomSlug] = useState("lake-view-suite");
  const [coupon, setCoupon] = useState("");

  const roomSlug = selectedRoomSlug || localRoomSlug;
  const setRoomSlug = onRoomSlugChange || setLocalRoomSlug;

  // Contact inputs (checkout mode)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Submission feedbacks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string; refId?: string } | null>(null);

  useEffect(() => {
    const paramIn = searchParams.get("checkIn");
    const paramOut = searchParams.get("checkOut");
    const paramGuests = searchParams.get("guests");
    const paramRoom = searchParams.get("room");
    const paramCoupon = searchParams.get("coupon");

    if (paramIn) setCheckIn(paramIn);
    if (paramOut) setCheckOut(paramOut);
    if (paramGuests) setGuests(Number(paramGuests) || 2);
    if (paramRoom) setRoomSlug(paramRoom);
    if (paramCoupon) setCoupon(paramCoupon);
  }, [searchParams, setRoomSlug]);

  const activeRoom = useMemo(() => {
    return rooms.find((r) => r.slug === roomSlug) || rooms[0];
  }, [roomSlug]);

  const basePrice = activeRoom.price;
  const weekendSurcharge = 2800;
  const extraGuestFee = useMemo(() => {
    return Math.max(0, guests - 2) * 1800;
  }, [guests]);

  const total = useMemo(() => {
    const price = basePrice + weekendSurcharge + extraGuestFee;
    const discount = coupon.toLowerCase() === "TEHRI10".toLowerCase() ? 0.1 : 0;
    return Math.round(price * (1 - discount));
  }, [basePrice, extraGuestFee, coupon]);

  const handleContinue = () => {
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      room: roomSlug,
      coupon
    }).toString();
    router.push(`/booking?${query}`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setFeedback({ ok: false, message: "Please fill in all contact details." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);
    formData.append("guests", String(guests));
    formData.append("roomSlug", roomSlug);
    if (coupon) formData.append("coupon", coupon);

    startTransition(async () => {
      try {
        const res = await createBooking(formData);
        if (res.ok) {
          setFeedback({ ok: true, message: res.message, refId: res.bookingId });
          setName("");
          setEmail("");
          setPhone("");
        } else {
          setFeedback({ ok: false, message: res.message });
        }
      } catch {
        setFeedback({ ok: false, message: "An unexpected error occurred during submission." });
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const isCheckoutMode = isCheckoutPage || typeof window !== "undefined" && window.location.pathname === "/booking";

  if (feedback && feedback.ok) {
    return (
      <div className="bg-matte-black/60 backdrop-blur-md rounded-sm border border-white/10 p-8 text-cream text-center space-y-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mx-auto border border-gold/20">
          <ShieldCheck size={22} />
        </div>
        <h3 className="font-serif text-2xl font-light text-cream tracking-wide">
          {locale === "hi" ? "आरक्षण अनुरोध भेजा गया" : "Reservation Placed"}
        </h3>
        <p className="font-sans text-xs font-light text-cream/60 leading-relaxed max-w-xs mx-auto">
          {feedback.message}
        </p>
        <div className="rounded-sm bg-white/5 p-4 text-center border border-white/10">
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-cream/50 mb-1">Total Estimated</p>
          <p className="font-serif text-2xl font-light text-gold">{formatCurrency(total)}</p>
        </div>
        <button
          onClick={() => setFeedback(null)}
          className="btn btn-primary w-full text-[10px] tracking-widest py-3 min-h-0 h-auto"
        >
          {locale === "hi" ? "दूसरा केबिन बुक करें" : "Book Another Room"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-matte-black/80 backdrop-blur-xl rounded-sm border border-white/10 p-6 md:p-8 text-cream shadow-2xl space-y-6">
      {/* Widget Title */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream/90">
          {locale === "hi" ? "आरक्षण विवरण" : "Details"}
        </h3>
        <Calendar size={14} className="text-gold" />
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Contact info inputs inside widget (checkout page mode) */}
        {isCheckoutMode && (
          <div className="space-y-4 border-b border-white/10 pb-6 mb-4">
            <div className="space-y-2">
              <label className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50 flex items-center gap-2">
                <User size={10} className="text-gold" /> {t.booking.name}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === "hi" ? "उदा. देवेन्द्र सिंह" : "E.g. Devendra Singh"}
                className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-sans text-xs outline-none transition focus:border-gold text-cream placeholder:text-cream/20"
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50 flex items-center gap-2">
                <Mail size={10} className="text-gold" /> {locale === "hi" ? "ईमेल पता" : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g. guest@email.com"
                className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-sans text-xs outline-none transition focus:border-gold text-cream placeholder:text-cream/20"
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50 flex items-center gap-2">
                <Phone size={10} className="text-gold" /> {locale === "hi" ? "फ़ोन नंबर" : "Phone Number"}
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="E.g. +91 99999 99999"
                className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-sans text-xs outline-none transition focus:border-gold text-cream placeholder:text-cream/20"
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50 flex items-center gap-2">
                <Home size={10} className="text-gold" /> {t.booking.cabin}
              </label>
              <div className="relative">
                <select
                  value={roomSlug}
                  onChange={(e) => setRoomSlug(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-sans text-xs outline-none focus:border-gold text-cream appearance-none pr-10"
                >
                  {rooms.map((room) => (
                    <option key={room.slug} value={room.slug} className="bg-matte-black text-cream">{room.name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Date Inputs Selector */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4 space-y-3">
          <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50 flex items-center gap-2 mb-1">
            <Calendar size={10} className="text-gold" />
            <span>{locale === "hi" ? "तिथियां चुनें" : "Dates"}</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.2em] text-cream/40">{t.booking.checkin}</span>
              <input
                className="w-full border-b border-white/10 bg-transparent font-sans text-xs outline-none text-cream p-0 pb-1 focus:border-gold transition-colors"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.2em] text-cream/40">{t.booking.checkout}</span>
              <input
                className="w-full border-b border-white/10 bg-transparent font-sans text-xs outline-none text-cream p-0 pb-1 focus:border-gold transition-colors"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Guests selector */}
        <div className="rounded-sm border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-cream/50">{t.booking.guests}</span>
          <div className="flex items-center justify-between mt-3">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-cream hover:bg-gold hover:text-matte-black hover:border-transparent transition shrink-0"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              aria-label="Decrease guests"
            >
              <Minus size={12} />
            </button>
            <strong className="font-sans text-xs text-cream font-light tracking-wide">{guests} {guests === 1 ? t.booking.child : t.booking.guests}</strong>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-cream hover:bg-gold hover:text-matte-black hover:border-transparent transition shrink-0"
              onClick={() => setGuests(Math.max(8, guests + 1))}
              aria-label="Increase guests"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Coupon Code option */}
        <div className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
          <Tag size={12} className="text-gold shrink-0" />
          <input
            className="w-full bg-transparent font-sans text-xs outline-none p-0 text-cream placeholder:text-cream/20"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder={locale === "hi" ? "कूपन कोड (TEHRI10)" : "Promo Code (TEHRI10)"}
          />
        </div>

        {feedback && !feedback.ok && (
          <p className="font-sans text-[10px] text-red-400 font-medium tracking-wide text-center pt-2">
            {feedback.message}
          </p>
        )}

        {/* Pricing list */}
        <div className="pt-6 border-t border-white/10 space-y-2 font-sans text-cream/60">
          <div className="flex justify-between items-center text-[10px] tracking-wider uppercase">
            <span>{locale === "hi" ? "मूल दर" : "Pricing"}</span>
            <span className="font-semibold text-cream">{formatCurrency(basePrice)} / night</span>
          </div>
          <div className="flex justify-between items-center text-[9px] tracking-wider uppercase">
            <span>{locale === "hi" ? "सप्ताहांत और अतिरिक्त अतिथि शुल्क" : "Surcharge & Guest Fees"}</span>
            <span>{formatCurrency(weekendSurcharge + extraGuestFee)}</span>
          </div>
          <div className="h-px bg-white/10 my-3" />
          <div className="flex justify-between items-center font-serif text-xl font-light text-cream pt-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-cream/50">{locale === "hi" ? "अनुमानित कुल" : "Total Estimate"}</span>
            <span className="text-gold">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Large prominent reserve button */}
        <div className="pt-6">
          {isCheckoutMode ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-[10px] tracking-[0.2em] py-4 h-auto min-h-0 transition duration-500 disabled:opacity-50"
            >
              {isSubmitting ? (locale === "hi" ? "पुष्टि की जा रही है..." : "Processing...") : (locale === "hi" ? "बुकिंग की पुष्टि करें" : "Confirm Reservation")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              className="btn btn-primary w-full text-[10px] tracking-[0.2em] py-4 h-auto min-h-0 transition duration-500"
            >
              {locale === "hi" ? "आरक्षित करें" : "Reserve"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
