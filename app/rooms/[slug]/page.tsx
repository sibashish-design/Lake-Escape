import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookingWidget } from "@/components/BookingWidget";
import { rooms, media } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { 
  Sparkles, Calendar, Shield, Share2, Heart, 
  MapPin, Check, X, ShieldAlert, Compass, Globe, BedDouble 
} from "lucide-react";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  // Find other rooms for the bottom recommendation section
  const recommendedRooms = rooms.filter((r) => r.slug !== slug).slice(0, 3);

  // Set secondary images for the 3-image mosaic based on current slug
  const mosaicImages = [
    room.image,
    media.boatOne,
    media.boatTwo
  ];

  return (
    <main className="bg-cream text-matte-black min-h-screen pt-24 pb-16">
      
      {/* Title & Metadata Header (Image 1 style) */}
      <section className="container max-w-6xl px-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-matte-black">
              {room.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-sans text-matte-black/60">
              <span className="flex items-center gap-1 font-medium text-matte-black">
                ★ 4.9 <span className="font-light text-matte-black/50">(48 reviews)</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-olive" /> Tehri Lake, Uttarakhand, India
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex gap-2">
            <button 
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-matte-black/15 bg-white text-matte-black/70 hover:bg-cream transition"
              aria-label="Share page"
            >
              <Share2 size={13} />
            </button>
            <button 
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-matte-black/15 bg-white text-matte-black/70 hover:bg-cream transition"
              aria-label="Add to favorites"
            >
              <Heart size={13} className="fill-current text-matte-black/10 hover:text-red-500 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* 3-Image Mosaic Grid (Image 1 style) */}
      <section className="container max-w-6xl px-6 mb-8">
        <div className="grid gap-3 md:grid-cols-3">
          {/* Main Large Image (60% width equivalent) */}
          <div className="relative aspect-[16/10] md:aspect-auto md:h-[380px] md:col-span-2 overflow-hidden rounded-[6px] border border-matte-black/10 bg-matte-black">
            <Image 
              src={mosaicImages[0]} 
              alt={room.name} 
              fill 
              priority
              className="image-cover opacity-95 transition-transform duration-[8000ms] ease-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          </div>

          {/* Staggered Right Images Stack (40% width equivalent) */}
          <div className="hidden md:grid gap-3 grid-rows-2">
            <div className="relative h-[184px] overflow-hidden rounded-[6px] border border-matte-black/10 bg-matte-black">
              <Image 
                src={mosaicImages[1]} 
                alt="Lake Escape property view" 
                fill 
                className="image-cover opacity-90 transition-transform duration-[6000ms] ease-out hover:scale-105"
                sizes="33vw"
              />
            </div>
            <div className="relative h-[184px] overflow-hidden rounded-[6px] border border-matte-black/10 bg-matte-black">
              <Image 
                src={mosaicImages[2]} 
                alt="Lake Escape interior scenery" 
                fill 
                className="image-cover opacity-90 transition-transform duration-[6000ms] ease-out hover:scale-105"
                sizes="33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Details & Reservation widget (Image 1 style) */}
      <section className="container max-w-6xl px-6 mb-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.75fr]">
          
          {/* Left Column: Specifications, Amenities, Policies, Map */}
          <div className="space-y-8">
            
            {/* Host Badge */}
            <div className="border-b border-matte-black/10 pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-light text-matte-black">
                  Entire floating cabin &bull; Hosted by Lake Escape
                </h3>
                <p className="font-sans text-xs font-light text-matte-black/55 mt-0.5">
                  2 guests &bull; 1 bedroom &bull; 1 bed &bull; 1 bathroom
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-olive/10 flex items-center justify-center text-olive font-serif text-sm font-semibold uppercase">
                LE
              </div>
            </div>

            {/* highlights list */}
            <div className="space-y-4 border-b border-matte-black/10 pb-6">
              <div className="flex gap-4">
                <Compass size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">Entire cabin</h4>
                  <p className="font-sans text-xs font-light text-matte-black/60 mt-0.5">You will have the floating guest suite entirely to yourself.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Shield size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">Enhanced Clean</h4>
                  <p className="font-sans text-xs font-light text-matte-black/60 mt-0.5">This host committed to Lake Escape&apos;s 5-step enhanced cleaning protocol.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Calendar size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">Flexible check-in</h4>
                  <p className="font-sans text-xs font-light text-matte-black/60 mt-0.5">Easy check-in directly from the deck with our launch managers.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldAlert size={16} className="text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-matte-black/85">Cancellation policy</h4>
                  <p className="font-sans text-xs font-light text-matte-black/60 mt-0.5">Cancel up to 14 days in advance to receive a full refund.</p>
                </div>
              </div>
            </div>

            {/* Amenities Section (Image 1 style) */}
            <div className="space-y-4 border-b border-matte-black/10 pb-6">
              <h3 className="font-serif text-lg font-light text-matte-black tracking-wide">
                Amenities
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 bg-beige/10 rounded-[6px] border border-matte-black/5 p-4">
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <BedDouble size={12} className="text-olive shrink-0" />
                  <span>King Bed: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Sparkles size={12} className="text-gold shrink-0" />
                  <span>Size: {room.size}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Globe size={12} className="text-olive shrink-0" />
                  <span>Wi-Fi: 120 Mbps</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={12} className="text-green-600 shrink-0" />
                  <span>Balcony: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={12} className="text-green-600 shrink-0" />
                  <span>Bathrooms: 1</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-matte-black/85">
                  <Check size={12} className="text-green-600 shrink-0" />
                  <span>Air Conditioner: 1</span>
                </div>
              </div>
            </div>

            {/* Policies / House Rules (Image 1 style) */}
            <div className="space-y-4 border-b border-matte-black/10 pb-6">
              <h3 className="font-serif text-lg font-light text-matte-black tracking-wide">
                Policies & Rules
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 text-xs font-sans text-matte-black/75">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Check-in:</span> after 2:00 PM
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Check-out:</span> before 11:00 AM
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-red-700/80">
                    <X size={13} className="shrink-0" /> No smoking inside
                  </p>
                  <p className="flex items-center gap-2 text-red-700/80">
                    <X size={13} className="shrink-0" /> No pets allowed
                  </p>
                  <p className="flex items-center gap-2">
                    <Check size={13} className="text-green-600 shrink-0" /> Minimum guest age: 18
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map Section (Image 1 style) */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-light text-matte-black tracking-wide">
                Location Map
              </h3>
              <div className="relative overflow-hidden rounded-[6px] border border-matte-black/10 aspect-[16/9] bg-beige">
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

          {/* Right Column: Sticky Reservation Box (Image 1 style) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={
              <div className="bg-white rounded-[6px] border border-matte-black/15 p-6 text-center text-xs text-matte-black/55 shadow-sm">
                Loading reservation desk...
              </div>
            }>
              <BookingWidget compact />
            </Suspense>
          </aside>

        </div>
      </section>

      {/* Featured Cabins Recommended (Image 1 style) */}
      <section className="container max-w-6xl px-6 pt-8 border-t border-matte-black/10">
        <h3 className="font-serif text-xl font-light text-matte-black tracking-wide mb-6">
          Featured Cabins recommended for you
        </h3>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedRooms.map((rec) => (
            <Link 
              key={rec.slug} 
              href={`/rooms/${rec.slug}`}
              className="group flex flex-col gap-3.5 overflow-hidden rounded-[6px] border border-matte-black/5 bg-beige/10 p-3.5 transition-all duration-300 hover:shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-matte-black">
                <Image 
                  src={rec.image} 
                  alt={rec.name} 
                  fill 
                  className="image-cover transition-transform duration-[6000ms] group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                />
                <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-cream/95 px-2.5 py-0.5 backdrop-blur-sm border border-matte-black/5">
                  <p className="font-poppins text-[8px] font-bold uppercase tracking-wider text-olive">
                    ★ 4.9
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-serif text-base font-normal text-matte-black group-hover:text-olive transition">
                  {rec.name}
                </h4>
                <p className="font-sans text-[10px] text-matte-black/45 mt-0.5 uppercase tracking-widest">
                  Tehri Lake &bull; {rec.size}
                </p>
                <p className="font-serif text-sm font-light text-olive mt-2">
                  {formatCurrency(rec.price)} <span className="text-xs font-sans text-matte-black/50 lowercase">/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
