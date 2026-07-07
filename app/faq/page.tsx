"use client";

import { PageHero } from "@/components/PageHero";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <PageHero 
        eyebrow="FAQs" 
        title="Questions before you arrive." 
        text="The essential logistics and travel details for planning your Lake Escape stay or private buyout on Tehri Lake." 
      />

      {/* Accordion List Section */}
      <section className="section bg-cream text-matte-black border-t border-matte-black/5">
        <div className="container max-w-3xl">
          <div className="grid gap-4">
            {faqs.map(([question, answer]) => (
              <details 
                className="reveal group rounded-[8px] border border-matte-black/5 bg-beige/10 p-6 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden" 
                key={question}
              >
                <summary className="flex cursor-pointer items-center justify-between font-serif text-lg font-light text-matte-black select-none outline-none">
                  <span>{question}</span>
                  <span className="text-olive transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 font-sans text-sm font-light text-matte-black/70 leading-relaxed border-t border-matte-black/5 pt-4">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
