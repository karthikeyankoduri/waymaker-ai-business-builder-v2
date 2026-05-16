import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../context/ProjectContext';
import { generateChatResponse } from '../../services/ai';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../../types';

export default function FloatingChatbot() {
    const { activeProject, updateProject, apiKey } = useProjects();
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeProject?.chatHistory, isOpen, isTyping]);

    if (!activeProject || !apiKey) return null;

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        };

        const updatedHistory = [...activeProject.chatHistory, userMessage];
        updateProject(activeProject.id, { chatHistory: updatedHistory });
        setInputText("");
        setIsTyping(true);

        const tempProject = { ...activeProject, chatHistory: updatedHistory };
        const result = await generateChatResponse(apiKey, tempProject, userMessage.content);

        const projectUpdates: any = {
            chatHistory: [...updatedHistory, result.message]
        };

        if (result.updates) {
            Object.assign(projectUpdates, result.updates);
        }

        updateProject(activeProject.id, projectUpdates);
        setIsTyping(false);
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
            {isOpen ? (
                <div className="glass-card w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] sm:h-[600px] max-h-[calc(100vh-6rem)] flex flex-col border border-slate-800 shadow-2xl scale-in">
                    <div className="p-4 bg-slate-900/95 rounded-t-xl border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-3 cursor-grab active:cursor-grabbing">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-white">Waymaker AI</h3>
                                <p className="text-xs text-slate-400">Project Assistant</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
                        {activeProject.chatHistory.length === 0 && (
                            <div className="text-center text-slate-400 mt-10 text-sm px-4">
                                <p className="mb-3">Ask me anything about <span className="text-indigo-400 font-medium">{activeProject.name}</span>!</p>
                                <p className="text-xs text-slate-500">I can help you with:</p>
                                <ul className="text-xs text-slate-500 mt-2 space-y-1 text-left max-w-xs mx-auto">
                                    <li>• Generate & tweak website designs</li>
                                    <li>• Analyze competitors & market research</li>
                                    <li>• Create marketing content</li>
                                    <li>• Find funding opportunities</li>
                                    <li>• <span className="text-indigo-400">Configure deployments (Vercel, Netlify, GitHub)</span></li>
                                    <li>• Check deployment status & history</li>
                                </ul>
                            </div>
                        )}
                        {activeProject.chatHistory.map((msg) => (
                            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''} max-w-[85%]`}>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-indigo-600 to-violet-600'}`}>
                                    {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <div className={`p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-slate-900/80 border border-slate-800 text-slate-200'}`}>
                                    <div className="prose prose-invert prose-sm prose-p:my-1 prose-headings:my-2 prose-a:text-indigo-400 max-w-none">
                                        <ReactMarkdown>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-2.5 max-w-[85%]">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-1">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-slate-900/95 rounded-b-xl border-t border-slate-800">
                        <form onSubmit={handleSend} className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                placeholder="Ask Waymaker AI..."
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-slate-500 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                >
                    <MessageSquare className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-950 animate-pulse" />
                </button>
            )}
        </motion.div>
    );
}
