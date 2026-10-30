"use client";

import React, { useState } from "react";
import { FAQ_DATA } from "@/data/siteData";
import { Sparkles, ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F3FAF5]/60 border-t border-[#E2ECE6] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight">
            Got Questions? <span className="text-[#008F4C]">We Have Answers.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64736A]">
            Clear answers regarding our development process, timelines, and services.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2ECE6] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-lg text-[#17251E] hover:text-[#008F4C] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#008F4C] shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64736A] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#008F4C]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#64736A] leading-relaxed border-t border-[#F3FAF5] animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
