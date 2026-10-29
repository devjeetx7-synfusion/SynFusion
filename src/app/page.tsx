import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SmoothScrollAndGSAP from "@/components/SmoothScrollAndGSAP";
import TrustSection from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhySynFusionSection from "@/components/WhySynFusionSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SmoothScrollAndGSAP />
      <Navbar />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <PortfolioSection />
      <WhySynFusionSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
