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
        
        // Parse the URL and get the hash
        const urlObj = new URL(url);
        console.log('URL object:', urlObj);
        
        // Get hash parameters (remove the leading #)
        // Decode the hash first as it was encoded in the auth success page
        const decodedHash = decodeURIComponent(urlObj.hash);
        const hashParams = new URLSearchParams(decodedHash.substring(1));
        console.log('Hash params:', Object.fromEntries(hashParams));

        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
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
            console.log('Session established, managing windows...');
            try {
              // Get the main window
              const mainWindow = new Window('main');
              console.log('Got main window, attempting to focus...');

              // Show and focus the window
              await mainWindow.show();
              await mainWindow.setFocus();
              await mainWindow.unminimize();
              
              // Small delay to ensure window is ready
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Navigate to dashboard
              console.log('Navigating to dashboard...');
              router.push('/dashboard');
            } catch (err) {
              console.error('Error managing windows:', err);
              // If window management fails, try a fallback approach
              console.log('Falling back to browser navigation...');
              window.location.href = '/dashboard';
            }
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