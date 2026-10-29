"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/siteData";
import { Sparkles, ArrowUpRight, Smartphone, Globe, LayoutGrid } from "lucide-react";
import { ProjectItem } from "@/types";

type CategoryFilter = "All" | "Mobile Apps" | "Websites" | "Web Applications";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("All");

  const filteredProjects = PORTFOLIO_DATA.filter((project) => {
    if (activeTab === "All") return true;
    return project.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile Apps":
        return Smartphone;
      case "Websites":
        return Globe;
      default:
        return LayoutGrid;
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#FFF8F6]/60 border-b border-[#E8E8EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FF6347]/20 text-[#E94B35] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6347]" />
            <span>SELECTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#172033] tracking-tight">
            Projects Built With <span className="text-[#FF6347]">Purpose.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Explore selected digital products and engineered concept mockups representing our technical breadth.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(["All", "Mobile Apps", "Websites", "Web Applications"] as CategoryFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#FF6347] ${
                activeTab === tab
                  ? "bg-[#FF6347] text-white shadow-md shadow-[#FF6347]/20"
                  : "bg-white text-[#172033] hover:bg-white/80 border border-[#E8E8EC]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: ProjectItem) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border border-[#E8E8EC] overflow-hidden transition-all duration-300 hover:border-[#FF6347]/40 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Mockup Preview Container */}
                  <div className="relative bg-[#171717] p-6 sm:p-8 min-h-[220px] flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono">
                        <CategoryIcon className="w-3.5 h-3.5 text-[#FF6347]" />
                        {project.category}
                      </span>
                      {project.isConcept && (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          Concept Case Study
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 mt-8 space-y-1">
                      <div className="text-[#FF6347] font-mono text-xs font-bold uppercase tracking-wider">
                        {project.highlight}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#FF6347] transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    {/* Subtle Glow Backdrop */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FF6347]/20 rounded-full blur-2xl group-hover:bg-[#FF6347]/30 transition-all duration-500" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                      {project.fullDescription}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-[#FFF8F6] border border-[#E8E8EC] text-xs font-medium text-[#172033]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-8 pt-0 border-t border-transparent">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFF8F6] hover:bg-[#FF6347] text-[#172033] hover:text-white font-semibold text-sm transition-all duration-300 border border-[#E8E8EC] hover:border-[#FF6347]"
                  >
                    <span>Discuss Similar Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
