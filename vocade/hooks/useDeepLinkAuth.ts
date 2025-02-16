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
        const hashParams = new URLSearchParams(urlObj.hash.substring(1));
        console.log('Hash params:', Object.fromEntries(hashParams));

        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
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
            console.log('Session established, managing windows...');
            try {
              // Try to get the main window
              const mainWindow = new Window('main');
              console.log('Found main window, attempting to focus...');

              // Focus the window and bring it to front
              await mainWindow.setFocus();
              await mainWindow.unminimize();
              
              // Small delay to ensure window is ready
              await new Promise(resolve => setTimeout(resolve, 100));
              
              // Navigate to dashboard
              console.log('Navigating to dashboard...');
              await mainWindow.emit('navigate', { path: '/dashboard' });
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
    onOpenUrl(handleUrl);
  }, [router]);
}; 