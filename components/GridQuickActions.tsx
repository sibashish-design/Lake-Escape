"use client";

import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, Compass, ChefHat, Sparkles } from "lucide-react";

export function GridQuickActions() {
  const { t, locale } = useLanguage();

  const cards = [
    {
      title: t.nav.rooms,
      subtitle: locale === "hi" ? "लक्जरी केबिन" : "Luxury Cabins",
      image: media.boatOne,
      href: "/rooms",
      icon: ShieldCheck
    },
    {
      title: t.nav.experiences,
      subtitle: locale === "hi" ? "झील रोमांच" : "Lake Adventures",
      image: media.boatTwo,
      href: "/experiences",
      icon: Compass
    },
    {
      title: t.nav.dining,
      subtitle: locale === "hi" ? "पहाड़ी स्वाद" : "Garhwal Flavours",
      image: media.sunset,
      href: "/dining",
      icon: ChefHat
    },
    {
      title: t.nav.wellness,
      subtitle: locale === "hi" ? "योग और स्पा" : "Yoga & Spa",
      image: media.boatOne,
      href: "/experiences",
      icon: Sparkles
    }
  ];

  return (
    <section className="bg-cream px-6 py-6 border-b border-matte-black/5 relative z-20">
      <div className="mx-auto max-w-7xl">
        {/* Tight grid layout optimized for mobile (1 col), tablet (2 cols), and desktop (4 cols) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative block aspect-[2/1] sm:aspect-[1.5/1] lg:aspect-[1.3/1] overflow-hidden rounded-[6px] border border-matte-black/10 bg-matte-black transition-transform duration-300 hover:shadow-md"
              >
                {/* Image Backdrop */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="image-cover opacity-60 transition-transform duration-[6000ms] ease-out group-hover:scale-106"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/85 via-matte-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-cream">
                  {/* Top Icon */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/15 text-gold border border-cream/5 backdrop-blur-sm transition group-hover:scale-105">
                    <Icon size={13} />
                  </div>

                  {/* Bottom Text */}
                  <div className="space-y-0.5">
                    <p className="font-poppins text-[8px] font-bold uppercase tracking-widest text-gold/90">
                      {card.subtitle}
                    </p>
                    <h3 className="font-serif text-base font-light tracking-wide text-cream">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
