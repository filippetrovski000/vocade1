'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import supabase from '@/lib/utils/supabase';
import { useRouter } from 'next/navigation';
import { invoke } from '@tauri-apps/api/tauri';
import { useDeepLinkAuth } from '@/hooks/useDeepLinkAuth';
import { openUrl } from '@tauri-apps/plugin-opener';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';

declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Initialize deep link listener
  useDeepLinkAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth-success'
            : 'https://vocade.vercel.app/auth-success',
        },
      });

      if (signInError) throw signInError;

      alert("Check your email for the login link!");
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Failed to send login link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          skipBrowserRedirect: true,
          redirectTo: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth-success'
            : 'https://vocade.vercel.app/auth-success',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
        }
      });

      if (!data?.url) throw new Error('No auth URL returned');
      
      // Handle URL opening based on environment
      if (typeof window !== 'undefined' && window.__TAURI__) {
        // In Tauri app, use the system browser
        await openUrl(data.url);
      } else {
        // In web browser
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      const { data } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          skipBrowserRedirect: true,
          redirectTo: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth-success'
            : 'https://vocade.vercel.app/auth-success',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
        }
      });

      if (!data?.url) throw new Error('No auth URL returned');
      
      // Handle URL opening based on environment
      if (typeof window !== 'undefined' && window.__TAURI__) {
        // In Tauri app, use the system browser
        await openUrl(data.url);
      } else {
        // In web browser
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Failed to login with GitHub. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-dark-1 p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-[120px] h-[120px]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100 0 L200 100 L100 200 L0 100 Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#666666', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-white">Vocade</h1>
          <p className="text-base text-gray-medium">Code with your voice.</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-dark-2 border-gray-dark-4 text-gray-white placeholder:text-gray-medium focus-visible:ring-1 focus-visible:ring-gray-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-white text-gray-black hover:bg-gray-light"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-gray-dark-4" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-dark-1 px-2 text-gray-medium">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full bg-gray-dark-2 text-gray-white hover:bg-gray-dark-3 border-gray-dark-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-dark-2 text-gray-white hover:bg-gray-dark-3 border-gray-dark-4"
              onClick={handleGitHubSignIn}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <p className="text-sm text-gray-medium text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-gray-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <footer className="fixed bottom-4 text-center">
        <p className="text-sm text-gray-medium">
          <Link href="/terms" className="hover:text-gray-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-gray-white">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
} 