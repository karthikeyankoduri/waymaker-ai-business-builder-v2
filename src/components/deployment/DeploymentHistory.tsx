import React from 'react';
import { Deployment, DeploymentPlatform } from '../../types';
import { 
    CheckCircle2, 
    XCircle, 
    Clock, 
    ExternalLink, 
    RotateCcw,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface DeploymentHistoryProps {
    deployments: Deployment[];
    onViewDetails?: (deployment: Deployment) => void;
    onRollback?: (deploymentId: string) => void;
}

export default function DeploymentHistory({ 
    deployments, 
    onViewDetails,
    onRollback 
}: DeploymentHistoryProps) {
    const getStatusIcon = (status: Deployment['status']) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4 text-amber-400" />;
            case 'building':
                return <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />;
            case 'ready':
                return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-rose-400" />;
            case 'canceled':
                return <AlertCircle className="w-4 h-4 text-slate-400" />;
        }
    };

    const getStatusBadge = (status: Deployment['status']) => {
        switch (status) {
            case 'pending':
                return 'badge-warning';
            case 'building':
                return 'badge-info';
            case 'ready':
                return 'badge-success';
            case 'error':
                return 'badge-error';
            case 'canceled':
                return 'badge-neutral';
        }
    };

    const getPlatformBadge = (platform: DeploymentPlatform) => {
        switch (platform) {
            case 'vercel':
                return 'bg-black text-white';
            case 'netlify':
                return 'bg-teal-500 text-white';
            case 'github':
                return 'bg-slate-800 text-white';
        }
    };

    const formatDuration = (createdAt: string, completedAt?: string) => {
        if (!completedAt) return 'In progress';
        
        const duration = new Date(completedAt).getTime() - new Date(createdAt).getTime();
        const seconds = Math.floor(duration / 1000);
        
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ${seconds % 60}s`;
    };

    const formatRelativeTime = (timestamp: string) => {
        const now = new Date().getTime();
        const time = new Date(timestamp).getTime();
        const diff = now - time;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (deployments.length === 0) {
        return (
            <div className="glass-card p-12 text-center">
                <Clock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Deployments Yet</h3>
                <p className="text-slate-400">
                    Deploy your website to see deployment history here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Deployment History</h3>
                <span className="text-sm text-slate-400">
                    {deployments.length} {deployments.length === 1 ? 'deployment' : 'deployments'}
                </span>
            </div>

            <div className="space-y-3">
                {deployments.map((deployment) => (
                    <div
                        key={deployment.id}
                        className="glass-card p-4 hover-lift cursor-pointer transition-all"
                        onClick={() => onViewDetails?.(deployment)}
                    >
                        <div className="flex items-start justify-between gap-4">
                            {/* Left side - Status and Info */}
                            <div className="flex items-start gap-3 flex-1">
                                <div className="mt-1">
                                    {getStatusIcon(deployment.status)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold truncate">
                                            {deployment.metadata.projectName}
                                        </h4>
                                        <span className={`badge ${getPlatformBadge(deployment.platform)} text-xs px-2 py-0.5`}>
                                            {deployment.platform}
                                        </span>
                                        <span className={`badge ${getStatusBadge(deployment.status)} text-xs px-2 py-0.5`}>
                                            {deployment.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                        <span>{formatRelativeTime(deployment.createdAt)}</span>
                                        <span>•</span>
                                        <span>{formatDuration(deployment.createdAt, deployment.completedAt)}</span>
                                        <span>•</span>
                                        <span>{(deployment.metadata.htmlSize / 1024).toFixed(2)} KB</span>
                                    </div>

                                    {deployment.url && deployment.status === 'ready' && (
                                        <a
                                            href={deployment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 mt-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="truncate max-w-xs">{deployment.url}</span>
                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                        </a>
                                    )}

                                    {deployment.error && (
                                        <p className="text-sm text-rose-400 mt-2 line-clamp-1">
                                            {deployment.error}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right side - Actions */}
                            <div className="flex items-center gap-2">
                                {deployment.status === 'error' && onRollback && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRollback(deployment.id);
                                        }}
                                        className="btn-ghost p-2"
                                        title="Rollback"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Made with Bob
