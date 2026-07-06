import { SimplePage } from "@/components/SimplePage";

export default function TermsPage() {
  return (
    <SimplePage
      eyebrow="Terms"
      title="Terms and booking conditions"
      text="These draft terms outline the expected booking, payment and cancellation structure for the production website."
      sections={[
        { title: "Reservations", body: "Bookings are confirmed after valid guest details and payment authorization are received." },
        { title: "Cancellations", body: "Cancellation rules can vary by season, offer, private buyout and payment method." },
        { title: "Guest responsibility", body: "Guests are expected to follow safety guidance on deck, during water activities and while using shared boat spaces." }
      ]}
    />
  );
}
