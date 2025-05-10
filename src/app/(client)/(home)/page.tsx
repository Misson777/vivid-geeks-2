import Image from "next/image";
import Header from "./_components/header";
import HeroSection from "./_components/hero-section";
import ServicesSection from "./_components/services-section";
import TrustedPartnerSection from "./_components/trusted-partner-section";
import TeamSection from "./_components/team-section";
import ContactSection from "./_components/contact-section";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="mt-16">
        <HeroSection />
        <ServicesSection />
        <TrustedPartnerSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
