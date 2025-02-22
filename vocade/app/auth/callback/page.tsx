'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (!error) {
            // Check if this is a web auth
            const isWebAuth = new URL(window.location.href).searchParams.get('source') === 'web';
            if (isWebAuth) {
              router.push('/settings');
            } else {
              router.push('/dashboard');
            }
            return;
          }
        }
        
        // If we get here, something went wrong
        router.push('/login');
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-dark-1">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-white">
          Completing Sign In
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-white mx-auto"></div>
      </div>
    </div>
  );
} 