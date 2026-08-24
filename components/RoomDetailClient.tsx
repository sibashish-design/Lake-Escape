"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, Share2, Heart, MapPin, LayoutGrid, Compass, Shield, 
  Calendar, ShieldAlert, Check, X, ArrowRight, ChevronRight, BedDouble, 
  Wifi, Coffee, Wind, Tv, ChevronLeft
} from "lucide-react";
import { RoomData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface RoomDetailClientProps {
  room: RoomData;
  allRooms: RoomData[];
}

export function RoomDetailClient({ room, allRooms }: RoomDetailClientProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Dates & Guests booking state
  const [checkIn, setCheckIn] = useState("2026-08-24");
  const [checkOut, setCheckOut] = useState("2026-08-26");
  const [guestsCount, setGuestsCount] = useState(2);

  // Nights calculation
  const nights = 2;
  const baseTotal = room.price * nights;
  const taxesAndFees = Math.round(baseTotal * 0.18);
  const grandTotal = baseTotal + taxesAndFees;

  const galleryImages = room.gallery.length > 0 ? room.gallery : [room.image];
  const mainPhoto = galleryImages[0];
  const sidePhotos = galleryImages.slice(1, 5);

  const recommendedRooms = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <div className="bg-[#fcfbf9] text-[#081218] min-h-screen pt-24 pb-20 font-sans">
      
      {/* 1. Header Info Bar (Triptodream / Airbnb Luxe style) */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 mb-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight size={12} />
          <Link href="/rooms" className="hover:text-black font-semibold text-slate-700">Suites</Link>
          <ChevronRight size={12} />
          <span className="text-black font-bold">{room.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#081218]">
              {room.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-sans text-slate-600">
              <span className="flex items-center gap-1 font-bold text-[#081218]">
                <Star size={14} className="fill-black text-black" /> 5.0
                <span className="font-normal text-slate-500">(226 reviews)</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <MapPin size={14} className="text-slate-900" /> Tehri Lake, Uttarakhand, India
              </span>
            </div>
          </div>

          {/* Action buttons (Save & Share) */}
          <div className="flex items-center gap-3">
            <button 
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 shadow-sm transition"
            >
              <Heart size={14} className="text-slate-600" />
              <span>Save</span>
            </button>
            <button 
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-50 shadow-sm transition"
            >
              <Share2 size={14} className="text-slate-600" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 5-Photo Bento Grid Wall (Exact match to Triptodream screenshot) */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 mb-12">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900">
          
          {/* Main Large Image (Left side 2x2 height) */}
          <div 
            onClick={() => { setPhotoIndex(0); setShowAllPhotos(true); }}
            className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:h-[440px] overflow-hidden cursor-pointer group"
          >
            <Image
              src={mainPhoto}
              alt={room.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 4 Secondary Images (Right side 2x2 grid) */}
          {sidePhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => { setPhotoIndex(idx + 1); setShowAllPhotos(true); }}
              className="relative hidden md:block aspect-[4/3] h-[215px] overflow-hidden cursor-pointer group"
            >
              <Image
                src={photo}
                alt={`${room.name} photo ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              
              {/* Show All Photos button on the 4th photo */}
              {idx === 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(0);
                    setShowAllPhotos(true);
                  }}
                  className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-white/95 border border-slate-200 px-3.5 py-2 text-xs font-bold text-[#081218] shadow-lg backdrop-blur-md transition hover:bg-white hover:scale-105"
                >
                  <LayoutGrid size={14} />
                  <span>Show all {galleryImages.length} photos</span>
                </button>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* 3. Two-Column Content & Sticky Reservation Box */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Room Overview, Highlights, Description, Amenities */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Title & Host Specifications */}
            <div className="border-b border-slate-200 pb-6 flex items-start justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#081218] tracking-tight">
                  {room.name.toUpperCase()}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {room.guests} &bull; {room.size} &bull; {room.bedType} &bull; Starlink Wi-Fi
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#081218] text-white flex items-center justify-center font-serif text-base font-bold shrink-0">
                LE
              </div>
            </div>

            {/* Highlights List with Icons (Exact match to Triptodream screenshot) */}
            <div className="space-y-5 border-b border-slate-200 pb-8">
              
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="text-[#081218] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#081218]">Great location</h4>
                  <p className="text-xs text-slate-600 mt-0.5">100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Wind size={20} className="text-[#081218] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#081218]">Dive right in</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Direct overwater access to Tehri Lake with private balcony launching.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Star size={20} className="text-[#081218] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#081218]">Great check-in experience</h4>
                  <p className="text-xs text-slate-600 mt-0.5">100% of recent guests gave the check-in process a 5-star rating.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Calendar size={20} className="text-[#081218] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#081218]">Free cancellation for 48 hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Full refund up to 7 days prior to scheduled check-in date.</p>
                </div>
              </div>

            </div>

            {/* Room Description Paragraph */}
            <div className="border-b border-slate-200 pb-8 space-y-3">
              <p className="text-sm font-normal text-slate-700 leading-relaxed">
                {room.description}
              </p>
              {showFullDesc && (
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  {room.tone} Handcrafted with natural cedar finishes, floor-to-ceiling double-paned insulated glass, and luxury marble ensuite baths designed for peaceful overwater retreats.
                </p>
              )}
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="inline-flex items-center gap-1 font-bold text-xs text-[#081218] underline hover:text-slate-600 transition"
              >
                <span>{showFullDesc ? "Show less" : "Show more"}</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4 border-b border-slate-200 pb-8">
              <h3 className="font-serif text-xl font-bold text-[#081218]">
                What this stateroom offers
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                    <Check size={16} className="text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Map Section */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#081218]">
                Where you&apos;ll be
              </h3>
              <p className="text-xs text-slate-600">Tehri Lake, Garhwal Himalayas, Uttarakhand, India</p>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54988.94828117769!2d78.43574972583856!3d30.400262193556106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390906ad4cf01db3%3A0xe54e2f9d6a7d97cb!2sTehri%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "brightness(0.95)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Map of Tehri Lake"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Reservation Box Widget (Exact match to Triptodream) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              
              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-5">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#081218]">
                    {formatCurrency(room.price)}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1">night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#081218]">
                  <Star size={14} className="fill-black text-black" />
                  <span>5.0</span>
                  <span className="font-normal text-slate-500">(226 reviews)</span>
                </div>
              </div>

              {/* Boxed Inputs (Check-In, Check-Out, Guests) */}
              <div className="border border-slate-300 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  
                  {/* Check-In Input */}
                  <div className="p-3 border-r border-slate-300 bg-slate-50/50">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#081218] outline-none"
                    />
                  </div>

                  {/* Check-Out Input */}
                  <div className="p-3 bg-slate-50/50">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      CHECK-OUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#081218] outline-none"
                    />
                  </div>

                </div>

                {/* Guests Input */}
                <div className="p-3 bg-slate-50/50 flex justify-between items-center">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                      GUESTS
                    </label>
                    <span className="text-xs font-bold text-[#081218]">{guestsCount} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="h-7 w-7 rounded-full border border-slate-300 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setGuestsCount(Math.min(room.maxGuests, guestsCount + 1))}
                      className="h-7 w-7 rounded-full border border-slate-300 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Line Items Calculation */}
              <div className="space-y-3 text-xs sm:text-sm font-medium text-slate-700 border-b border-slate-200 pb-5">
                <div className="flex justify-between">
                  <span>{formatCurrency(room.price)} x {nights} nights</span>
                  <span>{formatCurrency(baseTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & 18% GST resort fee</span>
                  <span>{formatCurrency(taxesAndFees)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center text-base font-bold text-[#081218] pt-1">
                <span>Total</span>
                <span className="text-xl font-serif">{formatCurrency(grandTotal)}</span>
              </div>

              {/* RESERVE CTA Button */}
              <Link
                href={`/booking?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`}
                style={{ color: "#ffffff", backgroundColor: "#081218" }}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 transition-all hover:scale-[1.02]"
              >
                <span>RESERVE →</span>
              </Link>

              <p className="text-center text-xs text-slate-500 font-normal">
                You won&apos;t be charged yet
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* 4. Recommended Suites Section */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 mt-20 pt-12 border-t border-slate-200">
        <h3 className="font-serif text-2xl font-bold text-[#081218] mb-6">
          Other suites you might like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedRooms.map((rec) => (
            <Link
              key={rec.slug}
              href={`/rooms/${rec.slug}`}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={rec.image}
                  alt={rec.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif text-base font-bold text-[#081218] group-hover:text-slate-700">
                  {rec.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">Tehri Lake &bull; {rec.size}</p>
                <p className="text-sm font-bold text-[#081218] pt-1">
                  {formatCurrency(rec.price)} <span className="text-xs font-normal text-slate-500">/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full-Screen Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8">
          <div className="flex justify-between items-center text-white">
            <span className="font-sans text-xs font-bold uppercase tracking-wider">
              Photo {photoIndex + 1} of {galleryImages.length}
            </span>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative my-auto h-[75vh] w-full max-w-5xl mx-auto flex items-center justify-center">
            <Image
              src={galleryImages[photoIndex]}
              alt={`Photo ${photoIndex + 1}`}
              fill
              className="object-contain"
            />

            <button
              onClick={() => setPhotoIndex((photoIndex - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 h-12 w-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setPhotoIndex((photoIndex + 1) % galleryImages.length)}
              className="absolute right-2 h-12 w-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`relative h-14 w-20 rounded-lg overflow-hidden border-2 transition ${
                  i === photoIndex ? "border-white scale-105" : "border-transparent opacity-50"
                }`}
              >
                <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
