"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function Footer() {
  const { t, locale } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const localizedNavLinks = [
    { label: t.nav.rooms, href: "/rooms" },
    { label: t.nav.experiences, href: "/experiences" },
    { label: t.nav.dining, href: "/dining" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.journey, href: "/#journey" },
    { label: t.nav.contact, href: "/contact" }
  ];

  return (
    <footer className="bg-olive px-6 py-20 text-cream border-t border-cream/5 relative z-10 pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] pb-16 border-b border-cream/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-light tracking-wide">
              Lake Escape
            </h2>
            <p className="font-sans text-xs font-light text-cream/70 leading-relaxed max-w-sm">
              {t.footer.text}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/5 text-cream transition hover:bg-cream hover:text-olive-dark"
                aria-label="Instagram Profile"
              >
                <Instagram size={15} />
              </a>
              <a
                href="mailto:stay@lakeescape.in"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/5 text-cream transition hover:bg-cream hover:text-olive-dark"
                aria-label="Email Reservations"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold">
              {locale === "hi" ? "अन्वेषण" : "Explore"}
            </h3>
            <div className="grid gap-2.5">
              {localizedNavLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-sans text-xs font-light text-cream/80 transition hover:text-gold w-fit"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/faq" className="font-sans text-xs font-light text-cream/80 transition hover:text-gold w-fit">
                FAQs
              </Link>
            </div>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="space-y-4">
            <h3 className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold">
              {t.footer.contact}
            </h3>
            <div className="space-y-3 font-sans text-xs font-light text-cream/85">
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold shrink-0" />
                <span>stay@lakeescape.in</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between font-sans text-[9px] uppercase tracking-widest text-cream/50">
          <p>
            {t.footer.copyright}
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="hover:text-cream transition">
              {locale === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-cream transition">
              {locale === "hi" ? "नियम और शर्तें" : "Terms & Conditions"}
            </Link>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-cream transition group"
            >
              <span>{locale === "hi" ? "शीर्ष पर वापस जाएं" : "Back to Top"}</span>
              <ArrowUp size={12} className="transition group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
