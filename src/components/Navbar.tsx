"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/data/siteData";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for navigation highlighting
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on ESC key or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E8E8EC] py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center gap-2.5 group focus:outline-hidden focus:ring-2 focus:ring-[#FF6347] rounded-lg p-1"
          aria-label="SynFusion Homepage"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6347] to-[#E94B35] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 font-bold text-lg text-white font-mono tracking-tight flex items-center gap-0.5">
              <span className="text-[#FF6347] group-hover:text-white transition-colors">S</span>
              <span className="text-white">F</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-[#172033] flex items-center gap-1">
              SynFusion
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF6347]" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-medium -mt-1">
              Digital Agency
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFF8F6]/80 px-4 py-2 rounded-full border border-[#E8E8EC]">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#FF6347] ${
                  isActive
                    ? "bg-white text-[#E94B35] shadow-xs"
                    : "text-[#172033] hover:text-[#FF6347] hover:bg-white/60"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6347] hover:bg-[#E94B35] text-white font-medium text-sm transition-all duration-300 shadow-md shadow-[#FF6347]/20 hover:shadow-lg hover:shadow-[#FF6347]/30 hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#FF6347] focus:ring-offset-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#172033] hover:bg-[#FFF8F6] focus:outline-hidden focus:ring-2 focus:ring-[#FF6347]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-in Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-xs bg-white border-l border-[#E8E8EC] p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col justify-between ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E8EC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF6347] flex items-center justify-center text-white font-bold text-sm">
                SF
              </div>
              <span className="font-bold text-lg text-[#172033]">SynFusion</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#FFF8F6]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 my-6">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#FFF8F6] text-[#E94B35] font-semibold"
                      : "text-[#172033] hover:bg-[#FFF8F6] hover:text-[#FF6347]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E8E8EC] space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
            <Sparkles className="w-4 h-4 text-[#FF6347]" />
            Ready to build something great?
          </div>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF6347] text-white font-medium text-sm transition-colors shadow-md hover:bg-[#E94B35]"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
