import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const stats = [
    { title: "Total Tasks", value: "24", change: "+12%", icon: "📋" },
    { title: "Completed", value: "18", change: "+8%", icon: "✅" },
    { title: "In Progress", value: "4", change: "+2%", icon: "🔄" },
    { title: "Overdue", value: "2", change: "-1%", icon: "⚠️" },
  ]

  const recentTasks = [
    { title: "Design new homepage", project: "Website Redesign", priority: "High", status: "In Progress" },
    { title: "Review pull request", project: "Mobile App", priority: "Medium", status: "Pending" },
    { title: "Update documentation", project: "API v2", priority: "Low", status: "Completed" },
    { title: "Client meeting prep", project: "Marketing Campaign", priority: "High", status: "Todo" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tasks */}
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>Your latest task activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/80 dark:bg-gray-700/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}
                  >
                    {task.priority}
                  </Badge>
                  <Badge variant="outline">
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}