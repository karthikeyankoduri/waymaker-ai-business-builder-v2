import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { motion } from 'framer-motion';

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      setError(null);
      await signInWithGoogle();
      // Navigation will happen automatically via useEffect
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aura-black text-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-aura-black text-white font-sans min-h-screen flex items-center justify-center relative overflow-hidden selection:bg-indigo-500/30 selection:text-white px-4">
      <div className="noise"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-aura-black to-aura-black"></div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Navigation / Top */}
        <div className="absolute -top-24 left-0 w-full flex justify-center pb-12 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center">
                  <span className="font-bold text-white text-xs">W</span>
              </div>
              <span className="text-xl font-display font-extrabold tracking-tighter">Waymaker.</span>
          </div>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8 mt-24">
          <h1 className="text-4xl font-display font-extrabold text-white mb-2 tracking-tight">
            Welcome Back.
          </h1>
          <p className="text-white/50 text-lg font-light tracking-wide">
            Your AI Co-Founder is waiting.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-[2rem] border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 space-y-6">
            {/* Features List */}
            <div className="space-y-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">AI-Powered Execution</p>
                  <p className="text-white/40 text-xs">Generate applications instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">Market Intelligence</p>
                  <p className="text-white/40 text-xs">Live web & competitor analysis</p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-bold py-4 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {signingIn ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-white/30 font-light mt-4">
              By continuing, you agree to our <a href="#" className="underline hover:text-white/60 transition-colors">Terms</a> and <a href="#" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/30 text-sm font-light">
            Need an account? <span className="text-white/60 font-medium">Just sign in to create one.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Made with Bob
