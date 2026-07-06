import type { MetadataRoute } from "next";
import { rooms } from "@/lib/data";

const routes = ["", "/about", "/rooms", "/boat-experience", "/gallery", "/dining", "/experiences", "/booking", "/contact", "/faq", "/privacy-policy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lakeescape.in";
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...rooms.map((room) => ({ url: `${base}/rooms/${room.slug}`, lastModified: new Date() }))
  ];
}
