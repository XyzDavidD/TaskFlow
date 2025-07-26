"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Calendar,
  Target,
  Activity,
  Award,
  BarChart3
} from "lucide-react"
import { useTasks } from "@/contexts/task-context"

export default function AnalyticsPage() {
  const { tasks } = useTasks()
  const [timeRange, setTimeRange] = useState("7d")

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    const now = new Date()
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'done').length
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
    const overdueTasks = tasks.filter(task => 
      new Date(task.dueDate) < now && task.status !== 'done'
    ).length

    // Task completion rate over time (mock data for demo)
    const completionData = [
      { date: 'Mon', completed: 12, created: 15, efficiency: 80 },
      { date: 'Tue', completed: 18, created: 20, efficiency: 90 },
      { date: 'Wed', completed: 8, created: 12, efficiency: 67 },
      { date: 'Thu', completed: 22, created: 25, efficiency: 88 },
      { date: 'Fri', completed: 15, created: 18, efficiency: 83 },
      { date: 'Sat', completed: 5, created: 8, efficiency: 63 },
      { date: 'Sun', completed: 10, created: 12, efficiency: 83 }
    ]

    // Priority distribution
    const priorityData = [
      { name: 'High', value: tasks.filter(t => t.priority === 'High').length, color: '#ef4444' },
      { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length, color: '#f59e0b' },
      { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length, color: '#10b981' }
    ]

    // Status distribution
    const statusData = [
      { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length, color: '#6b7280' },
      { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: '#3b82f6' },
      { name: 'Review', value: tasks.filter(t => t.status === 'review').length, color: '#f59e0b' },
      { name: 'Done', value: tasks.filter(t => t.status === 'done').length, color: '#10b981' }
    ]

    // Team performance
    const teamData = [
      { name: 'John', completed: 18, assigned: 22, efficiency: 82 },
      { name: 'Alice', completed: 15, assigned: 18, efficiency: 83 },
      { name: 'Mike', completed: 12, assigned: 16, efficiency: 75 },
      { name: 'Tom', completed: 9, assigned: 12, efficiency: 75 }
    ]

    // Monthly productivity trend
    const monthlyData = [
      { month: 'Jan', productivity: 84 },
      { month: 'Feb', productivity: 90 },
      { month: 'Mar', productivity: 85 },
      { month: 'Apr', productivity: 89 },
      { month: 'May', productivity: 89 },
      { month: 'Jun', productivity: 91 },
      { month: 'Jul', productivity: Math.round((completedTasks / totalTasks) * 100) || 85 }
    ]

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      completionData,
      priorityData: priorityData.filter(p => p.value > 0),
      statusData: statusData.filter(s => s.value > 0),
      teamData,
      monthlyData
    }
  }, [tasks])

  const MetricCard = ({ title, value, change, icon: Icon, trend }: {
    title: string
    value: string | number
    change: string
    icon: any
    trend: 'up' | 'down' | 'neutral'
  }) => (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span className={`text-xs ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 
                'text-muted-foreground'
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${
            trend === 'up' ? 'bg-green-100 text-green-600' :
            trend === 'down' ? 'bg-red-100 text-red-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track your productivity and team performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tasks"
          value={analyticsData.totalTasks}
          change="+12% from last week"
          icon={Target}
          trend="up"
        />
        <MetricCard
          title="Completion Rate"
          value={`${analyticsData.completionRate}%`}
          change="+5% from last week"
          icon={CheckCircle}
          trend="up"
        />
        <MetricCard
          title="In Progress"
          value={analyticsData.inProgressTasks}
          change="2 more than yesterday"
          icon={Clock}
          trend="neutral"
        />
        <MetricCard
          title="Overdue Tasks"
          value={analyticsData.overdueTasks}
          change="-3 from last week"
          icon={AlertCircle}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Task Completion Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Task Completion Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="created" 
                    stroke="#6b7280" 
                    fill="#6b7280"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
              {analyticsData.priorityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Team Performance */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.teamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="assigned" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Productivity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status & Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Status Distribution */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.statusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm flex-1">{status.name}</span>
                <span className="text-sm font-medium">{status.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-700">Great Progress!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your team completed {analyticsData.completedTasks} tasks this week, 
                  achieving a {analyticsData.completionRate}% completion rate.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-purple-700">Team Star</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Alice Smith leads the team with 83% efficiency. 
                  Great job on consistent performance!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}