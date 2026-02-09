"use client";

import Navbar from "@/components/layout/Navbar";
import HeroAnimation from "@/components/home/HeroAnimation";
import PrismSection from "@/components/home/PrismSection";
import ModelsSection from "@/components/home/ModelsSection";
import EngineeringSection from "@/components/home/EngineeringSection";
import ProcessSection from "@/components/home/ProcessSection";
import InteriorSection from "@/components/home/InteriorSection";
import InvestmentSection from "@/components/home/InvestmentSection";
import TeamSection from "@/components/home/TeamSection";
import FAQSection from "@/components/home/FAQSection";
import LandServiceSection from "@/components/home/LandServiceSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-aldurr-canvas">
      <Navbar />
      <HeroAnimation />
      <PrismSection />
      <ModelsSection />
      <EngineeringSection />
      <ProcessSection />
      <InteriorSection />
      <InvestmentSection />
      <TeamSection />
      <LandServiceSection />
      <FAQSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
