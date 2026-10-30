"use client";

import React from "react";
import { TRUST_PILLARS } from "@/data/siteData";
import { Shield, Cpu, Layers, Clock } from "lucide-react";

export default function TrustSection() {
  const icons = [Cpu, Layers, Shield, Clock];

  return (
    <section className="border-y border-[#E2ECE6] bg-[#F3FAF5]/70 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={pillar.title}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2ECE6] flex items-center justify-center text-[#008F4C] group-hover:bg-[#008F4C] group-hover:text-white transition-colors duration-300 shadow-2xs shrink-0">
                  <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#17251E] group-hover:text-[#008F4C] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#64736A] mt-0.5">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
