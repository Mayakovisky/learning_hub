import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2, TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  lessons: number;
  rating: number;
  revenue: number;
  status: "active" | "draft" | "archived";
  createdDate: string;
  category: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Chen",
    students: 1250,
    lessons: 156,
    rating: 4.9,
    revenue: 12500,
    status: "active",
    createdDate: "2023-06-15",
    category: "Development",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Prof. Michael Brown",
    students: 890,
    lessons: 132,
    rating: 4.7,
    revenue: 8900,
    status: "active",
    createdDate: "2023-08-20",
    category: "Data Science",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    instructor: "Jane Williams",
    students: 650,
    lessons: 98,
    rating: 4.8,
    revenue: 6500,
    status: "active",
    createdDate: "2023-11-10",
    category: "Design",
  },
  {
    id: 4,
    title: "Advanced Python Programming",
    instructor: "Dr. Sarah Chen",
    students: 420,
    lessons: 85,
    rating: 4.6,
    revenue: 4200,
    status: "active",
    createdDate: "2024-02-01",
    category: "Development",
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "Prof. Michael Brown",
    students: 0,
    lessons: 0,
    rating: 0,
    revenue: 0,
    status: "draft",
    createdDate: "2024-04-15",
    category: "Development",
  },
  {
    id: 6,
    title: "Digital Marketing Basics",
    instructor: "Jane Williams",
    students: 780,
    lessons: 64,
    rating: 4.5,
    revenue: 7800,
    status: "active",
    createdDate: "2024-01-20",
    category: "Business",
  },
];

export const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(courses.map((c) => c.category)));
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
  const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0);
  const activeCourses = courses.filter((c) => c.status === "active").length;

  const handleStatusChange = (courseId: number, newStatus: Course["status"]) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
    const course = courses.find((c) => c.id === courseId);
    toast({
      title: "Course status updated",
      description: `${course?.title} status changed to ${newStatus}`,
    });
  };

  const handleDeleteCourse = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    setCourses(courses.filter((c) => c.id !== courseId));
    toast({
      title: "Course deleted",
      description: `${course?.title} has been removed`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "archived":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
            <p className="text-muted-foreground mt-1">Manage all courses on the platform</p>
          </div>
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-3xl font-bold text-foreground">{activeCourses}</p>
                </div>
                <div className="text-3xl">📚</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{totalStudents.toLocaleString()}</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-3xl font-bold text-foreground">4.7 ⭐</p>
                </div>
                <div className="text-3xl">⭐</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or instructor..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium max-w-xs truncate">
                        {course.title}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {course.instructor}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{course.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {course.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                            <span>⭐</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">No ratings</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          ${course.revenue.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(course.status)} className="capitalize">
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button 
                            className="p-1 hover:bg-muted rounded transition-colors"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCourses;
