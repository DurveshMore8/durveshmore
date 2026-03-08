import { motion } from "framer-motion";
import { Edit2, Eye, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ImageUpload from "../components/ImageUpload";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        image: "",
        readTime: 5,
        status: "draft",
    });

    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            setBlogs(Array.isArray(data.data) ? data.data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError("Failed to load generic blogs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                ...blog,
                tags: blog.tags ? blog.tags.join(", ") : "",
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                excerpt: "",
                content: "",
                category: "",
                tags: "",
                image: "",
                readTime: 5,
                status: "draft",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const submitData = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        };

        try {
            const url = editingBlog
                ? `${API_URL}/api/blogs/${editingBlog._id}`
                : `${API_URL}/api/blogs`;

            const method = editingBlog ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save blog");

            setIsModalOpen(false);
            fetchBlogs();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete");
            fetchBlogs();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Blog Management</h1>
                    <p className="text-gray-400 text-sm">Write articles, manage drafts, and share your insights.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
                >
                    <Plus size={20} />
                    <span>New Post</span>
                </button>
            </div>

            <div className="bg-slate-800/30 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-white/5">
                                <th className="p-4 text-sm font-semibold text-gray-300">Article</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Category</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Views</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">Loading articles...</td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-400">No blog posts found.</td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={blog.image || "https://placehold.co/100x100/1e293b/fff?text=Blog"}
                                                    alt={blog.title}
                                                    className="w-12 h-12 object-cover rounded-lg border border-white/10"
                                                />
                                                <div>
                                                    <p className="text-white font-medium line-clamp-1">{blog.title}</p>
                                                    <p className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded bg-slate-700/50 text-[10px] text-gray-300 border border-white/5 uppercase font-bold">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <Eye size={14} />
                                                <span className="text-sm font-mono">{blog.views || 0}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${blog.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                blog.status === 'draft' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                    'bg-slate-700/50 text-gray-400 border border-white/10'
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(blog)}
                                                    className="p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl my-auto overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 shrink-0">
                            <h2 className="text-xl font-bold text-white">{editingBlog ? "Edit Article" : "Write Article"}</h2>
                        </div>
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">{error}</div>}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Title *</label>
                                            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt * (Short summary)</label>
                                            <textarea rows="2" required value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Content * (Markdown Supported)</label>
                                            <textarea rows="12" required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors font-mono text-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
                                            <input type="text" required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Tech, Lifestyle, etc." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Tags (Comma separated)</label>
                                            <input type="text" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Coding, 2024" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                                        </div>
                                        <div>
                                            <ImageUpload
                                                label="Feature Image *"
                                                currentImage={formData.image}
                                                onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Read Time (minutes)</label>
                                            <input type="number" value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 appearance-none">
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-slate-800 shrink-0 bg-slate-800/30">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white bg-slate-800 transition-colors">Cancel</button>
                            <button type="submit" form="blog-form" className="px-6 py-2.5 rounded-xl font-bold bg-pink-500 hover:bg-pink-400 text-white transition-colors">
                                {editingBlog ? "Update Post" : "Publish Post"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
