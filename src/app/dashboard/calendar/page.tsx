"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateTaskModal } from "@/components/tasks/create-task-modal"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useTasks } from "@/contexts/task-context"

// Helper functions
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const formatDateForComparison = (date: Date) => {
  return date.toISOString().split('T')[0]
}

// Task Card Component for Calendar
function CalendarTaskCard({ task }: { 
  task: {
    id: string
    title: string
    description: string
    priority: 'Low' | 'Medium' | 'High'
    assignee: string
    dueDate: string
    status: 'todo' | 'in-progress' | 'review' | 'done'
  }
}) {
  const priorityColors: { [key in 'High' | 'Medium' | 'Low']: string } = {
    High: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    Low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
  }

  const statusColors: { [key in 'todo' | 'in-progress' | 'review' | 'done']: string } = {
    'todo': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'review': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'done': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  }

  return (
    <div className={`p-2 mb-1 rounded-md border text-xs transition-all duration-200 hover:shadow-md cursor-pointer ${priorityColors[task.priority]}`}>
      <div className="font-medium truncate mb-1">{task.title}</div>
      <div className="flex items-center justify-between">
        <Badge className={`text-xs px-1 py-0 ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ')}
        </Badge>
        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
          {task.assignee.slice(0, 1)}
        </div>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { tasks, addTask } = useTasks()

  const handleCreateTask = (taskData: {
    title: string
    description: string
    priority: 'Low' | 'Medium' | 'High'
    assignee: string
    dueDate: string
    status: 'todo' | 'in-progress' | 'review' | 'done'
  }) => {
    addTask(taskData)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const getTasksForDate = (date: Date) => {
    const dateStr = formatDateForComparison(date)
    return tasks.filter(task => task.dueDate === dateStr)
  }

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-32 p-1 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"></div>
      )
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayTasks = getTasksForDate(date)
      const isToday = formatDateForComparison(date) === formatDateForComparison(new Date())
      const isSelected = selectedDate && formatDateForComparison(date) === formatDateForComparison(selectedDate)

      days.push(
        <div
          key={day}
          className={`min-h-32 p-1 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
            isToday ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-500' : 'bg-white dark:bg-gray-900'
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            {day}
          </div>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {dayTasks.map(task => (
              <CalendarTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Auto-select today when component mounts
  useEffect(() => {
    const today = new Date()
    setSelectedDate(today)
    setCurrentDate(today)
  }, [])

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your tasks by date
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: 'month' | 'week') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
          <CreateTaskModal 
            onCreateTask={handleCreateTask}
            defaultStatus="todo"
          />
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {renderMonthView()}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tasks for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getTasksForDate(selectedDate).length > 0 ? (
                getTasksForDate(selectedDate).map(task => (
                  <div key={task.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline">
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {task.assignee}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Assigned to {task.assignee}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No tasks scheduled for this date
                  </p>
                  <CreateTaskModal 
                    onCreateTask={handleCreateTask}
                    defaultStatus="todo"
                    trigger={
                      <Button variant="outline">
                        + Add Task for This Date
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}