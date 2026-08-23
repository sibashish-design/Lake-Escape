"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";

interface ReservationItem {
  id: string;
  roomName: string;
  roomCategory: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  total: number;
  guestName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

const defaultSampleReservations: ReservationItem[] = [
  {
    id: "LE-894120",
    roomName: "The Presidential Lake Suite",
    roomCategory: "Signature Master Suite",
    image: "/images/rooms/suite-room/primary.jpg",
    checkIn: "2026-08-28",
    checkOut: "2026-08-30",
    nights: 2,
    guests: "2 Adults",
    total: 40590,
    guestName: "Aarav Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    status: "CONFIRMED",
    createdAt: "2026-08-23T10:30:00Z",
  },
  {
    id: "LE-772910",
    roomName: "The Morning Dew Cabin",
    roomCategory: "Deluxe Lakefront Cabin",
    image: "/images/rooms/room-1/primary.jpg",
    checkIn: "2026-06-12",
    checkOut: "2026-06-14",
    nights: 2,
    guests: "2 Adults",
    total: 30444,
    guestName: "Aarav Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    status: "COMPLETED",
    createdAt: "2026-06-01T12:00:00Z",
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"reservations" | "preferences" | "security">("reservations");
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lake_escape_reservations");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReservations(parsed);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      setReservations(defaultSampleReservations);
    }
  }, []);

  const handleDownloadVoucher = (id: string) => {
    setDownloadSuccess(id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#081218] text-white pt-28 pb-32 px-6 sm:px-12 font-sans">
      <div className="max-w-[1300px] mx-auto space-y-10">
        
        {/* Profile Header Card */}
        <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-full bg-[#081218] border-2 border-white/20 flex items-center justify-center text-xl font-heading font-bold text-white shadow-lg">
                AK
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
                    Aarav Kapoor
                  </h1>
                  <span className="bg-white/10 text-slate-200 font-sans text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-md border border-white/15">
                    Member
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                  <span>aarav.kapoor@example.com</span>
                  <span>•</span>
                  <span>+91 98765 12345</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="btn btn-primary"
              >
                Book New Stateroom
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Strip */}
        <div className="flex items-center gap-6 border-b border-white/[0.12] pb-1 font-sans text-xs font-semibold tracking-[-0.01em]">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`pb-3 transition relative ${
              activeTab === "reservations"
                ? "text-white font-bold border-b-2 border-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            My Reservations ({reservations.length})
          </button>
          
          <button
            onClick={() => setActiveTab("preferences")}
            className={`pb-3 transition relative ${
              activeTab === "preferences"
                ? "text-white font-bold border-b-2 border-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Guest Preferences
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`pb-3 transition relative ${
              activeTab === "security"
                ? "text-white font-bold border-b-2 border-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Account Details
          </button>
        </div>

        {/* Tab Content 1: Reservations */}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {reservations.map((res) => {
              const isPast = res.status === "COMPLETED";

              return (
                <div
                  key={res.id}
                  className={`bg-[#0d1b22] border rounded-xl transition-all duration-200 overflow-hidden ${
                    isPast ? "border-white/10 opacity-75" : "border-white/15 shadow-xl hover:border-white/25"
                  }`}
                >
                  {/* Reservation Top Bar */}
                  <div className="bg-[#081218] px-6 sm:px-8 py-3.5 border-b border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-slate-400 uppercase font-medium">
                        Confirmation:
                      </span>
                      <span className="font-sans text-sm font-bold text-white tracking-tight">
                        {res.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-sans text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-md ${
                          res.status === "CONFIRMED"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {res.status}
                      </span>
                    </div>
                  </div>

                  {/* Reservation Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-6 items-center">
                    
                    {/* Room Image */}
                    <div className="lg:col-span-4">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/15">
                        <Image
                          src={res.image}
                          alt={res.roomName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    </div>

                    {/* Stay Information */}
                    <div className="lg:col-span-5 space-y-2.5">
                      <div>
                        <span className="font-sans text-[11px] font-semibold text-slate-400 uppercase block">
                          {res.roomCategory}
                        </span>
                        <h3 className="font-heading text-2xl text-white font-bold tracking-[-0.025em] mt-0.5">
                          {res.roomName}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-sans text-slate-300 pt-2 border-t border-white/[0.12]">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Check-In</span>
                          <span className="text-white font-semibold">{res.checkIn} (2:00 PM)</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Check-Out</span>
                          <span className="text-white font-semibold">{res.checkOut} (11:00 AM)</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Guests</span>
                          <span className="text-white font-semibold">{res.guests}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Boarding Jetty</span>
                          <span className="text-emerald-400 font-semibold">Koti Colony Bay</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="lg:col-span-3 lg:border-l lg:border-white/[0.12] lg:pl-6 space-y-3">
                      <div>
                        <span className="font-sans text-[10px] uppercase font-semibold text-slate-400 block">
                          Total Paid
                        </span>
                        <p className="font-heading text-2xl font-bold text-white mt-0.5 tracking-tight">
                          ₹{res.total.toLocaleString("en-IN")}
                        </p>
                        <span className="text-[11px] font-sans text-emerald-400 font-medium">
                          ✓ Guaranteed Direct Rate
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => handleDownloadVoucher(res.id)}
                          className="w-full flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-semibold uppercase tracking-[-0.01em] transition"
                        >
                          <Download size={14} className="text-slate-300" />
                          <span>{downloadSuccess === res.id ? "Voucher Downloaded" : "Download Voucher"}</span>
                        </button>

                        <a
                          href="mailto:stay@lakeescape.in?subject=Reservation Inquiry"
                          className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white py-1 text-xs font-semibold transition"
                        >
                          <Mail size={13} />
                          <span>Concierge Desk</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content 2: Preferences */}
        {activeTab === "preferences" && (
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-[-0.025em]">
                Stateroom Preferences
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-1">
                Your personalized preferences will be automatically configured for all upcoming voyages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <span className="font-sans text-[11px] font-bold text-slate-300 uppercase block tracking-[-0.01em]">
                  Dining & Dietary
                </span>
                <div className="space-y-2 text-slate-200 font-medium">
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-800" />
                    <span>Vegetarian Gourmet Options Preferred</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-800" />
                    <span>Organic Himalayan Herbal Tea Selection</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" className="rounded text-slate-800" />
                    <span>Gluten-Sensitive Breakfast Hamper</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-sans text-[11px] font-bold text-slate-300 uppercase block tracking-[-0.01em]">
                  Stateroom & Comfort
                </span>
                <div className="space-y-2 text-slate-200 font-medium">
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-800" />
                    <span>Hypoallergenic Feather Down Pillows</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-800" />
                    <span>Sunset Turndown Fragrance: Cedar & Mountain Pine</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#081218] border border-white/10 rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-slate-800" />
                    <span>Nightly Stargazing Telescope Setup on Deck</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="btn btn-primary"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 3: Security & Account */}
        {activeTab === "security" && (
          <div className="bg-[#0d1b22] border border-white/15 rounded-2xl p-8 space-y-5 max-w-xl animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-[-0.025em]">
                Guest Profile Credentials
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-1">
                Manage your credentials for instant reservation access.
              </p>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div>
                <label className="block text-slate-400 text-[11px] font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Aarav Kapoor"
                  className="w-full bg-[#081218] border border-white/15 rounded-lg px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] font-bold uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="aarav.kapoor@example.com"
                  className="w-full bg-[#081218] border border-white/15 rounded-lg px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] font-bold uppercase mb-1">Verified Mobile (SMS Alerts)</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 12345"
                  className="w-full bg-[#081218] border border-white/15 rounded-lg px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="btn btn-primary"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
