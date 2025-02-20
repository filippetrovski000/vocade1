'use client';

import { useEffect } from 'react';

export default function AuthSuccess() {
  useEffect(() => {
    // Close the window after a short delay to allow the OAuth plugin to handle the callback
    const closeTimer = setTimeout(() => {
      window.close();
    }, 2000); // 2 seconds

    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-dark-1">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-white p-6">
        <h1 className="text-2xl font-semibold">Authentication Successful</h1>
        <p className="text-gray-medium">You can close this window and return to the app.</p>
        <p className="mt-4 text-sm text-gray-500">This window will close automatically in a few seconds.</p>
      </div>
    </div>
  );
} 