import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { media } from "@/lib/data";
import { BookingWidget } from "@/components/BookingWidget";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#1B1B1B] text-white">
      <video className="absolute inset-0 h-full w-full object-cover" src={media.heroVideo} autoPlay muted loop playsInline poster={media.boatOne} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/28 to-black/72" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-end gap-10 px-5 pb-8 pt-32 lg:grid-cols-[1.1fr_0.8fr] lg:pb-12">
        <div className="pb-4">
          <p className="eyebrow mb-5 text-[#E7D7B3]">Tehri Lake, Uttarakhand</p>
          <h1 className="font-display max-w-4xl text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[0.86]">
            Lake Escape
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
            A floating luxury hotel shaped by quiet water, mountain light and four private rooms designed for deeply memorable stays.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-hero-light" href="/rooms">
              Explore rooms <ArrowRight size={16} />
            </Link>
            <Link className="btn border-white/35 bg-white/10 text-white" href="/boat-experience">
              <Play size={16} /> Boat experience
            </Link>
          </div>
        </div>
        <div className="mb-5 lg:mb-0">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
