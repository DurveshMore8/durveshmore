import Lenis from "lenis";
import React, { useEffect } from "react";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

import { SettingsProvider } from "./context/SettingsContext";

const PublicPortfolio = () => {
  return (
    <SettingsProvider>
      <div className="flex flex-col min-h-[100dvh] bg-linear-to-b from-slate-900 via-slate-900 to-slate-800">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Hero />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </SettingsProvider>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
    };
  }, []);

  return <PublicPortfolio />;
}
