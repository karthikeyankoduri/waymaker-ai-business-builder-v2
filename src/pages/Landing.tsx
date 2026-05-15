import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
    const navigate = useNavigate();

    // Scroll reveal variants
    const revealVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-slate-950 text-white font-sans selection:bg-indigo-500/30 selection:text-white">
            
            {/* Navigation */}
            <nav className="fixed w-full z-50 px-6 py-4 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="font-bold text-white text-sm">W</span>
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">Waymaker</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary">Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full text-sm font-medium text-indigo-400 mb-8"
                    >
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        AI-Powered Business Builder
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white"
                    >
                        Build Your Business<br/>
                        <span className="text-gradient">With AI Intelligence</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed"
                    >
                        From market research to website generation and marketing campaigns. Let AI handle the heavy lifting while you focus on your vision.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button onClick={() => navigate('/dashboard')} className="btn-primary px-8 py-4 text-base">
                            Get Started Free
                        </button>
                        <button className="btn-secondary px-8 py-4 text-base">
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
                        }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { stat: "0", label: "Code Required" },
                            { stat: "5min", label: "Setup Time" },
                            { stat: "24/7", label: "AI Support" },
                            { stat: "10x", label: "Faster Launch" }
                        ].map((item, i) => (
                            <motion.div key={i} variants={revealVariant} className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">{item.stat}</div>
                                <div className="text-sm text-slate-400">{item.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant} className="text-center mb-16">
                        <h2 className="text-sm font-semibold text-indigo-400 mb-4 uppercase tracking-wider">Features</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Everything You Need to Launch</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Comprehensive AI-powered tools to research, design, and market your business idea.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Market Research</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">AI-powered market analysis with competitor insights, TAM/SAM/SOM calculations, and positioning strategies.</p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-violet-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Website Generation</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Generate professional, responsive landing pages with Tailwind CSS. Export and deploy instantly.</p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Marketing Kit</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Platform-specific social media posts with hashtags, image prompts, and competitor analysis.</p>
                        </motion.div>

                        {/* Feature 4 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Funding Matcher</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Discover relevant grants, VCs, and accelerators matched to your business profile.</p>
                        </motion.div>

                        {/* Feature 5 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-amber-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Integrations</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Connect with n8n, Zapier, and other tools via webhooks for seamless automation.</p>
                        </motion.div>

                        {/* Feature 6 */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={revealVariant} className="glass-card p-8 hover-lift">
                            <div className="w-12 h-12 bg-violet-600/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white">AI Assistant</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Chat with AI about your project, get insights, and refine your strategy in real-time.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-24 bg-slate-900/50 overflow-hidden relative z-10 border-y border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant} className="relative">
                            <div className="absolute -inset-4 bg-[#00F0FF]/5 blur-[100px] rounded-full"></div>
                            <div className="relative rounded-[2rem] border border-white/10 shadow-2xl bg-black/50 aspect-square overflow-hidden flex items-center justify-center">
                                {/* Abstract wireframe block mimicking a UI screen */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                                <div className="w-3/4 h-3/4 border border-[#00F0FF]/30 rounded-xl bg-[#00F0FF]/5 p-6 flex flex-col gap-4 backdrop-blur-sm">
                                    <div className="w-full h-8 bg-white/10 rounded-md animate-pulse" />
                                    <div className="w-2/3 h-4 bg-white/5 rounded-md" />
                                    <div className="w-1/2 h-4 bg-white/5 rounded-md" />
                                    <div className="mt-auto w-full h-32 bg-[#7000FF]/20 rounded-md border border-[#7000FF]/30 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-[#7000FF] shadow-[0_0_20px_#7000FF] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Interactive Elements */}
                            <div className="absolute top-10 -right-4 md:-right-8 glass-card p-4 animate-float border-white/20 shadow-xl backdrop-blur-xl bg-black/80">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                                    <span className="text-sm font-mono tracking-tighter text-white">LLM_AGENT: ACTIVE</span>
                                </div>
                            </div>
                            <div className="absolute bottom-10 -left-4 md:-left-8 glass-card p-4 animate-float border-white/20 shadow-xl backdrop-blur-xl bg-black/80" style={{ animationDelay: '1.5s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]"></div>
                                    <span className="text-sm font-mono tracking-tighter text-white">SYSTEM_STABLE: 100%</span>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">How It Works</h2>
                            <ul className="space-y-6 mb-10">
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-600/20 flex shrink-0 items-center justify-center text-indigo-400 text-sm font-semibold">1</div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 text-white">Describe Your Idea</h5>
                                        <p className="text-slate-400">Tell us about your business concept, target audience, and industry.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-600/20 flex shrink-0 items-center justify-center text-indigo-400 text-sm font-semibold">2</div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 text-white">AI Generates Everything</h5>
                                        <p className="text-slate-400">Get market research, competitor analysis, website code, and marketing content in minutes.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="mt-1 w-8 h-8 rounded-lg bg-indigo-600/20 flex shrink-0 items-center justify-center text-indigo-400 text-sm font-semibold">3</div>
                                    <div>
                                        <h5 className="font-semibold text-lg mb-1 text-white">Launch & Grow</h5>
                                        <p className="text-slate-400">Deploy your website, share marketing content, and connect with funding opportunities.</p>
                                    </div>
                                </li>
                            </ul>
                            <button onClick={() => navigate('/dashboard')} className="btn-primary px-8 py-4 text-base">
                                Start Building Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Waymaker */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Why Choose Waymaker</h2>
                        <p className="text-xl text-slate-400 mb-16 leading-relaxed max-w-3xl mx-auto">
                            Focus on your vision while AI handles the execution. Launch faster, smarter, and more confidently.
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-8">
                            <h6 className="text-indigo-400 font-semibold mb-3 text-lg">Lightning Fast</h6>
                            <p className="text-sm text-slate-400 leading-relaxed">Generate complete business plans in minutes, not months. AI-powered speed without compromising quality.</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-8">
                            <h6 className="text-indigo-400 font-semibold mb-3 text-lg">Data-Driven</h6>
                            <p className="text-sm text-slate-400 leading-relaxed">Real market intelligence and competitor insights. Make informed decisions backed by AI analysis.</p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-8">
                            <h6 className="text-indigo-400 font-semibold mb-3 text-lg">Fully Integrated</h6>
                            <p className="text-sm text-slate-400 leading-relaxed">Connect with your favorite tools via webhooks. Seamless workflow automation from day one.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing / Tiers */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">Choose Your Entry Point</motion.h2>
                    <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="text-gray-400 text-lg">All modules include the Autonomous Marketing Kit and a lifetime core license.</motion.p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {/* Tier 1 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-10 border-white/5 hover:border-[#00F0FF]/30 transition-all group">
                        <div className="mb-8">
                            <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">The Seed</span>
                            <h3 className="text-3xl font-bold mt-2 text-white">Bootstrap</h3>
                        </div>
                        <div className="text-5xl font-bold mb-8 text-white">Free <span className="text-lg font-normal text-gray-500">/forever</span></div>
                        <ul className="space-y-4 mb-10 text-gray-400 text-sm">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> 3 Projects Active</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Standard Market Intelligence</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Basic CSS Generation</li>
                            <li className="flex items-center gap-3 text-white/20"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> Advanced Webhook Export</li>
                        </ul>
                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-bold group-hover:bg-white group-hover:text-black transition-all">START FREE</button>
                    </motion.div>

                    {/* Tier 2 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-12 border-[#00F0FF] border-2 relative md:scale-105 shadow-[0_0_50px_rgba(0,240,255,0.15)] group z-20 bg-[#0f0f0f]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00F0FF] text-black font-bold px-6 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.5)]">Most Popular</div>
                        <div className="mb-8">
                            <span className="text-[#00F0FF] font-mono text-sm uppercase tracking-widest">The Series A</span>
                            <h3 className="text-3xl font-bold mt-2 text-white">Pro Builder</h3>
                        </div>
                        <div className="text-5xl font-bold mb-8 text-white">$49 <span className="text-lg font-normal text-gray-500">/month</span></div>
                        <ul className="space-y-4 mb-10 text-gray-300 text-sm">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Unlimited Projects</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Competitor Deep-dives</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Full React/Tailwind Exports</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Full Webhook Integrations</li>
                        </ul>
                        <button className="w-full py-4 rounded-2xl bg-[#00F0FF] text-black font-bold hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300">UPGRADE TO PRO</button>
                    </motion.div>

                    {/* Tier 3 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant} className="glass-card p-10 border-white/5 hover:border-[#7000FF]/50 transition-all group">
                        <div className="mb-8">
                            <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">The Unicorn</span>
                            <h3 className="text-3xl font-bold mt-2 text-white">Enterprise</h3>
                        </div>
                        <div className="text-5xl font-bold mb-8 text-white">$249 <span className="text-lg font-normal text-gray-500">/month</span></div>
                        <ul className="space-y-4 mb-10 text-gray-400 text-sm">
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Custom Fine-Tuned Models</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> 24/7 CrewAI Cluster Access</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> VC Funding Matchmaking</li>
                            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-[#00F0FF]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Dedicated Solutions Engineer</li>
                        </ul>
                        <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-bold group-hover:bg-[#7000FF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all duration-300">CONTACT SALES</button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-8 h-8 bg-[#00F0FF] rounded-lg flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]">W</div>
                                <span className="font-mono text-2xl font-bold tracking-tighter uppercase text-white">Waymaker_Sys</span>
                            </div>
                            <p className="text-gray-500 max-w-xs mb-8 leading-relaxed">Powering the next generation of autonomous businesses. Engineered for builders.</p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full glass-card !rounded-full flex items-center justify-center hover:text-[#00F0FF] hover:border-[#00F0FF]/50 cursor-pointer transition-colors text-white">𝕏</div>
                                <div className="w-10 h-10 rounded-full glass-card !rounded-full flex items-center justify-center hover:text-[#00F0FF] hover:border-[#00F0FF]/50 cursor-pointer transition-colors text-white">IG</div>
                                <div className="w-10 h-10 rounded-full glass-card !rounded-full flex items-center justify-center hover:text-[#00F0FF] hover:border-[#00F0FF]/50 cursor-pointer transition-colors text-white">GH</div>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#00F0FF] font-mono">Navigation</h5>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Modules</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#00F0FF] font-mono">Support</h5>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-600 text-xs font-mono tracking-wider">© 2026 WAYMAKER SYSTEMS INC. ALL ALGORITHMS SECURED.</p>
                        <div className="flex gap-8 text-gray-600 text-xs uppercase tracking-tighter font-mono">
                            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
