/**
 * Environment Variable Validation
 * Ensures all required API keys and configuration are present before app starts
 */

export const validateEnv = (): void => {
  const required = [
    'VITE_GROQ_API_KEY',
    'VITE_GEMINI_API_KEY',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  // Optional: Serper API key for web search (app will work without it)
  const optional = ['VITE_SERPER_API_KEY'];
  const missingOptional = optional.filter(key => !import.meta.env[key]);
  
  if (missingOptional.length > 0) {
    console.warn('⚠️ Optional environment variables missing:', missingOptional.join(', '));
    console.warn('Web search features may be limited without Serper API key');
  }
  
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    const errorMessage = `⚠️ Missing Required Environment Variables:\n\n${missing.join('\n')}\n\nPlease check your .env.local file and ensure all required variables are set.`;
    
    // Show user-friendly alert
    alert(errorMessage);
    
    // Log to console for debugging
    console.error('Missing environment variables:', missing);
    
    // Throw error to prevent app from starting
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  console.log('✅ All environment variables validated successfully');
};

/**
 * Get environment variable with fallback
 */
export const getEnv = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || fallback || '';
};

// Made with Bob
