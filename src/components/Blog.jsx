import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogs } from "../services/api";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogs();
        setBlogPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blog posts");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 relative">
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Latest <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500">Insights</span>
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
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found</p>
            </div>
          ) : (
            blogPosts.map((post) => (
              <motion.article
                key={post._id || post.id}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                className="group flex flex-col bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] transition-all duration-500 h-full"
              >
                {/* Post Image */}
                <div className="relative h-56 shrink-0 overflow-hidden border-b border-slate-700/50">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-flex self-start px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider rounded-lg backdrop-blur-md mb-2">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="space-y-4 pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-cyan-400" />
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(post.createdAt || post.date).toLocaleDateString()}</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-800 rounded-md border border-slate-700/50">{post.readTime} min read</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-6 pt-4 border-t border-white/5 mx-auto w-full">
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors"
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Article
                      <ArrowRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
