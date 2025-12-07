import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Activity,
  Target,
  Calendar,
  Award,
} from "lucide-react";

const enrollmentData = [
  { month: "Jan", students: 450, instructors: 12 },
  { month: "Feb", students: 620, instructors: 15 },
  { month: "Mar", students: 890, instructors: 18 },
  { month: "Apr", students: 1200, instructors: 22 },
  { month: "May", students: 1580, instructors: 26 },
  { month: "Jun", students: 2100, instructors: 31 },
];

const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 8900 },
  { month: "Apr", revenue: 12000 },
  { month: "May", revenue: 15800 },
  { month: "Jun", revenue: 21000 },
];

const courseDistribution = [
  { name: "Development", value: 35 },
  { name: "Design", value: 20 },
  { name: "Data Science", value: 25 },
  { name: "Business", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const topCourses = [
  { title: "Web Development Bootcamp", students: 1250, rating: 4.9 },
  { title: "Data Science Fundamentals", students: 890, rating: 4.7 },
  { title: "UI/UX Design Principles", students: 650, rating: 4.8 },
  { title: "Advanced Python", students: 420, rating: 4.6 },
  { title: "Digital Marketing", students: 780, rating: 4.5 },
];

const userActivity = [
  { type: "Login", count: 3420 },
  { type: "Course Started", count: 520 },
  { type: "Lesson Completed", count: 2150 },
  { type: "Quiz Submitted", count: 890 },
  { type: "Certificate Earned", count: 145 },
];

export const AdminAnalytics = () => {
  const totalStudents = 5200;
  const totalInstructors = 87;
  const totalRevenue = 68400;
  const averageRating = 4.7;
  const monthlyGrowth = 12.5;
  const activeCourses = 156;
  const completionRate = 73;
  const certificatesIssued = 845;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform performance and user engagement metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +{monthlyGrowth}% this month
                  </p>
                </div>
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Instructors</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{totalInstructors}</p>
                  <p className="text-xs text-muted-foreground mt-2">Active on platform</p>
                </div>
                <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-500 mt-2">Last 6 months</p>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{averageRating}</p>
                  <p className="text-xs text-muted-foreground mt-2">⭐ Platform wide</p>
                </div>
                <div className="h-10 w-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#f3f4f6",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" name="Students" />
                  <Bar dataKey="instructors" fill="#8b5cf6" name="Instructors" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#f3f4f6",
                    }}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Monthly Revenue"
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>User Activity (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{activity.type}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {activity.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{activeCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{completionRate}%</p>
                </div>
                <Target className="h-8 w-8 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates Issued</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{certificatesIssued}</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{index + 1}</Badge>
                      <p className="font-medium text-foreground">{course.title}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
