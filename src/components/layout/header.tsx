"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CreateTaskModal } from "@/components/tasks/create-task-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, CheckCircle, AlertCircle, Clock, Users } from "lucide-react"
import { useTasks } from "@/contexts/task-context"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { addTask } = useTasks()
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const handleCreateTask = (taskData: {
    title: string
    description: string
    priority: 'Low' | 'Medium' | 'High'
    assignee: string
    dueDate: string
    status: 'todo' | 'in-progress' | 'review' | 'done'
  }) => {
    addTask(taskData)
    setIsTaskModalOpen(false)
  }

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Task Completed",
      message: "John completed 'Design new homepage'",
      time: "2 minutes ago",
      type: "success",
      icon: CheckCircle
    },
    {
      id: 2,
      title: "Deadline Approaching",
      message: "API Integration due in 2 hours",
      time: "1 hour ago",
      type: "warning",
      icon: Clock
    },
    {
      id: 3,
      title: "New Team Member",
      message: "Sarah joined the development team",
      time: "3 hours ago",
      type: "info",
      icon: Users
    },
    {
      id: 4,
      title: "Overdue Task",
      message: "Update documentation is overdue",
      time: "5 hours ago",
      type: "error",
      icon: AlertCircle
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      default: return 'text-blue-500'
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20'
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20'
      case 'error': return 'bg-red-50 dark:bg-red-900/20'
      default: return 'bg-blue-50 dark:bg-blue-900/20'
    }
  }

  return (
    <>
      <header className="h-14 lg:h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 lg:px-6 transition-colors duration-300">
        <div className="flex items-center gap-2 lg:gap-4 flex-1">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="max-w-xs lg:max-w-md flex-1">
            <Input 
              placeholder="Search..." 
              className="bg-muted/50 border-0 focus:ring-2 focus:ring-primary transition-colors duration-300 text-sm lg:text-base prevent-zoom"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />
          
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative transition-colors duration-300">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center p-0">
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  {notifications.length} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`flex items-start gap-3 p-4 cursor-pointer ${getNotificationBg(notification.type)}`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationBg(notification.type)}`}>
                      <IconComponent className={`h-4 w-4 ${getNotificationIcon(notification.type)}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                )
              })}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* New Task Button */}
          <Button 
            variant="default"
            size="sm"
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-xs lg:text-sm px-2 lg:px-4"
          >
            <span className="hidden lg:inline">+ New Task</span>
            <span className="lg:hidden">+</span>
          </Button>
        </div>
      </header>

      {/* Task Creation Modal */}
      <CreateTaskModal
        onCreateTask={handleCreateTask}
        trigger={null}
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </>
  )
}