import { NavLink, useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Briefcase, LayoutTemplate, Folders, Settings, Megaphone, Target, DollarSign, Hexagon, LogOut, User } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

interface SidebarProps {
    onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
    const { projects, activeProject, setActiveProjectId, deleteProject, apiKey } = useProjects();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [signingOut, setSigningOut] = useState(false);

    const handleNewProject = () => {
        setActiveProjectId(null); // Deselect active so dashboard shows the new project form
        navigate('/dashboard');
        if (onCloseMobile) onCloseMobile();
    };

    const handleNavClick = () => {
        if (onCloseMobile) onCloseMobile();
    };

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        clsx(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
            isActive
                ? "bg-white/10 text-white shadow-sm border border-white/5"
                : "text-white/50 hover:text-white hover:bg-white/5"
        );

    return (
        <div className="w-64 h-full glass-panel flex flex-col pt-6 flex-shrink-0 z-20 bg-aura-black md:bg-transparent">
            <div className="px-6 mb-8 flex items-center justify-between cursor-pointer group" onClick={() => { navigate('/'); handleNavClick(); }}>
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md">
                        <Hexagon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">Waymaker</span>
                </div>
            </div>

            <div className="px-4 mb-6">
                <button
                    onClick={handleNewProject}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-4 h-4" /> New Project
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">

                <div className="space-y-1">
                    <NavLink to="/dashboard/projects" className={navItemClass} onClick={handleNavClick}>
                        <Folders className="w-4 h-4" /> My Projects
                    </NavLink>
                </div>

                {/* Modules Navigation (Only shown if a project is selected) */}
                {activeProject && (
                    <div>
                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">Modules</h3>
                        <div className="space-y-1">
                            <NavLink to="/dashboard" end className={navItemClass} onClick={handleNavClick}>
                                <Target className="w-4 h-4" /> Overview
                            </NavLink>
                            <NavLink to="/dashboard/research" className={navItemClass} onClick={handleNavClick}>
                                <Briefcase className="w-4 h-4" /> Market Research
                            </NavLink>
                            <NavLink to="/dashboard/website" className={navItemClass} onClick={handleNavClick}>
                                <LayoutTemplate className="w-4 h-4" /> Website
                            </NavLink>
                            <NavLink to="/dashboard/marketing" className={navItemClass} onClick={handleNavClick}>
                                <Megaphone className="w-4 h-4" /> Marketing
                            </NavLink>
                            <NavLink to="/dashboard/funding" className={navItemClass} onClick={handleNavClick}>
                                <DollarSign className="w-4 h-4" /> Funding
                            </NavLink>
                            <NavLink to="/dashboard/deployments" className={navItemClass} onClick={handleNavClick}>
                                <Settings className="w-4 h-4" /> Deploy
                            </NavLink>
                        </div>
                    </div>
                )}

            </div>

            {/* User Profile Section */}
            <div className="px-4 pb-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-full h-full rounded-full"
                            />
                        ) : (
                            <User className="w-4 h-4 text-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={async () => {
                            setSigningOut(true);
                            try {
                                await signOut();
                                navigate('/login');
                            } catch (error) {
                                console.error('Sign out error:', error);
                                setSigningOut(false);
                            }
                        }}
                        disabled={signingOut}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Sign out"
                    >
                        <LogOut className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                </div>
            </div>

        </div>
    );
}
