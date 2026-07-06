import { CalendarCheck, CircleDollarSign, ImageIcon, Settings, Star, Users } from "lucide-react";

const cards = [
  ["Bookings", "18", CalendarCheck],
  ["Revenue", "₹8.4L", CircleDollarSign],
  ["Guests", "42", Users],
  ["Gallery", "36", ImageIcon],
  ["Testimonials", "12", Star],
  ["Settings", "Ready", Settings]
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE6] px-5 pb-20 pt-32">
      <section className="mx-auto max-w-7xl">
        <p className="eyebrow">Admin</p>
        <h1 className="font-display mt-4 text-[clamp(3rem,7vw,7rem)] leading-[0.92] text-[#1B1B1B]">Lake Escape command center.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map(([label, value, Icon]) => (
            <article className="reveal rounded-[8px] bg-white p-6" key={label as string}>
              <Icon className="mb-10 text-[#B79C62]" />
              <p className="text-sm uppercase text-black/50">{label as string}</p>
              <h2 className="font-display mt-2 text-4xl text-[#1B1B1B]">{value as string}</h2>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {["Bookings by status", "Room pricing and coupons", "CMS content", "Contact forms"].map((title) => (
            <div className="reveal rounded-[8px] bg-white p-6" key={title}>
              <h2 className="font-display text-3xl text-[#1B1B1B]">{title}</h2>
              <p className="mt-3 leading-7 text-black/62">Database-ready module prepared for Prisma, Clerk authentication and server actions.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
