import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Blog", href: "#blog", id: "blog" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (href) => {
    const lenis = document.querySelector('html').lenis || window.lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 }); // Adjust offset for navbar height
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-tight bg-linear-to-br from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm cursor-pointer"
            onClick={() => handleScroll("#hero")}
          >
            Durvesh<span className="text-cyan-400">.</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.href)}
                className="relative px-5 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer rounded-xl group"
              >
                <span className={`relative z-10 transition-colors duration-300 ${activeSection === item.id ? "text-slate-900 font-semibold" : "text-gray-300 group-hover:text-white"}`}>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions / Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-slate-800/50 border border-white/10 text-white backdrop-blur-md"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2 mt-4 border-t border-white/10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleScroll(item.href)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                transition={{ delay: index * 0.1 }}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                  ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
