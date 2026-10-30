"use client";

import React from "react";
import { WHY_SYNFUSION_POINTS } from "@/data/siteData";
import { Sparkles, ShieldCheck, Zap, Code2, Cpu } from "lucide-react";

export default function WhySynFusionSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#071C16] text-white relative overflow-hidden border-t border-[#064E32]">
      {/* Background Subtle Green Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#008F4C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E32]/60 border border-[#008F4C]/40 text-[#84CC16] text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
            <span>THE SYNFUSION ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Built With Purpose. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008F4C] to-[#84CC16]">Designed for People.</span>
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/70">
            We prioritize software excellence, clean architecture, and transparent engineering partnerships.
          </p>
        </div>

        {/* 6 Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_SYNFUSION_POINTS.map((point, idx) => (
            <div
              key={point.title}
              className="bg-[#0b2920]/80 rounded-2xl border border-[#064E32] p-8 transition-all duration-300 hover:border-[#008F4C] hover:bg-[#0b2920] group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#071C16] border border-[#064E32] flex items-center justify-center text-[#84CC16] group-hover:bg-[#008F4C] group-hover:text-white transition-colors duration-300 mb-6">
                {idx % 3 === 0 ? (
                  <Code2 className="w-6 h-6" />
                ) : idx % 3 === 1 ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <Zap className="w-6 h-6" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#84CC16] transition-colors mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-emerald-100/70 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Technical Access Bar */}
        <div className="mt-16 bg-gradient-to-r from-[#0b2920] via-[#064E32] to-[#0b2920] border border-[#008F4C]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#008F4C] to-[#064E32] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#008F4C]/30">
              <Cpu className="w-6 h-6 text-[#84CC16]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Direct Technical Access</h4>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                You work directly with principal engineers and designers — no middle layers.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] hover:from-[#064E32] hover:to-[#008F4C] text-white text-sm font-semibold transition-all shrink-0 shadow-md border border-[#008F4C]/30"
          >
            Schedule Technical Call
          </a>
        </div>

      </div>
    </section>
  );
}
