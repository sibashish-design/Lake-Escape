import { SimplePage } from "@/components/SimplePage";

export default function BoatExperiencePage() {
  return (
    <SimplePage
      eyebrow="Boat experience"
      title="Private water moments, arranged beautifully."
      text="A Lake Escape stay can be still and quiet, or filled with curated lake experiences from sunrise sailing to the evening laser show."
      sections={[
        { title: "Sunrise and sunset", body: "Softly timed deck service, warm beverages and open-water views create the day markings guests remember most." },
        { title: "Adventure desk", body: "Kayaking, jet ski sessions, cycling trails and local excursions can be coordinated from the property team." },
        { title: "Celebrations", body: "Reserve the entire boat for proposals, anniversaries, intimate birthdays and family weekends on Tehri Lake." }
      ]}
    />
  );
}
