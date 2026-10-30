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
  Activity,
  Layers,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#F3FAF5]/60 to-white">
      {/* Background Fine Grid Pattern & Ambient Green Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#008F4C_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 right-0 -z-10 w-96 h-96 bg-[#008F4C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-left">
            {/* Small Brand Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3FAF5] border border-[#008F4C]/20 text-[#064E32] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#008F4C]" />
              <span>WE BUILD. WE INNOVATE. WE SCALE.</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#17251E] tracking-tight leading-[1.15]">
              Transforming Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008F4C] via-[#064E32] to-[#84CC16]">Powerful Digital Experiences.</span>
            </h1>

            {/* Concise Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#64736A] leading-relaxed max-w-xl">
              SynFusion builds modern mobile applications, high-performance websites and intelligent digital solutions for ambitious businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] hover:from-[#064E32] hover:to-[#008F4C] text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-[#008F4C]/25 hover:shadow-xl hover:shadow-[#008F4C]/35 hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:ring-offset-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#F3FAF5] text-[#17251E] hover:text-[#008F4C] border border-[#E2ECE6] font-semibold text-base transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C]"
              >
                Explore Our Work
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 border-t border-[#E2ECE6]/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#64736A] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#008F4C]" />
                <span>Full-stack Expertise</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008F4C]" />
                <span>Production Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#008F4C]" />
                <span>Agile Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Composition with Glassmorphism & Original Interface Mockups */}
          <div className="lg:col-span-6 relative overflow-hidden lg:overflow-visible">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Desktop Browser Window Mockup */}
              <div className="relative rounded-2xl bg-[#071C16] p-3 sm:p-4 shadow-2xl border border-[#064E32]/50 transform hover:scale-[1.01] transition-transform duration-500">
                {/* Browser Window Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#064E32]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="bg-[#064E32]/40 px-3 py-1 rounded-md text-[11px] font-mono text-emerald-300 border border-[#008F4C]/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse" />
                    https://synfusion.app
                  </div>
                  <div className="w-8" />
                </div>

                {/* Dashboard Inner Content */}
                <div className="bg-[#0b2920] rounded-xl p-4 sm:p-5 space-y-4 text-white">
                  {/* Dashboard Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#008F4C] to-[#064E32] flex items-center justify-center font-bold text-xs">
                        SF
                      </div>
                      <span className="font-semibold text-sm">SynFusion Hub</span>
                    </div>
                    <span className="text-[10px] bg-[#84CC16]/20 text-[#84CC16] border border-[#84CC16]/30 px-2 py-0.5 rounded-full font-mono">
                      Live Dashboard
                    </span>
                  </div>

                  {/* Secondary Dashboard Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#071C16]/80 border border-[#008F4C]/30 p-3 rounded-lg backdrop-blur-xs">
                      <div className="text-[10px] text-gray-400 uppercase font-medium flex items-center justify-between">
                        <span>Core Vitals</span>
                        <Activity className="w-3 h-3 text-[#84CC16]" />
                      </div>
                      <div className="text-xl font-extrabold text-[#84CC16] mt-1">99.8%</div>
                      <div className="text-[9px] text-emerald-300 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#84CC16]" /> +12.4% performance
                      </div>
                    </div>
                    <div className="bg-[#071C16]/80 border border-[#008F4C]/30 p-3 rounded-lg backdrop-blur-xs">
                      <div className="text-[10px] text-gray-400 uppercase font-medium flex items-center justify-between">
                        <span>Architecture</span>
                        <Layers className="w-3 h-3 text-[#008F4C]" />
                      </div>
                      <div className="text-xl font-extrabold text-white mt-1">Kotlin / Next</div>
                      <div className="text-[9px] text-gray-300 mt-1">Cross-platform ready</div>
                    </div>
                  </div>

                  {/* Code / Architecture Snippet */}
                  <div className="bg-[#071C16] rounded-lg p-3 font-mono text-xs border border-[#064E32] text-gray-300 space-y-1">
                    <div className="text-[#84CC16] text-[11px]">{`// SynFusion Engine v2.0`}</div>
                    <div className="text-emerald-300">const app = await SynFusion.build(&#123;</div>
                    <div className="pl-4 text-gray-400">speed: &quot;ultra&quot;, design: &quot;world-class&quot;</div>
                    <div className="text-emerald-300">&#125;);</div>
                  </div>
                </div>
              </div>

              {/* Central Smartphone Mockup */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-44 sm:w-52 bg-[#071C16] p-2.5 rounded-2xl shadow-2xl border border-[#008F4C]/40 hidden sm:block">
                <div className="relative bg-[#0b2920] rounded-xl p-3 text-white border border-[#064E32] space-y-2.5">
                  <div className="w-10 h-1 bg-[#064E32] rounded-full mx-auto" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#008F4C] flex items-center justify-center">
                      <Smartphone className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold">Android Native</div>
                      <div className="text-[9px] text-emerald-300">Jetpack Compose</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-[#071C16] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#008F4C] to-[#84CC16] w-[90%]" />
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-300">
                    <span>Performance</span>
                    <span className="text-[#84CC16] font-bold">60 FPS</span>
                  </div>
                </div>
              </div>

              {/* Floating Glass Notification */}
              <div className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#008F4C]/20 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3FAF5] border border-[#008F4C]/30 flex items-center justify-center text-[#008F4C]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#17251E]">Clean Architecture</div>
                  <div className="text-[10px] text-[#64736A]">High Quality & Scalable</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
