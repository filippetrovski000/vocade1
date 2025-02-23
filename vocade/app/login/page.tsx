'use client';

import { useEffect, useState } from 'react';
import { isDesktop } from '@/lib/utils/platform';
import WebLoginPage from './web';
import DesktopLoginPage from './desktop';

export default function LoginPage() {
  const [isDesktopApp, setIsDesktopApp] = useState(false);

  useEffect(() => {
    const checkPlatform = async () => {
      const isDesktopApp = await isDesktop();
      setIsDesktopApp(isDesktopApp);
    };
    checkPlatform();
  }, []);

  return isDesktopApp ? <DesktopLoginPage /> : <WebLoginPage />;
} 