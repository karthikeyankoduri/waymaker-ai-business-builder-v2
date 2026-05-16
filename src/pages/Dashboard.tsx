import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import {
    Rocket, Lightbulb, Target, Users, Zap, Folders, LayoutTemplate, MapPin, Megaphone, DollarSign, Settings, Check
} from 'lucide-react';
import {
    generateMarketResearch,
    generateCompetitors,
    generateWebsiteCode,
    generateMarketingKit,
    generateFundingOpportunities
} from '../services/ai';
import { getSearchStatus } from '../services/webSearchService';

const ORCHESTRATION_STEPS = [
    { id: 1, name: "Market Intelligence", description: "Scraping real-time web data via Serper API" },
    { id: 2, name: "Competitor Analysis", description: "Identifying market gaps and rival positioning" },
    { id: 3, name: "Architecture", description: "Synthesizing Tailwind React website code" },
    { id: 4, name: "Marketing Engine", description: "Drafting social campaigns and copy" },
    { id: 5, name: "Capital Strategy", description: "Locating targeted funding opportunities" },
];

export default function Dashboard() {
    const { activeProject, addProject, updateProject, apiKey } = useProjects();
    const navigate = useNavigate();

    const [idea, setIdea] = useState("");
    const [industry, setIndustry] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [location, setLocation] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [searchStatusText, setSearchStatusText] = useState("");
    const [agentLogs, setAgentLogs] = useState<string[]>([]);
    const terminalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [agentLogs]);

    const handleStartProject = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create new project
        const project = addProject({
            name: idea.split(' ').slice(0, 4).join(' ') || 'Project Alpha',
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
        setCurrentStepIndex(1); // Start with step 1
        setAgentLogs([`[${new Date().toLocaleTimeString()}] > Initializing AURA Business Builder Orchestrator...`]);

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        // 1. Market Research
        try {
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Executing Market Intelligence module...`]);
            const research = await generateMarketResearch(apiKey, projectData);
            setSearchStatusText(getSearchStatus().message);
            updateProject(projectId, { marketResearch: research || "Market research generation failed." });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✓ Market Research compiled successfully.`]);
        } catch (error) {
            console.error("Market Research Error:", error);
            updateProject(projectId, { marketResearch: "# Generation Error\nCould not generate market research due to API constraints. Try again later." });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✗ Error in Market Intelligence.`]);
        }

        await delay(3000); // 3-second delay to prevent 15 RPM burst limit on Gemini free tier
        setCurrentStepIndex(2);

        // 2. Competitors
        try {
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Executing Competitor Analysis module...`]);
            const competitors = await generateCompetitors(apiKey, projectData);
            updateProject(projectId, { competitors });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✓ Competitor gaps identified.`]);
        } catch (error) {
            console.error(error);
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✗ Error in Competitor Analysis.`]);
        }

        await delay(3000);
        setCurrentStepIndex(3);

        // 3. Website Code
        try {
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Initializing Website Architecture...`]);
            const websiteCode = await generateWebsiteCode(apiKey, projectData);
            updateProject(projectId, { websiteCode: websiteCode || "<!-- Generation failed -->" });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✓ Landing page architecture synthesized.`]);
        } catch (error) {
            console.error(error);
            updateProject(projectId, { websiteCode: "<div class='p-8 text-center text-red-500'>Failed to generate website code.</div>" });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✗ Error in Website Architecture.`]);
        }

        await delay(3000);
        setCurrentStepIndex(4);

        // 4. Marketing Kit
        try {
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Drafting Marketing Engine assets...`]);
            const marketingKit = await generateMarketingKit(apiKey, projectData);
            updateProject(projectId, { marketingKit });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✓ Social campaigns constructed.`]);
        } catch (error) {
            console.error(error);
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✗ Error in Marketing Engine.`]);
        }

        await delay(3000);
        setCurrentStepIndex(5);

        // 5. Funding Opportunities
        try {
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Locating Capital Strategy opportunities...`]);
            const fundingOpportunities = await generateFundingOpportunities(apiKey, projectData);
            updateProject(projectId, { fundingOpportunities });
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✓ Funding pathways established.`]);
        } catch (error) {
            console.error(error);
            setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}]   ✗ Error in Capital Strategy.`]);
        }

        setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] > Orchestration complete. System standing by.`]);

        setCurrentStepIndex(6); // 6 means complete
        setSearchStatusText("");
        
        setTimeout(() => {
            setIsGenerating(false);
            setCurrentStepIndex(0);
            setAgentLogs([]);
        }, 2000);
    };

    return (
        <div className="space-y-8 fade-in">
            {activeProject ? (
                <div className="space-y-8">
                    <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 z-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                            <Rocket className="w-48 h-48 text-indigo-500" />
                        </div>
                        <div className="relative z-10 mb-8">
                            <h1 className="text-4xl font-display font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{activeProject.name}</h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {activeProject.industry && (
                                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase flex items-center">
                                        <Target className="w-3 h-3 mr-1.5" /> {activeProject.industry}
                                    </span>
                                )}
                                {activeProject.targetAudience && (
                                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wider uppercase flex items-center">
                                        <Users className="w-3 h-3 mr-1.5" /> {activeProject.targetAudience}
                                    </span>
                                )}
                                {activeProject.location && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs font-bold tracking-wider uppercase flex items-center">
                                        <MapPin className="w-3 h-3 mr-1.5" /> {activeProject.location}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="relative z-10 p-6 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <p className="text-white/70 leading-relaxed text-lg">{activeProject.idea}</p>
                        </div>
                    </div>

                    {!activeProject.marketResearch && !isGenerating && (
                        <button
                            onClick={() => runOrchestrator(activeProject.id, activeProject)}
                            className="w-full py-6 rounded-2xl bg-indigo-600 text-white font-bold text-xl hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                        >
                            <Zap className="w-6 h-6" /> Deploy AI Orchestrator
                        </button>
                    )}

                    {isGenerating && (
                        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 z-0 opacity-5">
                                <Zap className="w-64 h-64 text-indigo-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 mb-6 border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative">
                                        <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin"></div>
                                        <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-display font-extrabold text-white mb-2">Orchestrating Business</h3>
                                    <p className="text-white/50 text-lg">Autonomous AI agents are building your venture.</p>
                                    
                                    {searchStatusText && currentStepIndex === 1 && (
                                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            {searchStatusText}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                    <div className="space-y-0">
                                        {ORCHESTRATION_STEPS.map((step, index) => {
                                            const isCompleted = currentStepIndex > step.id;
                                            const isCurrent = currentStepIndex === step.id;
                                            
                                            return (
                                                <div key={step.id} className="flex group">
                                                    {/* Left Timeline */}
                                                    <div className="flex flex-col items-center mr-6">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                                                            isCompleted 
                                                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                                                                : isCurrent 
                                                                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                                                                    : 'bg-black/50 border-white/10 text-white/20'
                                                        }`}>
                                                            {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-display font-bold text-lg">{step.id}</span>}
                                                        </div>
                                                        {index < ORCHESTRATION_STEPS.length - 1 && (
                                                            <div className={`w-0.5 h-16 my-2 transition-all duration-1000 ${
                                                                isCompleted ? 'bg-indigo-600/50' : 'bg-white/5'
                                                            }`}></div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Right Content */}
                                                    <div className={`flex-1 pb-16 transition-all duration-500 ${isCurrent ? 'transform translate-x-2' : ''}`}>
                                                        <div className={`glass-card p-6 rounded-2xl border transition-all duration-500 ${
                                                            isCurrent 
                                                                ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.1)]' 
                                                                : isCompleted 
                                                                    ? 'border-white/10 bg-white/5 opacity-80' 
                                                                    : 'border-transparent bg-transparent opacity-30'
                                                        }`}>
                                                            <h4 className={`font-display font-bold text-xl mb-1 ${
                                                                isCompleted ? 'text-white' : isCurrent ? 'text-indigo-300' : 'text-white/40'
                                                            }`}>
                                                                {step.name}
                                                            </h4>
                                                            <p className={`text-base ${
                                                                isCurrent ? 'text-indigo-200/70' : 'text-white/40'
                                                            }`}>
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Right Side: Terminal */}
                                    <div className="glass-card bg-aura-black/90 rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full min-h-[500px]">
                                        <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/50"></div>
                                                </div>
                                                <span className="text-xs font-mono text-white/40 ml-3">agent-terminal.exe</span>
                                            </div>
                                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                                                AURA Orchestrator
                                            </span>
                                        </div>
                                        <div ref={terminalRef} className="p-5 font-mono text-xs md:text-sm text-white/70 overflow-y-auto flex-1 flex flex-col gap-2 relative">
                                            {agentLogs.map((log, i) => (
                                                <div key={i} className={`whitespace-pre-wrap ${log.includes('Error') ? 'text-red-400' : log.includes('✓') ? 'text-emerald-400' : log.includes('>') ? 'text-indigo-300 font-bold mt-2' : ''}`}>
                                                    {log}
                                                </div>
                                            ))}
                                            <div className="flex items-center text-indigo-400 mt-2">
                                                <span className="animate-pulse">_</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeProject.marketResearch && !isGenerating) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <button onClick={() => navigate('/dashboard/research')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                                    <Folders className="w-7 h-7 text-indigo-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Market Research</h3>
                                <p className="text-white/50 text-sm leading-relaxed">View comprehensive market analysis & trends.</p>
                            </button>
                            
                            <button onClick={() => navigate('/dashboard/competitors')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                                    <Target className="w-7 h-7 text-purple-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Competitors</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Analyze market gaps & strategic positioning.</p>
                            </button>
                            
                            <button onClick={() => navigate('/dashboard/website')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                                    <LayoutTemplate className="w-7 h-7 text-blue-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Architecture</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Preview & export generated landing page UI.</p>
                            </button>
                            
                            <button onClick={() => navigate('/dashboard/marketing')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all">
                                    <Megaphone className="w-7 h-7 text-pink-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Marketing Kit</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Access ready-to-post social & growth content.</p>
                            </button>
                            
                            <button onClick={() => navigate('/dashboard/funding')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                                    <DollarSign className="w-7 h-7 text-emerald-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Capital</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Review curated funding & VC opportunities.</p>
                            </button>
                            
                            <button onClick={() => navigate('/dashboard/deployments')} className="group glass-card p-8 hover-lift text-left relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                                    <Settings className="w-7 h-7 text-amber-400" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Deploy</h3>
                                <p className="text-white/50 text-sm leading-relaxed">Configure webhooks & n8n integrations.</p>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="glass-card p-8 md:p-14 relative overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                    
                    <div className="relative z-10 mb-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Initialize Blueprint</h2>
                        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">Deploy specialized AI orchestrators to architect, research, and construct your next business venture from a single prompt.</p>
                    </div>

                    <form onSubmit={handleStartProject} className="space-y-6 relative z-10 max-w-3xl mx-auto">
                        <div className="glass-card p-1 bg-black/40 border-white/10 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300">
                            <div className="p-6">
                                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                    <Lightbulb className="w-4 h-4" /> Core Directive
                                </label>
                                <textarea
                                    required
                                    value={idea}
                                    onChange={e => setIdea(e.target.value)}
                                    placeholder="Describe the business concept, e.g., 'An AI-powered legal document analyzer for freelance developers...'"
                                    className="w-full bg-transparent border-0 text-white placeholder-white/20 text-lg focus:ring-0 resize-none p-0 focus:outline-none"
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card p-5 bg-black/40 border-white/10 focus-within:border-white/30 transition-all">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <Target className="w-3 h-3" /> Sector <span className="text-white/20 ml-1 font-normal">(Opt)</span>
                                </label>
                                <input
                                    type="text"
                                    value={industry}
                                    onChange={e => setIndustry(e.target.value)}
                                    placeholder="e.g. SaaS"
                                    className="w-full bg-transparent border-0 text-white placeholder-white/20 focus:ring-0 p-0 focus:outline-none"
                                />
                            </div>
                            <div className="glass-card p-5 bg-black/40 border-white/10 focus-within:border-white/30 transition-all">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <Users className="w-3 h-3" /> Audience <span className="text-white/20 ml-1 font-normal">(Opt)</span>
                                </label>
                                <input
                                    type="text"
                                    value={targetAudience}
                                    onChange={e => setTargetAudience(e.target.value)}
                                    placeholder="e.g. Developers"
                                    className="w-full bg-transparent border-0 text-white placeholder-white/20 focus:ring-0 p-0 focus:outline-none"
                                />
                            </div>
                            <div className="glass-card p-5 bg-black/40 border-white/10 focus-within:border-white/30 transition-all">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <MapPin className="w-3 h-3" /> Region <span className="text-white/20 ml-1 font-normal">(Opt)</span>
                                </label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="e.g. Global"
                                    className="w-full bg-transparent border-0 text-white placeholder-white/20 focus:ring-0 p-0 focus:outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!idea}
                            className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black mt-4"
                        >
                            <Rocket className="w-5 h-5" /> Execute Orchestrator
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

