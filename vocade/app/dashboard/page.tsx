"use client"

import { useRouter } from 'next/navigation';
import supabase from '@/lib/utils/supabase';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-8 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome to Your Dashboard
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              You&apos;re successfully logged in
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-gray-dark-4 text-gray-white hover:bg-gray-dark-3 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

