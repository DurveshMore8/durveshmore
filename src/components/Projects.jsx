import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getProjects } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
        // Fallback to empty array if fetch fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-cyan-300 font-medium tracking-wide">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No projects found</p>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project._id || project.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                }}
                className="group relative flex flex-col bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] transition-all duration-500 h-full"
              >
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Project Image */}
                <div className="relative overflow-hidden h-56 shrink-0 border-b border-slate-700/50">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-6">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -5 }}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/20 hover:border-transparent transition-all duration-300"
                      >
                        <Github size={24} />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -5 }}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-white/20 hover:border-transparent transition-all duration-300"
                      >
                        <ExternalLink size={24} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
