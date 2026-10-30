"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, BRAND_ASSETS, SOCIAL_LINKS } from "@/data/siteData";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
          ? "bg-white/90 backdrop-blur-md border-b border-[#E2ECE6] py-3 shadow-xs"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link
          href="#"
          className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] rounded-lg p-1"
          aria-label="SynFusion Homepage"
        >
          <div className="relative h-9 sm:h-10 w-auto flex items-center shrink-0">
            <Image
              src={BRAND_ASSETS.logo}
              alt="SynFusion Logo"
              width={160}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F3FAF5]/90 px-4 py-1.5 rounded-full border border-[#E2ECE6] backdrop-blur-xs">
          <a
            href="#"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] ${
              activeSection === "" || activeSection === "hero"
                ? "bg-white text-[#008F4C] shadow-2xs"
                : "text-[#17251E] hover:text-[#008F4C] hover:bg-white/60"
            }`}
          >
            Home
          </a>
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] ${
                  isActive
                    ? "bg-white text-[#008F4C] shadow-2xs"
                    : "text-[#17251E] hover:text-[#008F4C] hover:bg-white/60"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs: GitHub & Start Project */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#E2ECE6] bg-white hover:bg-[#F3FAF5] text-[#17251E] hover:text-[#008F4C] font-semibold text-xs transition-all shadow-2xs hover:border-[#008F4C]/40"
            aria-label="SynFusion GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#008F4C] to-[#064E32] hover:from-[#064E32] hover:to-[#008F4C] text-white font-semibold text-xs transition-all duration-300 shadow-md shadow-[#008F4C]/20 hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#008F4C]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button (Strictly No WhatsApp Button in Header) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#17251E] hover:bg-[#F3FAF5] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#071C16]/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-xs bg-white border-l border-[#E2ECE6] p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col justify-between ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#E2ECE6]">
            <Image
              src={BRAND_ASSETS.logo}
              alt="SynFusion Logo"
              width={140}
              height={32}
              className="h-7 w-auto object-contain"
              unoptimized
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#64736A] hover:text-[#17251E] hover:bg-[#F3FAF5]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 my-5">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#17251E] hover:bg-[#F3FAF5] hover:text-[#008F4C]"
            >
              Home
            </a>
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#F3FAF5] text-[#008F4C]"
                      : "text-[#17251E] hover:bg-[#F3FAF5] hover:text-[#008F4C]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="pt-5 border-t border-[#E2ECE6] space-y-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2ECE6] bg-[#F3FAF5] text-[#17251E] font-semibold text-xs"
          >
            <GithubIcon className="w-4 h-4 text-[#008F4C]" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] text-white font-semibold text-xs shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
