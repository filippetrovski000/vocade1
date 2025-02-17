'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import supabase from '@/lib/utils/supabase';

export default function AuthSuccess() {
  const [redirectFailed, setRedirectFailed] = useState(false);
  const attemptRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const openApp = useCallback(async () => {
    // Get the full URL hash (includes access_token and refresh_token)
    const hash = window.location.hash;
    
    if (!hash) {
      console.error('No hash parameters found');
      setRedirectFailed(true);
      return;
    }

    try {
      // Get user email from the session
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email;

      if (email) {
        // Generate magic link token
        const { data: magicData, error: magicError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
            data: {
              source: 'desktop_app'
            }
          }
        });

        if (magicError) {
          console.error('Error generating magic link:', magicError);
        } else {
          console.log('Magic link generated successfully');
        }

        // Create the deep link URL with auth parameters, email, and magic link token
        const hashParams = new URLSearchParams(hash.substring(1));
        const magicLinkToken = magicData?.user?.confirmation_sent_at 
          ? `&magic_token=${encodeURIComponent(magicData.user.confirmation_sent_at.toString())}`
          : '';
        
        const deepLinkUrl = `vocade://auth/callback${encodeURIComponent(hash + magicLinkToken)}`;
        console.log('Opening deep link:', deepLinkUrl);
        
        // Focus existing window if possible
        if (window.opener) {
          try {
            window.opener.focus();
          } catch (e) {
            console.error('Failed to focus opener window:', e);
          }
        }

        // Increment attempt counter
        attemptRef.current += 1;

        // Try to open the app
        window.location.href = deepLinkUrl;
        
        // Set up a fallback timer
        timeoutRef.current = setTimeout(() => {
          setRedirectFailed(true);
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to open deep link:', err);
      setRedirectFailed(true);
    }
  }, []);

  useEffect(() => {
    // Only try to open automatically on first load
    if (attemptRef.current === 0) {
      openApp();
    }

    // Set up auto-close timer
    const closeTimer = setTimeout(() => {
      window.close();
    }, 60000); // 60 seconds = 1 minute

    // Cleanup
    return () => {
      clearTimeout(closeTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [openApp]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-white p-6">
        <h1 className="text-2xl font-semibold">
          {redirectFailed ? 'Unable to Open App' : 'Return to App'}
        </h1>
        <p className="text-gray-300">
          {redirectFailed 
            ? 'Click the button below to try again'
            : 'Click "Open App" to finish logging in'}
        </p>
        <button
          onClick={openApp}
          className="mt-2 px-6 py-3 rounded-lg border border-white/20 bg-transparent hover:bg-white/10 transition-colors"
        >
          {redirectFailed ? 'Try Again' : 'Open App'}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          This window will automatically close after 1 minute
        </p>
      </div>
    </div>
  );
} 