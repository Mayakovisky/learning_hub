import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Clock, Users, Star, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  rating: number;
  students: number;
  lastAccessed: string;
  category: string;
  price: number;
  status: "in-progress" | "completed" | "not-started";
}

const enrolledCourses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Chen",
    thumbnail: "🌐",
    progress: 65,
    totalLessons: 156,
    completedLessons: 101,
    rating: 4.9,
    students: 12500,
    lastAccessed: "2 hours ago",
    category: "Development",
    price: 89.99,
    status: "in-progress",
  },
  {
    id: 2,
    title: "Data Science with Python",
    instructor: "Prof. Michael Brown",
    thumbnail: "📊",
    progress: 30,
    totalLessons: 120,
    completedLessons: 36,
    rating: 4.7,
    students: 6700,
    lastAccessed: "3 days ago",
    category: "Data Science",
    price: 99.99,
    status: "in-progress",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Jane Williams",
    thumbnail: "🎨",
    progress: 85,
    totalLessons: 98,
    completedLessons: 83,
    rating: 4.8,
    students: 8900,
    lastAccessed: "1 day ago",
    category: "Design",
    price: 79.99,
    status: "in-progress",
  },
  {
    id: 4,
    title: "React & TypeScript Advanced",
    instructor: "Alex Johnson",
    thumbnail: "⚛️",
    progress: 100,
    totalLessons: 108,
    completedLessons: 108,
    rating: 4.9,
    students: 3800,
    lastAccessed: "1 week ago",
    category: "Development",
    price: 94.99,
    status: "completed",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    instructor: "Emily Davis",
    thumbnail: "📱",
    progress: 0,
    totalLessons: 72,
    completedLessons: 0,
    rating: 4.6,
    students: 5400,
    lastAccessed: "Never",
    category: "Marketing",
    price: 69.99,
    status: "not-started",
  },
  {
    id: 6,
    title: "Business Analytics Fundamentals",
    instructor: "Robert Wilson",
    thumbnail: "📈",
    progress: 45,
    totalLessons: 84,
    completedLessons: 38,
    rating: 4.8,
    students: 4200,
    lastAccessed: "5 days ago",
    category: "Business",
    price: 74.99,
    status: "in-progress",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-700";
    case "in-progress":
      return "bg-blue-500/10 text-blue-700";
    case "not-started":
      return "bg-gray-500/10 text-gray-700";
    default:
      return "";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "not-started":
      return "Not Started";
    default:
      return "";
  }
};

export const StudentCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredCourses = enrolledCourses
    .filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || course.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "title":
          return a.title.localeCompare(b.title);
        case "recent":
        default:
          return 0;
      }
    });

  const stats = {
    total: enrolledCourses.length,
    inProgress: enrolledCourses.filter((c) => c.status === "in-progress").length,
    completed: enrolledCourses.filter((c) => c.status === "completed").length,
    avgProgress:
      Math.round(
        enrolledCourses.reduce((acc, c) => acc + c.progress, 0) /
          enrolledCourses.length
      ) || 0,
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage and continue your enrolled courses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.total}
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.inProgress}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.completed}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.avgProgress}%
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <ProgressIcon className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Accessed</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <Link to={`/course/${course.id}`}>
                  <div className="h-32 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center text-5xl relative hover:opacity-80 transition-opacity">
                    <div>{course.thumbnail}</div>
                    <Badge
                      className={`absolute top-2 right-2 ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusLabel(course.status)}
                    </Badge>
                  </div>
                </Link>

                {/* Content */}
                <CardContent className="p-4">
                  <CardHeader className="p-0 mb-3">
                    <Link to={`/course/${course.id}`} className="hover:underline">
                      <CardTitle className="text-base line-clamp-2">
                        {course.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-sm mt-1">
                      {course.instructor}
                    </CardDescription>
                  </CardHeader>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.completedLessons}/{course.totalLessons}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {(course.students / 1000).toFixed(1)}k
                    </div>
                  </div>

                  {/* Last Accessed */}
                  <div className="mb-4 text-xs text-muted-foreground">
                    Last accessed: {course.lastAccessed}
                  </div>

                  {/* Button */}
                  <Link to={`/course/${course.id}`} className="w-full">
                    <Button variant="default" size="sm" className="w-full">
                      {course.status === "completed" ? "Review" : "Continue"}
                      <Play className="h-3 w-3 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Link to="/courses">
                <Button>Browse Available Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

// Icon component for progress
const ProgressIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
  </svg>
);

export default StudentCourses;
