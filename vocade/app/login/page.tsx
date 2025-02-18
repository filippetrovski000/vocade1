'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/utils/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { invoke, listen, openUrl, cancel } from '@/lib/tauri';

declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [port, setPort] = useState<number | null>(null);
  const router = useRouter();

  // Listen for OAuth callback
  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupOAuthListener = async () => {
      try {
        unlisten = await listen('oauth_callback', async (event: { payload: string }) => {
          try {
            const url = new URL(event.payload);
            const hashParams = new URLSearchParams(url.hash.substring(1));
            
            // Get access token from hash
            const accessToken = hashParams.get('access_token');
            if (!accessToken) {
              throw new Error('No access token found in URL');
            }

            // Set the session with the token
            console.log('Setting Supabase session...');
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: ''
            });

            if (error) throw error;
            if (!data.session) throw new Error('No session established');

            // Stop the OAuth server
            if (port) {
              try {
                await cancel(port);
                console.log('OAuth server stopped');
              } catch (err) {
                console.error('Error stopping OAuth server:', err);
              }
            }

            console.log('Session established, navigating...');
            router.push('/dashboard');
          } catch (err) {
            console.error('Error handling OAuth callback:', err);
            setError('Failed to complete authentication. Please try again.');
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.error('Error setting up OAuth listener:', err);
      }
    };

    setupOAuthListener();
    return () => {
      if (unlisten) unlisten();
      if (port) {
        cancel(port).catch(console.error);
      }
    };
  }, [router, port]);

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

      // Start the OAuth server
      const newPort = await invoke<number>('start_oauth_server');
      console.log('OAuth server started on port:', newPort);
      setPort(newPort);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: `http://localhost:${newPort}`,
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
      setIsLoading(false);
      // Clean up if error occurs
      if (port) {
        try {
          await cancel(port);
          setPort(null);
        } catch (cancelErr) {
          console.error('Error canceling OAuth server:', cancelErr);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-dark-1">
      <div className="mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vocade%20(1)-rDsBDORz5XtTDJo3dQO8kIODBBsN4O.png"
          alt="Vocade Logo"
          width={123}
          height={25}
          className="w-32 h-8"
        />
      </div>
      <p className="text-lg mb-8 text-gray-medium">Focus starts here.</p>
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center justify-center gap-2 bg-gray-dark-2 text-gray-white hover:bg-gray-dark-3 border-gray-dark-4"
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