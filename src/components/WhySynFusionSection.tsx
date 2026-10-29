"use client";

import React from "react";
import { WHY_SYNFUSION_POINTS } from "@/data/siteData";
import { Sparkles, ShieldCheck, Zap, Code2, Cpu } from "lucide-react";

export default function WhySynFusionSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#171717] text-white relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6347]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6347]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FF6347] text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6347]" />
            <span>THE SYNFUSION ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Built With Purpose. <span className="text-[#FF6347]">Designed for People.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            We focus on software excellence, clean execution, and transparent partnerships.
          </p>
        </div>

        {/* 6 Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_SYNFUSION_POINTS.map((point, idx) => (
            <div
              key={point.title}
              className="bg-gray-900/80 rounded-2xl border border-gray-800 p-8 transition-all duration-300 hover:border-[#FF6347]/50 hover:bg-gray-900/90 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-center text-[#FF6347] group-hover:bg-[#FF6347] group-hover:text-white transition-colors duration-300 mb-6">
                {idx % 3 === 0 ? (
                  <Code2 className="w-6 h-6" />
                ) : idx % 3 === 1 ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <Zap className="w-6 h-6" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6347] transition-colors mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Restrained Accent Metric / Highlight Bar */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 via-[#FF6347]/10 to-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6347] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#FF6347]/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Direct Technical Access</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                You work directly with engineers and designers — no middle layers.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-[#FF6347] hover:bg-[#E94B35] text-white text-sm font-semibold transition-colors shrink-0 shadow-md"
          >
            Schedule Technical Call
          </a>
        </div>

      </div>
    </section>
  );
}
