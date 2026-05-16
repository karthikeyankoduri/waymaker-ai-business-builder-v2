import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { projectService } from '../services/projectService';
import { useAuth } from './AuthContext';

interface ProjectContextType {
    projects: Project[];
    activeProject: Project | null;
    setActiveProjectId: (id: string | null) => void;
    addProject: (project: Omit<Project, 'id' | 'userId' | 'createdAt' | 'chatHistory'>) => Project;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    apiKey: string | null;
    setApiKey: (key: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('waymaker_projects');
        return saved ? JSON.parse(saved) : [];
    });

    // Load projects when user changes
    useEffect(() => {
        if (!user) {
            setProjects([]);
            setActiveProjectId(null);
            return;
        }

        const loadProjects = async () => {
            try {
                const data = await projectService.getProjects();
                if (data && data.length > 0) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to load projects from Firebase:", error);
            }
        };
        loadProjects();
    }, [user]);

    const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
        return localStorage.getItem('waymaker_active_project');
    });

    const [apiKey, setApiKeyState] = useState<string | null>(() => {
        return import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('waymaker_api_key') || '';
    });

    // Save changes to localStorage
    useEffect(() => {
        localStorage.setItem('waymaker_projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        if (activeProjectId) {
            localStorage.setItem('waymaker_active_project', activeProjectId);
        } else {
            localStorage.removeItem('waymaker_active_project');
        }
    }, [activeProjectId]);

    const setApiKey = (key: string | null) => {
        setApiKeyState(key);
        if (key) {
            localStorage.setItem('waymaker_api_key', key);
        } else {
            localStorage.removeItem('waymaker_api_key');
        }
    };

    const addProject = (projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'chatHistory'>) => {
        if (!user) {
            throw new Error('User must be authenticated to create projects');
        }

        const newProject: Project = {
            ...projectData,
            id: crypto.randomUUID(),
            userId: user.uid,
            createdAt: new Date().toISOString(),
            chatHistory: [],
        };
        setProjects(prev => [newProject, ...prev]);
        setActiveProjectId(newProject.id);

        projectService.saveProject(newProject).catch(err => {
            console.error("Failed to save project to Firebase:", err);
        });

        return newProject;
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

        projectService.updateProject(id, updates).catch(err => {
            console.error("Failed to update project in Supabase:", err);
        });
    };

    const deleteProject = (id: string) => {
        setProjects(prev => {
            const filtered = prev.filter(p => p.id !== id);
            if (activeProjectId === id) {
                setActiveProjectId(filtered.length > 0 ? filtered[0].id : null);
            }
            return filtered;
        });

        projectService.deleteProject(id).catch(err => {
            console.error("Failed to delete project from Supabase:", err);
        });
    };

    const activeProject = projects.find(p => p.id === activeProjectId) || null;

    return (
        <ProjectContext.Provider value={{
            projects,
            activeProject,
            setActiveProjectId,
            addProject,
            updateProject,
            deleteProject,
            apiKey,
            setApiKey
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
}
