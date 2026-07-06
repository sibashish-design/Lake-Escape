import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type Room = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  guests: string;
  tone: string;
  amenities: string[];
};

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="reveal group overflow-hidden rounded-[8px] bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={room.image} alt={room.name} fill className="image-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="font-display text-3xl text-[#1B1B1B]">{room.name}</h3>
            <p className="mt-1 text-sm text-black/55">{room.size} / {room.guests}</p>
          </div>
          <Link className="btn btn-secondary h-11 min-h-0 w-11 shrink-0 p-0" href={`/rooms/${room.slug}`} aria-label={`Open ${room.name}`}>
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="mt-4 leading-7 text-black/67">{room.tone}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <p><span className="font-display text-2xl text-[#556B2F]">{formatCurrency(room.price)}</span><span className="text-sm text-black/50"> / night</span></p>
          <Link className="btn btn-primary" href="/booking">Book</Link>
        </div>
      </div>
    </article>
  );
}
