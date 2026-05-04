import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function Contact() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-1 flex flex-col gap-6"
          >
            {/* Contact Info Cards */}
            {[
              {
                Icon: Mail,
                title: "Email",
                details: settings?.contactEmail || "developer.durvesh@gmail.com",
                href: `mailto:${settings?.contactEmail || "developer.durvesh@gmail.com"}`,
              },
              {
                Icon: Phone,
                title: "Phone",
                details: settings?.contactPhone || "+91 91676 69630",
                href: `tel:${(settings?.contactPhone || "").replace(/\s/g, '')}`,
              },
              {
                Icon: MapPin,
                title: "Location",
                details: settings?.location || "Thane, Maharashtra, India",
                href: "#",
              },
            ].map(({ Icon, title, details, href }) => (
              <motion.a
                key={title}
                href={href}
                variants={itemVariants}
                whileHover={{
                  x: 8,
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  borderColor: "rgba(6, 182, 212, 0.3)"
                }}
                className="flex items-center gap-5 p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl transition-all duration-300 shadow-lg group"
              >
                <div className="w-14 h-14 shrink-0 bg-slate-700/50 border border-white/5 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{title}</h3>
                  <p className="text-white font-medium break-all">{details}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Input */}
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Subject Input */}
            <div className="mb-6 relative z-10">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                placeholder="Project Inquiry"
              />
            </div>

            {/* Message Input */}
            <div className="mb-8 relative z-10">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-5 py-4 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none"
                placeholder="Your message here..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end relative z-10">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group w-full sm:w-auto justify-center"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-center font-medium backdrop-blur-sm"
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-center font-medium backdrop-blur-sm"
              >
                ✗ {error}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
