import { motion } from "framer-motion";
import { Edit2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getExperience } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminExperience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrentRole: false,
        description: "",
        responsibilities: "",
        skills: "",
        order: 0,
    });

    const { token } = useAuth();

    const fetchExperience = async () => {
        try {
            setLoading(true);
            const data = await getExperience();
            setExperiences(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching experience:", err);
            setError("Failed to load generic experience.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperience();
    }, []);

    const handleOpenModal = (exp = null) => {
        if (exp) {
            setEditingExp(exp);
            setFormData({
                ...exp,
                startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : "",
                endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : "",
                responsibilities: exp.responsibilities ? exp.responsibilities.join("\n") : "",
                skills: exp.skills ? exp.skills.join(", ") : "",
            });
        } else {
            setEditingExp(null);
            setFormData({
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrentRole: false,
                description: "",
                responsibilities: "",
                skills: "",
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
            responsibilities: formData.responsibilities.split("\n").map(r => r.trim()).filter(Boolean),
            skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
        };

        if (submitData.isCurrentRole) {
            submitData.endDate = null;
        }

        try {
            const url = editingExp
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/experience/${editingExp._id}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/experience`;

            const method = editingExp ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submitData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save experience");

            setIsModalOpen(false);
            fetchExperience();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this experience record?")) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/experience/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete");
            fetchExperience();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Work Experience</h1>
                    <p className="text-gray-400 text-sm">Manage your professional journey and timeline.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                >
                    <Plus size={20} />
                    <span>Add Position</span>
                </button>
            </div>

            <div className="bg-slate-800/30 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-white/5">
                                <th className="p-4 text-sm font-semibold text-gray-300">Position & Company</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Duration</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Skills</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">Loading experience...</td>
                                </tr>
                            ) : experiences.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">No experience records found.</td>
                                </tr>
                            ) : (
                                experiences.map((exp) => (
                                    <tr key={exp._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div>
                                                <p className="text-white font-medium">{exp.title}</p>
                                                <p className="text-xs text-indigo-400">{exp.company} {exp.location && `· ${exp.location}`}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">
                                            {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                                            {exp.isCurrentRole ? " Present" : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : " ?"}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(exp.skills || []).slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-[10px] bg-slate-700/50 text-gray-300 rounded border border-white/5">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {(exp.skills?.length || 0) > 3 && (
                                                    <span className="px-2 py-0.5 text-[10px] bg-slate-700/50 text-gray-400 rounded border border-white/5">
                                                        +{exp.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(exp)}
                                                    className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(exp._id)}
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
                        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl my-auto overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 shrink-0">
                            <h2 className="text-xl font-bold text-white">{editingExp ? "Edit Experience" : "Add Experience"}</h2>
                        </div>
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="exp-form" onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">{error}</div>}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Job Title *</label>
                                        <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Company *</label>
                                        <input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                        <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Order (for sorting)</label>
                                        <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Start Date *</label>
                                        <input type="date" required value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="isCurrent" checked={formData.isCurrentRole} onChange={e => setFormData({ ...formData, isCurrentRole: e.target.checked })} className="rounded border-slate-600 bg-slate-900 text-indigo-500" />
                                            <label htmlFor="isCurrent" className="text-sm text-gray-300">I currently work here</label>
                                        </div>
                                        {!formData.isCurrentRole && (
                                            <input type="date" required value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Role Description</label>
                                    <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Key Responsibilities (One per line)</label>
                                    <textarea rows="4" value={formData.responsibilities} onChange={e => setFormData({ ...formData, responsibilities: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Led a team of..." />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Skills / Tech Stack (Comma separated)</label>
                                    <input type="text" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="React, Node.js, AWS" />
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-slate-800 shrink-0 bg-slate-800/30">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white bg-slate-800 transition-colors">Cancel</button>
                            <button type="submit" form="exp-form" className="px-6 py-2.5 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-colors">{editingExp ? "Update" : "Save"}</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
