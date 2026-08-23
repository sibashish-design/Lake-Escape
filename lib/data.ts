import { Bike, Sparkles, Sun, Utensils } from "lucide-react";

export const media = {
  heroVideo: "/media/header-video-1.mp4",
  boatOne: "/images/rooms/suite-room/primary.jpg",
  boatTwo: "/images/rooms/views/view-1.jpg",
  sunset: "/images/rooms/views/view-2.jpg",
  boatCutout: "/media/lake-escape-boat-1.png",
  logoWhite: "/media/White logo.png",
  logoBlack: "/media/Black logo.png"
};

export const navItems = [
  { label: "Suites", href: "/rooms" },
  { label: "The Vessel", href: "/vessel" },
  { label: "Experiences", href: "/experiences" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" }
];

export interface RoomData {
  id: string;
  slug: string;
  roomNumber: string;
  name: string;
  category: string;
  price: number;
  memberPrice: number;
  image: string;
  gallery: string[];
  size: string;
  guests: string;
  maxGuests: number;
  bedType: string;
  bathrooms: number;
  tone: string;
  description: string;
  amenities: string[];
  features: string[];
}

export const rooms: RoomData[] = [
  {
    id: "room-1",
    slug: "lake-view-suite",
    roomNumber: "01",
    name: "The Morning Dew Cabin",
    category: "Deluxe Lakefront Cabin",
    price: 14500,
    memberPrice: 12900,
    image: "/images/rooms/room-1/primary.jpg",
    gallery: [
      "/images/rooms/room-1/primary.jpg",
      "/images/rooms/room-1/interior-2.jpg",
      "/images/rooms/room-1/balcony-1.jpg",
      "/images/rooms/room-1/washroom-1.jpg"
    ],
    size: "340 sq ft / 32 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 King-size Floating Bed",
    bathrooms: 1,
    tone: "Private sunrise deck facing the calm waters of Tehri Lake with natural cedar wood finish and morning mist views.",
    description: "Carefully designed to create an intimate connection with the waters of Tehri Lake. Features warm natural cedar tones, floor-to-ceiling panoramic glass, a private overwater balcony, and an en-suite rain shower sanctuary.",
    amenities: ["Private Lake Balcony", "King Floating Bed", "High-speed Starlink Wi-Fi", "Panoramic Rainshower", "Artisan Coffee Bar", "Climate Controlled AC"],
    features: ["Direct Lakefront View", "Breakfast Hamper Included", "Complimentary Speedboat Transfer", "Custom Pillow Menu"]
  },
  {
    id: "room-2",
    slug: "sunset-cabin",
    roomNumber: "02",
    name: "The Tehri Vista Cabin",
    category: "Sunset Vista Stateroom",
    price: 12800,
    memberPrice: 11400,
    image: "/images/rooms/room-2/primary.jpg",
    gallery: [
      "/images/rooms/room-2/primary.jpg",
      "/images/rooms/room-2/interior-2.jpg",
      "/images/rooms/room-2/balcony-1.jpg",
      "/images/rooms/room-2/washroom-1.jpg"
    ],
    size: "310 sq ft / 29 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 Queen-size Luxury Bed",
    bathrooms: 1,
    tone: "Golden hour sanctuary crafted for slow evenings, panoramic horizon windows and bespoke leather detailing.",
    description: "Framed to capture Tehri's golden hours as the sun dips below the Garhwal Himalayan ridge. Complete with sunken deck seating, handcrafted oak paneling, and acoustic isolation for ultimate serenity.",
    amenities: ["Sunset Veranda", "Queen Luxury Bed", "Complimentary Mini Bar", "Marble Ensuite Bath", "Starlink Wi-Fi", "Evening Turndown Service"],
    features: ["Sunset Horizon Orientation", "Private Wine Tasting Setup", "Deckside Tea Service", "Smart Temperature Control"]
  },
  {
    id: "room-3",
    slug: "mountain-deck-room",
    roomNumber: "03",
    name: "The Azure Deck Cabin",
    category: "Upper Deck Lakefront Cabin",
    price: 13200,
    memberPrice: 11800,
    image: "/images/rooms/room-3/primary.jpg",
    gallery: [
      "/images/rooms/room-3/primary.jpg",
      "/images/rooms/room-3/interior-2.jpg",
      "/images/rooms/room-3/balcony-1.jpg",
      "/images/rooms/room-3/washroom-1.jpg"
    ],
    size: "325 sq ft / 30 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 King-size Bed",
    bathrooms: 1,
    tone: "A refined mountain hideaway with dual-aspect lake glass and direct access to the upper observation deck.",
    description: "Positioned on the yacht's upper vantage with sweeping views across both the azure reservoir and the alpine peaks. Minimalist Japanese-Scandinavian aesthetics with direct access to the private stargazing lounge.",
    amenities: ["Dual-Aspect Glass", "King Plush Bed", "Upper Deck Access", "Handcrafted Stone Vanity", "Bose Ambient Sound", "High-speed Wi-Fi"],
    features: ["Observation Deck Access", "Stargazing Telescope Setup", "Mountain & Lake Panorama", "Chef's Curated Welcome Box"]
  },
  {
    id: "room-4",
    slug: "captains-residence",
    roomNumber: "04",
    name: "The Presidential Lake Suite",
    category: "Signature Master Suite",
    price: 19500,
    memberPrice: 17200,
    image: "/images/rooms/suite-room/primary.jpg",
    gallery: [
      "/images/rooms/suite-room/primary.jpg",
      "/images/rooms/suite-room/interior-2.jpg",
      "/images/rooms/suite-room/balcony-1.jpg",
      "/images/rooms/suite-room/washroom-1.jpg"
    ],
    size: "460 sq ft / 43 m²",
    guests: "3 Guests",
    maxGuests: 3,
    bedType: "1 Grand Master King Bed + Daybed",
    bathrooms: 1,
    tone: "The crown jewel of Lake Escape with 360° private bow terrace, deep soaking panoramic tub and personal butler service.",
    description: "The definitive floating penthouse experience. Boasting expansive master living quarters, a freestanding panoramic soaking bathtub overlooking the open water, 360-degree private wrap-around terrace, and personalized concierge.",
    amenities: ["360° Wrap-around Terrace", "Panoramic Soaking Tub", "Grand Master King Bed", "Dedicated Butler Call", "Executive Salon Lounge", "Private Dining Service"],
    features: ["Priority Speedboat Boarding", "Sunset Champagne Hamper", "Personalized Itinerary Curation", "Full Boat Audio System Control"]
  }
];

export const experiences = [
  {
    id: "exp-1",
    title: "Sunrise Mist Sailing",
    tag: "MORNING CRUISE",
    image: "/images/rooms/views/view-1.jpg",
    duration: "2 Hours",
    description: "Glide across the mirror-calm waters of Tehri as the morning sun illuminates the Himalayan peaks. Accompanied by freshly pressed juices and a warm gourmet breakfast hamper on the bow deck.",
    text: "Glide across the mirror-calm waters of Tehri as the morning sun illuminates the Himalayan peaks.",
    icon: Sun
  },
  {
    id: "exp-2",
    title: "Private Deck Gastronomy",
    tag: "CULINARY JOURNEY",
    image: "/images/rooms/suite-room/interior-2.jpg",
    duration: "Custom Dinner",
    description: "A private 5-course candlelit dinner prepared on-board by our private chef, pairing slow-cooked Garhwali heritage recipes with international grilling and sommelier wine selections under the stars.",
    text: "A private 5-course candlelit dinner prepared on-board by our private chef.",
    icon: Utensils
  },
  {
    id: "exp-3",
    title: "Tehri Watersports & Speedboat",
    tag: "HIGH ADRENALINE",
    image: "/images/rooms/views/view-2.jpg",
    duration: "Half Day",
    description: "Private access to Yamaha jet skis, wakeboarding sessions, and guided high-speed tender excursions exploring hidden fjord-like inlets across the 42 sq km expanse of Tehri Lake.",
    text: "Private access to Yamaha jet skis, wakeboarding sessions, and guided high-speed tender excursions.",
    icon: Bike
  },
  {
    id: "exp-4",
    title: "Laser Spectacle & Night Anchorage",
    tag: "EVENING EXPERIENCE",
    image: "/images/rooms/suite-room/balcony-1.jpg",
    duration: "Evening",
    description: "Anchor in prime position for the synchronized Tehri Dam laser and water show with champagne cocktails, ambient acoustics, and telescope stargazing in unpolluted dark skies.",
    text: "Anchor in prime position for the synchronized Tehri Dam laser and water show.",
    icon: Sparkles
  }
];

export const cuisines = [
  {
    id: "cuisine-1",
    name: "Garhwali Mandua Roti & Jhakhiya Aloo",
    category: "Breakfast",
    description: "Finger millet breads served with local wild-mustard tempered potatoes and fresh churned butter.",
    price: 650,
    image: "/images/rooms/suite-room/interior-2.jpg"
  },
  {
    id: "cuisine-2",
    name: "Himalayan Trout Grill",
    category: "Entrée",
    description: "Freshly caught trout marinated with mountain wild yellow mustard and grilled over wood-embers on the deck.",
    price: 1850,
    image: "/images/rooms/views/view-1.jpg"
  },
  {
    id: "cuisine-3",
    name: "Koda Roti & Chainsoo",
    category: "Main Course",
    description: "Slow-cooked black gram gravy cooked in an iron kadhai, served with traditional hill wheat bread and ghee.",
    price: 1100,
    image: "/images/rooms/room-1/primary.jpg"
  },
  {
    id: "cuisine-4",
    name: "Rhododendron Blossom Cooler",
    category: "Beverages",
    description: "Sweet, tangy syrup made from wild red rhododendron flowers, served with club soda, lemon, and fresh hill mint.",
    price: 350,
    image: "/images/rooms/views/view-2.jpg"
  }
];

export const faqs: [string, string][] = [
  ["How many staterooms are available aboard Lake Escape?", "Lake Escape features four private bespoke staterooms and can also be reserved for exclusive whole-boat buyouts."],
  ["Where is the boarding location for Lake Escape?", "Guests board via private VIP speedboat transfers from Koti Colony Bay Jetty on Tehri Lake, Uttarakhand."],
  ["What is included in the direct reservation rate?", "All direct bookings include private overwater speedboat transfers, daily chef-prepared Himalayan breakfast hampers, Starlink maritime Wi-Fi, and 24/7 concierge."],
  ["Can customized dining or celebration itineraries be arranged?", "Yes, our on-board dedicated private chef and boat managers will tailor multi-course deck dinners, sunset wine tastings, and watersports itineraries."]
];


export const vesselSpecs = [
  { label: "LENGTH OVERALL", value: "32 METERS / 105 FT" },
  { label: "CRUISING WATERWAY", value: "TEHRI LAKE, UTTARAKHAND" },
  { label: "GUEST CAPACITY", value: "4 PRIVATE STATEROOMS (UP TO 10 GUESTS)" },
  { label: "DECKS", value: "3 FLOATING ENTERTAINMENT & SOLAR DECKS" },
  { label: "PROPULSION & POWER", value: "ECO-HYBRID SILENT ELECTRIC ANCHORAGE" },
  { label: "COMMUNICATIONS", value: "HIGH-SPEED STARLINK MARITIME" }
];

export const galleryPhotos = [
  { src: "/images/rooms/suite-room/primary.jpg", title: "Presidential Suite Salon", aspect: "aspect-[16/10]" },
  { src: "/images/rooms/room-1/balcony-1.jpg", title: "Private Overwater Balcony", aspect: "aspect-[4/5]" },
  { src: "/images/rooms/views/view-1.jpg", title: "Himalayan Morning Reflection", aspect: "aspect-[16/9]" },
  { src: "/images/rooms/suite-room/washroom-1.jpg", title: "Panoramic En-Suite Soaking Tub", aspect: "aspect-square" },
  { src: "/images/rooms/room-2/interior-2.jpg", title: "Sunset Stateroom Interior", aspect: "aspect-[16/10]" },
  { src: "/images/rooms/views/view-2.jpg", title: "Tehri Evening Waterscape", aspect: "aspect-[4/5]" },
  { src: "/images/rooms/room-3/primary.jpg", title: "Azure Observation Cabin", aspect: "aspect-[16/9]" },
  { src: "/images/rooms/room-1/washroom-1.jpg", title: "Artisan Bath & Vanity", aspect: "aspect-square" }
];
