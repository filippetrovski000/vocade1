'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';
import { listen } from '@tauri-apps/api/event';

export const useDeepLinkAuth = () => {
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupDeepLink = async () => {
      try {
        // Check if we're in Tauri environment
        if (typeof window !== 'undefined' && window.__TAURI__) {
          // Listen for deep link events
          const unlisten = await listen('deep-link', async (event) => {
            try {
              const url = new URL(event.payload as string);
              const hashParams = new URLSearchParams(url.hash.substring(1));
              const searchParams = url.searchParams;

              const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
              const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');

              if (accessToken && refreshToken) {
                const { data, error } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken
                });
                
                if (error) {
                  console.error('Session error:', error);
                  throw error;
                }
                
                if (data.session) {
                  router.push('/dashboard');
                }
              } else {
                throw new Error('Missing required tokens in URL');
              }
            } catch (err) {
              console.error('Error handling deep link:', err);
              router.push('/login');
            }
          });

          unsubscribe = unlisten;
        }
      } catch (err) {
        console.error('Error setting up deep link listener:', err);
      }
    };

    // Set up the deep link listener
    setupDeepLink();

    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [router]);
}; 