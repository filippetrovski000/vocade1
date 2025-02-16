'use client';

import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/protected-route';
import { useAuth } from '@/hooks/useAuth';
import { useWindowNavigation } from '@/hooks/useWindowNavigation';

const publicPaths = ['/login', '/auth-success'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);
  useAuth();
  useWindowNavigation();

  return isPublicPath ? children : <ProtectedRoute>{children}</ProtectedRoute>;
} 