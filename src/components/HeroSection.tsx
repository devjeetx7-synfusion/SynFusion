"use client";

import React from "react";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#FFF8F6]/50 to-white">
      {/* Background Subtle Tomato Red Glow */}
      <div className="absolute top-1/4 right-0 -z-10 w-96 h-96 bg-[#FF6347]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-[#FF6347]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F6] border border-[#FF6347]/20 text-[#E94B35] text-xs sm:text-sm font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-[#FF6347]" />
              <span>DIGITAL SOLUTIONS & DEVELOPMENT</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#172033] tracking-tight leading-[1.15]">
              We Build <span className="text-[#FF6347]">Digital Experiences</span> That Move Businesses Forward.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
              From mobile applications to high-performance websites, we turn ideas into modern digital products designed for real-world impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6347] hover:bg-[#E94B35] text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-[#FF6347]/25 hover:shadow-xl hover:shadow-[#FF6347]/35 hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#FF6347] focus:ring-offset-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#FFF8F6] text-[#172033] hover:text-[#E94B35] border border-[#E8E8EC] font-semibold text-base transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#FF6347]"
              >
                Explore Our Work
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 border-t border-[#E8E8EC]/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#64748B] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF6347]" />
                <span>Full-stack Expertise</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6347]" />
                <span>Production Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FF6347]" />
                <span>Agile Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Original UI Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Desktop Browser Mockup */}
              <div className="relative rounded-2xl bg-[#171717] p-3 sm:p-4 shadow-2xl border border-gray-800 transform hover:scale-[1.01] transition-transform duration-500">
                {/* Browser Top Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="bg-gray-900 px-3 py-1 rounded-md text-[11px] font-mono text-gray-400 border border-gray-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6347] animate-pulse" />
                    https://synfusion.app
                  </div>
                  <div className="w-8" />
                </div>

                {/* Simulated Web Dashboard Inner Content */}
                <div className="bg-[#0f0f11] rounded-xl p-4 sm:p-5 space-y-4 text-white">
                  {/* Web Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FF6347] flex items-center justify-center font-bold text-xs">
                        SF
                      </div>
                      <span className="font-semibold text-sm">Client Portal</span>
                    </div>
                    <span className="text-[10px] bg-[#FF6347]/20 text-[#FF6347] px-2 py-0.5 rounded-full font-mono">
                      v2.4 Live
                    </span>
                  </div>

                  {/* Dashboard Cards Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/90 border border-gray-800 p-3 rounded-lg">
                      <div className="text-[10px] text-gray-400 uppercase font-medium">Core Web Vitals</div>
                      <div className="text-xl font-extrabold text-[#FF6347] mt-1">99.8%</div>
                      <div className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +12.4% optimized
                      </div>
                    </div>
                    <div className="bg-gray-900/90 border border-gray-800 p-3 rounded-lg">
                      <div className="text-[10px] text-gray-400 uppercase font-medium">Mobile Native</div>
                      <div className="text-xl font-extrabold text-white mt-1">Kotlin / Next</div>
                      <div className="text-[9px] text-gray-400 mt-1">Cross-platform ready</div>
                    </div>
                  </div>

                  {/* Code Snippet Bar */}
                  <div className="bg-black/80 rounded-lg p-3 font-mono text-xs border border-gray-800 text-gray-300 space-y-1">
                    <div className="text-[#FF6347] text-[11px]">{`// SynFusion Innovation Architecture`}</div>
                    <div className="text-emerald-400">const app = await SynFusion.build(&#123;</div>
                    <div className="pl-4 text-gray-400">speed: &quot;ultra&quot;, design: &quot;world-class&quot;</div>
                    <div className="text-emerald-400">&#125;);</div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Phone App Mockup */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-44 sm:w-52 bg-[#171717] p-2.5 rounded-2xl shadow-2xl border border-gray-800 hidden sm:block animate-bounce-slow">
                <div className="relative bg-gray-900 rounded-xl p-3 text-white border border-gray-800 space-y-2.5">
                  <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#FF6347] flex items-center justify-center">
                      <Smartphone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold">Android App</div>
                      <div className="text-[9px] text-gray-400">Jetpack UI</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6347] w-[85%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400">
                    <span>Performance</span>
                    <span className="text-[#FF6347] font-bold">60 FPS</span>
                  </div>
                </div>
              </div>

              {/* Floating AI Analytics Badge */}
              <div className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8E8EC] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F6] border border-[#FF6347]/30 flex items-center justify-center text-[#FF6347]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172033]">Clean Code Engine</div>
                  <div className="text-[10px] text-[#64748B]">0 Vulnerabilities</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
