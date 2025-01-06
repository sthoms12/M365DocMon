"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, FileText, Activity, Menu } from "lucide-react"

function SideNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="space-y-1">
      <Link href="/url-mapping" className="block">
        <Button 
          variant={isActive('/url-mapping') ? "secondary" : "ghost"} 
          size="sm" 
          className="w-full justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          URL Mapping
        </Button>
      </Link>
      <Link href="/changes" className="block">
        <Button 
          variant={isActive('/changes') ? "secondary" : "ghost"} 
          size="sm" 
          className="w-full justify-start"
        >
          <Activity className="mr-2 h-4 w-4" />
          Change Detection
        </Button>
      </Link>
      <Link href="/notifications" className="block">
        <Button 
          variant={isActive('/notifications') ? "secondary" : "ghost"} 
          size="sm" 
          className="w-full justify-start"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </Link>
    </nav>
  )
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SideNav />
              </SheetContent>
            </Sheet>
            <Link href="/" className="text-lg font-semibold hover:text-primary">
              M365 Doc Monitor
            </Link>
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:block w-64 border-r h-[calc(100vh-3.5rem)] p-3">
          <SideNav />
        </div>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}