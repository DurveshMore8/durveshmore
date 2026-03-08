import { BookOpen, Briefcase, Code, LayoutDashboard, LogOut, Settings as SettingsIcon } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/admin");
    };

    const navItems = [
        { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Projects", path: "/admin/projects", icon: Code },
        { label: "Experience", path: "/admin/experience", icon: Briefcase },
        { label: "Tech Stack", path: "/admin/skills", icon: Code },
        { label: "Blogs", path: "/admin/blogs", icon: BookOpen },
        { label: "Settings", path: "/admin/settings", icon: SettingsIcon },
    ];

    return (
        <div className="h-screen bg-slate-900 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-full">
                <div className="p-6 h-20 flex items-center border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                        Portfolio Admin
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm"
                                    : "text-gray-400 hover:bg-slate-800/50 hover:text-white"
                                    }`}
                            >
                                <Icon size={20} className={isActive ? "text-cyan-400" : "text-gray-500"} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-950">
                {/* Top Header */}
                <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30">
                    <h2 className="text-xl font-semibold text-white">
                        {navItems.find(item => location.pathname.startsWith(item.path))?.label || "Admin Panel"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                            DM
                        </span>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
                    {/* Subtle background glow for aesthetics */}
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
