"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONTACT_INFO, NAV_LINKS, SERVICES_DATA } from "@/data/siteData";
import { ArrowUpRight, Mail, Phone, X, Sparkles, MessageSquare } from "lucide-react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071C16] text-white pt-20 pb-24 lg:pb-12 border-t border-[#064E32] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Final CTA Banner */}
        <div className="bg-gradient-to-br from-[#0b2920] via-[#064E32] to-[#071C16] border border-[#008F4C]/40 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008F4C]/20 border border-[#008F4C]/30 text-[#84CC16] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Ready To Scale?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Transform Your Vision Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008F4C] to-[#84CC16]">Digital Reality.</span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/70 max-w-xl">
              SynFusion builds high-performance mobile apps, web applications, and custom software engineered for scalability.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] hover:from-[#064E32] hover:to-[#008F4C] text-white font-bold text-base transition-all shadow-lg shadow-[#008F4C]/30 hover:scale-105 shrink-0 relative z-10 border border-[#008F4C]/30"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#064E32]">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008F4C] to-[#064E32] text-white flex items-center justify-center font-bold text-lg shadow-md">
                SF
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                SynFusion
              </span>
            </Link>
            <p className="text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              SynFusion is a digital agency specializing in Android app development, custom website development, modern web applications, UI/UX design systems, and AI integration.
            </p>
            <p className="text-xs text-[#84CC16] font-mono font-medium tracking-wide">
              We Build. We Innovate. We Scale.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm text-emerald-100/70">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm text-emerald-100/70">
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
            <h3 className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">Direct Contact</h3>
            <ul className="space-y-3 text-sm text-emerald-100/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#84CC16]" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-4 h-4 text-[#84CC16] shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/50">
          <div>
            &copy; {currentYear} SynFusion. All rights reserved. Crafted with care.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Floating Contact Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2ECE6] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-gradient-to-r from-[#008F4C] to-[#064E32] text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <span>Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#071C16] text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
          <span>Call</span>
        </a>
      </div>

      {/* Legal Modals */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071C16]/70 backdrop-blur-xs"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white text-[#17251E] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E2ECE6] shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#64736A] hover:text-[#17251E] hover:bg-[#F3FAF5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#17251E]">
              {modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h3>

            <p className="text-xs text-[#64736A]">Last updated: {currentYear}</p>

            <div className="text-sm text-[#64736A] space-y-3 leading-relaxed">
              {modalType === "privacy" ? (
                <>
                  <p>
                    At SynFusion, we respect your privacy and are committed to protecting any personal details shared with us.
                  </p>
                  <p>
                    <strong>Information Usage:</strong> Contact form submissions (name, email, phone, and project scope) are exclusively used to respond to technical inquiries and provide tailored proposals.
                  </p>
                  <p>
                    <strong>Data Protection:</strong> We do not sell, share, or rent personal information to third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to SynFusion. By accessing our platform, you agree to these terms.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All content, designs, custom code, and assets presented on this site belong to SynFusion unless specified otherwise.
                  </p>
                  <p>
                    <strong>Engagements:</strong> Specific project scopes, timelines, deliverables, and terms are defined in individual client service agreements.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#E2ECE6] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 rounded-xl bg-[#071C16] text-white text-xs font-semibold hover:bg-[#008F4C] transition-colors"
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
