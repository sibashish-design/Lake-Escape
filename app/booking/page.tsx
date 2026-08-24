"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bell, Calendar, Check, ChevronDown, Clock,
  Compass, Eye, Lock, MapPin,
  Phone, Sparkles,
  Trash2, User, Users, Wifi, Wine, X, ArrowLeft, ArrowRight
} from "lucide-react";
import { rooms, RoomData } from "@/lib/data";

function BookingContent() {
  const searchParams = useSearchParams();

  // Search parameters state
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomsCount] = useState(1);
  const [checkInDate, setCheckInDate] = useState("2026-08-24");
  const [checkOutDate, setCheckOutDate] = useState("2026-08-26");
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "size">("price-asc");

  // Selected Booking state
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [selectedRateType, setSelectedRateType] = useState<"member" | "standard">("member");
  const [activeStep, setActiveStep] = useState<"select-room" | "guest-details" | "confirmation">("select-room");

  // Room details modal
  const [detailModalRoom, setDetailModalRoom] = useState<RoomData | null>(null);

  // Guest details form state
  const [formData, setFormData] = useState({
    firstName: "Aarav",
    lastName: "Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    country: "India",
    address: "142 Golf Links Road",
    city: "New Delhi",
    postalCode: "110003",
    specialRequests: "Vegetarian breakfast hamper and sunset speedboat transfer please.",
  });

  // Confirmed booking state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");

  useEffect(() => {
    const roomParam = searchParams?.get("room");
    if (roomParam) {
      const found = rooms.find((r) => r.slug === roomParam);
      if (found) {
        setSelectedRoom(found);
      }
    }
  }, [searchParams]);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Price calculations
  const getRoomNightlyRate = (room: RoomData, rateType: "member" | "standard") => {
    let rate = rateType === "member" ? room.memberPrice : room.price;
    if (promoApplied) {
      rate = Math.round(rate * 0.9);
    }
    return rate;
  };

  const calculateSubtotal = () => {
    if (!selectedRoom) return 0;
    return getRoomNightlyRate(selectedRoom, selectedRateType) * nights;
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  // Sorting
  const sortedRooms = [...rooms].sort((a, b) => {
    if (sortBy === "price-asc") return a.memberPrice - b.memberPrice;
    if (sortBy === "price-desc") return b.memberPrice - a.memberPrice;
    return parseInt(b.size) - parseInt(a.size);
  });

  const handleSelectRate = (room: RoomData, rateType: "member" | "standard") => {
    setSelectedRoom(room);
    setSelectedRateType(rateType);
    setActiveStep("guest-details");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `LE-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(newId);

    // Save to local storage for profile page
    if (typeof window !== "undefined" && selectedRoom) {
      const existing = JSON.parse(localStorage.getItem("lake_escape_reservations") || "[]");
      const newReservation = {
        id: newId,
        roomName: selectedRoom.name,
        roomCategory: selectedRoom.category,
        image: selectedRoom.image,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guests: `${adults} Adults${children > 0 ? `, ${children} Children` : ""}`,
        total: grandTotal,
        guestName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("lake_escape_reservations", JSON.stringify([newReservation, ...existing]));
    }

    setActiveStep("confirmation");
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans pb-28">

      {/* ─── TOP HOTEL HERO BANNER ─── */}
      <section className="relative w-full bg-[#081218] text-white pt-24 pb-12 px-6 sm:px-12 border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image
            src="/images/rooms/suite-room/primary.jpg"
            alt="Lake Escape Luxury Floating Resort"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081218] via-[#081218]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-300 uppercase tracking-[-0.01em]">
              <Sparkles size={14} className="text-slate-400" />
              <span>Official Direct Reservation Desk</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.035em]">
              Lake Escape Floating Resort
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-slate-300 tracking-[-0.01em]">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                Koti Colony Bay, Tehri Lake, Uttarakhand 249001, India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-slate-400" />
                +91 98765 43210
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg border border-white/20 transition flex items-center gap-2 tracking-[-0.01em]"
            >
              <User size={14} className="text-slate-300" />
              <span>My Reservations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STICKY SEARCH & FILTER BAR (Apple HIG Clean Layout) ─── */}
      <section className="sticky top-16 z-30 w-full bg-white shadow-sm border-b border-slate-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">

          {/* Guests Selector */}
          <div className="lg:col-span-3 relative">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1 tracking-[-0.01em]">
              Guests & Suites
            </label>
            <button
              type="button"
              onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
              className="w-full flex items-center justify-between bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 tracking-[-0.01em]"
            >
              <span className="flex items-center gap-2">
                <Users size={15} className="text-slate-500" />
                <span>{adults} Adults, {children} Children • {roomsCount} Suite</span>
              </span>
              <ChevronDown size={14} />
            </button>

            {guestDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-40 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block text-slate-800">Adults</span>
                    <span className="text-[11px] text-slate-500">Ages 12+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="h-8 w-8 rounded-md border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-bold">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(4, adults + 1))}
                      className="h-8 w-8 rounded-md border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block text-slate-800">Children</span>
                    <span className="text-[11px] text-slate-500">Ages 0-11</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="h-8 w-8 rounded-md border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-bold">{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(3, children + 1))}
                      className="h-8 w-8 rounded-md border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestDropdownOpen(false)}
                  className="w-full bg-[#081218] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-[-0.01em]"
                >
                  Apply Guests
                </button>
              </div>
            )}
          </div>

          {/* Check-In Date */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1 tracking-[-0.01em]">
              Check-In Date
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs">
              <Calendar size={15} className="text-slate-500 mr-2" />
              <input
                type="date"
                value={checkInDate}
                min="2026-08-23"
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent w-full text-xs font-semibold text-slate-800 focus:outline-none tracking-[-0.01em]"
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1 tracking-[-0.01em]">
              Check-Out Date
            </label>
            <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs">
              <Calendar size={15} className="text-slate-500 mr-2" />
              <input
                type="date"
                value={checkOutDate}
                min={checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent w-full text-xs font-semibold text-slate-800 focus:outline-none tracking-[-0.01em]"
              />
            </div>
          </div>

          {/* Promo / Member Code */}
          <div className="lg:col-span-3 flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1 tracking-[-0.01em]">
                Promo / Member Code
              </label>
              <input
                type="text"
                placeholder="Code (e.g. ESCAPE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none uppercase tracking-[-0.01em]"
              />
            </div>
            <button
              onClick={() => {
                if (promoCode.trim().length > 0) {
                  setPromoApplied(true);
                }
              }}
              className="bg-[#081218] text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[-0.01em] h-[38px] transition"
            >
              {promoApplied ? "Applied" : "Apply"}
            </button>
          </div>

        </div>
      </section>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mt-8">

        {/* STEP 1 & 2 SWITCHER */}
        {activeStep === "confirmation" ? (
          /* ─── CONFIRMATION SCREEN ─── */
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3 pb-6 border-b border-slate-200">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check size={28} />
              </div>
              <span className="font-sans text-xs font-bold text-emerald-700 uppercase tracking-[-0.01em]">
                Reservation Confirmed
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#081218] tracking-[-0.035em]">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-normal">
                Your luxury stay has been reserved. A confirmation email and SMS dispatch have been sent with arrival coordinates.
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3.5 text-xs font-sans">
              <div className="flex justify-between border-b border-slate-200 pb-3 font-medium">
                <span className="text-slate-500 uppercase">Confirmation Code</span>
                <span className="font-bold text-[#081218] text-sm">{confirmedBookingId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3 font-medium">
                <span className="text-slate-500 uppercase">Stateroom</span>
                <span className="font-bold text-[#081218]">{selectedRoom?.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3 font-medium">
                <span className="text-slate-500 uppercase">Dates</span>
                <span className="font-bold text-[#081218]">{checkInDate} to {checkOutDate} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3 font-medium">
                <span className="text-slate-500 uppercase">Guest Name</span>
                <span className="font-bold text-[#081218]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3 font-medium">
                <span className="text-slate-500 uppercase">Speedboat Boarding</span>
                <span className="font-bold text-emerald-700">Koti Colony Bay Jetty (Included)</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-extrabold text-[#081218]">
                <span>Total Paid</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/profile"
                className="flex-1 bg-[#081218] text-white hover:bg-slate-800 py-3.5 rounded-lg text-center text-xs font-bold uppercase tracking-[-0.01em] transition"
              >
                View in Guest Portal
              </Link>
              <Link
                href="/"
                className="flex-1 bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 py-3.5 rounded-lg text-center text-xs font-bold uppercase tracking-[-0.01em] transition"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : activeStep === "guest-details" ? (
          /* ─── CHECKOUT & GUEST DETAILS STEP ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Form Details */}
            <div className="lg:col-span-8 space-y-6">

              <button
                onClick={() => setActiveStep("select-room")}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[-0.01em] text-slate-600 hover:text-[#081218]"
              >
                <ArrowLeft size={15} />
                <span>Change Stateroom Selection</span>
              </button>

              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">

                <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#081218] tracking-[-0.025em]">
                      Guest Contact Information
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 font-normal">
                      Required for boat boarding manifest & confirmation dispatch
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md border border-emerald-200">
                    Direct Reservation
                  </span>
                </div>

                <form onSubmit={handleConfirmReservation} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        Email Address * (Voucher Recipient)
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        Phone / WhatsApp * (SMS Dispatch)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                        City & Postcode
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 tracking-[-0.01em]">
                      Special Requests / Dietary Restrictions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-800"
                    />
                  </div>

                  {/* Payment Method Option */}
                  <div className="border-t border-slate-200 pt-5 space-y-3">
                    <span className="font-sans text-xs font-bold uppercase text-[#081218] block tracking-[-0.01em]">
                      Payment & Guarantee Method
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <label className="flex items-start gap-3 p-3.5 border-2 border-slate-800 bg-slate-50 rounded-lg cursor-pointer">
                        <input type="radio" name="payment" defaultChecked className="mt-0.5 text-slate-900" />
                        <div>
                          <span className="font-bold block text-[#081218]">Credit Card / UPI Guarantee</span>
                          <span className="text-[11px] text-slate-500 font-normal">Pay on arrival or secure online</span>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-3.5 border border-slate-200 bg-white rounded-lg cursor-pointer opacity-75">
                        <input type="radio" name="payment" className="mt-0.5 text-slate-900" />
                        <div>
                          <span className="font-bold block text-[#081218]">Bank Wire Transfer</span>
                          <span className="text-[11px] text-slate-500 font-normal">Direct concierge invoice</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-[#081218] text-white hover:bg-slate-800 py-3.5 rounded-lg font-sans text-xs font-bold uppercase tracking-[-0.01em] transition shadow-md flex items-center justify-center gap-2"
                    >
                      <Lock size={15} />
                      <span>Confirm & Guarantee Reservation</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* Right Column: Reservation Summary Sticky Box */}
            <aside className="lg:col-span-4">
              <div className="sticky top-36 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">

                <h3 className="font-heading text-lg font-bold text-[#081218] tracking-[-0.02em] border-b border-slate-200 pb-3">
                  Reservation Summary
                </h3>

                {selectedRoom && (
                  <div className="space-y-4 text-xs">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200">
                      <Image
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <span className="font-sans text-[11px] text-slate-500 uppercase font-semibold block tracking-[-0.01em]">
                        Stateroom {selectedRoom.roomNumber}
                      </span>
                      <h4 className="font-bold text-sm text-[#081218]">{selectedRoom.name}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5">{selectedRoom.category}</p>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-200 pt-3 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Check-in:</span>
                        <span className="font-semibold text-slate-800">{checkInDate} (From 2:00 PM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Check-out:</span>
                        <span className="font-semibold text-slate-800">{checkOutDate} (Until 11:00 AM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-semibold text-slate-800">{nights} Nights</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Rate Plan:</span>
                        <span className="font-semibold text-emerald-700">
                          {selectedRateType === "member" ? "Member Flexible Rate" : "Standard Rate"}
                        </span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-slate-200 pt-3 space-y-2 font-medium">
                      <div className="flex justify-between text-slate-600">
                        <span>Nightly Rate:</span>
                        <span>₹{getRoomNightlyRate(selectedRoom, selectedRateType).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>{nights} Nights Subtotal:</span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Estimated Taxes & GST (18%):</span>
                        <span>₹{tax.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-[#081218] border-t border-slate-200 pt-2">
                        <span>Grand Total:</span>
                        <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </aside>

          </div>
        ) : (
          /* ─── STEP 1: ROOM LISTING & SELECTOR ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Column: Alerts + Filter Strip + Room Cards */}
            <div className="lg:col-span-8 space-y-6">

              {/* Hotel Alert Notice */}
              <div className="bg-slate-100 border-l-4 border-slate-800 p-4 rounded-r-lg flex items-start gap-3 text-xs text-slate-800">
                <Bell size={18} className="text-slate-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold uppercase tracking-[-0.01em] block">Guest Inclusions & Speedboat Advisory</span>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    All direct reservations include private speedboat boarding from Koti Colony Jetty, daily Himalayan breakfast hampers, and Starlink Maritime Wi-Fi.
                  </p>
                </div>
              </div>

              {/* Filter / Sort Control Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-3.5 text-xs shadow-sm">
                <span className="font-sans text-xs uppercase font-bold text-slate-700 tracking-[-0.01em]">
                  Select Your Stateroom ({rooms.length} Available)
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold text-[11px]">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "price-asc" | "price-desc" | "size")}
                    className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs font-semibold focus:outline-none cursor-pointer text-slate-800 tracking-[-0.01em]"
                  >
                    <option value="price-asc">Price (Lowest First)</option>
                    <option value="price-desc">Price (Highest First)</option>
                    <option value="size">Stateroom Size</option>
                  </select>
                </div>
              </div>

              {/* Room Cards List */}
              <div className="space-y-6">
                {sortedRooms.map((room) => {
                  const memberRate = getRoomNightlyRate(room, "member");
                  const standardRate = getRoomNightlyRate(room, "standard");

                  return (
                    <div
                      key={room.id}
                      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      {/* Top Header inside card */}
                      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between">
                        <span className="font-sans text-[11px] font-bold uppercase text-slate-700 tracking-[-0.01em]">
                          Stateroom {room.roomNumber} • {room.category}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          ✓ Instant Confirmation Available
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 p-6 gap-6">

                        {/* Room Visual Display */}
                        <div className="md:col-span-5 space-y-2">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 group">
                            <Image
                              src={room.image}
                              alt={room.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 30vw"
                            />
                            <button
                              onClick={() => setDetailModalRoom(room)}
                              className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-[-0.01em] backdrop-blur-sm flex items-center gap-1.5"
                            >
                              <Eye size={12} />
                              <span>{room.gallery.length} Photos</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setDetailModalRoom(room)}
                            className="text-[11px] font-bold text-[#081218] hover:text-slate-600 underline tracking-[-0.01em] uppercase block text-center w-full pt-1"
                          >
                            View Full Stateroom Details
                          </button>
                        </div>

                        {/* Room Details & Rates */}
                        <div className="md:col-span-7 space-y-4">
                          <div>
                            <h3 className="font-heading text-2xl font-bold text-[#081218] tracking-[-0.025em]">
                              {room.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-slate-500 font-medium">
                              <span>{room.bedType}</span>
                              <span>•</span>
                              <span>{room.guests}</span>
                              <span>•</span>
                              <span>{room.size}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                              {room.tone}
                            </p>
                          </div>

                          {/* Rate Option 1: Member Flexible Rate */}
                          <div className="border border-slate-300 bg-slate-50 rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="inline-block bg-[#081218] text-white text-[9px] font-bold uppercase tracking-[-0.01em] px-2 py-0.5 rounded-sm mb-1">
                                  Best Direct Value
                                </span>
                                <h4 className="font-bold text-xs text-[#081218] uppercase tracking-[-0.01em]">
                                  Member Flexible Rate
                                </h4>
                                <ul className="text-[11px] text-slate-600 space-y-0.5 mt-1 font-normal">
                                  <li>• Complimentary Speedboat Transfer Included</li>
                                  <li>• Full Breakfast Hamper on Bow Deck</li>
                                  <li>• Free cancellation up to 7 days prior</li>
                                </ul>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-[11px] text-slate-400 line-through block">
                                  ₹{room.price.toLocaleString("en-IN")}
                                </span>
                                <p className="font-heading text-xl font-extrabold text-[#081218] tracking-[-0.02em]">
                                  ₹{memberRate.toLocaleString("en-IN")}
                                </p>
                                <span className="text-[10px] text-slate-500 uppercase font-semibold block tracking-[-0.01em]">
                                  Per Night
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                              <span className="text-[11px] font-bold text-emerald-800">
                                Total for {nights} night{nights > 1 ? "s" : ""}: ₹{(memberRate * nights).toLocaleString("en-IN")} + GST
                              </span>

                              <button
                                onClick={() => handleSelectRate(room, "member")}
                                className="bg-[#081218] hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase tracking-[-0.01em] px-5 py-2 rounded-lg transition"
                              >
                                Reserve Rate
                              </button>
                            </div>
                          </div>

                          {/* Rate Option 2: Standard Flexible */}
                          <div className="border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-4">
                            <div>
                              <h5 className="font-bold text-xs text-slate-800">Standard Room Rate</h5>
                              <span className="text-[11px] text-slate-500 font-normal">Pay on arrival option available</span>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <span className="font-heading text-sm font-bold text-slate-900 tracking-[-0.01em]">
                                  ₹{standardRate.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[9px] text-slate-500 uppercase block">/ Night</span>
                              </div>

                              <button
                                onClick={() => handleSelectRate(room, "standard")}
                                className="border border-slate-300 hover:border-slate-800 text-slate-800 font-sans text-[11px] font-bold uppercase tracking-[-0.01em] px-3.5 py-1.5 rounded-md transition"
                              >
                                Select
                              </button>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">

              {/* Cart Summary Panel */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <span className="font-sans text-xs font-bold uppercase tracking-[-0.01em] text-[#081218]">
                    Your Reservation: {selectedRoom ? "1 Suite" : "0 Suites"}
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">{nights} Nights</span>
                </div>

                {selectedRoom ? (
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between font-bold text-[#081218]">
                      <span>{selectedRoom.name}</span>
                      <span>₹{getRoomNightlyRate(selectedRoom, selectedRateType).toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {checkInDate} to {checkOutDate} ({nights} nights)
                    </p>
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="text-red-700 text-xs font-semibold flex items-center gap-1 hover:underline pt-1"
                    >
                      <Trash2 size={12} /> Remove Selection
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-normal">
                    No stateroom selected yet. Please select a rate option from the available suites.
                  </p>
                )}
              </div>

              {/* Inclusions Panel */}
              <div className="bg-[#081218] text-white p-6 rounded-xl border border-slate-800 shadow-md space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <span className="font-sans text-[11px] font-semibold text-slate-400 uppercase block tracking-[-0.01em]">
                    Direct Booking Privileges
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white mt-0.5 tracking-[-0.02em]">
                    Lake Escape Inclusions
                  </h4>
                </div>

                <div className="space-y-3 text-xs font-normal text-slate-300">
                  <div className="flex items-start gap-3">
                    <Wifi size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">High-Speed Starlink Wi-Fi</span>
                      <span className="text-[11px] text-slate-400">Complimentary 150 Mbps maritime connectivity</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">VIP Speedboat Boarding</span>
                      <span className="text-[11px] text-slate-400">Direct overwater transfer from Koti Colony Jetty</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wine size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Sunset Welcome Hamper</span>
                      <span className="text-[11px] text-slate-400">Artisan preserves and wine selection</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Flexible Check-In / Check-Out</span>
                      <span className="text-[11px] text-slate-400">Subject to vessel availability</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 text-[11px] text-slate-400 text-center font-medium">
                  Best Rate Guarantee on Direct Reservations
                </div>
              </div>

              {/* Direct Concierge Contact Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs space-y-2.5 shadow-sm">
                <span className="font-sans text-[11px] font-bold uppercase text-slate-600 block tracking-[-0.01em]">
                  Need Assistance or Boat Buyout?
                </span>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Speak directly with our reservation managers for customized itineraries or whole boat reservations.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 font-bold text-[#081218] hover:text-slate-600 transition pt-1"
                >
                  <Phone size={14} className="text-slate-500" />
                  <span>+91 98765 43210</span>
                </a>
              </div>

            </aside>

          </div>
        )}

      </div>

      {/* ─── STATEROOM DETAIL MODAL ─── */}
      {detailModalRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => setDetailModalRoom(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailModalRoom(null)}
              className="absolute top-4 right-4 h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition"
            >
              <X size={16} />
            </button>

            <div className="space-y-1.5">
              <span className="font-sans text-[11px] text-slate-500 uppercase font-bold tracking-[-0.01em]">
                Stateroom {detailModalRoom.roomNumber} Specifications
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#081218] tracking-[-0.025em]">{detailModalRoom.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{detailModalRoom.description}</p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {detailModalRoom.gallery.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg border border-slate-200 overflow-hidden">
                  <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Amenities Full List */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="font-sans text-xs uppercase text-[#081218] mb-2.5 font-bold tracking-[-0.01em]">
                Included Stateroom Amenities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                {detailModalRoom.amenities.map((am) => (
                  <div key={am} className="flex items-center gap-2 font-medium">
                    <Check size={14} className="text-emerald-700" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => {
                  setSelectedRoom(detailModalRoom);
                  setDetailModalRoom(null);
                  setActiveStep("guest-details");
                }}
                className="bg-[#081218] hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase tracking-[-0.01em] px-6 py-3 rounded-lg transition"
              >
                Select this Stateroom
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#081218] text-white flex items-center justify-center font-sans text-sm font-semibold">
          Loading reservation engine...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
