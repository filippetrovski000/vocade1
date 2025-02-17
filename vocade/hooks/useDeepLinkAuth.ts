'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';

export const useDeepLinkAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleUrl = async (urls: string[]) => {
      try {
        console.log('Received deep link URL:', urls[0]);
        const url = new URL(urls[0]);
        
        // Parse the URL and get the hash
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const searchParams = url.searchParams;
        console.log('Hash params:', Object.fromEntries(hashParams));
        console.log('Search params:', Object.fromEntries(searchParams));

        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
        
        console.log('Tokens found:', { accessToken: !!accessToken, refreshToken: !!refreshToken });

        if (accessToken && refreshToken) {
          console.log('Setting Supabase session...');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error('Session error:', error);
            throw error;
          }
          
          console.log('Session data:', data);
          
          if (data.session) {
            console.log('Session established, navigating...');
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

    return () => {
      unlisten.then(fn => fn()).catch(console.error);
    };
  }, [router]);
}; 