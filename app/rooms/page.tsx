"use client";

import { PageHero } from "@/components/PageHero";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <PageHero 
        eyebrow="Rooms & Suites" 
        title="Four refined cabins on the water." 
        text="Reserve an individual suite for a quiet waterside stay, or secure the entire floating hotel for exclusive buyouts, celebrations, and retreats." 
      />

      {/* Grid Section */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {rooms.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
