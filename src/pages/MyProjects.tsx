import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { Briefcase, Trash2, Calendar, Target, MapPin, Users } from 'lucide-react';

export default function MyProjects() {
    const { projects, setActiveProjectId, deleteProject } = useProjects();
    const navigate = useNavigate();

    const handleOpenProject = (id: string) => {
        setActiveProjectId(id);
        navigate('/dashboard');
    };

    return (
        <div className="space-y-6 fade-in pb-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-600/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">My Projects</h1>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="glass-card p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                        <Briefcase className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">No Projects Yet</h3>
                    <p className="text-slate-400 mb-6 max-w-sm">Create your first business plan using the AI Orchestrator.</p>
                    <button
                        onClick={() => {
                            setActiveProjectId(null);
                            navigate('/dashboard');
                        }}
                        className="btn-primary"
                    >
                        Start New Project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map(project => (
                        <div key={project.id} className="glass-card p-6 flex flex-col hover-lift group cursor-pointer" onClick={() => handleOpenProject(project.id)}>
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">{project.name}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProject(project.id);
                                    }}
                                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                {project.idea}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.industry && (
                                    <span className="badge badge-primary">
                                        <Target className="w-3 h-3 mr-1" /> {project.industry}
                                    </span>
                                )}
                                {project.targetAudience && (
                                    <span className="badge badge-primary">
                                        <Users className="w-3 h-3 mr-1" /> {project.targetAudience}
                                    </span>
                                )}
                                {project.location && (
                                    <span className="badge badge-primary">
                                        <MapPin className="w-3 h-3 mr-1" /> {project.location}
                                    </span>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="text-indigo-400 font-medium group-hover:text-indigo-300">Open →</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
