import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lakeescape.in"),
  title: {
    default: "Lake Escape | Floating Luxury Hotel on Tehri Lake",
    template: "%s | Lake Escape"
  },
  description: "A cinematic floating luxury hotel on Tehri Lake, Uttarakhand, with four premium rooms, private dining, sunset cruises and adventure experiences.",
  openGraph: {
    title: "Lake Escape",
    description: "Floating luxury hotel on Tehri Lake, Uttarakhand.",
    images: ["/media/lake-escape-boat-1.png"]
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
        <MotionProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
