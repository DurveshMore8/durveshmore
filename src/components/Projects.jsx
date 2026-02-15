import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import React from "react";

export default function Projects() {
  const projects = [
    // {
    //   id: 1,
    //   title: "E-Commerce Platform",
    //   description:
    //     "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    //   technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    //   image:
    //     "https://images.unsplash.com/photo-1460925895917-adf4e5e3a65f?w=500&h=300&fit=crop",
    //   github: "#",
    //   demo: "#",
    // },
    {
      id: 2,
      title: "Enigma Notepad",
      description:
        "EnigmaNotepad lets you store sensitive information like keys, secrets, and notes securely—encrypted and accessible only by you.",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "AES Encryption"],
      image: "/project-images/enigma-notepad.png",
      github: "https://github.com/DurveshMore8/enigmanotepad",
      demo: "https://enigmanotepad.vercel.app/",
    },
    {
      id: 3,
      title: "AI Interview Platform",
      description:
        "An AI-powered interview preparation platform that simulates real interview scenarios and provides feedback on performance.",
      technologies: [
        "React",
        "NextJS",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
      ],
      image: "/project-images/ai-interview-platform.png",
      github: "https://github.com/DurveshMore8/interview-bot",
      demo: "https://interview-bot-beta.vercel.app/",
    },
    {
      id: 4,
      title: "Bloglane",
      description:
        "A beautiful blog platform with responsive design, content management, and user engagement features.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      image: "/project-images/bloglane.png",
      github: "https://github.com/DurveshMore8/Bloglane",
      demo: "https://bloglane.vercel.app/",
    },
    {
      id: 5,
      title: "Todo App",
      description:
        "A simple and efficient todo application with task management, due dates, and progress tracking.",
      technologies: ["React"],
      image: "/project-images/todo-app.png",
      github: "https://github.com/DurveshMore8/TodoApp",
      demo: "https://todo-app-inky-eta.vercel.app/",
    },
    {
      id: 6,
      title: "Weather App",
      description:
        "A comprehensive weather application with real-time data, forecasts, and location-based services.",
      technologies: ["React"],
      image: "/project-images/weather-app.png",
      github: "https://github.com/DurveshMore8/WeatherApp",
      demo: "https://weather-app-seven-vert-88.vercel.app/",
    },
  ];

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Featured <span className="glow-text">Projects</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              }}
              className="card overflow-hidden group cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 mb-4">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
