"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { experiences } from "@/lib/data";

export function ExperiencesSection() {
  return (
    <section
      id="experiences"
      className="relative w-full bg-[#0d1b22] py-14 sm:py-24 md:py-32 px-6 sm:px-12 text-white border-b border-white/[0.12] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-white/[0.12]">
          <div>
            <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-2">
              Curated Pursuits
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
              Lake Adventures & Gastronomy
            </h2>
          </div>
          
          <Link
            href="/booking"
            className="coral-btn inline-flex items-center gap-2 self-start md:self-auto group text-white font-semibold text-sm tracking-[-0.01em]"
          >
            <span>Customize Itinerary</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Item Grid of Luxury Experiences */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="group flex flex-col justify-between bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#081218]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081218] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 bg-[#081218]/90 px-3 py-1 rounded-md border border-white/15">
                    <span className="font-sans text-[10px] font-semibold text-slate-200 uppercase tracking-[-0.01em]">
                      0{idx + 1} • {exp.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 sm:p-5 space-y-2">
                  <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-400">
                    <Clock size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{exp.duration}</span>
                  </div>

                  <h3 className="font-heading text-sm sm:text-lg font-bold text-white tracking-[-0.02em] group-hover:text-slate-200 transition-colors line-clamp-2">
                    {exp.title}
                  </h3>

                  <p className="font-sans text-[11px] sm:text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em] line-clamp-3 hidden sm:block">
                    {exp.description}
                  </p>
                  <p className="font-sans text-[11px] font-normal text-slate-300 leading-relaxed tracking-[-0.01em] line-clamp-2 sm:hidden">
                    {exp.text}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-5 pt-0">
                <Link
                  href="/booking"
                  className="w-full inline-flex items-center justify-between border-t border-white/[0.12] pt-3 font-sans text-[10px] sm:text-xs font-semibold text-slate-300 uppercase hover:text-white transition tracking-[-0.01em]"
                >
                  <span>Inquire</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
