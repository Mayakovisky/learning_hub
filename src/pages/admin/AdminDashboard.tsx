import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, DollarSign, TrendingUp, Activity, AlertCircle } from "lucide-react";

const platformStats = [
  { label: "Total Users", value: "24,563", change: "+18%", icon: Users, color: "primary" },
  { label: "Active Courses", value: "342", change: "+12%", icon: BookOpen, color: "accent" },
  { label: "Monthly Revenue", value: "$89.4K", change: "+23%", icon: DollarSign, color: "green-500" },
  { label: "Completion Rate", value: "67%", change: "+5%", icon: TrendingUp, color: "yellow-500" },
];

const recentUsers = [
  { name: "John Smith", email: "john@example.com", role: "Student", joined: "2 hours ago" },
  { name: "Sarah Chen", email: "sarah@example.com", role: "Instructor", joined: "5 hours ago" },
  { name: "Mike Johnson", email: "mike@example.com", role: "Student", joined: "1 day ago" },
];

const systemAlerts = [
  { type: "warning", message: "High server load detected", time: "10 min ago" },
  { type: "info", message: "New course pending review", time: "1 hour ago" },
  { type: "success", message: "Daily backup completed", time: "3 hours ago" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat, index) => (
            <Card key={index} variant="stat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-500 mt-1">{stat.change} this month</p>
                  </div>
                  <div className={`h-12 w-12 bg-${stat.color}/10 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Chart Placeholder */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Analytics Chart</p>
                    <p className="text-sm text-muted-foreground">User engagement over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                  <div className={`h-2 w-2 mt-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Users */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Users</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={user.role === "Instructor" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Courses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                View Revenue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;