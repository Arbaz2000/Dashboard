"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, CreditCard, Briefcase, Users, FileText, Search, Bell, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { icon: LayoutDashboard, tooltip: "Dashboard", href: "/dashboard" },
  { icon: Building2, tooltip: "Hotels", href: "/hotels" },
  { icon: CreditCard, tooltip: "Cards", href: "/cards" },
  { icon: Briefcase, tooltip: "Services", href: "/services" },
  { icon: Users, tooltip: "Leads", href: "/leads" },
  { icon: FileText, tooltip: "Quotations/Invoices", href: "/quotations" },
  { icon: Package, tooltip: "Packages", href: "/packages" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Static top bar - moved to top level */}
      <header className="bg-black shadow-sm h-16 flex items-center justify-between px-6 w-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl text-white font-semibold">Travel Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 text-muted-foreground" />
            <Input
              placeholder="Search..."
              placeholderColor="text-gray-400"
              className="pl-8 w-[300px] bg-stone-600 text-gray-200 border-none rounded-2xl"
            />
          </div>

          <div className="border-l border-gray-500 h-6"></div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="border-l border-gray-500 h-6"></div>

          {/* User Info Display in Header */}
          <div className="flex items-center space-x-2">
            {/* Avatar and Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 text-black">
                    <AvatarImage src="/avatars/01.png" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-gray-400">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">Help</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold text-white">John Doe</p>
              <p className="text-xs text-gray-300">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 bg-white shadow-md">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <TooltipProvider>
              {sidebarItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="icon"
                        asChild
                        className={cn(
                          "w-12 h-12 transition-all duration-300 ease-in-out", // Added transition here
                          isActive && "bg-primary text-primary-foreground"
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-6 w-6" />
                          <span className="sr-only">{item.tooltip}</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        </aside>

        {/* Page content with smooth transitions */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}
