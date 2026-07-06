import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { media } from "@/lib/data";

const images = [media.boatOne, media.sunset, media.boatTwo, media.boatOne, media.sunset, media.boatTwo, media.boatOne, media.sunset];

export default function GalleryPage() {
  return (
    <main>
      <PageHero eyebrow="Gallery" title="A visual journal from Tehri Lake." text="Large imagery, lake reflections and cinematic boat details give future guests a clear feel for the stay." />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <button className={`reveal relative overflow-hidden rounded-[8px] ${index % 3 === 0 ? "md:row-span-2" : ""} ${index === 5 ? "md:col-span-2" : ""}`} key={`${image}-${index}`} aria-label="Open gallery image">
              <Image src={image} alt="Lake Escape view" fill className="image-cover transition duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
