import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FloatingChatbot from '../chat/FloatingChatbot';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-aura-black text-slate-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-aura-black/90 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center">
                        <span className="font-bold text-white text-xs">W</span>
                    </div>
                    <span className="text-lg font-display font-extrabold tracking-tight text-white">Waymaker</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg">
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar container */}
            <div className={`fixed inset-y-0 left-0 z-30 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <main className="flex-1 overflow-y-auto relative z-10 p-4 pt-20 md:p-8 bg-aura-black w-full">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <FloatingChatbot />
        </div>
    );
}
