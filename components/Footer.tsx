import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#1B1B1B] px-5 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow mb-5 text-[#B79C62]">Private floating luxury</p>
          <h2 className="font-display max-w-3xl text-[clamp(3rem,7vw,7rem)] leading-[0.92]">Wake up on Tehri Lake.</h2>
          <Link className="btn mt-8 bg-white text-[#1B1B1B]" href="/booking">Start booking</Link>
        </div>
        <div className="grid content-between gap-8">
          <div className="grid gap-4">
            <p className="flex items-center gap-3 text-white/80"><MapPin size={18} /> Tehri Lake, Uttarakhand</p>
            <p className="flex items-center gap-3 text-white/80"><Phone size={18} /> +91 98765 43210</p>
            <p className="flex items-center gap-3 text-white/80"><Mail size={18} /> reservations@lakeescape.in</p>
            <p className="flex items-center gap-3 text-white/80"><Instagram size={18} /> @lakeescape</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/65">
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
