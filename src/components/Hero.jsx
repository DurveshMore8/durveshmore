import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const handleViewMyWork = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 pt-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Profile Image or Avatar */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-32 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full bg-linear-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
              DM
            </div>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Durvesh More
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-xl sm:text-2xl text-cyan-300 mb-8">
            Flutter | Node.js | System Design
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-12">
            I build beautiful, responsive, and high-performance applications
            using Flutter and Node.js. From intuitive mobile apps to scalable
            backend systems, I design cloud-ready architectures on AWS and
            Azure, turning ideas into real-world solutions through clean
            architecture and modern development practices.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={handleViewMyWork}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-400 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={handleDownloadCV}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 cursor-pointer"
          >
            Download CV
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-16"
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
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-700/50 border border-slate-600 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
              title={label}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <ChevronDown size={40} className="text-blue-600 dark:text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
