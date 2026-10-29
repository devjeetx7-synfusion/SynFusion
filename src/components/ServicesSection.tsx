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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F6] border border-[#FF6347]/20 text-[#E94B35] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6347]" />
            <span>OUR CORE EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Everything You Need to <span className="text-[#FF6347]">Build and Grow.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            We deliver end-to-end engineering, high-conversion design, and scalable custom software solutions.
          </p>
        </div>

        {/* Services Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-[#E8E8EC] p-8 transition-all duration-300 hover:border-[#FF6347]/40 hover:shadow-xl hover:shadow-[#FF6347]/5 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF8F6] border border-[#FF6347]/20 flex items-center justify-center text-[#FF6347] group-hover:bg-[#FF6347] group-hover:text-white transition-colors duration-300 mb-6">
                    <IconComponent className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-[#172033] group-hover:text-[#FF6347] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Capabilities List */}
                  <ul className="space-y-2 mb-8">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2.5 text-xs text-[#172033] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6347] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Service Link */}
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6347] hover:text-[#E94B35] transition-colors group/btn cursor-pointer pt-4 border-t border-[#E8E8EC]/60"
                >
                  <span>Explore Service</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E8EC] shadow-2xl relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#64748B] hover:text-[#172033] hover:bg-[#FFF8F6]"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF6347] text-white flex items-center justify-center">
                {React.createElement(iconMap[selectedService.icon] || Code, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-2xl font-bold text-[#172033]">{selectedService.title}</h3>
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#172033]">
                Key Deliverables & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs bg-[#FFF8F6] p-2.5 rounded-lg border border-[#FF6347]/20 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6347] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8EC] flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF6347] hover:bg-[#E94B35] text-white text-sm font-semibold transition-colors shadow-md"
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
