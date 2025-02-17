'use client';

import { useEffect, useRef, useState } from 'react';

export default function AuthSuccess() {
  const [redirectFailed, setRedirectFailed] = useState(false);
  const attemptRef = useRef(0);

  const openApp = async () => {
    // Get parameters from both hash and search
    const hash = window.location.hash;
    const search = window.location.search;
    
    // If we have hash parameters, parse them
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        // Convert hash parameters to search parameters
        const params = new URLSearchParams();
        hashParams.forEach((value, key) => {
          params.append(key, value);
        });
        
        const deepLinkUrl = `vocade://auth/callback?${params.toString()}`;
        console.log('Opening deep link with hash params:', deepLinkUrl);
        
        try {
          window.location.href = deepLinkUrl;
          return;
        } catch (err) {
          console.error('Failed to open deep link with hash params:', err);
        }
      }
    }
    
    // If we have search parameters or hash failed, try search parameters
    if (search) {
      const deepLinkUrl = `vocade://auth/callback${search}`;
      console.log('Opening deep link with search params:', deepLinkUrl);
      
      try {
        window.location.href = deepLinkUrl;
        return;
      } catch (err) {
        console.error('Failed to open deep link with search params:', err);
      }
    }
    
    // If we get here, both attempts failed
    console.error('No valid parameters found in hash or search');
    setRedirectFailed(true);
  };

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
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-white p-6">
        <h1 className="text-2xl font-semibold">
          {redirectFailed ? 'Unable to Open App' : 'Redirecting to App...'}
        </h1>
        <p className="text-gray-300">
          {redirectFailed 
            ? 'Click the button below to try again'
            : 'If the app doesn\'t open automatically, click the button below'}
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