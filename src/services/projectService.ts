import { collection, doc, setDoc, updateDoc, getDocs, getDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project } from '../types';

const COLLECTION_NAME = 'projects';

export const projectService = {
    async saveProject(project: Project): Promise<void> {
        try {
            const docRef = doc(db, COLLECTION_NAME, project.id);
            // setDoc will create or overwrite the document entirely (like upsert)
            await setDoc(docRef, {
                id: project.id,
                name: project.name,
                idea: project.idea,
                industry: project.industry || null,
                targetAudience: project.targetAudience || null,
                location: project.location || null,
                createdAt: project.createdAt,
                marketResearch: project.marketResearch || null,
                competitors: project.competitors || null,
                websiteCode: project.websiteCode || null,
                marketingKit: project.marketingKit || null,
                fundingOpportunities: project.fundingOpportunities || null,
                chatHistory: project.chatHistory || [],
            });
        } catch (error) {
            throw new Error(`Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
        try {
            const docRef = doc(db, COLLECTION_NAME, projectId);
            await updateDoc(docRef, updates);
        } catch (error) {
            throw new Error(`Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async getProjects(): Promise<Project[]> {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            
            const projects: Project[] = [];
            querySnapshot.forEach((doc) => {
                projects.push(doc.data() as Project);
            });
            
            return projects;
        } catch (error) {
            throw new Error(`Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async getProjectById(id: string): Promise<Project | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return docSnap.data() as Project;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Failed to fetch project: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async deleteProject(id: string): Promise<void> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await deleteDoc(docRef);
        } catch (error) {
            throw new Error(`Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
