import Image from "next/image";
import { media } from "@/lib/data";

export function PageHero({ eyebrow, title, text, image = media.boatOne }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="relative min-h-[68svh] overflow-hidden bg-[#1B1B1B] px-5 pb-16 pt-36 text-white">
      <Image src={image} alt={title} fill priority className="image-cover opacity-70" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/22 to-black/74" />
      <div className="relative z-10 mx-auto flex min-h-[45svh] max-w-7xl flex-col justify-end">
        <p className="eyebrow mb-5 text-[#E7D7B3]">{eyebrow}</p>
        <h1 className="font-display max-w-5xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.9]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">{text}</p>
      </div>
    </section>
  );
}
