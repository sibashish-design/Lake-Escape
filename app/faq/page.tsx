import { PageHero } from "@/components/PageHero";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <main>
      <PageHero eyebrow="FAQ" title="Questions before you arrive." text="The essential details for planning a Lake Escape stay or private boat booking." />
      <section className="section bg-[#F8F6F2]">
        <div className="container grid gap-4">
          {faqs.map(([question, answer]) => (
            <details className="reveal rounded-[8px] bg-white p-6" key={question}>
              <summary className="cursor-pointer font-display text-3xl text-[#1B1B1B]">{question}</summary>
              <p className="mt-4 leading-8 text-black/68">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
