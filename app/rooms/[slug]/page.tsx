import { notFound } from "next/navigation";
import { RoomDetailClient } from "@/components/RoomDetailClient";
import { rooms } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  return <RoomDetailClient room={room} allRooms={rooms} />;
}
