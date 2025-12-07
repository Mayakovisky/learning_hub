import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Users, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Development", "Design", "Business", "Data Science", "Marketing"];

const courses = [
  { id: 1, title: "Complete Web Development Bootcamp", instructor: "Dr. Sarah Chen", category: "Development", rating: 4.9, students: 12500, duration: "48 hours", lessons: 156, price: 89.99, thumbnail: "🌐", bestseller: true },
  { id: 2, title: "UI/UX Design Masterclass", instructor: "Jane Williams", category: "Design", rating: 4.8, students: 8900, duration: "32 hours", lessons: 98, price: 79.99, thumbnail: "🎨", bestseller: true },
  { id: 3, title: "Data Science with Python", instructor: "Prof. Michael Brown", category: "Data Science", rating: 4.7, students: 6700, duration: "40 hours", lessons: 120, price: 99.99, thumbnail: "📊", bestseller: false },
  { id: 4, title: "Digital Marketing Strategy", instructor: "Emily Davis", category: "Marketing", rating: 4.6, students: 5400, duration: "24 hours", lessons: 72, price: 69.99, thumbnail: "📱", bestseller: false },
  { id: 5, title: "Business Analytics Fundamentals", instructor: "Robert Wilson", category: "Business", rating: 4.8, students: 4200, duration: "28 hours", lessons: 84, price: 74.99, thumbnail: "📈", bestseller: false },
  { id: 6, title: "React & TypeScript Advanced", instructor: "Alex Johnson", category: "Development", rating: 4.9, students: 3800, duration: "36 hours", lessons: 108, price: 94.99, thumbnail: "⚛️", bestseller: true },
];

const CourseCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId: number, courseTitle: string) => {
    toast({
      title: "Successfully enrolled! 🎉",
      description: `You've been enrolled in "${courseTitle}". Redirecting to the course...`,
    });
    setTimeout(() => {
      navigate(`/course/${courseId}`);
    }, 1500);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Explore Courses</h1>
          <p className="text-muted-foreground mt-1">Discover new skills and advance your career</p>
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
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} variant="interactive" className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/course/${course.id}`} className="block">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative hover:opacity-80 transition-opacity">
                  {course.thumbnail}
                  {course.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
                      Bestseller
                    </Badge>
                  )}
                </div>
              </Link>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                <Link to={`/course/${course.id}`}>
                  <h3 className="font-semibold text-foreground line-clamp-2 min-h-[48px] hover:underline">{course.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xl font-bold text-foreground">${course.price}</span>
                  <Button 
                    size="sm" 
                    variant="gradient"
                    onClick={() => handleEnroll(course.id, course.title)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseCatalog;