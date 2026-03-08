import { motion } from "framer-motion";
import { Edit2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        icon: "",
        proficiency: 50,
        featured: false,
        order: 0,
    });

    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/skills`);
            const data = await res.json();
            setSkills(Array.isArray(data.data) ? data.data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching skills:", err);
            setError("Failed to load generic skills.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOpenModal = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData(skill);
        } else {
            setEditingSkill(null);
            setFormData({
                name: "",
                category: "",
                icon: "",
                proficiency: 50,
                featured: false,
                order: 0,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const url = editingSkill
                ? `${API_URL}/api/skills/${editingSkill._id}`
                : `${API_URL}/api/skills`;

            const method = editingSkill ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save skill");

            setIsModalOpen(false);
            fetchSkills();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;

        try {
            const res = await fetch(`${API_URL}/api/skills/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete");
            fetchSkills();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Tech Stack</h1>
                    <p className="text-gray-400 text-sm">Manage your skills and technical expertise.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                >
                    <Plus size={20} />
                    <span>Add Skill</span>
                </button>
            </div>

            <div className="bg-slate-800/30 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-white/5">
                                <th className="p-4 text-sm font-semibold text-gray-300">Skill Name</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Category</th>
                                <th className="p-4 text-sm font-semibold text-gray-300">Proficiency</th>
                                <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">Loading skills...</td>
                                </tr>
                            ) : skills.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">No skills found.</td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-white/10 flex items-center justify-center text-emerald-400 font-bold overflow-hidden">
                                                    {skill.icon ? <img src={skill.icon} alt={skill.name} className="w-full h-full object-cover" /> : skill.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium flex items-center gap-2">
                                                        {skill.name}
                                                        {skill.featured && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FEATURED</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-gray-300 border border-white/10">
                                                {skill.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden max-w-[150px]">
                                                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${skill.proficiency || 0}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-400 w-8">{skill.proficiency || 0}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(skill)}
                                                    className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill._id)}
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
                        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg my-auto overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 shrink-0">
                            <h2 className="text-xl font-bold text-white">{editingSkill ? "Edit Skill" : "Add Skill"}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="skill-form" onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">{error}</div>}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Skill Name *</label>
                                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
                                        <input type="text" required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="Frontend, Backend, Tools..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Icon URL (Optional)</label>
                                        <input type="url" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Proficiency %</label>
                                            <input type="number" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({ ...formData, proficiency: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Order Index</label>
                                            <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
                                        <input type="checkbox" id="featuredSkill" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800" />
                                        <label htmlFor="featuredSkill" className="text-sm font-medium text-white cursor-pointer select-none">Feature this skill</label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-slate-800 shrink-0 bg-slate-800/30">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white bg-slate-800 transition-colors">Cancel</button>
                            <button type="submit" form="skill-form" className="px-6 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors">{editingSkill ? "Update" : "Save"}</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
