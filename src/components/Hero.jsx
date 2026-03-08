import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  const handleViewMyWork = () => {
    const lenis = document.querySelector('html').lenis || window.lenis;
    if (lenis) {
      lenis.scrollTo('#projects', { offset: -80 });
    } else {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Durvesh More Resume.pdf";
    link.download = "Durvesh More Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // sleek custom easing
    },
  };

  return (
    <section
      id="hero"
      className="relative h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden pt-32 pb-10"
    >
      {/* Animated Background Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 right-1/4 w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        >
          {/* Profile Image or Avatar */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative group"
            >
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all duration-500"></div>
              <div className="relative w-full h-full rounded-full bg-linear-to-br from-blue-500 to-cyan-300 flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-2 border-white/20 overflow-hidden backdrop-blur-md">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-100 drop-shadow-sm">DM</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-4 tracking-tight">
              Hi, I'm{" "}
              <span className="inline-block relative">
                <span className="relative z-10 bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Durvesh More
                </span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-cyan-400/20 -rotate-2 -z-0"></span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-lg sm:text-2xl text-cyan-200 mb-8 font-medium tracking-wide">
              <span>Flutter</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Node.js</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>System Design</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-10"
          >
            <motion.button
              onClick={handleViewMyWork}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3.5 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View My Work
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </motion.button>

            <motion.button
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 border-2 border-cyan-400/50 backdrop-blur-sm text-cyan-300 rounded-xl font-bold text-lg hover:border-cyan-300 hover:text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer"
            >
              Download CV
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 sm:gap-6"
          >
            {[
              {
                Icon: Github,
                label: "GitHub",
                href: "https://github.com/DurveshMore8/",
              },
              {
                Icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/durveshmore/",
              },
              {
                Icon: Mail,
                label: "Mail",
                href: "mailto:developer.durvesh@gmail.com",
              },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="p-3 sm:p-4 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl text-cyan-400 shadow-xl transition-all duration-300 cursor-pointer group"
                title={label}
              >
                <Icon size={22} className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
