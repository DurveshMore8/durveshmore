import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title:
        "Mastering SOLID Principles: The Foundation of Clean Software Design",
      excerpt:
        "Introduction: Writing clean and maintainable code is not only an excellent habit but also a fundamental skill for...",
      author: "Durvesh More",
      date: "May 13, 2025",
      readTime: "3 min read",
      category: "SOLID Principles",
      image: "/blog-images/solid-principles.png",
      link: "https://www.linkedin.com/pulse/mastering-solid-principles-foundation-clean-software-design-more-w0mlf/?trackingId=GpnDQPQjTjWAQXKP%2ByY6sg%3D%3D",
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
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Latest <span className="glow-text">Blog Posts</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card overflow-hidden group cursor-pointer"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden h-48 mb-4">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4"
                >
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </motion.div>
              </div>

              {/* Post Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Read More */}
              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                href={post.link}
              >
                Read More
                <ArrowRight size={16} />
              </motion.a>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View All Articles
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}
