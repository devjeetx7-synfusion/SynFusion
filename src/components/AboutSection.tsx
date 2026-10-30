"use client";

import React from "react";
import { PRINCIPLES_DATA } from "@/data/siteData";
import { Sparkles, Cpu, Layers, Rocket, Code2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F3FAF5]/60 border-y border-[#E2ECE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
                <span>ABOUT SYNFUSION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight leading-tight">
                Technology Built Around Your <span className="text-[#008F4C]">Vision.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#64736A] leading-relaxed">
              SynFusion approaches digital product development through thoughtful planning, clean UI design, reliable software implementation, and continuous improvement. We partner closely with founders and teams to craft high-impact solutions.
            </p>

            {/* Principles List */}
            <div className="space-y-6 pt-2">
              {PRINCIPLES_DATA.map((principle) => (
                <div key={principle.number} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2ECE6] text-[#008F4C] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#008F4C] group-hover:text-white transition-colors duration-300 shadow-2xs">
                    {principle.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17251E] group-hover:text-[#008F4C] transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-[#64736A] mt-1 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Agile Workflow Visual */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E2ECE6] shadow-xl space-y-6">

              <div className="flex items-center justify-between pb-4 border-b border-[#E2ECE6]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#071C16] flex items-center justify-center text-white">
                    <Code2 className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#17251E]">Development Methodology</h3>
                    <p className="text-xs text-[#64736A]">SynFusion Engineering Standard</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-[#F3FAF5] text-[#008F4C] rounded-full font-semibold border border-[#008F4C]/20">
                  Continuous CI/CD
                </span>
              </div>

              {/* Workflow Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F3FAF5] border border-[#008F4C]/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#008F4C]/30 flex items-center justify-center text-[#008F4C] font-bold shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#064E32] uppercase font-bold">Phase 1 — Discovery & UX</div>
                    <div className="text-sm font-semibold text-[#17251E]">Strategy & Wireframe Design</div>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-[#008F4C]/30 mx-auto" />

                <div className="p-4 rounded-xl bg-[#071C16] text-white flex items-center gap-4 shadow-md border border-[#064E32]">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#008F4C] to-[#064E32] flex items-center justify-center text-white shrink-0">
                    <Cpu className="w-5 h-5 text-[#84CC16]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#84CC16] uppercase font-bold">Phase 2 — Full-Stack Build</div>
                    <div className="text-sm font-semibold">Clean Engineering & Security</div>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-[#008F4C]/30 mx-auto" />

                <div className="p-4 rounded-xl bg-[#F3FAF5] border border-[#008F4C]/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#008F4C]/30 flex items-center justify-center text-[#008F4C] font-bold shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#064E32] uppercase font-bold">Phase 3 — Launch & Scale</div>
                    <div className="text-sm font-semibold text-[#17251E]">Production Deployment & Audit</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
