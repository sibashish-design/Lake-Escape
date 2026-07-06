import { SimplePage } from "@/components/SimplePage";

export default function AboutPage() {
  return (
    <SimplePage
      eyebrow="About"
      title="A floating retreat built for Tehri Lake."
      text="Lake Escape is a premium boutique stay concept designed around privacy, cinematic water views and highly personal service."
      sections={[
        { title: "The idea", body: "A compact luxury hotel that keeps guests close to the lake while offering the comfort, service and calm expected from a premium resort." },
        { title: "The setting", body: "Tehri Lake gives the stay its drama: blue water, mountain horizons, sunrise mist and open skies throughout the day." },
        { title: "The service", body: "From arrival coordination to dining, excursions and celebrations, the experience is intentionally quiet, precise and warm." }
      ]}
    />
  );
}
