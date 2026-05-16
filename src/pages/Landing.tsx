import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
    const navigate = useNavigate();

    // Scroll reveal variants
    const revealVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="bg-aura-black text-white font-sans selection:bg-indigo-500/30 selection:text-white">
            <div className="noise"></div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-center">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="glass-card px-8 py-3 rounded-full flex items-center gap-12 border-white/10"
                >
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center">
                            <span className="font-bold text-white text-xs">W</span>
                        </div>
                        <span className="text-xl font-display font-extrabold tracking-tighter">Waymaker.</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#system" className="hover:text-white transition-colors">System</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                    <button onClick={() => navigate('/login')} className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all">
                        Get Started
                    </button>
                </motion.div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-aura-black to-aura-black"></div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-none"
                    >
                        <span className="gradient-text">Unfair Advantage.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed"
                    >
                        The AI business builder that does the heavy lifting. From idea to full-fledged execution in minutes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative inline-block group w-full max-w-4xl mx-auto mt-8"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative rounded-3xl border border-white/10 shadow-2xl bg-black/60 aspect-video overflow-hidden flex items-center justify-center backdrop-blur-xl animate-float">
                            {/* Abstract wireframe UI */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                            <div className="w-full h-full p-8 flex flex-col relative z-10">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="flex gap-6 h-full">
                                    <div className="w-64 shrink-0 rounded-2xl bg-white/5 border border-white/5 p-4 flex flex-col gap-4">
                                        <div className="w-full h-8 bg-indigo-500/20 rounded-md"></div>
                                        <div className="w-3/4 h-4 bg-white/10 rounded-md"></div>
                                        <div className="w-1/2 h-4 bg-white/10 rounded-md"></div>
                                        <div className="w-full h-24 bg-white/5 rounded-md mt-auto"></div>
                                    </div>
                                    <div className="flex-1 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                                        <div className="w-32 h-32 rounded-full bg-indigo-500/20 flex items-center justify-center mb-8 border border-indigo-500/30">
                                            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                        <div className="text-2xl font-display font-bold mb-2">Generating Business...</div>
                                        <div className="text-white/40">Market analysis at 100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Spec Cards */}
                        <div className="absolute -right-8 top-1/4 glass-card p-4 rounded-2xl hidden lg:block z-20">
                            <p className="text-xs text-indigo-400 font-bold mb-1 uppercase tracking-widest">Speed</p>
                            <p className="text-sm font-medium">Under 5 Minutes</p>
                        </div>
                        <div className="absolute -left-12 bottom-1/4 glass-card p-4 rounded-2xl hidden lg:block z-20">
                            <p className="text-xs text-purple-400 font-bold mb-1 uppercase tracking-widest">Output</p>
                            <p className="text-sm font-medium">Production Ready</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Specs Grid / Features */}
            <section id="features" className="py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={revealVariant}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4">Core Infrastructure.</h2>
                        <p className="text-white/50 text-xl max-w-2xl">Everything you need to go from an idea to a funded, fully operational business.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-full md:h-[600px]"
                    >
                        {/* Large Card */}
                        <motion.div variants={revealVariant} className="md:col-span-2 md:row-span-2 glass-card rounded-[2.5rem] p-10 flex flex-col justify-end group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 z-20">
                                <svg className="w-12 h-12 text-white/20 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>

                            {/* Abstract visual background */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>

                            <div className="relative z-20">
                                <h3 className="text-3xl font-display font-bold mb-4 text-white">Market Intelligence</h3>
                                <p className="text-white/60 text-lg max-w-md">Our custom AI doesn't just scrape—it analyzes competitors, calculates TAM/SAM/SOM, and finds your unique market positioning.</p>
                            </div>
                        </motion.div>

                        {/* Tall Card */}
                        <motion.div variants={revealVariant} className="md:col-span-1 md:row-span-2 glass-card rounded-[2.5rem] p-10 flex flex-col items-center text-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/30 relative z-10">
                                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Instant Code</h3>
                            <p className="text-white/50 relative z-10">Generate professional, responsive landing pages in modern frameworks. Export and deploy.</p>
                        </motion.div>

                        {/* Small Cards */}
                        <motion.div variants={revealVariant} className="md:col-span-1 glass-card rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                            <p className="text-4xl font-display font-black text-emerald-400 mb-2 relative z-10">Auto</p>
                            <p className="text-white/60 font-medium relative z-10">Marketing Kit</p>
                        </motion.div>
                        <motion.div variants={revealVariant} className="md:col-span-1 glass-card rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                            <p className="text-3xl font-display font-black text-blue-400 mb-2 relative z-10">100+</p>
                            <p className="text-white/60 font-medium relative z-10">Integrations</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* System OS Section */}
            <section id="system" className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={revealVariant}
                            className="flex-1 space-y-8"
                        >
                            <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold tracking-widest uppercase">The Engine</span>
                            <h2 className="text-5xl md:text-7xl font-display font-extrabold">WaymakerOS <br /><span className="text-white/30 italic">Pure Automation.</span></h2>
                            <p className="text-xl text-white/50 leading-relaxed">
                                We removed the friction. No endless configuration, no manual data entry. Our platform uses autonomous AI agents that chat with you, plan the strategy, and execute.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-white/80 font-medium">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
                                    </div>
                                    Conversational AI Assistant
                                </li>
                                <li className="flex items-center gap-4 text-white/80 font-medium">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
                                    </div>
                                    Webhook & n8n Sync
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1 w-full relative"
                        >
                            <div className="w-full aspect-[4/5] bg-gradient-to-br from-indigo-500/20 to-transparent rounded-[3rem] p-4">
                                <div className="w-full h-full bg-aura-dark rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
                                    {/* UI Simulation */}
                                    <div className="p-10 space-y-8 flex flex-col h-full">
                                        <div className="space-y-2">
                                            <div className="w-12 h-2 bg-white/20 rounded-full"></div>
                                            <div className="text-4xl font-display font-light text-white/40">Agent Terminal</div>
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <div className="glass-card p-5 rounded-2xl border-white/5 inline-block max-w-[85%]">
                                                <p className="text-white/80 text-sm">I've analyzed 15 direct competitors. You have a clear gap in the B2B enterprise segment.</p>
                                            </div>
                                            <div className="glass-card p-5 rounded-2xl border-indigo-500/30 bg-indigo-500/5 inline-block max-w-[85%] self-end ml-auto">
                                                <p className="text-indigo-300 text-sm">Should we generate the landing page targeting that segment?</p>
                                            </div>
                                            <div className="glass-card p-5 rounded-2xl border-white/5 inline-block max-w-[85%]">
                                                <p className="text-white/80 text-sm">Yes. Generating React components now...</p>
                                            </div>
                                        </div>
                                        <div className="h-14 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                                            <div className="w-full h-4 bg-white/10 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Quotes */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-16"
                    >
                        <motion.div variants={revealVariant} className="space-y-4">
                            <p className="text-3xl font-display font-bold italic leading-tight">"A massive leap forward for solo founders."</p>
                            <p className="text-white/40 font-mono text-sm">— Tech Innovators</p>
                        </motion.div>
                        <motion.div variants={revealVariant} className="space-y-4">
                            <p className="text-3xl font-display font-bold italic leading-tight">"From a vague prompt to a deployed site in under 5 mins."</p>
                            <p className="text-white/40 font-mono text-sm">— Startup Daily</p>
                        </motion.div>
                        <motion.div variants={revealVariant} className="space-y-4">
                            <p className="text-3xl font-display font-bold italic leading-tight">"The intelligence of a full agency, packed in software."</p>
                            <p className="text-white/40 font-mono text-sm">— Future of Work</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-display font-extrabold mb-6"
                        >
                            Access the <span className="text-indigo-400">Power.</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Tier 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="glass-card rounded-[2.5rem] p-10 flex flex-col hover:border-indigo-500/30"
                        >
                            <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Seed</p>
                            <h3 className="text-3xl font-display font-bold mb-4">Bootstrap</h3>
                            <div className="text-5xl font-extrabold mb-8">$0<span className="text-xl text-white/30 font-medium">/mo</span></div>
                            <ul className="space-y-4 mb-10 flex-1 text-white/70">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> 3 Projects Active</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Standard Intelligence</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Webhook Export</li>
                            </ul>
                            <button className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-bold hover:bg-white hover:text-black transition-all">Get Started</button>
                        </motion.div>

                        {/* Tier 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-[2.5rem] p-10 flex flex-col border-indigo-500 bg-indigo-900/10 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.5)]">Most Popular</div>
                            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Series A</p>
                            <h3 className="text-3xl font-display font-bold mb-4">Pro Builder</h3>
                            <div className="text-5xl font-extrabold mb-8">$49<span className="text-xl text-white/30 font-medium">/mo</span></div>
                            <ul className="space-y-4 mb-10 flex-1 text-white/80">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#6366f1]"></div> Unlimited Projects</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#6366f1]"></div> Deep Competitor Analysis</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#6366f1]"></div> React/Tailwind Export</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#6366f1]"></div> Advanced Integrations</li>
                            </ul>
                            <button className="w-full py-4 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all">Upgrade Now</button>
                        </motion.div>

                        {/* Tier 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="glass-card rounded-[2.5rem] p-10 flex flex-col hover:border-purple-500/30"
                        >
                            <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Unicorn</p>
                            <h3 className="text-3xl font-display font-bold mb-4">Enterprise</h3>
                            <div className="text-5xl font-extrabold mb-8">$249<span className="text-xl text-white/30 font-medium">/mo</span></div>
                            <ul className="space-y-4 mb-10 flex-1 text-white/70">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Custom Fine-Tuned Models</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Dedicated Agent Cluster</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> VC Matchmaking</li>
                            </ul>
                            <button className="w-full py-4 rounded-full bg-white/5 border border-white/10 font-bold hover:bg-white hover:text-black transition-all">Contact Sales</button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-40 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={revealVariant}
                    className="max-w-5xl mx-auto glass-card rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10"></div>
                    <h2 className="text-5xl md:text-8xl font-display font-black mb-8 relative z-10">Build the Future.</h2>
                    <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
                        Join the next generation of founders building smarter, faster, and stronger with AI.
                    </p>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-10 py-5 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-1">
                            Launch App Now
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
                            View Demo
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 relative z-10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center">
                                <span className="font-bold text-white text-xs">W</span>
                            </div>
                            <span className="text-2xl font-display font-extrabold tracking-tighter">Waymaker.</span>
                        </div>
                        <div className="flex gap-12 text-white/40 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-between text-white/20 text-xs font-mono">
                        <span>&copy; 2026 Waymaker Systems Inc.</span>
                        <span>SYSTEM_STATUS: ONLINE</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
