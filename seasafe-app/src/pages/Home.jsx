import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import TrustedBy from "../components/TrustedBy/TrustedBy.jsx";
import Features from "../components/Features/Features.jsx";
import HowItWorks from "../components/HowItWorks/HowItWorks.jsx";
import DashboardPreview from "../components/DashboardPreview/DashboardPreview.jsx";
import MapPreview from "../components/MapPreview/MapPreview.jsx";
import Statistics from "../components/Statistics/Statistics.jsx";
import Comparison from "../components/Comparison/Comparison.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";
import CTA from "../components/CTA/CTA.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SOSButton from "../components/SOS/SOSButton.jsx";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <MapPreview />
        <Statistics />
        <Comparison />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <SOSButton />
    </div>
  );
}
