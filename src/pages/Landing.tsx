import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Award, Play, Star, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: BookOpen, title: "1000+ Courses", description: "Access a vast library of courses across multiple disciplines" },
  { icon: Users, title: "Expert Instructors", description: "Learn from industry professionals and academics" },
  { icon: Award, title: "Certificates", description: "Earn recognized certificates upon completion" },
  { icon: Play, title: "Learn Anywhere", description: "Access content on any device, anytime" },
];

const popularCourses = [
  { id: 1, title: "Web Development Bootcamp", instructor: "Dr. Sarah Chen", rating: 4.9, students: 12500, price: 89.99, thumbnail: "🌐" },
  { id: 2, title: "Data Science with Python", instructor: "Prof. Michael Brown", rating: 4.8, students: 8900, price: 99.99, thumbnail: "📊" },
  { id: 3, title: "UI/UX Design Masterclass", instructor: "Jane Williams", rating: 4.9, students: 6700, price: 79.99, thumbnail: "🎨" },
];

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">LearnHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10">
              🎉 Join 50,000+ learners today
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Unlock Your Potential with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                World-Class Learning
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover thousands of courses taught by expert instructors. Learn at your own pace, 
              earn certificates, and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" variant="gradient" className="w-full sm:w-auto">
                  Explore Courses
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free 7-day trial
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="glass" className="text-center p-6">
                <CardContent className="p-0">
                  <div className="h-14 w-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Popular Courses</h2>
              <p className="text-muted-foreground mt-2">Start learning from our top-rated courses</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <Card key={course.id} variant="interactive" className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/course/${course.id}`} className="block">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl hover:opacity-80 transition-opacity">
                    {course.thumbnail}
                  </div>
                </Link>
                <CardContent className="p-5">
                  <Link to={`/course/${course.id}`}>
                    <h3 className="font-semibold text-foreground mb-1 hover:underline">{course.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-sm mb-4">
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      {course.rating}
                    </span>
                    <span className="text-muted-foreground">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xl font-bold text-foreground">${course.price}</span>
                    <Button 
                      size="sm" 
                      variant="gradient"
                      onClick={() => handleEnroll(course.id, course.title)}
                    >
                      Enroll
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of learners who are already advancing their careers with LearnHub.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Get Started for Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">LearnHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;