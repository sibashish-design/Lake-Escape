"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { rooms, media } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  Sparkles, Calendar, Shield, Share2, Heart, 
  MapPin, Check, X, ShieldAlert, Compass, Globe, BedDouble
} from "lucide-react";

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center text-xs text-matte-black/55">
        Loading booking desk...
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}

function BookingPageContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();

  // Manage room state at page level to coordinate image changes
  const [roomSlug, setRoomSlug] = useState("lake-view-suite");

  useEffect(() => {
    const paramRoom = searchParams.get("room");
    if (paramRoom) {
      setRoomSlug(paramRoom);
    }
  }, [searchParams]);

  // Find active room object
  const activeRoom = rooms.find((r) => r.slug === roomSlug) || rooms[0];

  // recommended list
  const recommendedRooms = rooms.filter((r) => r.slug !== roomSlug).slice(0, 3);

  // Set secondary images for the 3-image mosaic based on active room selection
  const mosaicImages = [
    activeRoom.image,
    activeRoom.slug === "captains-residence" ? media.boatTwo : media.boatOne,
    activeRoom.slug === "sunset-cabin" ? media.boatOne : media.boatTwo
  ];

  return (
    <main className="bg-cream text-matte-black min-h-screen pt-20 pb-12">
      
      {/* Title & Metadata Header (Image 1 style: minimal spacing) */}
      <section className="container max-w-5xl px-4 mb-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="font-cursive text-2xl text-gold mb-1 leading-none">
              {locale === "hi" ? "आरक्षण" : "Reservations"}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-matte-black">
              {activeRoom.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-sans text-matte-black/55">
              <span className="flex items-center gap-1 font-medium text-matte-black">
                ★ 4.9 <span className="font-light text-matte-black/45">(48 reviews)</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-olive" /> Tehri Lake, Uttarakhand
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex gap-2">
            <button 
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-matte-black/10 bg-white text-matte-black/60 hover:bg-cream transition"
              aria-label="Share page"
            >
              <Share2 size={12} />
            </button>
            <button 
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-matte-black/10 bg-white text-matte-black/60 hover:bg-cream transition"
              aria-label="Add to favorites"
            >
              <Heart size={12} className="fill-current text-matte-black/10 hover:text-red-500 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* Stateful 3-Image Mosaic (Changes when dropdown updates!) */}
      <section className="container max-w-5xl px-4 mb-6">
        <div className="grid gap-2.5 sm:grid-cols-3">
          {/* Main Large Image (Left, 2 columns) */}
          <div className="relative aspect-[16/10] sm:aspect-auto sm:h-[300px] sm:col-span-2 overflow-hidden rounded-[4px] border border-matte-black/10 bg-matte-black transition-all duration-500">
            <Image 
              src={mosaicImages[0]} 
              alt={activeRoom.name} 
              fill 
              priority
              className="image-cover opacity-95 object-cover"
              sizes="(max-width: 640px) 100vw, 60vw"
            />
          </div>

          {/* Stacked Right Images (Right, 1 column) */}
          <div className="hidden sm:grid gap-2.5 grid-rows-2">
            <div className="relative h-[145px] overflow-hidden rounded-[4px] border border-matte-black/10 bg-matte-black">
              <Image 
                src={mosaicImages[1]} 
                alt="Lakeside design" 
                fill 
                className="image-cover opacity-90 object-cover"
                sizes="30vw"
              />
            </div>
            <div className="relative h-[145px] overflow-hidden rounded-[4px] border border-matte-black/10 bg-matte-black">
              <Image 
                src={mosaicImages[2]} 
                alt="Scenery sunset view" 
                fill 
                className="image-cover opacity-90 object-cover"
                sizes="30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Checkout Details & Form Widget (Image 1 style) */}
      <section className="container max-w-5xl px-4 mb-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* Left Column: Specs, Amenities, Policies, Map */}
          <div className="space-y-6">
            
            {/* Host Details */}
            <div className="border-b border-matte-black/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-normal text-matte-black">
                  Entire floating cabin &bull; Hosted by Lake Escape
                </h3>
                <p className="font-sans text-[11px] font-light text-matte-black/50 mt-0.5">
                  {activeRoom.guests === "2 guests" ? `2 ${t.rooms.guests}` : `3 ${t.rooms.guests}`} &bull; 1 bedroom &bull; 1 bed &bull; 1 bathroom
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-olive/10 flex items-center justify-center text-olive font-serif text-xs font-semibold uppercase">
                LE
              </div>
            </div>

            {/* Spec highlights */}
            <div className="space-y-3.5 border-b border-matte-black/10 pb-5">
              <div className="flex gap-3">
                <Compass size={14} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/80">Entire cabin</h4>
                  <p className="font-sans text-[11px] font-light text-matte-black/55 mt-0.5">You will have the floating guest suite entirely to yourself.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Shield size={14} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/80">Enhanced Clean</h4>
                  <p className="font-sans text-[11px] font-light text-matte-black/55 mt-0.5">This host committed to Lake Escape&apos;s 5-step enhanced cleaning protocol.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar size={14} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/80">Flexible check-in</h4>
                  <p className="font-sans text-[11px] font-light text-matte-black/55 mt-0.5">Easy check-in directly from the deck with our launch managers.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldAlert size={14} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/80">Cancellation policy</h4>
                  <p className="font-sans text-[11px] font-light text-matte-black/55 mt-0.5">Cancel up to 14 days in advance to receive a full refund.</p>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-3 border-b border-matte-black/10 pb-5">
              <h3 className="font-serif text-base font-normal text-matte-black tracking-wide">
                Amenities
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-3 bg-beige/10 rounded-[4px] border border-matte-black/5 p-3.5">
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <BedDouble size={11} className="text-olive shrink-0" />
                  <span>King Bed: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Sparkles size={11} className="text-gold shrink-0" />
                  <span>Size: {activeRoom.size}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Globe size={11} className="text-olive shrink-0" />
                  <span>Wi-Fi: 120 Mbps</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={11} className="text-green-600 shrink-0" />
                  <span>Balcony: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={11} className="text-green-600 shrink-0" />
                  <span>Bathrooms: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={11} className="text-green-600 shrink-0" />
                  <span>Air Conditioner: 1</span>
                </div>
              </div>
            </div>

            {/* House Policies */}
            <div className="space-y-3 border-b border-matte-black/10 pb-5">
              <h3 className="font-serif text-base font-normal text-matte-black tracking-wide">
                Policies & Rules
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs font-sans text-matte-black/75">
                <div className="space-y-1.5">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Check-in:</span> after 2:00 PM
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Check-out:</span> before 11:00 AM
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="flex items-center gap-2 text-red-700/80">
                    <X size={12} className="shrink-0" /> No smoking inside
                  </p>
                  <p className="flex items-center gap-2 text-red-700/80">
                    <X size={12} className="shrink-0" /> No pets allowed
                  </p>
                  <p className="flex items-center gap-2">
                    <Check size={12} className="text-green-600 shrink-0" /> Minimum guest age: 18
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-normal text-matte-black tracking-wide">
                Location Map
              </h3>
              <div className="relative overflow-hidden rounded-[4px] border border-matte-black/10 aspect-[16/8] bg-beige">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54988.94828117769!2d78.43574972583856!3d30.400262193556106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390906ad4cf01db3%3A0xe54e2f9d6a7d97cb!2sTehri%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0, 
                    filter: "grayscale(0.95) sepia(0.2) contrast(0.95) brightness(0.95)",
                    opacity: 0.85
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Tehri Lake"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Sticky checkout form widget with room state hooks */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <BookingWidget 
              isCheckoutPage={true} 
              selectedRoomSlug={roomSlug}
              onRoomSlugChange={setRoomSlug}
            />
          </aside>

        </div>
      </section>

      {/* Recommended Cabins Selection */}
      <section className="container max-w-5xl px-4 pt-6 border-t border-matte-black/10">
        <h3 className="font-serif text-lg font-light text-matte-black tracking-wide mb-4">
          Featured Cabins recommended for you
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendedRooms.map((rec) => (
            <Link 
              key={rec.slug} 
              href={`/rooms/${rec.slug}`}
              className="group flex flex-col gap-2.5 overflow-hidden rounded-[4px] border border-matte-black/5 bg-beige/10 p-2.5 transition-all duration-300 hover:shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] bg-matte-black">
                <Image 
                  src={rec.image} 
                  alt={rec.name} 
                  fill 
                  className="image-cover opacity-90 object-cover"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
                <div className="absolute top-2 right-2 z-10 rounded-full bg-cream/95 px-2 py-0.5 backdrop-blur-sm border border-matte-black/5">
                  <p className="font-poppins text-[8px] font-bold uppercase tracking-wider text-olive">
                    ★ 4.9
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-serif text-sm font-normal text-matte-black group-hover:text-olive transition">
                  {rec.slug === "lake-view-suite" ? t.rooms.lakeViewSuite.name : ""}
                  {rec.slug === "sunset-cabin" ? t.rooms.sunsetCabin.name : ""}
                  {rec.slug === "mountain-deck-room" ? t.rooms.mountainDeck.name : ""}
                  {rec.slug === "captains-residence" ? t.rooms.captainsResidence.name : ""}
                </h4>
                <p className="font-sans text-[9px] text-matte-black/45 mt-0.5 uppercase tracking-widest">
                  Tehri Lake &bull; {rec.size}
                </p>
                <p className="font-serif text-xs font-light text-olive mt-1.5">
                  {formatCurrency(rec.price)} <span className="text-[10px] font-sans text-matte-black/50 lowercase">/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
