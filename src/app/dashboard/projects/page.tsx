"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateTaskModal } from "@/components/tasks/create-task-modal"
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from "@dnd-kit/core"
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable"
import { 
  useSortable 
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Task type definition
interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  assignee: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
}

// Column type definition
interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}

// Initial data
const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-100 dark:bg-gray-800',
    tasks: [
      {
        id: '1',
        title: 'Design new homepage',
        description: 'Create wireframes and mockups for the new homepage design',
        priority: 'High',
        assignee: 'JD',
        dueDate: '2024-07-30',
        status: 'todo'
      },
      {
        id: '2',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        priority: 'Medium',
        assignee: 'AS',
        dueDate: '2024-08-05',
        status: 'todo'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-50 dark:bg-blue-900/20',
    tasks: [
      {
        id: '3',
        title: 'API Integration',
        description: 'Integrate with third-party payment API',
        priority: 'High',
        assignee: 'MK',
        dueDate: '2024-07-28',
        status: 'in-progress'
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-50 dark:bg-yellow-900/20',
    tasks: [
      {
        id: '4',
        title: 'Update documentation',
        description: 'Review and update API documentation',
        priority: 'Low',
        assignee: 'TR',
        dueDate: '2024-07-26',
        status: 'review'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-50 dark:bg-green-900/20',
    tasks: [
      {
        id: '5',
        title: 'Database optimization',
        description: 'Optimize database queries for better performance',
        priority: 'Medium',
        assignee: 'JD',
        dueDate: '2024-07-20',
        status: 'done'
      }
    ]
  }
]

// Task Card Component
function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const priorityColors = {
    High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-sm"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 flex-1 pr-2">
            {task.title}
          </h4>
          <Badge className={`text-xs ${priorityColors[task.priority]} flex-shrink-0`}>
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {task.assignee}
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// Droppable Column Component
function DroppableColumn({ 
  column, 
  children, 
  onCreateTask 
}: { 
  column: Column; 
  children: React.ReactNode;
  onCreateTask: (task: {
    title: string
    description: string
    priority: 'Low' | 'Medium' | 'High'
    assignee: string
    dueDate: string
    status: 'todo' | 'in-progress' | 'review' | 'done'
  }) => void;
}) {
  const {
    setNodeRef,
    isOver
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column
    }
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-72 max-w-80 ${isOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
    >
      <div className={`rounded-lg p-4 ${column.color} mb-4`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {column.tasks.length}
          </Badge>
        </div>
      </div>
      
      <div className="min-h-96">
        {children}
        
        <CreateTaskModal
          defaultStatus={column.id as 'todo' | 'in-progress' | 'review' | 'done'}
          onCreateTask={onCreateTask}
          trigger={
            <Button 
              variant="ghost" 
              className="w-full mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
            >
              + Add Task
            </Button>
          }
        />
      </div>
    </div>
  )
}

// Main Kanban Board
export default function ProjectsPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleCreateTask = (taskData: {
    title: string
    description: string
    priority: 'Low' | 'Medium' | 'High'
    assignee: string
    dueDate: string
    status: 'todo' | 'in-progress' | 'review' | 'done'
  }) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // Better unique ID
    }

    setColumns(prevColumns => 
      prevColumns.map(column => 
        column.id === taskData.status
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = findTaskById(active.id.toString())
    setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    const activeTask = findTaskById(activeId)
    if (!activeTask) return

    const activeColumn = findColumnContainingTask(activeId)
    if (!activeColumn) return

    let targetColumn: Column | null = null
    
    if (columns.some(col => col.id === overId)) {
      targetColumn = columns.find(col => col.id === overId) || null
    } else {
      targetColumn = findColumnContainingTask(overId)
    }

    if (!targetColumn) return

    if (activeColumn.id !== targetColumn.id) {
      setColumns(prevColumns => {
        return prevColumns.map(column => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== activeId)
            }
          } else if (column.id === targetColumn!.id) {
            const updatedTask = {
              ...activeTask,
              status: targetColumn!.id as Task['status']
            }
            return {
              ...column,
              tasks: [...column.tasks, updatedTask]
            }
          }
          return column
        })
      })
    }
  }

  const findTaskById = (id: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find(task => task.id === id)
      if (task) return task
    }
    return null
  }

  const findColumnContainingTask = (taskId: string): Column | null => {
    return columns.find(column => 
      column.tasks.some(task => task.id === taskId)
    ) || null
  }

  return (
    <div className="space-y-6 h-full overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Project Board
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks with drag-and-drop simplicity
          </p>
        </div>
        <CreateTaskModal onCreateTask={handleCreateTask} />
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-4 overflow-x-auto pb-6 h-full">
          {columns.map((column) => (
            <DroppableColumn 
              key={column.id} 
              column={column}
              onCreateTask={handleCreateTask}
            >
              <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
        
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}