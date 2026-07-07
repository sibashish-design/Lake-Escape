import { Hero } from "@/components/Hero";
import { GridQuickActions } from "@/components/GridQuickActions";
import { IntroSection } from "@/components/IntroSection";
import { RoomsSection } from "@/components/RoomsSection";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { DesignStorySection } from "@/components/DesignStorySection";
import { ScrollHighlightText } from "@/components/ScrollHighlightText";
import { CinematicTransition } from "@/components/CinematicTransition";
import { DiningSection } from "@/components/DiningSection";
import { JourneySection } from "@/components/JourneySection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative bg-cream overflow-hidden">
      {/* Cinematic Hero */}
      <Hero />

      {/* Grid of 4 Quick Actions navigation (Image 2 style) */}
      <GridQuickActions />

      {/* Concept Description and Spaces Slider */}
      <IntroSection />

      {/* Rooms Showcase with Deluxe/Suite sliding tabs */}
      <RoomsSection />

      {/* Curated experiences diary list */}
      <ExperiencesSection />

      {/* Wellness & Spa focus */}
      <DesignStorySection />

      {/* Text scroll highlight reflection */}
      <ScrollHighlightText />

      {/* Zoom Transition from Cream to Olive Green background */}
      <CinematicTransition />

      {/* Gastronomy section (Olive Green background) */}
      <DiningSection />

      {/* Numbered 01-04 Journey steps */}
      <JourneySection />

      {/* Masonry image gallery */}
      <GallerySection />

      {/* Swipeable Testimonials Carousel */}
      <TestimonialsSection />

      {/* Travel Directions and custom grayscale map */}
      <LocationSection />

      {/* Contact Booking Form */}
      <ContactSection />
    </main>
  );
}
