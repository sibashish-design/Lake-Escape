import { BookingWidget } from "@/components/BookingWidget";
import { PageHero } from "@/components/PageHero";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function BookingPage() {
  return (
    <main>
      <PageHero eyebrow="Booking" title="Plan the stay, then confirm securely." text="This production-ready booking surface supports dates, guests, room selection, seasonal pricing, coupons, payment handoff and confirmation workflows." />
      <section className="section bg-[#F4EFE6]">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <BookingWidget compact />
          <div className="grid gap-4">
            {rooms.map((room) => (
              <article className="reveal flex flex-wrap items-center justify-between gap-4 rounded-[8px] bg-white p-5" key={room.slug}>
                <div>
                  <h2 className="font-display text-3xl text-[#1B1B1B]">{room.name}</h2>
                  <p className="text-black/58">{room.guests} / {room.size}</p>
                </div>
                <p className="font-display text-2xl text-[#556B2F]">{formatCurrency(room.price)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
