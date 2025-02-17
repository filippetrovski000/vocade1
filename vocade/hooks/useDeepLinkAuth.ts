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
        console.log('Hash params:', Object.fromEntries(hashParams));

        // Get access token from hash
        const accessToken = hashParams.get('access_token');
        if (!accessToken) {
          throw new Error('No access token found in URL');
        }

        // Get token type and expiry
        const tokenType = hashParams.get('token_type');
        const expiresIn = hashParams.get('expires_in');

        console.log('Token info:', { 
          hasAccessToken: !!accessToken, 
          tokenType, 
          expiresIn 
        });

        // Set the session with the token
        console.log('Setting Supabase session...');
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          // Since we're using implicit flow, we don't have a refresh token
          refresh_token: ''
        });
        
        if (error) {
          console.error('Session error:', error);
          throw error;
        }
        
        console.log('Session data:', data);
        
        if (data.session) {
          console.log('Session established, navigating...');
          router.push('/dashboard');
        } else {
          throw new Error('No session established');
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