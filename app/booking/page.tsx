"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { rooms, RoomData } from "@/lib/data";
import { RoomDetailClient } from "@/components/RoomDetailClient";
import { Check } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string>("lake-view-suite");

  useEffect(() => {
    const roomParam = searchParams?.get("room");
    if (roomParam && rooms.some((r) => r.slug === roomParam)) {
      setSelectedRoomSlug(roomParam);
    }
  }, [searchParams]);

  const activeRoom = rooms.find((r) => r.slug === selectedRoomSlug) || rooms[0];

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      {/* Top Suite Selection Bar */}
      <div className="bg-[#081218] text-white border-b border-white/10 pt-28 pb-4">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Select Your Floating Stateroom
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 sm:gap-4 pb-2">
            {rooms.map((room) => {
              const isSelected = room.slug === activeRoom.slug;
              return (
                <button
                  key={room.slug}
                  onClick={() => setSelectedRoomSlug(room.slug)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? "bg-white text-[#081218] shadow-lg scale-105"
                      : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && <Check size={14} className="text-[#081218]" />}
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Triptodream Product Detail & Booking Layout */}
      <RoomDetailClient room={activeRoom} allRooms={rooms} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#081218] flex items-center justify-center text-white text-sm font-sans">
        Loading Reservation Desk...
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
