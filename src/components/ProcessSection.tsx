"use client";

import React, { useEffect, useRef } from "react";
import { PROCESS_DATA } from "@/data/siteData";
import { Sparkles, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Progress line animation on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F6] border border-[#FF6347]/20 text-[#E94B35] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6347]" />
            <span>OUR METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            From Idea to <span className="text-[#FF6347]">Launch.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            A structured, transparent development framework designed to minimize risk and maximize quality.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Connecting Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-[#FF6347] origin-top transform -translate-x-1/2 hidden sm:block rounded-full z-0"
          />

          <div className="space-y-12 sm:space-y-16 relative z-10">
            {PROCESS_DATA.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 sm:gap-12 group`}
                >
                  {/* Card Content */}
                  <div className={`w-full sm:w-1/2 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="bg-[#FFF8F6]/80 p-6 sm:p-8 rounded-2xl border border-[#E8E8EC] group-hover:border-[#FF6347]/40 transition-all duration-300 shadow-xs hover:shadow-md">
                      <div className="flex items-center justify-between sm:justify-start gap-3 mb-3">
                        <span className="text-xs font-mono font-extrabold px-3 py-1 bg-[#FF6347] text-white rounded-full">
                          STEP {step.step}
                        </span>
                        <h3 className="text-xl font-bold text-[#172033]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Key Activities */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8E8EC]/80">
                        {step.details.map((detail) => (
                          <span
                            key={detail}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E8E8EC] text-[11px] font-medium text-[#172033]"
                          >
                            <CheckCircle className="w-3 h-3 text-[#FF6347]" />
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Circle Badge in Center */}
                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#171717] border-4 border-white text-white font-extrabold text-sm items-center justify-center shrink-0 shadow-md group-hover:bg-[#FF6347] transition-colors duration-300">
                    {step.number}
                  </div>

                  {/* Empty Spacer Column for Desktop Grid Alignment */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
