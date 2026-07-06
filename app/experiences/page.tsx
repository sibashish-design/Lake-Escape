import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { experiences } from "@/lib/data";

export default function ExperiencesPage() {
  return (
    <main>
      <PageHero eyebrow="Experiences" title="The lake sets the itinerary." text="Choose quiet luxury or adventure days, then let the team shape the details around weather, light and guest rhythm." />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid gap-5 md:grid-cols-2">
          {experiences.map((experience) => (
            <article className="reveal overflow-hidden rounded-[8px] bg-white" key={experience.title}>
              <div className="relative aspect-[16/10]">
                <Image src={experience.image} alt={experience.title} fill className="image-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <experience.icon className="mb-8 text-[#B79C62]" />
                <h2 className="font-display text-4xl text-[#1B1B1B]">{experience.title}</h2>
                <p className="mt-4 leading-8 text-black/68">{experience.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
