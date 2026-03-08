import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getExperience, getSkills } from "../services/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [expData, skillsData] = await Promise.all([
          getExperience(),
          getSkills()
        ]);
        setExperiences(Array.isArray(expData) ? expData : []);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content");
        setExperiences([]);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/60 overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-5xl mx-auto z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-400 to-indigo-400 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative space-y-12"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-400">{error}</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">No experience found</p>
            </div>
          ) : (
            <div className="relative">
              {/* Dynamic Line */}
              <div className="absolute left-[39px] top-[40px] bottom-0 w-[2px] bg-slate-800 rounded-full">
                <motion.div
                  className="w-full bg-linear-to-b from-blue-400 via-indigo-500 to-cyan-400 origin-top rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  style={{ scaleY: pathLength, height: "100%" }}
                />
              </div>

              {experiences.map((exp, index) => {
                const formatMonthYear = (dateStr) => {
                  if (!dateStr) return '';
                  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                };

                const duration = `${formatMonthYear(exp.startDate)} - ${exp.isCurrentRole ? 'Present' : formatMonthYear(exp.endDate)}`;

                return (
                  <motion.div
                    key={exp._id || exp.id}
                    variants={itemVariants}
                    className="relative flex gap-8 mb-12 last:mb-0 group"
                  >
                    {/* Timeline dot */}
                    <div className="shrink-0 relative z-10 pt-2">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex items-center justify-center w-[80px] h-[80px] rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700/50 text-blue-400 shadow-xl group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all duration-500"
                      >
                        <Briefcase size={32} />
                      </motion.div>
                    </div>

                    {/* Experience card */}
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex-1 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-slate-600/50 transition-all duration-500"
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-6 border-b border-white/5 pb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                            {exp.title}
                          </h3>
                          <p className="text-xl text-blue-300/80 font-medium">
                            {exp.company} {exp.location && `· ${exp.location}`}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300 font-semibold whitespace-nowrap">
                          {duration}
                        </span>
                      </div>

                      <p className="text-gray-400 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-8 space-y-1 text-sm">
                          {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2.5">
                        {(exp.skills || []).map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-1.5 text-xs font-semibold bg-slate-700/50 text-gray-300 rounded-lg border border-white/5 transition-all duration-300 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 group-hover:border-indigo-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-32 pt-16 border-t border-white/5"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-white">
              Tech Stack & <span className="text-cyan-400">Skills</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <motion.div
                  key={skill._id || skill.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center p-5 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 text-center font-medium text-gray-300 hover:text-white hover:bg-slate-700/60 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </motion.div>
              ))
            ) : !loading && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No skills added yet. Add them in the Admin panel!
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
