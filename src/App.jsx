import React from "react";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-slate-800">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
