import { BookOpen, Briefcase, Code } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const modules = [
        {
            title: "Projects",
            description: "Manage your portfolio projects, images, and tech stack.",
            icon: Code,
            path: "/admin/projects",
            color: "text-blue-400",
            bgHover: "hover:bg-blue-500/5",
            borderHover: "hover:border-blue-500/30",
        },
        {
            title: "Experience",
            description: "Update your work history, titles, and detailed contributions.",
            icon: Briefcase,
            path: "/admin/experience",
            color: "text-indigo-400",
            bgHover: "hover:bg-indigo-500/5",
            borderHover: "hover:border-indigo-500/30",
        },
        {
            title: "Tech Stack",
            description: "Manage your technical skills and proficiency levels.",
            icon: Code, // Using Code icon again or can be anything
            path: "/admin/skills",
            color: "text-emerald-400",
            bgHover: "hover:bg-emerald-500/5",
            borderHover: "hover:border-emerald-500/30",
        },
        {
            title: "Blogs & Insights",
            description: "Post new articles, tech insights, and design thoughts.",
            icon: BookOpen,
            path: "/admin/blogs",
            color: "text-cyan-400",
            bgHover: "hover:bg-cyan-500/5",
            borderHover: "hover:border-cyan-500/30",
        },
    ];

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Durvesh!</h1>
                <p className="text-gray-400">Select a section below to start managing your dynamic portfolio content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                        <Link
                            key={mod.title}
                            to={mod.path}
                            className={`p-6 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 transition-all duration-300 group ${mod.bgHover} ${mod.borderHover}`}
                        >
                            <div className={`w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 shadow-md border border-slate-700/50 group-hover:scale-110 transition-transform ${mod.color}`}>
                                <Icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                {mod.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {mod.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
