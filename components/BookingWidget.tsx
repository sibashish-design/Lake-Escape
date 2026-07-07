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

  // Selected room details
  const activeRoom = useMemo(() => {
    return rooms.find((r) => r.slug === roomSlug) || rooms[0];
  }, [roomSlug]);

  // Price calculations
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

  // Continue to checkout page
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

  // Submit enquiry to server action
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
      <div className="bg-white rounded-[6px] border border-matte-black/10 p-6 text-matte-black text-center space-y-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/15 text-olive mx-auto">
          <ShieldCheck size={20} />
        </div>
        <h3 className="font-serif text-xl font-light text-matte-black">
          {locale === "hi" ? "आरक्षण अनुरोध भेजा गया" : "Reservation Placed"}
        </h3>
        <p className="font-sans text-xs font-light text-matte-black/60 leading-relaxed">
          {feedback.message}
        </p>
        <div className="rounded-[4px] bg-beige/20 p-3 text-center border border-matte-black/5">
          <p className="font-sans text-[9px] uppercase tracking-widest text-matte-black/40">Total Estimated</p>
          <p className="font-serif text-lg font-light text-olive mt-0.5">{formatCurrency(total)}</p>
        </div>
        <button
          onClick={() => setFeedback(null)}
          className="btn btn-olive w-full justify-center text-[10px] tracking-wider py-2.5 h-auto min-h-0"
        >
          {locale === "hi" ? "दूसरा केबिन बुक करें" : "Book Another Room"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[6px] border border-matte-black/15 p-5 text-matte-black shadow-sm space-y-4">
      {/* Widget Title (Image 1 style) */}
      <div className="border-b border-matte-black/10 pb-3 flex items-center justify-between">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">
          {locale === "hi" ? "आरक्षण विवरण" : "Details"}
        </h3>
        <Calendar size={14} className="text-olive" />
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-3.5">
        {/* Contact info inputs inside widget (checkout page mode) */}
        {isCheckoutMode && (
          <div className="space-y-3.5 border-b border-matte-black/10 pb-4 mb-3">
            <div className="space-y-1">
              <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/65 flex items-center gap-1.5">
                <User size={10} className="text-olive" /> {t.booking.name}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === "hi" ? "उदा. देवेन्द्र सिंह" : "E.g. Devendra Singh"}
                className="w-full rounded-[4px] border border-matte-black/10 bg-white px-3 py-2 font-sans text-xs outline-none transition focus:border-olive text-matte-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/65 flex items-center gap-1.5">
                <Mail size={10} className="text-olive" /> {locale === "hi" ? "ईमेल पता" : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g. guest@email.com"
                className="w-full rounded-[4px] border border-matte-black/10 bg-white px-3 py-2 font-sans text-xs outline-none transition focus:border-olive text-matte-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/65 flex items-center gap-1.5">
                <Phone size={10} className="text-olive" /> {locale === "hi" ? "फ़ोन नंबर" : "Phone Number"}
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="E.g. +91 99999 99999"
                className="w-full rounded-[4px] border border-matte-black/10 bg-white px-3 py-2 font-sans text-xs outline-none transition focus:border-olive text-matte-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/65 flex items-center gap-1.5">
                <Home size={10} className="text-olive" /> {t.booking.cabin}
              </label>
              <div className="relative">
                <select
                  value={roomSlug}
                  onChange={(e) => setRoomSlug(e.target.value)}
                  className="w-full rounded-[4px] border border-matte-black/10 bg-white px-3 py-2 font-sans text-xs outline-none focus:border-olive text-matte-black appearance-none pr-8"
                >
                  {rooms.map((room) => (
                    <option key={room.slug} value={room.slug}>{room.name}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-matte-black/40 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Date Inputs Selector (Image 1 style: Dates grid) */}
        <div className="rounded-[4px] border border-matte-black/10 bg-white p-3 space-y-2">
          <p className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/45 flex items-center gap-1">
            <Calendar size={9} className="text-olive" />
            <span>{locale === "hi" ? "तिथियां चुनें" : "Dates"}</span>
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-0.5">
              <span className="font-poppins text-[8px] font-bold uppercase tracking-wider text-matte-black/40">{t.booking.checkin}</span>
              <input
                className="w-full border-none bg-transparent font-sans text-xs outline-none text-matte-black p-0"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="space-y-0.5">
              <span className="font-poppins text-[8px] font-bold uppercase tracking-wider text-matte-black/40">{t.booking.checkout}</span>
              <input
                className="w-full border-none bg-transparent font-sans text-xs outline-none text-matte-black p-0"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Guests selector (Image 1 style: drop-down look) */}
        <div className="rounded-[4px] border border-matte-black/10 bg-white p-3 flex flex-col justify-between">
          <span className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/45">{t.booking.guests}</span>
          <div className="flex items-center justify-between mt-1.5">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 text-matte-black hover:bg-beige transition shrink-0"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              aria-label="Decrease guests"
            >
              <Minus size={11} />
            </button>
            <strong className="font-sans text-xs text-matte-black">{guests} {guests === 1 ? t.booking.child : t.booking.guests}</strong>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-matte-black/10 text-matte-black hover:bg-beige transition shrink-0"
              onClick={() => setGuests(Math.min(8, guests + 1))}
              aria-label="Increase guests"
            >
              <Plus size={11} />
            </button>
          </div>
        </div>

        {/* Coupon Code option */}
        <div className="rounded-[4px] border border-matte-black/10 bg-white px-3 py-2 flex items-center gap-1.5">
          <Tag size={10} className="text-gold shrink-0" />
          <input
            className="w-full bg-transparent font-sans text-xs outline-none p-0 text-matte-black"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder={locale === "hi" ? "कूपन कोड (TEHRI10)" : "Promo Code (TEHRI10)"}
          />
        </div>

        {feedback && !feedback.ok && (
          <p className="font-sans text-[10px] text-red-600 font-semibold text-center">
            {feedback.message}
          </p>
        )}

        {/* Pricing list (Image 1 style) */}
        <div className="pt-2.5 border-t border-matte-black/10 space-y-1.5 text-xs font-sans text-matte-black/70">
          <div className="flex justify-between items-center text-[11px]">
            <span>{locale === "hi" ? "मूल दर" : "Pricing"}</span>
            <span className="font-medium text-matte-black">{formatCurrency(basePrice)} / night</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-matte-black/55">
            <span>{locale === "hi" ? "सप्ताहांत और अतिरिक्त अतिथि शुल्क" : "Surcharge & Guest Fees"}</span>
            <span>{formatCurrency(weekendSurcharge + extraGuestFee)}</span>
          </div>
          <div className="h-px bg-matte-black/5 my-1" />
          <div className="flex justify-between items-center font-serif text-sm font-semibold text-matte-black">
            <span>{locale === "hi" ? "अनुमानित कुल" : "Total Estimate"}</span>
            <span className="text-olive">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Large prominent reserve button (Image 1 style: Reserve) */}
        <div className="pt-2">
          {isCheckoutMode ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[4px] bg-matte-black text-cream hover:bg-olive text-[10px] font-bold uppercase tracking-widest py-3 transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? (locale === "hi" ? "पुष्टि की जा रही है..." : "Processing...") : (locale === "hi" ? "बुकिंग की पुष्टि करें" : "Confirm Reservation")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full rounded-[4px] bg-matte-black text-cream hover:bg-olive text-[10px] font-bold uppercase tracking-widest py-3 transition duration-300"
            >
              {locale === "hi" ? "आरक्षित करें" : "Reserve"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
