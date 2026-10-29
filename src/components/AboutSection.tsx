"use client";

import React from "react";
import { PRINCIPLES_DATA } from "@/data/siteData";
import { Sparkles, Cpu, Layers, Rocket, Code2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFF8F6]/60 border-y border-[#E8E8EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FF6347]/20 text-[#E94B35] text-xs font-semibold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6347]" />
                <span>HOW WE ENGINEER PRODUCTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight leading-tight">
                Technology Built Around Your <span className="text-[#FF6347]">Vision.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              SynFusion approaches digital product development through thoughtful planning, clean UI design, reliable software implementation, and continuous improvement. We partner closely with founders and teams to craft high-impact solutions.
            </p>

            {/* Principles List */}
            <div className="space-y-6 pt-2">
              {PRINCIPLES_DATA.map((principle) => (
                <div key={principle.number} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8EC] text-[#FF6347] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#FF6347] group-hover:text-white transition-colors duration-300 shadow-2xs">
                    {principle.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#172033] group-hover:text-[#FF6347] transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Development Workflow Custom Visual */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E8EC] shadow-xl space-y-6">

              <div className="flex items-center justify-between pb-4 border-b border-[#E8E8EC]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-white">
                    <Code2 className="w-5 h-5 text-[#FF6347]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172033]">Development Methodology</h3>
                    <p className="text-xs text-[#64748B]">SynFusion Agile Standard</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-[#FFF8F6] text-[#FF6347] rounded-full font-semibold border border-[#FF6347]/20">
                  Continuous CI/CD
                </span>
              </div>

              {/* Workflow Flowchart Visual */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FFF8F6] border border-[#FF6347]/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#FF6347]/30 flex items-center justify-center text-[#FF6347] font-bold shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#E94B35] uppercase font-bold">Phase 1 — Discovery & UX</div>
                    <div className="text-sm font-semibold text-[#172033]">Strategy & Wireframe Design</div>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-[#FF6347]/30 mx-auto" />

                <div className="p-4 rounded-xl bg-[#171717] text-white flex items-center gap-4 shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-[#FF6347] flex items-center justify-center text-white shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#FF6347] uppercase font-bold">Phase 2 — Full-Stack Build</div>
                    <div className="text-sm font-semibold">Clean Engineering & Security</div>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-[#FF6347]/30 mx-auto" />

                <div className="p-4 rounded-xl bg-[#FFF8F6] border border-[#FF6347]/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#FF6347]/30 flex items-center justify-center text-[#FF6347] font-bold shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#E94B35] uppercase font-bold">Phase 3 — Launch & Scale</div>
                    <div className="text-sm font-semibold text-[#172033]">Production Deployment & Audit</div>
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
