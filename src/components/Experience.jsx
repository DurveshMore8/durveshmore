import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { getExperience } from "../services/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperience();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching experience:", err);
        setError("Failed to load experience");
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
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
          Professional <span className="glow-text">Experience</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Loading experience...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">No experience found</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id || exp.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline connector */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-24 w-1 h-24 bg-linear-to-b from-blue-600 to-transparent" />
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <motion.div whileHover={{ scale: 1.2 }} className="shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg">
                      <Briefcase size={24} />
                    </div>
                  </motion.div>

                  {/* Experience card */}
                  <motion.div whileHover={{ x: 10 }} className="flex-1 card">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                      {exp.company}
                    </p>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 rounded-full"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-gray-200 dark:border-slate-700"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Key Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Flutter",
              "Node.js",
              "Azure",
              "AWS",
              "System Design",
              "JavaScript",
              "TypeScript",
              "REST APIs",
              "React",
              "Git",
              "MongoDB",
              "SQL",
              "PostgreSQL",
              "Docker",
              "Tailwind CSS",
              "Problem Solving",
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-blue-200 dark:border-slate-600 text-center font-semibold text-gray-700 dark:text-gray-300"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
