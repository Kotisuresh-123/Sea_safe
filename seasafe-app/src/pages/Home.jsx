import { useState } from "react";

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

// Import your dashboard component
import Dashboard from "./Dashboard.jsx";


export default function Home() {

  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="overflow-x-hidden">

      <Navbar />

      <main>

        {!showDashboard ? (
          <>
            <Hero />
            <TrustedBy />

            <Features 
              setShowDashboard={setShowDashboard}
            />

            <HowItWorks />
            <DashboardPreview />
            <MapPreview />
            <Statistics />
            <Comparison />
            <Testimonials />
            <CTA />
          </>
        ) : (
          <Dashboard />
        )}

      </main>

      {!showDashboard && <Footer />}

    </div>
  );
}