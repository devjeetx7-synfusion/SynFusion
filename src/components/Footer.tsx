"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO, NAV_LINKS, SERVICES_DATA, BRAND_ASSETS, SOCIAL_LINKS } from "@/data/siteData";
import { ArrowUpRight, Mail, Phone, X, Sparkles, MessageSquare, Send } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071C16] text-white pt-20 pb-28 lg:pb-12 border-t border-[#064E32] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Final CTA Banner */}
        <div className="bg-gradient-to-br from-[#0b2920] via-[#064E32] to-[#071C16] border border-[#008F4C]/40 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#008F4C]/20 border border-[#008F4C]/30 text-[#84CC16] text-xs font-semibold uppercase tracking-wider">
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

          {/* Brand Info & Verified Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-2.5">
              <Image
                src={BRAND_ASSETS.logo}
                alt="SynFusion Logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
                unoptimized
              />
            </Link>
            <p className="text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              SynFusion is a software development agency specializing in Android apps, custom web applications, UI/UX design systems, and AI integration.
            </p>
            <p className="text-xs text-[#84CC16] font-mono font-medium tracking-wide">
              {BRAND_ASSETS.tagline}
            </p>

            {/* Official Social Media Integration (@getsynfusion) */}
            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion GitHub"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion Telegram"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion Instagram"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion Facebook"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion YouTube"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SynFusion WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#064E32]/60 hover:bg-[#008F4C] text-emerald-100 hover:text-white flex items-center justify-center border border-[#008F4C]/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
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

          {/* Direct Contact Details */}
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
              <li className="flex items-center gap-2 text-xs text-[#84CC16]">
                <GithubIcon className="w-4 h-4 shrink-0" />
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  github.com/{CONTACT_INFO.githubUsername}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/50">
          <div>
            &copy; {currentYear} SynFusion. All rights reserved. Built with passion &amp; innovation.
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

      {/* Mobile Floating Contact Bar (Quote, WhatsApp, Call) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2ECE6] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-2 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href="#contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-gradient-to-r from-[#008F4C] to-[#064E32] text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <span>Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href={SOCIAL_LINKS.whatsapp}
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
