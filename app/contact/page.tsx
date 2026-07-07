import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <PageHero 
        eyebrow="Contact" 
        title="Start with dates, wishes, or a celebration brief." 
        text="The reservations team is ready to help coordinate room selection, entire boat buyouts, custom menus, or waterside celebrations." 
      />

      {/* Reusable Contact/Enquiry Form Component */}
      <ContactSection />
    </main>
  );
}
