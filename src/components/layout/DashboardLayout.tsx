import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FloatingChatbot from '../chat/FloatingChatbot';

export default function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-aura-black text-slate-100 relative">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10 p-8 bg-aura-black">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <FloatingChatbot />
        </div>
    );
}
