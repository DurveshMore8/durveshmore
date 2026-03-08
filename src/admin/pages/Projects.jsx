import { motion } from "framer-motion";
import { Copy, Edit2, ExternalLink, Github, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getProjects } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        shortDescription: "",
        technologies: "",
        image: "",
        github: "",
        demo: "",
        featured: false,
        status: "published",
        order: 0,
    });

    const { token } = useAuth();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects();
            setProjects(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                ...project,
                technologies: project.technologies.join(", "),
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: "",
                description: "",
                shortDescription: "",
                technologies: "",
                image: "",
                github: "",
                demo: "",
                featured: false,
                status: "published",
                order: 0,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const submitData = {
            ...formData,
            technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        };

        try {
            const url = editingProject
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${editingProject._id}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`;

            const method = editingProject ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save project");

            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete");
            fetchProjects();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Projects Management</h1>
                    <p className="text-gray-400 text-sm">Create, update, and organize your portfolio projects.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                >
                    <Plus size={20} />
                    <span>New Project</span>
                </button>
            </div>

            {/* Projects Table */}
            <div className="bg-slate-800/30 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-white/5">
                                <th className="p-4 text-sm font-semibold text-gray-300">Project</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Links</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">Loading projects...</td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">No projects found. Create one above.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={project.image || "https://placehold.co/100x100/1e293b/fff?text=No+Image"}
                                                    alt={project.title}
                                                    className="w-16 h-12 object-cover rounded-lg border border-white/10"
                                                />
                                                <div>
                                                    <p className="text-white font-medium flex items-center gap-2">
                                                        {project.title}
                                                        {project.featured && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">FEATURED</span>}
                                                    </p>
                                                    <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{project.shortDescription || project.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${project.status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                project.status === 'draft' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                    'bg-slate-700/50 text-gray-400 border border-white/10'
                                                }`}>
                                                {project.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.demo && (
                                                    <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal({ ...project, _id: undefined })}
                                                    title="Duplicate"
                                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(project)}
                                                    title="Edit"
                                                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    title="Delete"
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shadow-sm"
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

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl my-auto overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 shrink-0">
                            <h2 className="text-xl font-bold text-white">{editingProject ? "Edit Project" : "Create New Project"}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">{error}</div>}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Title *</label>
                                            <input
                                                type="text" required
                                                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Image URL *</label>
                                            <input
                                                type="text" required
                                                value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                                                <select
                                                    value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 appearance-none"
                                                >
                                                    <option value="published">Published</option>
                                                    <option value="draft">Draft</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
                                                <input
                                                    type="number"
                                                    value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                                            <input
                                                type="checkbox" id="featured"
                                                checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800"
                                            />
                                            <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer select-none">
                                                Feature on homepage
                                            </label>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Link: GitHub</label>
                                            <input
                                                type="url"
                                                value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Link: Live Demo</label>
                                            <input
                                                type="url"
                                                value={formData.demo} onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated) *</label>
                                            <input
                                                type="text" required
                                                value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                                placeholder="React, Node.js, Tailwind"
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Full Width */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Short Description</label>
                                        <input
                                            type="text"
                                            value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                            placeholder="Brief summary for cards"
                                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Detailed Description *</label>
                                        <textarea
                                            required rows="4"
                                            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-slate-800 shrink-0 bg-slate-800/30">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="project-form"
                                className="px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
                            >
                                {editingProject ? "Update Project" : "Create Project"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
