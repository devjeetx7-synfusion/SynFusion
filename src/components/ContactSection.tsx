"use client";

import React, { useState } from "react";
import { CONTACT_INFO, SERVICES_DATA } from "@/data/siteData";
import { Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES_DATA[0].title,
    budget: "$5,000 - $10,000",
    description: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please describe your project (at least 10 characters).");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus("success");
        setSuccessMessage(resData.message || "Thank you! Your project request has been submitted.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: SERVICES_DATA[0].title,
          budget: "$5,000 - $10,000",
          description: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(resData.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try emailing us directly.");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3FAF5] border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
            <span>CONTACT US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight">
            Have a Project in Mind? <span className="text-[#008F4C]">Let&apos;s Build It.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64736A]">
            Send us your project scope or reach out directly for a fast technical proposal and roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Direct Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F3FAF5] rounded-3xl p-8 border border-[#008F4C]/20 space-y-6">
              <h3 className="text-xl font-bold text-[#17251E]">Direct Contact Details</h3>
              <p className="text-sm text-[#64736A]">
                Reach out to our team directly via phone, email, or instant WhatsApp consultation.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2ECE6] hover:border-[#008F4C] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F3FAF5] border border-[#008F4C]/20 flex items-center justify-center text-[#008F4C] group-hover:bg-[#008F4C] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#64736A]">Phone</div>
                    <div className="text-sm font-bold text-[#17251E] group-hover:text-[#008F4C] transition-colors">
                      {CONTACT_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2ECE6] hover:border-[#008F4C] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F3FAF5] border border-[#008F4C]/20 flex items-center justify-center text-[#008F4C] group-hover:bg-[#008F4C] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#64736A]">Email</div>
                    <div className="text-sm font-bold text-[#17251E] group-hover:text-[#008F4C] transition-colors break-all">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </a>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-4 border-t border-[#E2ECE6]">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2ECE6] shadow-xl space-y-6">

              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                    Full Name <span className="text-[#008F4C]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                    Email Address <span className="text-[#008F4C]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                    Phone Number <span className="text-[#64736A] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 0000000000"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E]"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                    Service Required <span className="text-[#008F4C]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E] bg-white"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                  Project Scope / Budget <span className="text-[#64736A] font-normal">(Optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E] bg-white"
                >
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000+">$25,000+</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-[#17251E] mb-2">
                  Project Description <span className="text-[#008F4C]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project goals, required features, timeline, or key target audience..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:border-transparent text-sm text-[#17251E]"
                />
              </div>

              {/* Status Notifications */}
              {status === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008F4C] to-[#064E32] hover:from-[#064E32] hover:to-[#008F4C] text-white font-bold text-base transition-all duration-300 shadow-lg shadow-[#008F4C]/25 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] focus:ring-offset-2 disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Start a Project</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
