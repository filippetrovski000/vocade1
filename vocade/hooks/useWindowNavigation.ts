import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { listen } from '@tauri-apps/api/event';

export const useWindowNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const unlisten = listen('navigate', (event: { payload: { path: string } }) => {
      console.log('Received navigation event:', event);
      router.push(event.payload.path);
    });

    return () => {
      unlisten.then(fn => fn());
    };
  }, [router]);
}; 