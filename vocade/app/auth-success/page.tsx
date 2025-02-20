'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';

declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export default function AuthSuccess() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get the hash fragment from the URL
        const hash = window.location.hash;
        if (!hash) {
          throw new Error('No authentication data received');
        }

        // Parse the hash parameters
        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        
        if (!access_token) {
          throw new Error('No access token received');
        }

        // Set the session in Supabase
        await supabase.auth.setSession({
          access_token,
          refresh_token: refresh_token || '',
        });

        setStatus('success');
        
        if (window.__TAURI__) {
          // In desktop app, just close the window after success
          setTimeout(() => {
            window.close();
          }, 2000);
        } else {
          // In web app, redirect to dashboard after success
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } catch (err) {
        console.error('Auth success page error:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-dark-1">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-white p-6">
        {status === 'processing' && (
          <>
            <h1 className="text-2xl font-semibold">Processing Authentication</h1>
            <p className="text-gray-medium">Please wait while we complete your sign in...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-semibold">Authentication Successful!</h1>
            <p className="text-gray-medium">
              {window.__TAURI__ 
                ? 'You can return to the app now.'
                : 'Redirecting you to the dashboard...'}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              {window.__TAURI__
                ? 'This window will close automatically.'
                : 'Please wait while we redirect you.'}
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-semibold text-red-500">Authentication Error</h1>
            <p className="text-gray-medium">{error}</p>
            <button 
              onClick={() => window.__TAURI__ ? window.close() : router.push('/login')}
              className="mt-4 px-4 py-2 bg-gray-dark-2 hover:bg-gray-dark-3 rounded"
            >
              {window.__TAURI__ ? 'Close Window' : 'Back to Login'}
            </button>
          </>
        )}
      </div>
    </div>
  );
} 