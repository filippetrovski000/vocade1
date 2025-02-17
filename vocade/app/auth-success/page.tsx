'use client';

import { useEffect, useRef, useState } from 'react';

export default function AuthSuccess() {
  const [redirectFailed, setRedirectFailed] = useState(false);
  const attemptRef = useRef(0);

  const openApp = async () => {
    // Get the current URL's search params
    const urlParams = new URLSearchParams(window.location.search);

    // Check for error in the URL
    const error = urlParams.get('error');
    if (error) {
      console.error('Auth error:', error);
      setRedirectFailed(true);
      return;
    }

    // Get code from URL
    const code = urlParams.get('code');
    if (!code) {
      console.error('No authorization code found in URL');
      setRedirectFailed(true);
      return;
    }

    // Construct deep link URL with the code
    const deepLinkUrl = `vocade://auth/callback?code=${code}`;
    console.log('Opening deep link:', deepLinkUrl);

    try {
      window.location.href = deepLinkUrl;
    } catch (err) {
      console.error('Failed to open deep link:', err);
      setRedirectFailed(true);
    }
  };

  useEffect(() => {
    // Only try to open automatically on first load
    if (attemptRef.current === 0) {
      openApp();
    }
    attemptRef.current += 1;

    // Set up auto-close timer
    const closeTimer = setTimeout(() => {
      window.close();
    }, 60000); // 60 seconds = 1 minute

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