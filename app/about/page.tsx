"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { media } from "@/lib/data";
import { Heart, Compass, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-cream text-matte-black">
      {/* Page Hero */}
      <PageHero 
        eyebrow="Our Story" 
        title="A floating retreat built for Tehri Lake." 
        text="Lake Escape is a boutique sanctuary designed around privacy, mountain light, and the slow movement of still waters." 
        image={media.boatTwo}
      />

      {/* Vision Statement (Highlight on Scroll style) */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container max-w-4xl text-center">
          <p className="eyebrow mb-6">The Vision</p>
          <blockquote className="font-serif text-2xl font-light italic leading-relaxed text-olive md:text-3xl">
            &ldquo;We wanted to build a space where the boundary between architecture and nature dissolves. On Tehri Lake, the water is not just a view—it is the floor, the path, and the rhythm of your entire day.&rdquo;
          </blockquote>
          <p className="mt-6 font-sans text-xs uppercase tracking-widest text-matte-black/40">
            — Founders, Lake Escape
          </p>
        </div>
      </section>

      {/* Concept Grid Details */}
      <section className="section bg-beige text-matte-black border-t border-matte-black/5">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          
          {/* Left: Asymmetric Image */}
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[8px] border border-matte-black/5 bg-matte-black shadow-sm lg:aspect-[1/1]">
            <Image 
              src={media.boatOne} 
              alt="Lake Escape floating design concept" 
              fill 
              className="image-cover opacity-90 transition-transform duration-[10000ms] ease-out hover:scale-108 animate-kenburns" 
              sizes="(max-width: 1024px) 100vw, 45vw" 
            />
          </div>

          {/* Right: Core Values list */}
          <div className="space-y-8">
            <div className="reveal">
              <p className="eyebrow mb-4">Values</p>
              <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl text-matte-black">
                Crafted for Slow Travel
              </h2>
              <p className="mt-4 font-sans text-sm font-light text-matte-black/60 leading-relaxed">
                We believe that true luxury lies in restraint. By limiting our property to just four suites, we preserve a quiet, personal, and deeply immersive experience.
              </p>
              <div className="h-px bg-matte-black/10 my-8" />
            </div>

            <div className="reveal space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-olive">
                  <Compass size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-matte-black">Quiet Coordinates</h3>
                  <p className="mt-1.5 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                    Set on the calmest waters of Tehri, our coordinates are chosen to maximize sunrise views and provide shelter from mountain winds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-olive">
                  <Heart size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-matte-black">Mindful Hospitality</h3>
                  <p className="mt-1.5 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                    No loud corridors or crowded lobbies. Our team operates silently in the background, anticipating your needs before they arise.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-olive">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-matte-black">Garhwali Roots</h3>
                  <p className="mt-1.5 font-sans text-sm font-light text-matte-black/70 leading-relaxed">
                    From our local architectural accents to our menu ingredients, we celebrate and support the communities of Uttarakhand.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
