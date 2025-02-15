'use client';

import { useEffect } from 'react';

export default function AuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const email = params.get('email');

    if (token && userId && email) {
      // Redirect to your app using the deep link protocol
      window.location.href = `vocade://${window.location.host}/auth-callback?token=${token}&userId=${userId}&email=${email}`;
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authentication Successful</h2>
        <p className="mt-2 text-gray-600">Redirecting back to the app...</p>
      </div>
    </div>
  );
} 