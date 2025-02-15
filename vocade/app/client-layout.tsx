'use client';

import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/protected-route';

const publicPaths = ['/login', '/auth-success'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);

  return isPublicPath ? children : <ProtectedRoute>{children}</ProtectedRoute>;
} 