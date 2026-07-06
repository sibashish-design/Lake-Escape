"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="glass mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <Link href="/" className="font-display text-2xl font-semibold text-[#1B1B1B]">
          Lake Escape
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link className="btn btn-secondary" href="/admin">
            Admin
          </Link>
          <Link className="btn btn-primary" href="/booking">
            Book Stay
          </Link>
        </div>
        <button className="btn btn-secondary h-11 min-h-0 w-11 p-0 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={22} strokeWidth={2.4} /> : <Menu size={22} strokeWidth={2.4} />}
        </button>
      </nav>
      {open ? (
        <div className="glass mx-4 mt-3 rounded-[8px] p-5 lg:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link className="nav-link py-2" href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-primary mt-2" href="/booking" onClick={() => setOpen(false)}>
              Book Stay
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
