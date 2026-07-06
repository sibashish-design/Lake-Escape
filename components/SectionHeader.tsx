export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="reveal mb-10 max-w-3xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[0.96] text-[#1B1B1B]">{title}</h2>
      {text ? <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68">{text}</p> : null}
    </div>
  );
}
