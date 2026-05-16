import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { Briefcase, Trash2, Calendar, Target, MapPin, Users, Plus } from 'lucide-react';

export default function MyProjects() {
    const { projects, setActiveProjectId, deleteProject } = useProjects();
    const navigate = useNavigate();

    const handleOpenProject = (id: string) => {
        setActiveProjectId(id);
        navigate('/dashboard');
    };

    return (
        <div className="space-y-8 fade-in pb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                        <Briefcase className="w-7 h-7 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-display font-extrabold text-white">My Blueprints</h1>
                        <p className="text-white/50 text-sm mt-1">Manage your active AI-orchestrated ventures.</p>
                    </div>
                </div>
                {projects.length > 0 && (
                    <button
                        onClick={() => {
                            setActiveProjectId(null);
                            navigate('/dashboard');
                        }}
                        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                        <Plus className="w-4 h-4" /> New Blueprint
                    </button>
                )}
            </div>

            {projects.length === 0 ? (
                <div className="glass-card p-16 text-center flex flex-col items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 relative z-10">
                        <Briefcase className="w-10 h-10 text-white/40" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-3 text-white relative z-10">No Active Blueprints</h3>
                    <p className="text-white/50 mb-8 max-w-md relative z-10 text-lg">Initialize your first AI-orchestrated business plan from the dashboard.</p>
                    <button
                        onClick={() => {
                            setActiveProjectId(null);
                            navigate('/dashboard');
                        }}
                        className="relative z-10 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                    >
                        Initialize Blueprint
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div 
                            key={project.id} 
                            className="glass-card p-6 flex flex-col hover-lift group cursor-pointer border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden" 
                            onClick={() => handleOpenProject(project.id)}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:scale-150"></div>
                            
                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <h3 className="text-2xl font-display font-bold text-white line-clamp-1 flex-1 pr-4">{project.name}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProject(project.id);
                                    }}
                                    className="p-2 text-white/30 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-white/50 text-sm line-clamp-3 mb-6 flex-1 relative z-10 leading-relaxed">
                                {project.idea}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                {project.industry && (
                                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs font-medium flex items-center">
                                        <Target className="w-3 h-3 mr-1.5 opacity-50" /> {project.industry}
                                    </span>
                                )}
                                {project.targetAudience && (
                                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs font-medium flex items-center">
                                        <Users className="w-3 h-3 mr-1.5 opacity-50" /> {project.targetAudience}
                                    </span>
                                )}
                            </div>

                            <div className="pt-5 border-t border-white/5 flex items-center justify-between text-xs text-white/40 relative z-10">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="text-indigo-400 font-bold tracking-widest uppercase group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                                    Access <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add New Project Card */}
                    <div 
                        className="glass-card p-6 flex flex-col items-center justify-center cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 border-dashed min-h-[280px] group"
                        onClick={() => {
                            setActiveProjectId(null);
                            navigate('/dashboard');
                        }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Plus className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-white/60 group-hover:text-white transition-colors">Initialize New Blueprint</h3>
                    </div>
                </div>
            )}
        </div>
    );
}
