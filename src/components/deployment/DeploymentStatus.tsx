import React, { useEffect, useState } from 'react';
import { Deployment } from '../../types';
import { deploymentService } from '../../services/deploymentService';
import { 
    CheckCircle2, 
    XCircle, 
    Loader2, 
    Clock, 
    ExternalLink, 
    Copy, 
    RotateCcw,
    AlertCircle
} from 'lucide-react';

interface DeploymentStatusProps {
    deploymentId: string;
    onComplete?: (deployment: Deployment) => void;
}

export default function DeploymentStatus({ deploymentId, onComplete }: DeploymentStatusProps) {
    const [deployment, setDeployment] = useState<Deployment | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Initial fetch
        deploymentService.getDeploymentStatus(deploymentId).then(setDeployment);

        // Start polling for updates
        deploymentService.startPolling(deploymentId, (updatedDeployment) => {
            setDeployment(updatedDeployment);
            
            // Call onComplete when deployment finishes
            if (['ready', 'error', 'canceled'].includes(updatedDeployment.status) && onComplete) {
                onComplete(updatedDeployment);
            }
        });

        // Cleanup
        return () => {
            deploymentService.stopPolling(deploymentId);
        };
    }, [deploymentId, onComplete]);

    if (!deployment) {
        return (
            <div className="glass-card p-6 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                <span className="ml-3 text-slate-300">Loading deployment status...</span>
            </div>
        );
    }

    const getStatusIcon = () => {
        switch (deployment.status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-amber-400" />;
            case 'building':
                return <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />;
            case 'ready':
                return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-rose-400" />;
            case 'canceled':
                return <AlertCircle className="w-5 h-5 text-slate-400" />;
        }
    };

    const getStatusColor = () => {
        switch (deployment.status) {
            case 'pending':
                return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'building':
                return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
            case 'ready':
                return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'error':
                return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            case 'canceled':
                return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    const getStatusText = () => {
        switch (deployment.status) {
            case 'pending':
                return 'Queued';
            case 'building':
                return 'Building';
            case 'ready':
                return 'Deployed';
            case 'error':
                return 'Failed';
            case 'canceled':
                return 'Canceled';
        }
    };

    const getPlatformColor = () => {
        switch (deployment.platform) {
            case 'vercel':
                return 'bg-black text-white';
            case 'netlify':
                return 'bg-teal-500 text-white';
            case 'github':
                return 'bg-slate-800 text-white';
        }
    };

    const copyUrl = () => {
        if (deployment.url) {
            navigator.clipboard.writeText(deployment.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleRollback = async () => {
        if (confirm('Are you sure you want to rollback this deployment?')) {
            try {
                await deploymentService.rollback(deploymentId);
            } catch (error) {
                console.error('Rollback failed:', error);
                alert('Failed to rollback deployment');
            }
        }
    };

    return (
        <div className="glass-card p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {getStatusIcon()}
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{deployment.metadata.projectName}</h3>
                            <span className={`badge ${getPlatformColor()} text-xs px-2 py-1`}>
                                {deployment.platform}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400">
                            {new Date(deployment.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border ${getStatusColor()} font-medium`}>
                    {getStatusText()}
                </div>
            </div>

            {/* Progress Bar (only show during building) */}
            {deployment.status === 'building' && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Building project...</span>
                        <span className="text-indigo-400">In progress</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse" 
                             style={{ width: '60%' }} />
                    </div>
                </div>
            )}

            {/* Deployment URL */}
            {deployment.url && deployment.status === 'ready' && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Deployment URL</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={deployment.url}
                            readOnly
                            className="input-field flex-1 bg-slate-900/60"
                        />
                        <button
                            onClick={copyUrl}
                            className="btn-secondary p-3"
                            title="Copy URL"
                        >
                            {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <a
                            href={deployment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary p-3"
                            title="Open in new tab"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {deployment.error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-rose-400 mb-1">Deployment Failed</h4>
                            <p className="text-sm text-slate-300">{deployment.error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Deployment Logs */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Deployment Logs</label>
                <div className="bg-slate-900/60 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2 font-mono text-sm">
                    {deployment.logs.map((log, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <span className="text-slate-500 text-xs flex-shrink-0">
                                {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                            <span className={`flex-1 ${
                                log.level === 'error' ? 'text-rose-400' :
                                log.level === 'warn' ? 'text-amber-400' :
                                'text-slate-300'
                            }`}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                    <p className="text-sm text-slate-400">File Size</p>
                    <p className="text-lg font-semibold">
                        {(deployment.metadata.htmlSize / 1024).toFixed(2)} KB
                    </p>
                </div>
                {deployment.metadata.buildTime && (
                    <div>
                        <p className="text-sm text-slate-400">Build Time</p>
                        <p className="text-lg font-semibold">
                            {(deployment.metadata.buildTime / 1000).toFixed(1)}s
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            {deployment.status === 'error' && (
                <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                        onClick={handleRollback}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Rollback
                    </button>
                </div>
            )}
        </div>
    );
}

// Made with Bob
