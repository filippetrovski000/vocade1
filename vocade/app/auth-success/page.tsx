'use client';

import { useEffect, useState } from 'react';

export default function AuthSuccess() {
  const [attempts, setAttempts] = useState(0);

  const openApp = () => {
    // Get the full URL hash (includes access_token and refresh_token)
    const hash = window.location.hash;
    
    if (!hash) {
      console.error('No hash parameters found');
      return;
    }

    // Remove the leading # and create URLSearchParams
    const params = new URLSearchParams(hash.substring(1));
    
    // Get the tokens
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      console.error('Missing tokens:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
      return;
    }

    // Create the deep link URL with the auth parameters
    const deepLinkUrl = `vocade://auth/callback#access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
    console.log('Opening deep link:', deepLinkUrl);
    
    // Open the app with the tokens
    window.location.href = deepLinkUrl;
    setAttempts(prev => prev + 1);
  };

  useEffect(() => {
    // Only try to open automatically on first load
    if (attempts === 0) {
      openApp();
    }

    // Set up auto-close timer
    const timer = setTimeout(() => {
      window.close();
    }, 60000); // 60 seconds = 1 minute

    return () => clearTimeout(timer);
  }, [attempts]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-white p-6">
        <h1 className="text-2xl font-semibold">
          Return to App
        </h1>
        <p className="text-gray-300">
          Click &quot;Open App&quot; to finish logging in
        </p>
        <button
          onClick={openApp}
          className="mt-2 px-6 py-3 rounded-lg border border-white/20 bg-transparent hover:bg-white/10 transition-colors"
        >
          Open App
        </button>
        <p className="mt-4 text-sm text-gray-500">
          This window will automatically close after 1 minute
        </p>
      </div>
    </div>
  );
} 