export interface Project {
    id: string;
    name: string;
    idea: string;
    industry?: string;
    targetAudience?: string;
    location?: string;
    createdAt: string;
    marketResearch?: string;
    competitors?: Competitor[];
    websiteCode?: string;
    marketingKit?: MarketingPost[];
    fundingOpportunities?: FundingOpportunity[];
    chatHistory: ChatMessage[];
    webhookUrl?: string;
    zapierWebhookUrl?: string;
    competitorAnalytics?: any[];
    // New deployment fields
    deploymentConfig?: DeploymentConfig;
    deploymentHistory?: Deployment[];
    activeDeployment?: string;
}

export interface Competitor {
    name: string;
    strengths: string[];
    weaknesses: string[];
    gap: string;
}

export interface MarketingPost {
    platform: 'Instagram' | 'LinkedIn' | 'Twitter' | 'Facebook';
    content: string;
    hashtags: string[];
    imagePrompt: string;
}

export interface FundingOpportunity {
    type: string;
    name: string;
    amount: string;
    description: string;
    matchReason: string;
    link?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model'; // Google GenAI format uses 'user' | 'model'
    content: string;
    timestamp: string;
}

// Deployment Types
export type DeploymentPlatform = 'vercel' | 'netlify' | 'github';
export type DeploymentStatus = 'pending' | 'building' | 'ready' | 'error' | 'canceled';

export interface DeploymentConfig {
    vercel?: {
        apiToken: string;
        teamId?: string;
        projectId?: string;
    };
    netlify?: {
        apiToken: string;
        siteId?: string;
    };
    github?: {
        token: string;
        repo: string;
        branch?: string;
    };
    preferredPlatform?: DeploymentPlatform;
}

export interface Deployment {
    id: string;
    platform: DeploymentPlatform;
    status: DeploymentStatus;
    url?: string;
    previewUrl?: string;
    createdAt: string;
    completedAt?: string;
    error?: string;
    logs: DeploymentLog[];
    metadata: {
        projectName: string;
        htmlSize: number;
        buildTime?: number;
    };
}

export interface DeploymentLog {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
}

export interface DeploymentResult {
    deploymentId: string;
    url: string;
    status: DeploymentStatus;
    platform: DeploymentPlatform;
    timestamp: string;
}
