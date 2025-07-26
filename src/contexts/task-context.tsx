"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  assignee: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Sample tasks with current dates (2025)
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new homepage',
    description: 'Create wireframes and mockups for the new homepage design',
    priority: 'High',
    assignee: 'JD',
    dueDate: '2025-07-30',
    status: 'todo'
  },
  {
    id: '2',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    priority: 'Medium',
    assignee: 'AS',
    dueDate: '2025-08-05',
    status: 'todo'
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Integrate with third-party payment API',
    priority: 'High',
    assignee: 'MK',
    dueDate: '2025-07-28',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Review and update API documentation',
    priority: 'Low',
    assignee: 'TR',
    dueDate: '2025-07-26',
    status: 'review'
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    priority: 'Medium',
    assignee: 'JD',
    dueDate: '2025-07-25',
    status: 'done'
  },
  {
    id: '6',
    title: 'User testing session',
    description: 'Conduct usability testing with 5 users',
    priority: 'High',
    assignee: 'AS',
    dueDate: '2025-08-01',
    status: 'in-progress'
  },
  {
    id: '7',
    title: 'Security audit',
    description: 'Perform comprehensive security review',
    priority: 'High',
    assignee: 'MK',
    dueDate: '2025-08-03',
    status: 'todo'
  }
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }
    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}