import { Anchor, Bath, BedDouble, Bike, CalendarDays, ChefHat, Flame, Mountain, Ship, Sparkles, Sun, Utensils } from "lucide-react";

export const media = {
  heroVideo: "/media/header-video-1.mp4",
  boatOne: "/media/lake-escape-boat-1.png",
  boatTwo: "/media/lake-escape-boat-2.png",
  sunset: "/media/tehri-sunset.png"
};

export const navItems = [
  { label: "Rooms", href: "/#rooms" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Dining", href: "/#dining" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" }
];

export const rooms = [
  {
    slug: "lake-view-suite",
    name: "Lake View Suite",
    price: 14500,
    image: media.boatOne,
    size: "340 sq ft",
    guests: "2 guests",
    tone: "Private deck facing Tehri Lake with warm woods, soft linen and sunrise tea service.",
    amenities: ["King bed", "Lake deck", "Breakfast", "Heated bath"]
  },
  {
    slug: "sunset-cabin",
    name: "Sunset Cabin",
    price: 12800,
    image: media.sunset,
    size: "300 sq ft",
    guests: "2 guests",
    tone: "Golden hour views, quiet interiors and a compact lounge crafted for slow evenings.",
    amenities: ["Queen bed", "Sunset view", "Mini bar", "Concierge"]
  },
  {
    slug: "mountain-deck-room",
    name: "Mountain Deck Room",
    price: 13200,
    image: media.boatTwo,
    size: "315 sq ft",
    guests: "2 guests",
    tone: "A refined hideaway with mountain-framed windows and direct access to the upper deck.",
    amenities: ["King bed", "Deck access", "Wi-Fi", "Work nook"]
  },
  {
    slug: "captains-residence",
    name: "Captain's Residence",
    price: 18500,
    image: media.boatOne,
    size: "420 sq ft",
    guests: "3 guests",
    tone: "The signature suite with generous living space, premium bath and the best bow views.",
    amenities: ["Premium suite", "Living room", "Soaking tub", "Butler call"]
  }
];

export const experiences = [
  { title: "Sunrise Sailing", icon: Sun, image: media.boatTwo, text: "Begin the day with mist, mountain silhouettes and a chef-packed breakfast hamper." },
  { title: "Laser Show Cruise", icon: Sparkles, image: media.sunset, text: "A private evening cruise timed with Tehri's waterside spectacle and soft deck service." },
  { title: "Adventure Access", icon: Bike, image: media.boatOne, text: "Curated jet ski, kayak and mountain trail bookings through trusted local operators." },
  { title: "Floating Dining", icon: Utensils, image: media.sunset, text: "Regional Uttarakhand plates, grills and celebration menus served on the lake." }
];

export const amenities = [
  { title: "Four Premium Rooms", icon: BedDouble },
  { title: "Entire Boat Buyout", icon: Ship },
  { title: "Private Lake Decks", icon: Anchor },
  { title: "Chef-Led Dining", icon: ChefHat },
  { title: "Mountain Views", icon: Mountain },
  { title: "Premium Bathrooms", icon: Bath },
  { title: "Seasonal Bonfire", icon: Flame },
  { title: "Smart Booking", icon: CalendarDays }
];

export const testimonials = [
  {
    quote: "The boat felt private, cinematic and calm. Sunrise from the deck was the highlight of our Uttarakhand trip.",
    name: "Ananya Mehra",
    role: "Guest from Delhi"
  },
  {
    quote: "Lake Escape gave us a celebration that did not feel like a hotel package. The team handled every detail.",
    name: "Rohan Batra",
    role: "Anniversary stay"
  },
  {
    quote: "The setting is spectacular, but the real luxury is how quietly everything works around you.",
    name: "Nikita Sharma",
    role: "Family weekend"
  }
];

export const faqs = [
  ["How many rooms are available?", "Lake Escape has four premium guest rooms and can also be booked as an entire private boat."],
  ["Where is Lake Escape located?", "The floating hotel is designed for Tehri Lake, Uttarakhand, with mountain and lake-view experiences."],
  ["Is online payment ready?", "The project includes a Razorpay-ready booking flow structure. Production keys are configured through environment variables."],
  ["Can content be edited later?", "The app is structured with central data and admin-ready routes so a CMS or database can be connected cleanly."]
];

export const cuisines = [
  {
    id: "cuisine-1",
    name: "Garhwali Mandua Roti & Jhakhiya Aloo",
    category: "Breakfast",
    description: "Finger millet breads served with local wild-mustard tempered potatoes and fresh churned butter.",
    price: 650,
    image: media.boatTwo
  },
  {
    id: "cuisine-2",
    name: "Himalayan Trout Grill",
    category: "Entrée",
    description: "Freshly caught trout marinated with mountain wild yellow mustard and grilled over wood-embers on the deck.",
    price: 1850,
    image: media.sunset
  },
  {
    id: "cuisine-3",
    name: "Koda Roti & Chainsoo",
    category: "Main Course",
    description: "Slow-cooked black gram gravy cooked in an iron kadhai, served with traditional hill wheat bread and ghee.",
    price: 1100,
    image: media.boatOne
  },
  {
    id: "cuisine-4",
    name: "Rhododendron Blossom Cooler",
    category: "Beverages",
    description: "Sweet, tangy syrup made from wild red rhododendron flowers, served with club soda, lemon, and fresh hill mint.",
    price: 350,
    image: media.sunset
  },
  {
    id: "cuisine-5",
    name: "Baadi & Gahat Dal Soup",
    category: "Entrée",
    description: "Traditional organic horse-gram soup served with soft boiled flour paste and clarified cow ghee.",
    price: 950,
    image: media.boatTwo
  }
];
