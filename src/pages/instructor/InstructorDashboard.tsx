import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, DollarSign, TrendingUp, Plus, BarChart3, MessageSquare } from "lucide-react";

const myCourses = [
  { id: 1, title: "Advanced JavaScript Patterns", students: 1234, rating: 4.8, revenue: 12500, status: "published" },
  { id: 2, title: "React Masterclass 2024", students: 856, rating: 4.9, revenue: 8900, status: "published" },
  { id: 3, title: "Node.js Backend Development", students: 0, rating: 0, revenue: 0, status: "draft" },
];

const recentActivity = [
  { type: "enrollment", message: "15 new students enrolled in Advanced JavaScript", time: "2 hours ago" },
  { type: "review", message: "New 5-star review on React Masterclass", time: "5 hours ago" },
  { type: "question", message: "3 new questions in discussion forum", time: "1 day ago" },
];

const InstructorDashboard = () => {
  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your courses and track performance</p>
          </div>
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">2,090</p>
                  <p className="text-xs text-green-500 mt-1">+12% this month</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-3xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground mt-1">2 drafts</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">$21.4K</p>
                  <p className="text-xs text-green-500 mt-1">+8% this month</p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-3xl font-bold text-foreground">4.85</p>
                  <p className="text-xs text-muted-foreground mt-1">156 reviews</p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <Card key={course.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <Badge variant={course.status === "published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} students
                          </span>
                          {course.rating > 0 && (
                            <span>⭐ {course.rating}</span>
                          )}
                          {course.revenue > 0 && (
                            <span className="text-green-500">${course.revenue.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            <Card>
              <CardContent className="p-4 space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {activity.type === "enrollment" && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === "review" && <TrendingUp className="h-4 w-4 text-yellow-500" />}
                      {activity.type === "question" && <MessageSquare className="h-4 w-4 text-accent" />}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;