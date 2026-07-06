import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
  return (
    <main>
      <PageHero eyebrow="Rooms" title="Four refined rooms on the water." text="Choose a private room for two, a signature suite or reserve the entire floating hotel for celebrations and family escapes." />
      <section className="section bg-[#F4EFE6]">
        <div className="container grid gap-5 md:grid-cols-2">
          {rooms.map((room) => <RoomCard key={room.slug} room={room} />)}
        </div>
      </section>
    </main>
  );
}
