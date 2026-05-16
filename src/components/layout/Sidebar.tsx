import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import { Command, Plus, Briefcase, LayoutTemplate, MessageSquare, Folders, Settings, Megaphone, Target, DollarSign, Trash2, Hexagon } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
    const { projects, activeProject, setActiveProjectId, deleteProject, apiKey } = useProjects();
    const navigate = useNavigate();

    const handleNewProject = () => {
        setActiveProjectId(null); // Deselect active so dashboard shows the new project form
        navigate('/dashboard');
    };

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        clsx(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
            isActive
                ? "bg-white/10 text-white shadow-sm border border-white/5"
                : "text-white/50 hover:text-white hover:bg-white/5"
        );

    return (
        <div className="w-64 h-full glass-panel flex flex-col pt-6 flex-shrink-0 z-20">
            <div className="px-6 mb-8 flex items-center justify-between cursor-pointer group" onClick={() => navigate('/')}>
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
                    <NavLink to="/dashboard/projects" className={navItemClass}>
                        <Folders className="w-4 h-4" /> My Projects
                    </NavLink>
                </div>

                {/* Modules Navigation (Only shown if a project is selected) */}
                {activeProject && (
                    <div>
                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">Modules</h3>
                        <div className="space-y-1">
                            <NavLink to="/dashboard" end className={navItemClass}>
                                <Target className="w-4 h-4" /> Overview
                            </NavLink>
                            <NavLink to="/dashboard/research" className={navItemClass}>
                                <Briefcase className="w-4 h-4" /> Market Research
                            </NavLink>
                            <NavLink to="/dashboard/website" className={navItemClass}>
                                <LayoutTemplate className="w-4 h-4" /> Website
                            </NavLink>
                            <NavLink to="/dashboard/marketing" className={navItemClass}>
                                <Megaphone className="w-4 h-4" /> Marketing
                            </NavLink>
                            <NavLink to="/dashboard/funding" className={navItemClass}>
                                <DollarSign className="w-4 h-4" /> Funding
                            </NavLink>
                            <NavLink to="/dashboard/deployments" className={navItemClass}>
                                <Settings className="w-4 h-4" /> Deploy
                            </NavLink>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
