"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X } from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/dashboard' },
    { id: 'projects', label: 'Projects', icon: '📁', href: '/dashboard/projects' },
    { id: 'tasks', label: 'My Tasks', icon: '✅', href: '/dashboard/tasks' },
    { id: 'calendar', label: 'Calendar', icon: '📅', href: '/dashboard/calendar' },
    { id: 'analytics', label: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
  ]

  const handleItemClick = (id: string) => {
    setActiveItem(id)
    onClose?.() // Close mobile sidebar when item is clicked
  }

  return (
    <div className="w-full h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col transition-colors duration-300">
      {/* Mobile close button */}
      <div className="flex items-center justify-between p-6 lg:hidden">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Logo - desktop only */}
      <div className="p-6 hidden lg:block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TaskFlow
        </h1>
      </div>

      {/* User Profile */}
      <div className="px-4 lg:px-6 mb-6">
        <Card className="p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs lg:text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Project Manager</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-4 overflow-y-auto">
        <div className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Button
                variant={activeItem === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 transition-all duration-200 h-10 lg:h-11 text-sm lg:text-base ${
                  activeItem === item.id 
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="text-base lg:text-lg">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-2 lg:p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 h-10 lg:h-11 text-sm lg:text-base">
          <span className="text-base lg:text-lg">⚙️</span>
          <span className="truncate">Settings</span>
        </Button>
      </div>
    </div>
  )
}