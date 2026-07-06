import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { media } from "@/lib/data";

export function SimplePage({ eyebrow, title, text, sections }: { eyebrow: string; title: string; text: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} text={text} image={media.sunset} />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[8px]">
            <Image src={media.boatTwo} alt={title} fill className="image-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
          <div>
            <SectionHeader eyebrow={eyebrow} title={title} text={text} />
            <div className="grid gap-4">
              {sections.map((section) => (
                <article className="reveal rounded-[8px] border border-black/10 bg-white p-6" key={section.title}>
                  <h2 className="font-display text-3xl text-[#1B1B1B]">{section.title}</h2>
                  <p className="mt-3 leading-8 text-black/68">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
