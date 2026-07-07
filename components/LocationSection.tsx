"use client";

import { MapPin, Plane, Train, Car } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export function LocationSection() {
  const { locale } = useLanguage();

  const labels = {
    en: {
      eyebrow: "Lakeside Refuge",
      title: "Tehri Lake, Uttarakhand",
      text: "Lake Escape sits floating on the calm waters of Tehri Lake, surrounded by the emerald foothills of the Garhwal Himalayas. A sanctuary that feels remote, yet lies within comfortable reach of major travel nodes.",
      airTitle: "By Air",
      airDesc: "Dehradun Airport (Jolly Grant) is the closest domestic airport. A scenic 2.5-hour private cab drive (approx. 82 km) brings you straight to our lakeside dock.",
      railTitle: "By Rail",
      railDesc: "Rishikesh Railway Station is approximately 76 km away (approx. 2 hours drive), and Haridwar Railway Station is 98 km away (2.5 hours drive).",
      roadTitle: "By Road",
      roadDesc: "A scenic drive from Delhi via Rishikesh takes approximately 6.5 hours (300 km). Private chauffeur-driven luxury cars can be arranged upon request.",
      pinLabel: "Lake Escape, Tehri Lake"
    },
    hi: {
      eyebrow: "झील का शांत आश्रय",
      title: "टिहरी झील, उत्तराखंड",
      text: "लेक एस्केप टिहरी झील के शांत पानी पर तैरता हुआ स्थित है, जो गढ़वाल हिमालय की हरी-भरी तलहटी से घिरा हुआ है। एक ऐसा अभयारण्य जो एकांत महसूस कराता है, फिर भी प्रमुख यात्रा केंद्रों की आसान पहुँच के भीतर है।",
      airTitle: "हवाई मार्ग द्वारा",
      airDesc: "देहरादून हवाई अड्डा (जॉली ग्रांट) निकटतम घरेलू हवाई अड्डा है। एक सुंदर 2.5 घंटे की निजी टैक्सी यात्रा (लगभग 82 किमी) आपको सीधे हमारे घाट तक लाती है।",
      railTitle: "रेल मार्ग द्वारा",
      railDesc: "ऋषिकेश रेलवे स्टेशन लगभग 76 किमी दूर है (लगभग 2 घंटे की ड्राइव), और हरिद्वार रेलवे स्टेशन 98 किमी दूर है (2.5 घंटे की ड्राइव)।",
      roadTitle: "सड़क मार्ग द्वारा",
      roadDesc: "ऋषिकेश के रास्ते दिल्ली से सुंदर सड़क मार्ग द्वारा लगभग 6.5 घंटे (300 किमी) का समय लगता है। अनुरोध पर लग्जरी कारों की व्यवस्था की जा सकती है।",
      pinLabel: "लेक एस्केप, टिहरी झील"
    }
  };

  const currentLabels = locale === "hi" ? labels.hi : labels.en;

  return (
    <section id="location" className="section bg-cream text-matte-black border-t border-matte-black/5 py-24">
      <div className="container max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
        {/* Left Side: How to Reach directions */}
        <div className="flex flex-col justify-center">
          <div className="reveal max-w-lg">
            <p className="eyebrow mb-3">{currentLabels.eyebrow}</p>
            <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
              {currentLabels.title}
            </h2>
            <p className="mt-4 font-sans text-xs font-light text-matte-black/70 leading-relaxed">
              {currentLabels.text}
            </p>
            <div className="h-px bg-matte-black/10 my-8" />
          </div>

          {/* Transportation Methods */}
          <div className="reveal space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige text-olive">
                <Plane size={16} />
              </div>
              <div>
                <h3 className="font-serif text-base font-normal text-matte-black">{currentLabels.airTitle}</h3>
                <p className="mt-1 font-sans text-xs font-light text-matte-black/60 leading-relaxed">
                  {currentLabels.airDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige text-olive">
                <Train size={16} />
              </div>
              <div>
                <h3 className="font-serif text-base font-normal text-matte-black">{currentLabels.railTitle}</h3>
                <p className="mt-1 font-sans text-xs font-light text-matte-black/60 leading-relaxed">
                  {currentLabels.railDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige text-olive">
                <Car size={16} />
              </div>
              <div>
                <h3 className="font-serif text-base font-normal text-matte-black">{currentLabels.roadTitle}</h3>
                <p className="mt-1 font-sans text-xs font-light text-matte-black/60 leading-relaxed">
                  {currentLabels.roadDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Google Map iframe styled with filter */}
        <div className="reveal relative overflow-hidden rounded-[8px] border border-matte-black/10 aspect-[4/3] md:aspect-auto md:h-[420px] bg-beige shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54988.94828117769!2d78.43574972583856!3d30.400262193556106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390906ad4cf01db3%3A0xe54e2f9d6a7d97cb!2sTehri%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: "grayscale(0.95) sepia(0.2) contrast(0.95) brightness(0.95)",
              opacity: 0.85
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of Tehri Lake, Uttarakhand"
          />
          
          {/* Custom Overlay pin tag */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2 border border-matte-black/5 shadow-md">
            <MapPin size={12} className="text-olive fill-current" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-matte-black/85">
              {currentLabels.pinLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
