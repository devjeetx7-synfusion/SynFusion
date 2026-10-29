"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONTACT_INFO, NAV_LINKS, SERVICES_DATA } from "@/data/siteData";
import { ArrowUpRight, Mail, Phone, X, Sparkles } from "lucide-react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] text-white pt-20 pb-12 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Final Big CTA Banner */}
        <div className="bg-gradient-to-br from-gray-900 via-[#FF6347]/10 to-gray-900 border border-gray-800 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6347]/20 border border-[#FF6347]/30 text-[#FF6347] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Ready To Scale?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s Turn Your Idea Into <span className="text-[#FF6347]">Reality.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl">
              From web platforms to Android applications, we build software designed for performance and real impact.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF6347] hover:bg-[#E94B35] text-white font-bold text-base transition-all shadow-lg shadow-[#FF6347]/30 hover:scale-105 shrink-0 relative z-10"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-gray-800">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF6347] text-white flex items-center justify-center font-bold text-lg">
                SF
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                SynFusion
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              SynFusion is a premium digital development agency crafting Android apps, responsive websites, web applications, and AI-powered software solutions.
            </p>
            <p className="text-xs text-[#FF6347] font-mono font-medium">
              We Build. We Innovate. We Scale.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FF6347] uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FF6347] uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#FF6347] uppercase tracking-wider">Direct Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6347]" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-[#FF6347] shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {currentYear} SynFusion. All rights reserved. Crafted with care.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Legal Policy Modals */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white text-[#172033] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E8EC] shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#64748B] hover:text-[#172033] hover:bg-[#FFF8F6]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#172033]">
              {modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h3>

            <p className="text-xs text-[#64748B]">Last updated: January {currentYear}</p>

            <div className="text-sm text-[#64748B] space-y-3 leading-relaxed">
              {modalType === "privacy" ? (
                <>
                  <p>
                    At SynFusion, we respect your privacy and are committed to protecting the personal information you share with us through our website.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We only collect personal details (such as your name, email address, and project requirements) when you voluntarily submit our contact form or contact us directly.
                  </p>
                  <p>
                    <strong>Use of Information:</strong> The information you provide is strictly used to evaluate project proposals, communicate with you, and deliver requested technical services. We do not sell or rent your personal information to third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to SynFusion. By accessing or using our website, you agree to comply with and be bound by the following terms.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All content, designs, code, and graphics displayed on this website are the property of SynFusion unless otherwise noted.
                  </p>
                  <p>
                    <strong>Service Engagements:</strong> Specific technical project scopes, deliverables, timelines, and payment structures are defined in separate mutual project agreements signed prior to project kickoff.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#E8E8EC] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-semibold hover:bg-[#FF6347] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
