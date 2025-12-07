import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Users, Clock, BookOpen, Play, CheckCircle, Lock, Award, FileText, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  description: "Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more through hands-on projects and real-world applications.",
  instructor: { name: "Dr. Sarah Chen", avatar: "SC", bio: "Senior Software Engineer with 10+ years of experience" },
  rating: 4.9,
  reviews: 2847,
  students: 12500,
  duration: "48 hours",
  lessons: 156,
  price: 89.99,
  thumbnail: "🌐",
  lastUpdated: "November 2024",
  language: "English",
  certificate: true,
};

const modules = [
  {
    title: "Getting Started with Web Development",
    lessons: [
      { id: 1, title: "Introduction to the Course", duration: "10 min", completed: true, type: "video" },
      { id: 2, title: "Setting Up Your Development Environment", duration: "15 min", completed: true, type: "video" },
      { id: 3, title: "Your First HTML Page", duration: "20 min", completed: false, type: "video" },
      { id: 4, title: "Quiz: HTML Basics", duration: "10 min", completed: false, type: "quiz" },
    ]
  },
  {
    title: "CSS Fundamentals",
    lessons: [
      { id: 5, title: "Introduction to CSS", duration: "25 min", completed: false, type: "video" },
      { id: 6, title: "Selectors and Properties", duration: "30 min", completed: false, type: "video" },
      { id: 7, title: "Box Model Deep Dive", duration: "20 min", completed: false, type: "video" },
      { id: 8, title: "Assignment: Style a Landing Page", duration: "45 min", completed: false, type: "assignment" },
    ]
  },
  {
    title: "JavaScript Essentials",
    lessons: [
      { id: 9, title: "Variables and Data Types", duration: "20 min", completed: false, type: "video", locked: true },
      { id: 10, title: "Functions and Scope", duration: "25 min", completed: false, type: "video", locked: true },
      { id: 11, title: "DOM Manipulation", duration: "35 min", completed: false, type: "video", locked: true },
    ]
  },
];

const CourseDetail = () => {
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnroll = () => {
    toast({
      title: "Enrollment successful! 🎉",
      description: `You're now enrolled in "${courseData.title}". Let's start learning!`,
    });
    setEnrolled(true);
    setTimeout(() => {
      navigate("/student/courses");
    }, 2000);
  };

  const handleLessonClick = (lessonId: number) => {
    navigate(`/lesson/${courseData.id}/${lessonId}`);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Badge variant="secondary">Development</Badge>
            <h1 className="text-3xl font-bold text-foreground">{courseData.title}</h1>
            <p className="text-muted-foreground">{courseData.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                {courseData.rating} ({courseData.reviews.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                {courseData.students.toLocaleString()} students
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                {courseData.instructor.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{courseData.instructor.name}</p>
                <p className="text-sm text-muted-foreground">{courseData.instructor.bio}</p>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <Card variant="elevated" className="h-fit">
            <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl rounded-t-lg">
              {courseData.thumbnail}
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="text-3xl font-bold text-foreground">${courseData.price}</div>
              
              {enrolled ? (
                <div className="space-y-3">
                  <Progress value={15} variant="gradient" className="h-2" />
                  <p className="text-sm text-muted-foreground">15% complete</p>
                  <Link to="/lesson/1">
                    <Button className="w-full" variant="gradient">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button className="w-full" variant="gradient" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}

              <div className="space-y-2 pt-4 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">{courseData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="text-foreground">{courseData.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="text-foreground">{courseData.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="text-foreground flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    Yes
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <p className="text-sm text-muted-foreground">
              {modules.length} modules • {courseData.lessons} lessons • {courseData.duration} total
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-2">
              {modules.map((module, moduleIndex) => (
                <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{module.title}</span>
                      <Badge variant="secondary" className="ml-2">
                        {module.lessons.length} lessons
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          onClick={() => !lesson.locked && handleLessonClick(lesson.id)}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            ) : lesson.type === 'quiz' ? (
                              <FileText className="h-5 w-5 text-accent" />
                            ) : (
                              <Play className="h-5 w-5 text-primary" />
                            )}
                            <span className="text-foreground">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;