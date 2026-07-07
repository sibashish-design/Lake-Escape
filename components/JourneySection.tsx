"use client";

import { useLanguage } from "@/providers/LanguageProvider";

interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export function JourneySection() {
  const { locale } = useLanguage();

  const stepsEN: JourneyStep[] = [
    {
      number: "01",
      title: "Arrival & Welcome",
      subtitle: "Garhwal Gateway",
      description: "Your journey starts at our private lakeside dock. Board our custom speed launch for a brief, scenic transfer across the blue waters of Tehri."
    },
    {
      number: "02",
      title: "Check-in on the Water",
      subtitle: "Afloat and Unbound",
      description: "Step onto our floating property. Skip the traditional desk; enjoy check-in directly on the deck with a welcome cup of regional rhododendron tea."
    },
    {
      number: "03",
      title: "Your Stay & Experiences",
      subtitle: "Rhythms of the Lake",
      description: "Immerse yourself in sunrise sails, premium deck dining, and local kayaking. Or simply do nothing, letting the shifting light change around you."
    },
    {
      number: "04",
      title: "Departure & Memories",
      subtitle: "A Quiet Return",
      description: "Carry the peace of the lake with you. After a final deck breakfast, our speed launch returns you to the shore as the morning mist begins to clear."
    }
  ];

  const stepsHI: JourneyStep[] = [
    {
      number: "01",
      title: "आगमन और स्वागत",
      subtitle: "गढ़वाल प्रवेश द्वार",
      description: "आपकी यात्रा हमारे निजी झील के घाट से शुरू होती है। टिहरी के नीले पानी को पार करने के लिए हमारी गतिमान नौका पर सवार हों।"
    },
    {
      number: "02",
      title: "जल पर चेक-इन",
      subtitle: "तैरते हुए पल",
      description: "हमारी तैरती हुई संपत्ति पर कदम रखें। पारंपरिक डेस्क छोड़ें; डेक पर सीधे चेक-इन का आनंद लें और बुरांश की चाय का स्वाद लें।"
    },
    {
      number: "03",
      title: "आपका प्रवास और अनुभव",
      subtitle: "झील की लय",
      description: "सूर्योदय की सैर, प्रीमियम डेक डाइनिंग और कयाकिंग का आनंद लें। या बस शांत होकर प्रकृति के बदलते रूपों को महसूस करें।"
    },
    {
      number: "04",
      title: "विदाई और यादें",
      subtitle: "एक शांत वापसी",
      description: "झील की शांति को अपने साथ ले जाएं। अंतिम नाश्ते के बाद, हमारी स्पीड बोट आपको वापस किनारे पर ले जाएगी।"
    }
  ];

  const steps = locale === "hi" ? stepsHI : stepsEN;

  return (
    <section id="journey" className="section bg-cream text-matte-black border-t border-matte-black/5 py-24">
      <div className="container max-w-6xl">
        
        {/* Section Header */}
        <div className="reveal mb-16 max-w-xl">
          <p className="eyebrow mb-3">
            {locale === "hi" ? "अनुभव यात्रा" : "The Experience"}
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
            {locale === "hi" ? "लेक एस्केप की यात्रा" : "The Lake Escape Journey"}
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-matte-black/60 leading-relaxed">
            {locale === "hi" 
              ? "जिस क्षण आप किनारे से चलते हैं, आपकी यात्रा को बेहद निजी, शांत और असाधारण महसूस कराने के लिए डिज़ाइन किया गया है।"
              : "From the moment you step off the shore, your stay is designed to feel cohesive, private, and entirely removed from the ordinary."}
          </p>
        </div>

        {/* Journey Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="reveal group flex flex-col justify-between p-6 border border-matte-black/5 bg-beige/10 rounded-[8px] transition-all duration-500 hover:bg-beige/30 hover:-translate-y-1"
            >
              <div>
                {/* Number Indicator */}
                <span className="font-serif text-5xl font-extralight text-olive/30 transition-colors duration-500 group-hover:text-olive">
                  {step.number}
                </span>

                {/* Subtitle / Eyebrow */}
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold mt-6 mb-2">
                  {step.subtitle}
                </p>

                {/* Title */}
                <h3 className="font-serif text-lg font-light text-matte-black tracking-wide">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-4 font-sans text-xs font-light text-matte-black/60 leading-relaxed">
                {step.description}
              </p>

              {/* Staggered bottom line */}
              <div className="h-[2px] w-8 bg-matte-black/10 mt-8 transition-all duration-500 group-hover:w-full group-hover:bg-olive" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
