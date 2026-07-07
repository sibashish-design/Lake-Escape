"use client";

import { Suspense } from "react";
import { BookingWidget } from "@/components/BookingWidget";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, CreditCard } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function BookingPage() {
  const { t, locale } = useLanguage();

  return (
    <main className="bg-cream text-matte-black min-h-screen pt-24 pb-12">
      
      {/* Compact Header (Image 1 style: minimal spacing) */}
      <section className="container max-w-5xl px-6 mb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-matte-black">
          {locale === "hi" ? "तैरते प्रवास को सुरक्षित करें।" : "Secure your floating stay."}
        </h1>
        <p className="mt-2 font-sans text-xs font-light text-matte-black/60 leading-relaxed max-w-xl">
          {locale === "hi" 
            ? "अपनी तिथियां, मेहमानों की संख्या और पसंदीदा सुइट चुनकर अपनी यात्रा की योजना बनाएं। सभी पूछताछ और बुकिंग हमारे आरक्षण पटल द्वारा सुरक्षित की जाती हैं।"
            : "Plan your escape by selecting your dates, guests count, and preferred suite. All reservations are coordinated directly by our lake concierge desk."}
        </p>
      </section>

      {/* Main Checkout Section */}
      <section className="container max-w-5xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Column: Interactive Reservation Form */}
          <div className="space-y-4">
            <Suspense fallback={
              <div className="bg-white rounded-[6px] border border-matte-black/15 p-6 text-center text-xs text-matte-black/55 shadow-sm">
                Loading reservation desk...
              </div>
            }>
              <BookingWidget compact isCheckoutPage={true} />
            </Suspense>
            
            {/* Booking Credibility markers */}
            <div className="rounded-[6px] border border-matte-black/10 bg-white p-4 space-y-3.5 shadow-sm">
              <div className="flex gap-3">
                <ShieldCheck size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">
                    {locale === "hi" ? "लचीली रद्दीकरण नीति" : "Flexible Cancellation"}
                  </h4>
                  <p className="mt-0.5 font-sans text-[11px] font-light text-matte-black/65 leading-relaxed">
                    {locale === "hi"
                      ? "आगमन से 14 दिन पहले तक रद्दीकरण पर पूर्ण धन-वापसी। उसके बाद की तारीखें केवल री-शेड्यूल के अधीन हैं।"
                      : "Cancel up to 14 days before arrival for a full refund. Cancellations within 14 days are subject to date re-schedules."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CreditCard size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">
                    {locale === "hi" ? "सुरक्षित बुकिंग प्रक्रिया" : "Secure Booking"}
                  </h4>
                  <p className="mt-0.5 font-sans text-[11px] font-light text-matte-black/65 leading-relaxed">
                    {locale === "hi"
                      ? "सभी पूछताछ और बुकिंग हमारे होटल सर्वर पर एन्क्रिप्टेड और सुरक्षित रूप से संसाधित होती हैं।"
                      : "All reservations are reviewed and confirmed manually by our concierge department for verified peace of mind."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cabin Rates Overview */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-light text-matte-black tracking-wide">
                {locale === "hi" ? "उपलब्ध तैरते केबिन" : "Available Accommodations"}
              </h3>
              <p className="mt-1 font-sans text-xs font-light text-matte-black/55 leading-relaxed">
                {locale === "hi" 
                  ? "दरें मौसम और मांग के अनुसार बदल सकती हैं। अंतिम मूल्य की गणना करने के लिए बाईं ओर केबिन चुनें।"
                  : "Rates vary based on seasonal holidays. Select a room in the widget to calculate the final estimated amount."}
              </p>
            </div>

            <div className="grid gap-3">
              {rooms.map((room) => (
                <article 
                  className="flex items-center justify-between gap-6 rounded-[6px] border border-matte-black/10 bg-white p-4 shadow-sm hover:border-olive transition duration-300" 
                  key={room.slug}
                >
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-normal text-matte-black">
                      {room.slug === "lake-view-suite" ? t.rooms.lakeViewSuite.name : ""}
                      {room.slug === "sunset-cabin" ? t.rooms.sunsetCabin.name : ""}
                      {room.slug === "mountain-deck-room" ? t.rooms.mountainDeck.name : ""}
                      {room.slug === "captains-residence" ? t.rooms.captainsResidence.name : ""}
                    </h4>
                    <p className="font-sans text-[9px] uppercase tracking-wider text-matte-black/45">
                      {room.guests} &bull; {room.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-base text-olive font-light">
                      {formatCurrency(room.price)}
                    </p>
                    <p className="font-sans text-[8px] uppercase tracking-widest text-matte-black/40">/ {t.rooms.night}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
