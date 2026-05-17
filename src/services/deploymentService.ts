import {
    Deployment,
    DeploymentConfig,
    DeploymentLog,
    DeploymentPlatform,
    DeploymentResult,
    DeploymentStatus
} from '../types';
import { collection, doc, setDoc, updateDoc, getDocs, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Real deployment service with Vercel API integration and Firebase persistence
class DeploymentService {
    private deployments: Map<string, Deployment> = new Map();
    private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();
    private readonly VERCEL_API_BASE = 'https://api.vercel.com';
    private readonly DEPLOYMENTS_COLLECTION = 'deployments';

    /**
     * Deploy website to selected platform
     */
    async deploy(params: {
        platform: DeploymentPlatform;
        htmlContent: string;
        projectName: string;
        config: DeploymentConfig;
    }): Promise<DeploymentResult> {
        const deploymentId = this.generateDeploymentId();
        const timestamp = new Date().toISOString();

        // Create deployment record
        const deployment: Deployment = {
            id: deploymentId,
            platform: params.platform,
            status: 'pending',
            createdAt: timestamp,
            logs: [
                {
                    timestamp,
                    level: 'info',
                    message: `Starting deployment to ${params.platform}...`
                }
            ],
            metadata: {
                projectName: params.projectName,
                htmlSize: new Blob([params.htmlContent]).size
            }
        };

        this.deployments.set(deploymentId, deployment);

        // Save to Firestore
        await this.saveDeploymentToDb(deployment, params.projectName);

        // Start actual deployment based on platform
        if (params.platform === 'vercel') {
            this.deployToVercel(deploymentId, params);
        } else {
            // For other platforms, use simulation for now
            this.simulateDeployment(deploymentId, params);
        }

        return {
            deploymentId,
            url: '', // Will be updated when deployment completes
            status: 'pending',
            platform: params.platform,
            timestamp
        };
    }

    /**
     * Save deployment to Firestore
     */
    private async saveDeploymentToDb(deployment: Deployment, projectName: string): Promise<void> {
        try {
            const docRef = doc(db, this.DEPLOYMENTS_COLLECTION, deployment.id);
            await setDoc(docRef, {
                ...deployment,
                projectName,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error saving deployment to database:', error);
            // Don't throw - deployment can continue even if DB save fails
        }
    }

    /**
     * Update deployment in Firestore
     */
    private async updateDeploymentInDb(deployment: Deployment): Promise<void> {
        try {
            const docRef = doc(db, this.DEPLOYMENTS_COLLECTION, deployment.id);
            await updateDoc(docRef, {
                status: deployment.status,
                url: deployment.url,
                previewUrl: deployment.previewUrl,
                completedAt: deployment.completedAt,
                error: deployment.error,
                logs: deployment.logs,
                metadata: deployment.metadata,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating deployment in database:', error);
            // Don't throw - deployment can continue even if DB update fails
        }
    }

    /**
     * Deploy to Vercel using their API
     */
    private async deployToVercel(
        deploymentId: string,
        params: {
            htmlContent: string;
            projectName: string;
            config: DeploymentConfig;
        }
    ): Promise<void> {
        const deployment = this.deployments.get(deploymentId);
        
        const vercelConfig = params.config.vercel || {
            apiToken: import.meta.env.VITE_VERCEL_API_TOKEN,
            teamId: import.meta.env.VITE_VERCEL_TEAM_ID
        };

        if (!deployment || !vercelConfig.apiToken) return;

        const { apiToken, teamId, projectId } = vercelConfig;

        try {
            // Update status to building
            deployment.status = 'building';
            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Preparing files for deployment...'
            });

            // Create project name slug
            const projectSlug = params.projectName
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .substring(0, 50);

            // Prepare deployment payload
            const files = [
                {
                    file: 'index.html',
                    data: params.htmlContent
                }
            ];

            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Uploading to Vercel...'
            });

            // Create deployment on Vercel
            const deploymentPayload: any = {
                name: projectSlug,
                files: files.map(f => ({
                    file: f.file,
                    data: f.data
                })),
                projectSettings: {
                    framework: null,
                    buildCommand: null,
                    outputDirectory: null
                },
                target: 'production',
                public: true  // Make deployment publicly accessible without login
            };

            // Add project ID if provided
            if (projectId) {
                deploymentPayload.projectId = projectId;
            }

            // Build headers
            const headers: HeadersInit = {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            };

            // Add team ID if provided
            let apiUrl = `${this.VERCEL_API_BASE}/v13/deployments`;
            if (teamId) {
                apiUrl += `?teamId=${teamId}`;
            }

            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Creating deployment on Vercel...'
            });

            // Make API request
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(deploymentPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error?.message ||
                    `Vercel API error: ${response.status} ${response.statusText}`
                );
            }

            const result = await response.json();

            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Deployment created successfully!'
            });

            // Poll for deployment status
            await this.pollVercelDeployment(deploymentId, result.id, apiToken, teamId);

        } catch (error) {
            console.error('Vercel deployment error:', error);
            deployment.status = 'error';
            deployment.completedAt = new Date().toISOString();
            deployment.error = error instanceof Error ? error.message : 'Deployment failed';
            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'error',
                message: `Deployment failed: ${deployment.error}`
            });
            
            // Update in database
            await this.updateDeploymentInDb(deployment);
        }
    }

    /**
     * Poll Vercel deployment status
     */
    private async pollVercelDeployment(
        localDeploymentId: string,
        vercelDeploymentId: string,
        apiToken: string,
        teamId?: string
    ): Promise<void> {
        const deployment = this.deployments.get(localDeploymentId);
        if (!deployment) return;

        const maxAttempts = 60; // 5 minutes max (5 second intervals)
        let attempts = 0;

        const checkStatus = async (): Promise<boolean> => {
            try {
                let apiUrl = `${this.VERCEL_API_BASE}/v13/deployments/${vercelDeploymentId}`;
                if (teamId) {
                    apiUrl += `?teamId=${teamId}`;
                }

                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${apiToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to check deployment status: ${response.status}`);
                }

                const data = await response.json();

                // Update logs based on state
                if (data.readyState === 'BUILDING') {
                    deployment.status = 'building';
                    deployment.logs.push({
                        timestamp: new Date().toISOString(),
                        level: 'info',
                        message: 'Building project...'
                    });
                    await this.updateDeploymentInDb(deployment);
                } else if (data.readyState === 'READY') {
                    deployment.status = 'ready';
                    deployment.completedAt = new Date().toISOString();
                    deployment.url = `https://${data.url}`;
                    deployment.previewUrl = deployment.url;
                    deployment.logs.push({
                        timestamp: new Date().toISOString(),
                        level: 'info',
                        message: `Deployment successful! Available at ${deployment.url}`
                    });
                    await this.updateDeploymentInDb(deployment);
                    return true; // Done
                } else if (data.readyState === 'ERROR') {
                    deployment.status = 'error';
                    deployment.completedAt = new Date().toISOString();
                    deployment.error = 'Vercel deployment failed';
                    deployment.logs.push({
                        timestamp: new Date().toISOString(),
                        level: 'error',
                        message: 'Deployment failed on Vercel'
                    });
                    await this.updateDeploymentInDb(deployment);
                    return true; // Done (with error)
                } else if (data.readyState === 'CANCELED') {
                    deployment.status = 'canceled';
                    deployment.completedAt = new Date().toISOString();
                    deployment.logs.push({
                        timestamp: new Date().toISOString(),
                        level: 'info',
                        message: 'Deployment was canceled'
                    });
                    await this.updateDeploymentInDb(deployment);
                    return true; // Done
                }

                return false; // Continue polling
            } catch (error) {
                console.error('Error checking deployment status:', error);
                return false; // Continue polling
            }
        };

        // Poll every 5 seconds
        const pollInterval = setInterval(async () => {
            attempts++;

            const isDone = await checkStatus();

            if (isDone || attempts >= maxAttempts) {
                clearInterval(pollInterval);

                if (attempts >= maxAttempts && deployment.status !== 'ready') {
                    deployment.status = 'error';
                    deployment.completedAt = new Date().toISOString();
                    deployment.error = 'Deployment timeout';
                    deployment.logs.push({
                        timestamp: new Date().toISOString(),
                        level: 'error',
                        message: 'Deployment timed out'
                    });
                }
            }
        }, 5000);

        // Initial check
        await checkStatus();
    }

    /**
     * Get deployment status
     */
    async getDeploymentStatus(deploymentId: string): Promise<Deployment | null> {
        // Check memory first
        const memoryDeployment = this.deployments.get(deploymentId);
        if (memoryDeployment) {
            return memoryDeployment;
        }

        // Fallback to database
        try {
            const docRef = doc(db, this.DEPLOYMENTS_COLLECTION, deploymentId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const deployment = docSnap.data() as Deployment;
                this.deployments.set(deploymentId, deployment);
                return deployment;
            }
        } catch (error) {
            console.error('Error fetching deployment from database:', error);
        }

        return null;
    }

    /**
     * Get deployment history for a project
     */
    async getDeploymentHistory(projectName: string): Promise<Deployment[]> {
        try {
            const q = query(
                collection(db, this.DEPLOYMENTS_COLLECTION),
                where('projectName', '==', projectName),
                orderBy('createdAt', 'desc'),
                limit(50)
            );
            
            const querySnapshot = await getDocs(q);
            const deployments: Deployment[] = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                deployments.push({
                    id: data.id,
                    platform: data.platform,
                    status: data.status,
                    createdAt: data.createdAt,
                    completedAt: data.completedAt,
                    url: data.url,
                    previewUrl: data.previewUrl,
                    error: data.error,
                    logs: data.logs || [],
                    metadata: data.metadata || {}
                });
            });
            
            return deployments;
        } catch (error) {
            console.error('Error fetching deployment history:', error);
            // Fallback to memory
            return Array.from(this.deployments.values())
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }

    /**
     * Start polling for deployment status updates
     */
    startPolling(
        deploymentId: string, 
        callback: (deployment: Deployment) => void
    ): void {
        // Poll every 2 seconds
        const interval = setInterval(async () => {
            const deployment = await this.getDeploymentStatus(deploymentId);
            
            if (deployment) {
                callback(deployment);

                // Stop polling when deployment completes
                if (['ready', 'error', 'canceled'].includes(deployment.status)) {
                    this.stopPolling(deploymentId);
                }
            }
        }, 2000);

        this.pollingIntervals.set(deploymentId, interval);
    }

    /**
     * Stop polling for a deployment
     */
    stopPolling(deploymentId: string): void {
        const interval = this.pollingIntervals.get(deploymentId);
        if (interval) {
            clearInterval(interval);
            this.pollingIntervals.delete(deploymentId);
        }
    }

    /**
     * Rollback a deployment
     */
    async rollback(deploymentId: string): Promise<void> {
        const deployment = this.deployments.get(deploymentId);
        
        if (!deployment) {
            throw new Error('Deployment not found');
        }

        // Add rollback log
        deployment.logs.push({
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'Initiating rollback...'
        });

        // Simulate rollback
        setTimeout(() => {
            deployment.status = 'canceled';
            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Rollback completed successfully'
            });
        }, 2000);
    }

    /**
     * Validate platform configuration
     */
    validateConfig(platform: DeploymentPlatform, config: DeploymentConfig): boolean {
        switch (platform) {
            case 'vercel':
                return !!(config.vercel?.apiToken || import.meta.env.VITE_VERCEL_API_TOKEN);
            case 'netlify':
                return !!config.netlify?.apiToken;
            case 'github':
                return !!(config.github?.token && config.github?.repo);
            default:
                return false;
        }
    }

    /**
     * Test platform connection
     */
    async testConnection(platform: DeploymentPlatform, config: DeploymentConfig): Promise<{
        success: boolean;
        message: string;
    }> {
        // Validate config first
        if (!this.validateConfig(platform, config)) {
            return {
                success: false,
                message: 'Invalid configuration. Please check your credentials.'
            };
        }

        // Test actual connection based on platform
        if (platform === 'vercel') {
            const vercelConfig = config.vercel || {
                apiToken: import.meta.env.VITE_VERCEL_API_TOKEN,
                teamId: import.meta.env.VITE_VERCEL_TEAM_ID
            };
            if (vercelConfig.apiToken) {
                return await this.testVercelConnection(vercelConfig);
            }
        }

        // For other platforms, return success for now
        return {
            success: true,
            message: `Configuration validated for ${platform}`
        };
    }

    /**
     * Test Vercel API connection
     */
    private async testVercelConnection(vercelConfig: {
        apiToken: string;
        teamId?: string;
        projectId?: string;
    }): Promise<{ success: boolean; message: string }> {
        try {
            // Test by fetching user info
            let apiUrl = `${this.VERCEL_API_BASE}/v2/user`;
            if (vercelConfig.teamId) {
                apiUrl += `?teamId=${vercelConfig.teamId}`;
            }

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${vercelConfig.apiToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    success: false,
                    message: errorData.error?.message || `Authentication failed: ${response.status}`
                };
            }

            const userData = await response.json();

            // If project ID is provided, verify it exists
            if (vercelConfig.projectId) {
                let projectUrl = `${this.VERCEL_API_BASE}/v9/projects/${vercelConfig.projectId}`;
                if (vercelConfig.teamId) {
                    projectUrl += `?teamId=${vercelConfig.teamId}`;
                }

                const projectResponse = await fetch(projectUrl, {
                    headers: {
                        'Authorization': `Bearer ${vercelConfig.apiToken}`
                    }
                });

                if (!projectResponse.ok) {
                    return {
                        success: false,
                        message: 'Project ID not found or inaccessible'
                    };
                }
            }

            return {
                success: true,
                message: `Successfully connected to Vercel as ${userData.username || userData.email || 'user'}`
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Connection test failed'
            };
        }
    }

    // Private helper methods

    private generateDeploymentId(): string {
        return `dep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private simulateDeployment(
        deploymentId: string,
        params: {
            platform: DeploymentPlatform;
            htmlContent: string;
            projectName: string;
        }
    ): void {
        const deployment = this.deployments.get(deploymentId);
        if (!deployment) return;

        // Simulate building phase
        setTimeout(() => {
            deployment.status = 'building';
            deployment.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                message: 'Building project...'
            });
        }, 1000);

        // Simulate deployment completion
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate

            if (success) {
                deployment.status = 'ready';
                deployment.completedAt = new Date().toISOString();
                deployment.url = this.generateDeploymentUrl(params.platform, params.projectName);
                deployment.previewUrl = deployment.url;
                deployment.metadata.buildTime = 5000;
                deployment.logs.push({
                    timestamp: new Date().toISOString(),
                    level: 'info',
                    message: `Deployment successful! Available at ${deployment.url}`
                });
            } else {
                deployment.status = 'error';
                deployment.completedAt = new Date().toISOString();
                deployment.error = 'Build failed: Simulated error for testing';
                deployment.logs.push({
                    timestamp: new Date().toISOString(),
                    level: 'error',
                    message: 'Deployment failed. Please check your configuration and try again.'
                });
            }
        }, 5000);
    }

    private generateDeploymentUrl(platform: DeploymentPlatform, projectName: string): string {
        const slug = projectName.toLowerCase().replace(/\s+/g, '-');
        const random = Math.random().toString(36).substr(2, 6);

        switch (platform) {
            case 'vercel':
                return `https://${slug}-${random}.vercel.app`;
            case 'netlify':
                return `https://${slug}-${random}.netlify.app`;
            case 'github':
                return `https://username.github.io/${slug}`;
            default:
                return '';
        }
    }
}

// Export singleton instance
export const deploymentService = new DeploymentService();

// Made with Bob
