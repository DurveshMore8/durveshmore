import Lenis from "lenis";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import { AuthProvider } from "./context/AuthContext";

import AdminProjects from "./admin/pages/Projects";
import AdminExperience from "./admin/pages/Experience";
import AdminSkills from "./admin/pages/Skills";
import AdminBlogs from "./admin/pages/Blogs";
import AdminSettings from "./admin/pages/Settings";

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
  const location = useLocation();

  useEffect(() => {
    // Only initialize Lenis on public portfolio routes, not admin dashboard
    if (location.pathname.startsWith('/admin')) {
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
      return;
    }

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
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PublicPortfolio />} />

        {/* Admin Login Route */}
        <Route path="/admin" element={<Login />} />

        {/* Protected Admin Dashboard Routes */}
        <Route path="/admin/*" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Future CRUD pages will go here */}
            <Route path="projects" element={<AdminProjects />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
