import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingCTAs } from "@/components/FloatingCTAs";
import { CookieBanner } from "@/components/CookieBanner";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { BookingBar } from "@/components/BookingBar";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://lakeescape.in"),
  title: {
    default: "Lake Escape | Floating Luxury Hotel on Tehri Lake",
    template: "%s | Lake Escape"
  },
  description: "A cinematic floating luxury hotel on Tehri Lake, Uttarakhand, featuring four premium rooms, private dining, sunset cruises, and adventure experiences.",
  openGraph: {
    title: "Lake Escape | Floating Luxury Hotel on Tehri Lake",
    description: "A cinematic floating luxury hotel on Tehri Lake, Uttarakhand.",
    images: ["/media/lake-escape-boat-1.png"]
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-cream text-matte-black">
        <LanguageProvider>
          {/* Blur-tracking brand preloader overlay */}
          <Preloader />
          <MotionProvider />
          <CustomCursor />
          <Navbar />
          {children}
          <BookingBar />
          <FloatingCTAs />
          <CookieBanner />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
