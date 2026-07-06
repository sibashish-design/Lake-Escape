import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { RoomCard } from "@/components/RoomCard";
import { SectionHeader } from "@/components/SectionHeader";
import { amenities, experiences, media, rooms, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="section bg-[#F8F6F2]">
        <div className="container">
          <SectionHeader eyebrow="A floating address" title="A hotel that moves at the pace of water." text="Lake Escape blends the privacy of a boutique stay with the drama of Tehri Lake: large decks, four refined rooms, curated dining and an arrival that feels cinematic from the first step aboard." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {amenities.map((item) => (
              <div className="reveal rounded-[8px] border border-black/10 bg-white p-5" key={item.title}>
                <item.icon className="mb-8 text-[#B79C62]" size={26} />
                <h3 className="font-display text-2xl text-[#1B1B1B]">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#E8EEF0]">
        <div className="container grid items-center gap-10 lg:grid-cols-[0.86fr_1fr]">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[8px]">
            <Image src={media.boatTwo} alt="Lake Escape floating hotel on Tehri Lake" fill className="image-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
          <div>
            <SectionHeader eyebrow="Property overview" title="Four rooms. One private boat. Endless lake light." text="Designed for couples, families and intimate buyouts, Lake Escape keeps the hospitality personal and the views uninterrupted." />
            <div className="grid gap-4 sm:grid-cols-3">
              {["4 Rooms", "1 Boat", "360 Views"].map((stat) => (
                <div className="reveal rounded-[8px] bg-white/80 p-5" key={stat}>
                  <p className="font-display text-4xl text-[#556B2F]">{stat}</p>
                  <p className="mt-2 text-sm text-black/58">Premium lake hospitality</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#F4EFE6]">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Suites and cabins" title="Rooms with the lake as your lobby." />
            <Link className="btn btn-secondary reveal" href="/rooms">All rooms <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {rooms.map((room) => <RoomCard key={room.slug} room={room} />)}
          </div>
        </div>
      </section>

      <section className="section bg-[#1B1B1B] text-white">
        <div className="container">
          <SectionHeader eyebrow="Boat experiences" title="Sail, dine, celebrate and disappear for a while." text="From sunrise tea to laser show evenings, each moment is arranged around the rhythm of the water." />
          <div className="grid gap-5 md:grid-cols-2">
            {experiences.map((experience) => (
              <article className="reveal group grid overflow-hidden rounded-[8px] bg-white/8 md:grid-cols-[0.9fr_1fr]" key={experience.title}>
                <div className="relative min-h-72 overflow-hidden">
                  <Image src={experience.image} alt={experience.title} fill className="image-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 35vw" />
                </div>
                <div className="p-6">
                  <experience.icon className="mb-10 text-[#B79C62]" size={28} />
                  <h3 className="font-display text-4xl">{experience.title}</h3>
                  <p className="mt-4 leading-7 text-white/72">{experience.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#F8F6F2]">
        <div className="container">
          <SectionHeader eyebrow="Gallery" title="Editorial stills from the lake." />
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {[media.boatOne, media.sunset, media.boatTwo, media.boatOne, media.sunset, media.boatTwo].map((src, index) => (
              <div className={`reveal relative overflow-hidden rounded-[8px] ${index === 1 || index === 4 ? "md:row-span-2" : ""} ${index === 2 ? "md:col-span-2" : ""}`} key={`${src}-${index}`}>
                <Image src={src} alt="Lake Escape gallery view" fill className="image-cover transition duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#E8EEF0]">
        <div className="container">
          <SectionHeader eyebrow="Guest notes" title="Nothing loud. Everything remembered." />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article className="reveal rounded-[8px] bg-white p-6" key={item.name}>
                <p className="font-display text-3xl leading-tight text-[#1B1B1B]">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-8 font-semibold">{item.name}</p>
                <p className="text-sm text-black/55">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
