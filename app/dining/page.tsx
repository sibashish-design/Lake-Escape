import { SimplePage } from "@/components/SimplePage";

export default function DiningPage() {
  return (
    <SimplePage
      eyebrow="Dining"
      title="Regional plates served with lake light."
      text="Menus are designed for slow breakfasts, sunset grills, private celebrations and intimate dinners on the deck."
      sections={[
        { title: "Breakfast on water", body: "Fresh seasonal fruit, breads, regional preparations and tea service are offered with early lake views." },
        { title: "Deck dining", body: "Evenings focus on grills, comforting Indian plates and simple luxury service under the open sky." },
        { title: "Private menus", body: "Celebration menus, dietary preferences and cake arrangements can be planned ahead through reservations." }
      ]}
    />
  );
}
