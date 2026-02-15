import { motion } from "framer-motion";
import { Github, Heart, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Github, href: "https://github.com/DurveshMore8/", label: "GitHub" },
    {
      Icon: Linkedin,
      href: "https://linkedin.com/in/durveshmore/",
      label: "LinkedIn",
    },
    { Icon: Twitter, href: "https://x.com/Durvesh8403/", label: "Twitter" },
    { Icon: Mail, href: "mailto:developer.durvesh@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              Durvesh More
            </h3>
            <p className="text-gray-400">
              Full Stack Developer crafting beautiful digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Projects", "Blog", "Contact"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a
                    href={link === "Home" ? "#hero" : `#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300"
                  title={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Durvesh More. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart size={16} className="text-red-500" /> by Durvesh
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
