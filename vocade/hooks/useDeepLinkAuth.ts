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
        
        // Get search parameters
        const params = url.searchParams;
        console.log('URL parameters:', Object.fromEntries(params));

        // Check for error
        const error = params.get('error');
        if (error) {
          console.error('Auth error:', error);
          router.push('/login');
          return;
        }

        // Get tokens
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (!accessToken) {
          throw new Error('No access token found in URL');
        }

        console.log('Setting Supabase session...');
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });

        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        console.log('Session established:', sessionData.session?.user?.email);
        router.push('/dashboard');
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