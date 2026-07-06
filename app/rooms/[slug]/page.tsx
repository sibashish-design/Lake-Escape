import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { PageHero } from "@/components/PageHero";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  return (
    <main>
      <PageHero eyebrow="Room" title={room.name} text={room.tone} image={room.image} />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <div className="reveal relative aspect-[16/10] overflow-hidden rounded-[8px]">
              <Image src={room.image} alt={room.name} fill className="image-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {room.amenities.map((item) => (
                <div className="reveal rounded-[8px] bg-white p-5" key={item}>
                  <p className="eyebrow">Included</p>
                  <h2 className="font-display mt-3 text-3xl text-[#1B1B1B]">{item}</h2>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4 rounded-[8px] bg-white p-5">
              <p className="eyebrow">From</p>
              <p className="font-display text-4xl text-[#556B2F]">{formatCurrency(room.price)} <span className="text-base text-black/50">per night</span></p>
            </div>
            <BookingWidget compact />
          </aside>
        </div>
      </section>
    </main>
  );
}
