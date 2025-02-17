'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Book, History, Settings } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  currentPage: 'home' | 'dictionary' | 'history' | 'settings'
}

const navItems = [
  { name: 'home', icon: Home, href: '/dashboard' },
  { name: 'dictionary', icon: Book, href: '/dictionary' },
  { name: 'history', icon: History, href: '/history' },
  { name: 'settings', icon: Settings, href: '/settings' },
]

export function Layout({ children, currentPage }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-dark-1">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 fixed left-0 top-0 bottom-0 bg-gray-dark-2 border-r border-gray-dark-4">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.name
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-dark-3 text-gray-white'
                      : 'text-gray-medium hover:bg-gray-dark-3 hover:text-gray-white'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pl-16">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
} 