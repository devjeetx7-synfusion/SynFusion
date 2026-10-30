"use client";

import React, { useState } from "react";
import { SERVICES_DATA } from "@/data/siteData";
import {
  Smartphone,
  Globe,
  LayoutGrid,
  Palette,
  Code,
  Bot,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { ServiceItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  LayoutGrid,
  Palette,
  Code,
  Bot,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3FAF5] border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight">
            Comprehensive Digital Capabilities for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008F4C] to-[#064E32]">Ambitious Businesses.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64736A]">
            From mobile applications and high-performance web engineering to custom software and intelligent AI automation.
          </p>
        </div>

        {/* Services Grid: 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className="group relative bg-[#F3FAF5]/60 rounded-2xl border border-[#E2ECE6] p-8 transition-all duration-300 hover:border-[#008F4C]/40 hover:bg-white hover:shadow-xl hover:shadow-[#008F4C]/5 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2ECE6] flex items-center justify-center text-[#008F4C] group-hover:bg-gradient-to-br group-hover:from-[#008F4C] group-hover:to-[#064E32] group-hover:text-white transition-colors duration-300 shadow-2xs mb-6">
                    <IconComponent className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-[#17251E] group-hover:text-[#008F4C] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#64736A] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Capabilities List */}
                  <ul className="space-y-2 mb-8">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2.5 text-xs text-[#17251E] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#008F4C] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow Link Button */}
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#008F4C] hover:text-[#064E32] transition-colors group/btn cursor-pointer pt-4 border-t border-[#E2ECE6]/80"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071C16]/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E2ECE6] shadow-2xl relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#64736A] hover:text-[#17251E] hover:bg-[#F3FAF5]"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#008F4C] to-[#064E32] text-white flex items-center justify-center shadow-md">
                {React.createElement(iconMap[selectedService.icon] || Code, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-2xl font-bold text-[#17251E]">{selectedService.title}</h3>
            </div>

            <p className="text-sm text-[#64736A] leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17251E]">
                Key Deliverables & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs bg-[#F3FAF5] p-2.5 rounded-lg border border-[#008F4C]/20 font-medium text-[#17251E]">
                    <CheckCircle2 className="w-4 h-4 text-[#008F4C] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2ECE6] flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] text-white text-sm font-semibold transition-colors shadow-md hover:opacity-95"
              >
                Request Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
