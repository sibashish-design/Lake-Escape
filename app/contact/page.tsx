import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Start with dates, wishes or a celebration brief." text="The reservations team can help with room selection, entire boat buyouts, dining and activity planning." />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="grid gap-4">
            <p className="reveal flex items-center gap-3 rounded-[8px] bg-white p-5"><MapPin className="text-[#B79C62]" /> Tehri Lake, Uttarakhand</p>
            <p className="reveal flex items-center gap-3 rounded-[8px] bg-white p-5"><Phone className="text-[#B79C62]" /> +91 98765 43210</p>
            <p className="reveal flex items-center gap-3 rounded-[8px] bg-white p-5"><Mail className="text-[#B79C62]" /> reservations@lakeescape.in</p>
          </div>
          <form className="reveal grid gap-4 rounded-[8px] bg-white p-6">
            <input className="rounded-[8px] border border-black/10 px-4 py-3" placeholder="Name" />
            <input className="rounded-[8px] border border-black/10 px-4 py-3" placeholder="Email" type="email" />
            <input className="rounded-[8px] border border-black/10 px-4 py-3" placeholder="Phone" />
            <textarea className="min-h-36 rounded-[8px] border border-black/10 px-4 py-3" placeholder="Tell us what you are planning" />
            <button className="btn btn-primary justify-self-start" type="button">Send inquiry</button>
          </form>
        </div>
      </section>
    </main>
  );
}
