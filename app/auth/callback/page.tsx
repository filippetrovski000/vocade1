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
            router.push('/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Completing Sign In
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
      </div>
    </div>
  );
} 