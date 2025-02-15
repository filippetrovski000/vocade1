'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/utils/supabase';
import { useDeepLinkAuth } from '@/hooks/useDeepLinkAuth';
import { openUrl } from '@tauri-apps/plugin-opener';

declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize deep link listener
  useDeepLinkAuth();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth-success'
            : 'https://your-domain.com/auth-success',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (!data?.url) throw new Error('No auth URL returned');
      
      // Handle URL opening based on environment
      if (typeof window !== 'undefined' && window.__TAURI__) {
        // In Tauri app, use the system browser
        await openUrl(data.url);
      } else {
        // In web browser
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        {/* Logo/App Name */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Vocade
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sign in to continue to your workspace
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Button */}
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full h-12 text-base flex items-center justify-center gap-3 border-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {/* Google Icon */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isLoading ? 'Connecting...' : 'Continue with Google'}
          </Button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-800 dark:hover:text-gray-200">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-gray-800 dark:hover:text-gray-200">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Version number */}
      <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
        Version 0.1.0
      </p>
    </div>
  );
} 