import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Book, History, Settings } from "lucide-react"
import type React from "react"
import Image from "next/image"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-dark-1">
      {/* Sidebar */}
      <div className="w-64 bg-gray-dark-2 border-r border-gray-dark-4 flex flex-col">
        <div className="p-4 flex-grow">
          <div className="flex items-center mb-8 px-3 py-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vocade%20(1)-rDsBDORz5XtTDJo3dQO8kIODBBsN4O.png"
              alt="Logo"
              width={123}
              height={25}
              className="w-5 h-5"
            />
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                pathname === "/dashboard" ? "bg-gray-dark-3 text-gray-white" : "text-gray-light hover:bg-gray-dark-3"
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/dictionary"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                pathname === "/dictionary" ? "bg-gray-dark-3 text-gray-white" : "text-gray-light hover:bg-gray-dark-3"
              }`}
            >
              <Book className="w-5 h-5" />
              Dictionary
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                pathname === "/history" ? "bg-gray-dark-3 text-gray-white" : "text-gray-light hover:bg-gray-dark-3"
              }`}
            >
              <History className="w-5 h-5" />
              History
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                pathname === "/settings" ? "bg-gray-dark-3 text-gray-white" : "text-gray-light hover:bg-gray-dark-3"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="p-4">
          <div className="p-4 bg-gray-dark-3 rounded-lg">
            <div className="text-sm text-gray-light mb-4">Trial ends in 6 days</div>
            <Button className="w-full bg-gray-white text-gray-black hover:bg-gray-light">Get Flow Pro</Button>
          </div>
          <Button variant="ghost" className="w-full mt-2 text-gray-light hover:bg-gray-dark-3 hover:text-gray-white">
            Refer a friend
          </Button>
          <div className="mt-4 text-xs text-gray-medium">Version 1.0.7</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-dark-2 border-b border-gray-dark-4 py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-white">
            {pathname === "/dashboard" && "Dashboard"}
            {pathname === "/dictionary" && "Dictionary"}
            {pathname === "/history" && "History"}
            {pathname === "/settings" && "Settings"}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

