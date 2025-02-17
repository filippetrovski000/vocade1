'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
import { Window } from '@tauri-apps/api/window';

export const useDeepLinkAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleUrl = async (urls: string[]) => {
      try {
        console.log('Received deep link URL:', urls[0]);
        const url = urls[0];
        
        // Parse the URL to get query parameters
        const urlObj = new URL(url);
        console.log('URL object:', urlObj);
        
        // Get query parameters
        const params = urlObj.searchParams;
        console.log('URL params:', Object.fromEntries(params));

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        console.log('Tokens found:', { 
          accessToken: !!accessToken, 
          refreshToken: !!refreshToken
        });

        if (accessToken && refreshToken) {
          console.log('Setting Supabase session...');
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            throw sessionError;
          }
          
          console.log('Session data:', sessionData);
          
          if (sessionData.session) {
            console.log('Session established, navigating...');
            // Navigate to dashboard without window management
            router.push('/dashboard');
          }
        } else {
          throw new Error('Missing required tokens in URL');
        }
      } catch (err) {
        console.error('Error handling deep link:', err);
        router.push('/login');
      }
    };

    console.log('Setting up deep link listener...');
    const unlisten = onOpenUrl(handleUrl);

    // Cleanup function
    return () => {
      unlisten.then(fn => fn()).catch(console.error);
    };
  }, [router]);
}; 