import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { deploymentService } from '../../services/deploymentService';
import DeploymentStatus from '../../components/deployment/DeploymentStatus';
import DeploymentHistory from '../../components/deployment/DeploymentHistory';
import { 
    LayoutTemplate, 
    AlertCircle, 
    Code, 
    Eye, 
    Download, 
    Zap, 
    Loader2, 
    CheckCircle2,
    Rocket,
    ChevronDown,
    History
} from 'lucide-react';
import { Deployment, DeploymentPlatform } from '../../types';

export default function WebsiteBuilder() {
    const { activeProject, updateProject } = useProjects();
    const [view, setView] = useState<'preview' | 'code' | 'deploy'>('preview');
    const [selectedPlatform, setSelectedPlatform] = useState<DeploymentPlatform>('vercel');
    const [isDeploying, setIsDeploying] = useState(false);
    const [currentDeploymentId, setCurrentDeploymentId] = useState<string | null>(null);
    const [showPlatformMenu, setShowPlatformMenu] = useState(false);

    // Legacy Zapier webhook state
    const [sendingState, setSendingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!activeProject) return null;

    const handleDeploy = async () => {
        if (!activeProject.websiteCode) return;

        // Check if platform is configured
        const config = activeProject.deploymentConfig;
        if (!config || !deploymentService.validateConfig(selectedPlatform, config)) {
            alert(`Please configure ${selectedPlatform} in the Deployments page first.`);
            return;
        }

        setIsDeploying(true);
        setView('deploy');

        try {
            const result = await deploymentService.deploy({
                platform: selectedPlatform,
                htmlContent: activeProject.websiteCode,
                projectName: activeProject.name,
                config
            });

            setCurrentDeploymentId(result.deploymentId);

            // Add to deployment history
            const deployment: Deployment = {
                id: result.deploymentId,
                platform: selectedPlatform,
                status: 'pending',
                createdAt: result.timestamp,
                logs: [],
                metadata: {
                    projectName: activeProject.name,
                    htmlSize: new Blob([activeProject.websiteCode]).size
                }
            };

            updateProject(activeProject.id, {
                deploymentHistory: [deployment, ...(activeProject.deploymentHistory || [])],
                activeDeployment: result.deploymentId
            });

        } catch (error) {
            console.error('Deployment error:', error);
            alert('Failed to start deployment. Please try again.');
            setIsDeploying(false);
        }
    };

    const handleDeploymentComplete = (deployment: Deployment) => {
        setIsDeploying(false);
        
        // Update deployment in history
        const updatedHistory = (activeProject.deploymentHistory || []).map(d =>
            d.id === deployment.id ? deployment : d
        );
        
        updateProject(activeProject.id, {
            deploymentHistory: updatedHistory,
            activeDeployment: deployment.status === 'ready' ? deployment.id : undefined
        });
    };

    const handleSendToZapier = async () => {
        if (!activeProject.zapierWebhookUrl) {
            alert('Please configure a Zapier Webhook URL in the Deployments tab first.');
            return;
        }

        setSendingState('loading');

        try {
            const payload = {
                projectName: activeProject.name,
                websiteCode: activeProject.websiteCode,
                timestamp: new Date().toISOString()
            };

            await fetch(activeProject.zapierWebhookUrl, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            setSendingState('success');
            setTimeout(() => setSendingState('idle'), 3000);
        } catch (error) {
            console.error('Zapier webhook error:', error);
            setSendingState('error');
            alert('Failed to send to Zapier webhook. Check console for details.');
            setTimeout(() => setSendingState('idle'), 3000);
        }
    };

    const downloadCode = () => {
        if (!activeProject.websiteCode) return;
        const blob = new Blob([activeProject.websiteCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `waymaker-${activeProject.name.replace(/\s+/g, '-').toLowerCase()}-landing.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getSafeHtml = (html: string) => {
        return `
            ${html}
            <script>
                document.addEventListener('click', function(e) {
                    const link = e.target.closest('a');
                    if (link && link.getAttribute('href') === '#') {
                        e.preventDefault();
                    } else if (link) {
                        e.preventDefault();
                    }
                });
                document.addEventListener('submit', function(e) {
                    e.preventDefault();
                });
            </script>
        `;
    };

    const getPlatformIcon = (platform: DeploymentPlatform) => {
        // In production, use actual platform logos
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 h-full flex flex-col pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg">
                        <LayoutTemplate className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Website Builder</h1>
                </div>

                {activeProject.websiteCode && (
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
                            <button
                                onClick={() => setView('preview')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    view === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <Eye className="w-4 h-4" /> Preview
                            </button>
                            <button
                                onClick={() => setView('code')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    view === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <Code className="w-4 h-4" /> Code
                            </button>
                            <button
                                onClick={() => setView('deploy')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    view === 'deploy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <History className="w-4 h-4" /> Deployments
                            </button>
                        </div>

                        {/* Deploy Button with Platform Selector */}
                        <div className="relative">
                            <button
                                onClick={handleDeploy}
                                disabled={isDeploying}
                                className="btn-primary flex items-center gap-2 pr-2"
                            >
                                {isDeploying ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deploying...
                                    </>
                                ) : (
                                    <>
                                        <Rocket className="w-4 h-4" />
                                        Deploy to {getPlatformIcon(selectedPlatform)}
                                    </>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowPlatformMenu(!showPlatformMenu);
                                    }}
                                    className="ml-1 p-1 hover:bg-white/10 rounded transition-colors"
                                    disabled={isDeploying}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </button>

                            {/* Platform Dropdown - Only Vercel for now */}
                            {showPlatformMenu && (
                                <div className="absolute right-0 mt-2 w-48 glass-card border border-white/10 rounded-xl overflow-hidden z-10">
                                    {(['vercel'] as DeploymentPlatform[]).map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={() => {
                                                setSelectedPlatform(platform);
                                                setShowPlatformMenu(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between ${
                                                selectedPlatform === platform ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300'
                                            }`}
                                        >
                                            <span className="font-medium">{getPlatformIcon(platform)}</span>
                                            {selectedPlatform === platform && (
                                                <CheckCircle2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Legacy Zapier Button */}
                        <button
                            onClick={handleSendToZapier}
                            disabled={sendingState === 'loading'}
                            className="btn-secondary flex items-center gap-2"
                            title="Send to Zapier"
                        >
                            {sendingState === 'loading' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : sendingState === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <Zap className="w-4 h-4" />
                            )}
                            {sendingState === 'success' ? 'Sent' : 'Zapier'}
                        </button>

                        {/* Download Button */}
                        <button
                            onClick={downloadCode}
                            className="btn-ghost p-3"
                            title="Download HTML"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            {!activeProject.websiteCode ? (
                <div className="glass-card p-12 text-center flex flex-col items-center border-dashed border-white/20 mt-8">
                    <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Not Generated Yet</h3>
                    <p className="text-slate-400">Go to the Overview tab to run the AI Orchestrator for this project.</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col mt-4 min-h-[600px]">
                    {view === 'preview' && (
                        <div className="flex-1 glass-card overflow-hidden border-white/10 flex flex-col">
                            <iframe
                                srcDoc={getSafeHtml(activeProject.websiteCode)}
                                className="w-full h-full bg-white flex-1 border-none"
                                title="Website Preview"
                                sandbox="allow-scripts"
                            />
                        </div>
                    )}

                    {view === 'code' && (
                        <div className="flex-1 glass-card overflow-hidden border-white/10 flex flex-col">
                            <div className="relative flex-1 bg-[#1e1e1e] overflow-auto">
                                <pre className="p-6 text-sm text-slate-300 leading-relaxed font-mono">
                                    <code>{activeProject.websiteCode}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    {view === 'deploy' && (
                        <div className="space-y-6">
                            {/* Current Deployment Status */}
                            {currentDeploymentId && (
                                <DeploymentStatus
                                    deploymentId={currentDeploymentId}
                                    onComplete={handleDeploymentComplete}
                                />
                            )}

                            {/* Deployment History */}
                            <DeploymentHistory
                                deployments={activeProject.deploymentHistory || []}
                                onViewDetails={(deployment) => {
                                    setCurrentDeploymentId(deployment.id);
                                }}
                                onRollback={async (deploymentId) => {
                                    if (confirm('Are you sure you want to rollback this deployment?')) {
                                        try {
                                            await deploymentService.rollback(deploymentId);
                                        } catch (error) {
                                            console.error('Rollback failed:', error);
                                            alert('Failed to rollback deployment');
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Made with Bob
