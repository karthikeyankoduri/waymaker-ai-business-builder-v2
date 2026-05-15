import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { deploymentService } from '../../services/deploymentService';
import { 
    Settings, 
    Save, 
    Webhook, 
    CheckCircle2, 
    Zap, 
    Loader2,
    AlertCircle,
    Github,
    Globe
} from 'lucide-react';
import { DeploymentPlatform } from '../../types';

type PlatformTab = DeploymentPlatform | 'webhooks';

export default function Deployments() {
    const { activeProject, updateProject } = useProjects();
    const [activeTab, setActiveTab] = useState<PlatformTab>('vercel');
    
    // Platform configs
    const [vercelToken, setVercelToken] = useState('');
    const [vercelTeamId, setVercelTeamId] = useState('');
    const [vercelProjectId, setVercelProjectId] = useState('');
    
    const [netlifyToken, setNetlifyToken] = useState('');
    const [netlifySiteId, setNetlifySiteId] = useState('');
    
    const [githubToken, setGithubToken] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [githubBranch, setGithubBranch] = useState('gh-pages');
    
    // Legacy webhooks
    const [webhookUrl, setWebhookUrl] = useState('');
    const [zapierWebhookUrl, setZapierWebhookUrl] = useState('');
    
    // UI states
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [testingConnection, setTestingConnection] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    useEffect(() => {
        if (!activeProject) return;

        // Load deployment config
        const config = activeProject.deploymentConfig;
        if (config) {
            // Vercel
            setVercelToken(config.vercel?.apiToken || '');
            setVercelTeamId(config.vercel?.teamId || '');
            setVercelProjectId(config.vercel?.projectId || '');
            
            // Netlify
            setNetlifyToken(config.netlify?.apiToken || '');
            setNetlifySiteId(config.netlify?.siteId || '');
            
            // GitHub
            setGithubToken(config.github?.token || '');
            setGithubRepo(config.github?.repo || '');
            setGithubBranch(config.github?.branch || 'gh-pages');
        }

        // Load legacy webhooks
        setWebhookUrl(activeProject.webhookUrl || '');
        setZapierWebhookUrl(activeProject.zapierWebhookUrl || '');
    }, [activeProject]);

    if (!activeProject) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaved(false);

        await new Promise(resolve => setTimeout(resolve, 800));

        // Build deployment config
        const deploymentConfig = {
            vercel: vercelToken ? {
                apiToken: vercelToken,
                teamId: vercelTeamId || undefined,
                projectId: vercelProjectId || undefined
            } : undefined,
            netlify: netlifyToken ? {
                apiToken: netlifyToken,
                siteId: netlifySiteId || undefined
            } : undefined,
            github: githubToken && githubRepo ? {
                token: githubToken,
                repo: githubRepo,
                branch: githubBranch
            } : undefined,
            preferredPlatform: activeTab !== 'webhooks' ? activeTab as DeploymentPlatform : undefined
        };

        // Save to project
        updateProject(activeProject.id, {
            deploymentConfig,
            webhookUrl,
            zapierWebhookUrl
        });

        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleTestConnection = async () => {
        if (activeTab === 'webhooks') return;

        setTestingConnection(true);
        setConnectionStatus(null);

        const config = {
            vercel: vercelToken ? { apiToken: vercelToken, teamId: vercelTeamId, projectId: vercelProjectId } : undefined,
            netlify: netlifyToken ? { apiToken: netlifyToken, siteId: netlifySiteId } : undefined,
            github: githubToken && githubRepo ? { token: githubToken, repo: githubRepo, branch: githubBranch } : undefined
        };

        try {
            const result = await deploymentService.testConnection(activeTab as DeploymentPlatform, config);
            setConnectionStatus(result);
        } catch (error) {
            setConnectionStatus({
                success: false,
                message: 'Connection test failed. Please check your credentials.'
            });
        } finally {
            setTestingConnection(false);
        }
    };

    const renderPlatformConfig = () => {
        switch (activeTab) {
            case 'vercel':
                return (
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-300">
                                <p className="font-medium text-indigo-400 mb-1">How to get your Vercel API Token:</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                    <li>Go to <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Vercel Account Settings</a></li>
                                    <li>Click "Create Token" and give it a name</li>
                                    <li>Copy the token and paste it below</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                API Token <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="password"
                                value={vercelToken}
                                onChange={(e) => setVercelToken(e.target.value)}
                                placeholder="vercel_••••••••••••••••"
                                className="input-field w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Team ID <span className="text-slate-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={vercelTeamId}
                                onChange={(e) => setVercelTeamId(e.target.value)}
                                placeholder="team_••••••••••••••••"
                                className="input-field w-full"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Required if deploying to a team account
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Project ID <span className="text-slate-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={vercelProjectId}
                                onChange={(e) => setVercelProjectId(e.target.value)}
                                placeholder="prj_••••••••••••••••"
                                className="input-field w-full"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Link deployments to an existing Vercel project
                            </p>
                        </div>
                    </div>
                );

            case 'netlify':
                return (
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-300">
                                <p className="font-medium text-teal-400 mb-1">How to get your Netlify API Token:</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                    <li>Go to <a href="https://app.netlify.com/user/applications#personal-access-tokens" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Netlify User Settings</a></li>
                                    <li>Click "New access token"</li>
                                    <li>Give it a description and copy the token</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                API Token <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="password"
                                value={netlifyToken}
                                onChange={(e) => setNetlifyToken(e.target.value)}
                                placeholder="nfp_••••••••••••••••"
                                className="input-field w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Site ID <span className="text-slate-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={netlifySiteId}
                                onChange={(e) => setNetlifySiteId(e.target.value)}
                                placeholder="abc123-def456-ghi789"
                                className="input-field w-full"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Link deployments to an existing Netlify site
                            </p>
                        </div>
                    </div>
                );

            case 'github':
                return (
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-300">
                                <p className="font-medium text-slate-300 mb-1">How to get your GitHub Personal Access Token:</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                                    <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:underline">GitHub Settings → Developer settings</a></li>
                                    <li>Click "Generate new token (classic)"</li>
                                    <li>Select "repo" scope and generate</li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Personal Access Token <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="password"
                                value={githubToken}
                                onChange={(e) => setGithubToken(e.target.value)}
                                placeholder="ghp_••••••••••••••••"
                                className="input-field w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Repository <span className="text-rose-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={githubRepo}
                                onChange={(e) => setGithubRepo(e.target.value)}
                                placeholder="username/repository-name"
                                className="input-field w-full"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Format: username/repository-name
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Branch
                            </label>
                            <input
                                type="text"
                                value={githubBranch}
                                onChange={(e) => setGithubBranch(e.target.value)}
                                placeholder="gh-pages"
                                className="input-field w-full"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Default: gh-pages (GitHub Pages standard)
                            </p>
                        </div>
                    </div>
                );

            case 'webhooks':
                return (
                    <div className="space-y-8">
                        {/* n8n Webhook */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Webhook className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">n8n Webhook</h3>
                                    <p className="text-sm text-slate-400">For Marketing Kit automation</p>
                                </div>
                            </div>
                            <input
                                type="url"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                placeholder="https://your-n8n-instance.com/webhook-test/..."
                                className="input-field w-full"
                            />
                        </div>

                        {/* Zapier Webhook */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Zapier Webhook</h3>
                                    <p className="text-sm text-slate-400">Legacy website deployment</p>
                                </div>
                            </div>
                            <input
                                type="url"
                                value={zapierWebhookUrl}
                                onChange={(e) => setZapierWebhookUrl(e.target.value)}
                                placeholder="https://hooks.zapier.com/hooks/catch/..."
                                className="input-field w-full"
                            />
                        </div>
                    </div>
                );
        }
    };

    const getPlatformIcon = (platform: PlatformTab) => {
        switch (platform) {
            case 'vercel':
                return <Globe className="w-5 h-5" />;
            case 'netlify':
                return <Globe className="w-5 h-5" />;
            case 'github':
                return <Github className="w-5 h-5" />;
            case 'webhooks':
                return <Webhook className="w-5 h-5" />;
        }
    };

    const getPlatformColor = (platform: PlatformTab) => {
        switch (platform) {
            case 'vercel':
                return 'text-slate-100 bg-black';
            case 'netlify':
                return 'text-white bg-teal-500';
            case 'github':
                return 'text-white bg-slate-800';
            case 'webhooks':
                return 'text-emerald-400 bg-emerald-500/10';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-20">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Deployments & Integrations</h1>
            </div>

            {/* Platform Tabs */}
            <div className="flex gap-2 p-1 bg-slate-900/80 rounded-xl border border-white/10">
                {(['vercel', 'netlify', 'github', 'webhooks'] as PlatformTab[]).map((platform) => (
                    <button
                        key={platform}
                        onClick={() => setActiveTab(platform)}
                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                            activeTab === platform
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                    >
                        {getPlatformIcon(platform)}
                        <span className="capitalize">{platform}</span>
                    </button>
                ))}
            </div>

            {/* Configuration Form */}
            <form onSubmit={handleSave} className="glass-card p-8 space-y-6">
                {renderPlatformConfig()}

                {/* Connection Status */}
                {connectionStatus && (
                    <div className={`flex items-start gap-3 p-4 rounded-lg border ${
                        connectionStatus.success
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-rose-500/10 border-rose-500/20'
                    }`}>
                        {connectionStatus.success ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                        )}
                        <p className={`text-sm ${connectionStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {connectionStatus.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    {activeTab !== 'webhooks' && (
                        <button
                            type="button"
                            onClick={handleTestConnection}
                            disabled={testingConnection}
                            className="btn-secondary flex items-center gap-2"
                        >
                            {testingConnection ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Test Connection
                                </>
                            )}
                        </button>
                    )}
                    
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn-primary flex items-center gap-2 ml-auto"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Configuration
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Made with Bob
