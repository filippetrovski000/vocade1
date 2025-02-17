'use client';

import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/protected-route';
import { useAuth } from '@/hooks/useAuth';
import { useWindowNavigation } from '@/hooks/useWindowNavigation';
import { useEffect, useState } from 'react';

const publicPaths = ['/login', '/auth-success'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);
  const { loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useWindowNavigation();

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  // Show nothing while initializing
  if (!isInitialized) {
    return null;
  }

  return isPublicPath ? children : <ProtectedRoute>{children}</ProtectedRoute>;
} 