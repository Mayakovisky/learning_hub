import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, MessageSquare, Download } from "lucide-react";

const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  instructor: "Dr. Sarah Chen",
  thumbnail: "🌐",
};

const modules = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    lessons: [
      { id: 1, title: "Introduction to the Course", duration: "10 min", completed: true, type: "video" },
      { id: 2, title: "Setting Up Your Development Environment", duration: "15 min", completed: true, type: "video" },
      { id: 3, title: "Your First HTML Page", duration: "20 min", completed: false, type: "video" },
      { id: 4, title: "Quiz: HTML Basics", duration: "10 min", completed: false, type: "quiz" },
    ]
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    lessons: [
      { id: 5, title: "Introduction to CSS", duration: "25 min", completed: false, type: "video" },
      { id: 6, title: "Selectors and Properties", duration: "30 min", completed: false, type: "video" },
      { id: 7, title: "Box Model Deep Dive", duration: "20 min", completed: false, type: "video" },
      { id: 8, title: "Assignment: Style a Landing Page", duration: "45 min", completed: false, type: "assignment" },
    ]
  },
];

// Lesson content mapping
const lessonContent: Record<number, { title: string; content: string; videoUrl: string }> = {
  1: {
    title: "Introduction to the Course",
    content: "Welcome to the Complete Web Development Bootcamp! In this lesson, we'll give you an overview of what you'll learn in this comprehensive course.",
    videoUrl: "https://example.com/video1.mp4",
  },
  2: {
    title: "Setting Up Your Development Environment",
    content: "Let's set up all the tools you'll need to start your web development journey. We'll install VS Code, Node.js, and other essential tools.",
    videoUrl: "https://example.com/video2.mp4",
  },
  3: {
    title: "Your First HTML Page",
    content: "Create your first HTML page! Learn the basic structure and tags you need to build web pages.",
    videoUrl: "https://example.com/video3.mp4",
  },
  4: {
    title: "Quiz: HTML Basics",
    content: "Test your knowledge with this quiz on HTML fundamentals.",
    videoUrl: "https://example.com/quiz1.mp4",
  },
  5: {
    title: "Introduction to CSS",
    content: "Learn how to style your HTML with CSS. We'll cover selectors, properties, and values.",
    videoUrl: "https://example.com/video5.mp4",
  },
  6: {
    title: "Selectors and Properties",
    content: "Dive deeper into CSS selectors and properties. Master the fundamentals of styling.",
    videoUrl: "https://example.com/video6.mp4",
  },
  7: {
    title: "Box Model Deep Dive",
    content: "Understand the CSS box model completely. Learn about margins, padding, borders, and content.",
    videoUrl: "https://example.com/video7.mp4",
  },
  8: {
    title: "Assignment: Style a Landing Page",
    content: "Put your CSS skills to the test by styling a landing page from scratch.",
    videoUrl: "https://example.com/video8.mp4",
  },
};

export const LessonViewer = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const currentLessonId = parseInt(lessonId || "1");
  const lesson = lessonContent[currentLessonId];

  if (!lesson) {
    return (
      <DashboardLayout role="student">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Lesson not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Find current lesson and next lesson
  let currentModule = null;
  let currentLessonIndex = 0;
  for (const module of modules) {
    const index = module.lessons.findIndex(l => l.id === currentLessonId);
    if (index !== -1) {
      currentModule = module;
      currentLessonIndex = index;
      break;
    }
  }

  const getNextLesson = () => {
    if (!currentModule) return null;
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return currentModule.lessons[currentLessonIndex + 1];
    }
    // Find next module's first lesson
    const moduleIndex = modules.findIndex(m => m.id === currentModule.id);
    if (moduleIndex < modules.length - 1) {
      return modules[moduleIndex + 1].lessons[0];
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/course/${courseId}`)}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>

        {/* Video Player Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative">
                <Play className="h-20 w-20 text-primary/50" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">Video</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {lesson.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    20 min
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Lesson
                  </span>
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  {lesson.content}
                </p>

                <div className="flex gap-3">
                  <Button 
                    variant="gradient" 
                    className="flex-1"
                    onClick={() => setLessonCompleted(!lessonCompleted)}
                  >
                    {lessonCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Notes and Resources */}
            <Card>
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="notes" className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      No notes yet. Click the note icon in the video player to add notes.
                    </p>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="resources" className="p-6">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="font-medium text-foreground mb-1">HTML Cheat Sheet</p>
                      <p className="text-sm text-muted-foreground">Quick reference for HTML tags</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="font-medium text-foreground mb-1">Project Files</p>
                      <p className="text-sm text-muted-foreground">Download starter files for this lesson</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Next Lesson */}
            {nextLesson && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Next Lesson</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{nextLesson.title}</p>
                      <p className="text-sm text-muted-foreground">{nextLesson.duration}</p>
                    </div>
                    <Link to={`/lesson/${courseId}/${nextLesson.id}`}>
                      <Button variant="gradient" size="sm">
                        Continue
                        <Play className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Course Outline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Outline</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {modules.map((module) => (
                    <div key={module.id}>
                      <div className="px-6 py-3 bg-muted/50 font-medium text-sm text-foreground">
                        {module.title}
                      </div>
                      <div className="space-y-1">
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/lesson/${courseId}/${lesson.id}`}
                            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                              currentLessonId === lesson.id
                                ? "bg-primary/10 text-primary border-l-2 border-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <Play className="h-4 w-4 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate">{lesson.title}</p>
                              <p className="text-xs opacity-70">{lesson.duration}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">{courseData.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Instructor</p>
                    <p className="text-foreground">{courseData.instructor}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Your Progress</p>
                    <Progress value={25} className="mt-2 h-2" />
                    <p className="text-xs text-muted-foreground mt-1">25% complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonViewer;
