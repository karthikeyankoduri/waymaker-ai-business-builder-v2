import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import {
    Rocket, Lightbulb, Target, Users, Zap, Folders, LayoutTemplate, MapPin, Megaphone, DollarSign, Settings
} from 'lucide-react';
import {
    generateMarketResearch,
    generateCompetitors,
    generateWebsiteCode,
    generateMarketingKit,
    generateFundingOpportunities
} from '../services/ai';
import { getSearchStatus } from '../services/webSearchService';

export default function Dashboard() {
    const { activeProject, addProject, updateProject, apiKey } = useProjects();
    const navigate = useNavigate();

    const [idea, setIdea] = useState("");
    const [industry, setIndustry] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [location, setLocation] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState("");
    const [searchStatusText, setSearchStatusText] = useState("");

    const handleStartProject = async (e: React.FormEvent) => {
        e.preventDefault();


        // Create new project
        const project = addProject({
            name: idea.split(' ').slice(0, 4).join(' ') || 'New Project',
            idea,
            industry,
            targetAudience,
            location
        });

        await runOrchestrator(project.id, {
            ...project,
            id: project.id,
            createdAt: project.createdAt,
            chatHistory: []
        });
    };

    const runOrchestrator = async (projectId: string, projectData: any) => {
        if (!apiKey) return;
        setIsGenerating(true);

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        // 1. Market Research
        try {
            setGenerationStep("Scraping web data via Serper API...");
            const research = await generateMarketResearch(apiKey, projectData);
            setSearchStatusText(getSearchStatus().message);
            updateProject(projectId, { marketResearch: research || "Market research generation failed." });
        } catch (error) {
            console.error("Market Research Error:", error);
            updateProject(projectId, { marketResearch: "# Generation Error\nCould not generate market research due to API constraints. Try again later." });
        }

        await delay(3000); // 3-second delay to prevent 15 RPM burst limit on Gemini free tier

        // 2. Competitors
        try {
            setGenerationStep("Identifying Competitors & Gaps...");
            const competitors = await generateCompetitors(apiKey, projectData);
            updateProject(projectId, { competitors });
        } catch (error) {
            console.error(error);
        }

        await delay(3000);

        // 3. Website Code
        try {
            setGenerationStep("Building Tailwind Website Code...");
            const websiteCode = await generateWebsiteCode(apiKey, projectData);
            updateProject(projectId, { websiteCode: websiteCode || "<!-- Generation failed -->" });
        } catch (error) {
            console.error(error);
            updateProject(projectId, { websiteCode: "<div class='p-8 text-center text-red-500'>Failed to generate website code.</div>" });
        }

        await delay(3000);

        // 4. Marketing Kit
        try {
            setGenerationStep("Drafting Marketing Kit...");
            const marketingKit = await generateMarketingKit(apiKey, projectData);
            updateProject(projectId, { marketingKit });
        } catch (error) {
            console.error(error);
        }

        await delay(3000);

        // 5. Funding Opportunities
        try {
            setGenerationStep("Finding Funding Matches...");
            const fundingOpportunities = await generateFundingOpportunities(apiKey, projectData);
            updateProject(projectId, { fundingOpportunities });
        } catch (error) {
            console.error(error);
        }

        setGenerationStep("Complete!");
        setSearchStatusText("");
        setTimeout(() => setGenerationStep(""), 2000);
        setIsGenerating(false);
    };

    return (
        <div className="space-y-8 fade-in">
            {activeProject ? (
                <div className="space-y-6">
                    <div className="glass-card p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold mb-3 text-white">{activeProject.name}</h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {activeProject.industry && (
                                    <span className="badge badge-primary">
                                        <Target className="w-3 h-3 mr-1" /> {activeProject.industry}
                                    </span>
                                )}
                                {activeProject.targetAudience && (
                                    <span className="badge badge-primary">
                                        <Users className="w-3 h-3 mr-1" /> {activeProject.targetAudience}
                                    </span>
                                )}
                                {activeProject.location && (
                                    <span className="badge badge-primary">
                                        <MapPin className="w-3 h-3 mr-1" /> {activeProject.location}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                            <p className="text-slate-300 leading-relaxed">{activeProject.idea}</p>
                        </div>
                    </div>

                    {!activeProject.marketResearch && !isGenerating && (
                        <button
                            onClick={() => runOrchestrator(activeProject.id, activeProject)}
                            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
                        >
                            <Zap className="w-5 h-5" /> Generate Complete Business Plan
                        </button>
                    )}

                    {isGenerating && (
                        <div className="glass-card p-8 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/20 mb-4">
                                <div className="animate-spin w-6 h-6 rounded-full border-2 border-indigo-600/30 border-t-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">AI Orchestrator Running</h3>
                            <p className="text-indigo-400 font-medium mb-4">{generationStep}</p>
                            {searchStatusText && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    {searchStatusText}
                                </div>
                            )}
                        </div>
                    )}

                    {(activeProject.marketResearch && !isGenerating) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button onClick={() => navigate('/dashboard/research')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                                    <Folders className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Market Research</h3>
                                <p className="text-slate-400 text-sm">View comprehensive market analysis</p>
                            </button>
                            <button onClick={() => navigate('/dashboard/competitors')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-4 group-hover:bg-violet-600/20 transition-colors">
                                    <Target className="w-6 h-6 text-violet-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Competitors</h3>
                                <p className="text-slate-400 text-sm">Analyze market gaps & rivals</p>
                            </button>
                            <button onClick={() => navigate('/dashboard/website')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                                    <LayoutTemplate className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Website</h3>
                                <p className="text-slate-400 text-sm">Preview generated landing page</p>
                            </button>
                            <button onClick={() => navigate('/dashboard/marketing')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-violet-600/10 flex items-center justify-center mb-4 group-hover:bg-violet-600/20 transition-colors">
                                    <Megaphone className="w-6 h-6 text-violet-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Marketing Kit</h3>
                                <p className="text-slate-400 text-sm">Ready-to-post social content</p>
                            </button>
                            <button onClick={() => navigate('/dashboard/funding')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-emerald-600/10 flex items-center justify-center mb-4 group-hover:bg-emerald-600/20 transition-colors">
                                    <DollarSign className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Funding</h3>
                                <p className="text-slate-400 text-sm">Find capital opportunities</p>
                            </button>
                            <button onClick={() => navigate('/dashboard/deployments')} className="group glass-card p-6 hover-lift text-left">
                                <div className="w-12 h-12 rounded-lg bg-amber-600/10 flex items-center justify-center mb-4 group-hover:bg-amber-600/20 transition-colors">
                                    <Settings className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="font-semibold text-base mb-1 text-white">Deploy</h3>
                                <p className="text-slate-400 text-sm">Configure webhooks & integrations</p>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="glass-card p-8 lg:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2 text-white">Start a New Project</h2>
                        <p className="text-slate-400">Describe your business idea and let AI handle the research, design, and marketing.</p>
                    </div>

                    <form onSubmit={handleStartProject} className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-indigo-400" /> Business Idea
                            </label>
                            <textarea
                                required
                                value={idea}
                                onChange={e => setIdea(e.target.value)}
                                placeholder="e.g. A marketplace for freelance astrophotographers to sell raw space image data to researchers and hobbyists."
                                className="input-field h-32 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-violet-400" /> Industry (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={e => setIndustry(e.target.value)}
                                    placeholder="e.g. SpaceTech"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-indigo-400" /> Target Audience (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={targetAudience}
                                    onChange={e => setTargetAudience(e.target.value)}
                                    placeholder="e.g. Researchers"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-slate-400" /> Location (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="e.g. San Francisco"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!idea}
                            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
                        >
                            <Rocket className="w-5 h-5" /> Launch Project
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
