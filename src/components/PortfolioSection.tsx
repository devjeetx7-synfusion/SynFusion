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
    <section id="portfolio" className="py-20 lg:py-28 bg-[#F3FAF5]/60 border-b border-[#E2ECE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight">
            Engineered Products & <span className="text-[#008F4C]">Digital Solutions.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64736A]">
            Explore verified project designs and technical concept implementations built with modern frameworks.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(["All", "Mobile Apps", "Websites", "Web Applications"] as CategoryFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] cursor-pointer ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#008F4C] to-[#064E32] text-white shadow-md shadow-[#008F4C]/20"
                  : "bg-white text-[#17251E] hover:bg-white/80 border border-[#E2ECE6]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: ProjectItem) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border border-[#E2ECE6] overflow-hidden transition-all duration-300 hover:border-[#008F4C]/40 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail & Mockup Container */}
                  <div className="relative bg-[#071C16] p-6 sm:p-8 min-h-[220px] flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono">
                        <CategoryIcon className="w-3.5 h-3.5 text-[#84CC16]" />
                        {project.category}
                      </span>
                      {project.isConcept && (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#84CC16] bg-[#84CC16]/10 px-2.5 py-0.5 rounded-full border border-[#84CC16]/30">
                          Concept Case Study
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 mt-8 space-y-1">
                      <div className="text-[#84CC16] font-mono text-xs font-bold uppercase tracking-wider">
                        {project.highlight}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#84CC16] transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    {/* Subtle Glow Backdrop */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#008F4C]/30 rounded-full blur-2xl group-hover:bg-[#008F4C]/50 transition-all duration-500" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#64736A] leading-relaxed">
                      {project.fullDescription}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#17251E] uppercase tracking-wider">
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-[#F3FAF5] border border-[#E2ECE6] text-xs font-medium text-[#17251E]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F3FAF5] hover:bg-gradient-to-r hover:from-[#008F4C] hover:to-[#064E32] text-[#17251E] hover:text-white font-semibold text-sm transition-all duration-300 border border-[#E2ECE6] hover:border-[#008F4C]"
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
