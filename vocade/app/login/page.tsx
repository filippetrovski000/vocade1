'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/utils/supabase';
import { useDeepLinkAuth } from '@/hooks/useDeepLinkAuth';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Initialize deep link listener
  useDeepLinkAuth();

  // Check if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Current session:', session ? 'Found' : 'None');
        if (session) {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Error checking session:', err);
      }
    };
    
    checkSession();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: process.env.NODE_ENV === 'development'
            ? process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL_DEV
            : process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
          queryParams: {
            access_type: 'online',
            prompt: 'consent',
            response_type: 'token'
          },
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No auth URL returned');
      
      console.log('Opening auth URL in browser:', data.url);
      
      if (process.env.NODE_ENV === 'development') {
        window.location.href = data.url;
      } else {
        await openUrl(data.url);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Vocade</h1>
      </div>
      <p className="text-lg mb-8 text-muted-foreground">Focus starts here.</p>
      {error && <p className="text-sm text-destructive mb-4">{error}</p>}
      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
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
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </Button>
    </div>
  );
} 