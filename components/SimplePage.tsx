"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { media } from "@/lib/data";

interface SimplePageProps {
  eyebrow: string;
  title: string;
  text: string;
  sections: Array<{ title: string; body: string }>;
}

export function SimplePage({ eyebrow, title, text, sections }: SimplePageProps) {
  return (
    <main className="bg-cream">
      {/* Editorial Page Hero */}
      <PageHero eyebrow={eyebrow} title={title} text={text} image={media.sunset} />

      {/* Grid Section */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1fr] items-center">
          
          {/* Left Column: Image with Ken Burns zoom */}
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black shadow-sm lg:aspect-[1/1.1]">
            <Image 
              src={media.boatTwo} 
              alt={title} 
              fill 
              className="image-cover opacity-90 transition-transform duration-[12000ms] ease-out hover:scale-106 animate-kenburns" 
              sizes="(max-width: 1024px) 100vw, 45vw" 
            />
          </div>

          {/* Right Column: Paragraph lists */}
          <div className="space-y-8">
            <div className="reveal">
              <p className="eyebrow mb-4">{eyebrow}</p>
              <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
                {title}
              </h2>
              <p className="mt-4 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                {text}
              </p>
              <div className="h-px bg-matte-black/10 my-8" />
            </div>

            <div className="reveal space-y-6">
              {sections.map((section) => (
                <article 
                  className="rounded-[8px] border border-matte-black/5 bg-beige/10 p-6 transition duration-300 hover:bg-beige/35" 
                  key={section.title}
                >
                  <h3 className="font-serif text-lg font-normal text-olive">
                    {section.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
