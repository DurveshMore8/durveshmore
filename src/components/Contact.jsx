import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
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
        "http://localhost:5000/api/contact/send-email",
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Get In <span className="glow-text">Touch</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Contact Info Cards */}
          {[
            {
              Icon: Mail,
              title: "Email",
              details: "developer.durvesh@gmail.com",
              href: "mailto:developer.durvesh@gmail.com",
            },
            {
              Icon: Phone,
              title: "Phone",
              details: "+91 91676 69630",
              href: "tel:+919167669630",
            },
            {
              Icon: MapPin,
              title: "Location",
              details: "Thane, Maharashtra, India",
              href: "#",
            },
          ].map(({ Icon, title, details, href }) => (
            <motion.a
              key={title}
              href={href}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              className="card text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 mx-auto mb-4 bg-slate-700/50 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400"
              >
                <Icon size={24} />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 wrap-break-word">{details}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="card max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Input */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Email
              </label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                placeholder="john@example.com"
              />
            </motion.div>
          </div>

          {/* Subject Input */}
          <motion.div whileFocus={{ scale: 1.02 }} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <motion.input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
              placeholder="Project Inquiry"
            />
          </motion.div>

          {/* Message Input */}
          <motion.div whileFocus={{ scale: 1.02 }} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors resize-none"
              placeholder="Your message here..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-cyan-400 to-blue-500 text-slate-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <Send size={20} />
            </motion.button>
          </motion.div>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-green-900/50 border border-green-500/50 text-green-300 rounded-lg text-center font-semibold"
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg text-center font-semibold"
            >
              ✗ {error}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
