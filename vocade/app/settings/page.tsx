"use client"

import { useEffect, useState } from 'react';
import WebSettings from './web';
import { Layout } from "@/app/components/layout";

export default function SettingsPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(Boolean(window.__TAURI__));
  }, []);

  if (isDesktop) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-white">Settings</h1>
          {/* Desktop-specific settings UI will go here */}
          <div className="text-gray-medium">Desktop settings coming soon...</div>
        </div>
      </Layout>
    );
  }

  return <WebSettings />;
}

