import { SimplePage } from "@/components/SimplePage";

export default function PrivacyPolicyPage() {
  return (
    <SimplePage
      eyebrow="Privacy"
      title="Privacy policy"
      text="Lake Escape handles guest inquiries, booking details and communication preferences with care."
      sections={[
        { title: "Information collected", body: "Booking forms may collect names, contact details, travel dates, guest counts and preferences needed to serve the stay." },
        { title: "Use of data", body: "Information is used for reservations, guest communication, payment coordination, operational analytics and service improvement." },
        { title: "Third parties", body: "Payments, email delivery, analytics and image storage can be connected through trusted providers using environment-based keys." }
      ]}
    />
  );
}
