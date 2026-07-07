"use client";

import { CalendarCheck, CircleDollarSign, ImageIcon, Settings, Star, Users } from "lucide-react";

const cards = [
  { label: "Bookings", value: "18", icon: CalendarCheck },
  { label: "Revenue", value: "₹8.4L", icon: CircleDollarSign },
  { label: "Guests", value: "42", icon: Users },
  { label: "Gallery", value: "36", icon: ImageIcon },
  { label: "Reviews", value: "12", icon: Star },
  { label: "Settings", value: "Ready", icon: Settings }
];

const modules = [
  "Bookings by status", 
  "Room pricing and coupons", 
  "CMS content management", 
  "Inquiry messages"
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream px-6 pb-20 pt-32 text-matte-black">
      <section className="mx-auto max-w-7xl">
        <p className="eyebrow mb-4">Command Center</p>
        <h1 className="font-serif text-3xl font-light leading-snug tracking-wide md:text-4xl text-matte-black max-w-xl">
          Lake Escape Dashboard
        </h1>
        <p className="mt-3 font-sans text-sm font-light text-matte-black/60 max-w-lg">
          Manage bookings, view analytics, and control regional site settings.
        </p>
        <div className="h-px bg-matte-black/10 my-8" />

        {/* Analytics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article 
                className="reveal rounded-[8px] border border-matte-black/5 bg-beige/25 p-5 transition duration-300 hover:bg-beige/45 shadow-sm" 
                key={card.label}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-olive border border-matte-black/5">
                  <Icon size={16} className="text-gold" />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-matte-black/45 mt-6">{card.label}</p>
                <h2 className="font-serif text-2xl font-light text-matte-black mt-1.5">{card.value}</h2>
              </article>
            );
          })}
        </div>

        {/* Modules Grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {modules.map((title) => (
            <div 
              className="reveal rounded-[8px] border border-matte-black/5 bg-beige/10 p-6 transition duration-300 hover:bg-beige/35" 
              key={title}
            >
              <h2 className="font-serif text-lg font-normal text-olive">{title}</h2>
              <p className="mt-2.5 font-sans text-xs font-light text-matte-black/62 leading-relaxed">
                Database-ready module configured for Prisma database layers, Clerk client authentication, and secure Next.js server actions.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
