import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Target, Play, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const coursesInProgress = [
  { id: 1, title: "Introduction to Web Development", progress: 65, instructor: "Dr. Sarah Chen", thumbnail: "🌐", totalLessons: 24, completedLessons: 16, firstIncompleteLesson: 3 },
  { id: 2, title: "Data Science Fundamentals", progress: 30, instructor: "Prof. Michael Brown", thumbnail: "📊", totalLessons: 32, completedLessons: 10, firstIncompleteLesson: 5 },
  { id: 3, title: "UI/UX Design Principles", progress: 85, instructor: "Jane Williams", thumbnail: "🎨", totalLessons: 18, completedLessons: 15, firstIncompleteLesson: 16 },
];

const recentLessons = [
  { id: 1, lessonId: 3, title: "CSS Flexbox Deep Dive", course: "Web Development", duration: "45 min", completed: true },
  { id: 2, lessonId: 5, title: "Introduction to Pandas", course: "Data Science", duration: "60 min", completed: false },
  { id: 3, lessonId: 7, title: "Color Theory Basics", course: "UI/UX Design", duration: "30 min", completed: true },
];

const achievements = [
  { icon: "🏆", title: "First Course", description: "Completed your first course" },
  { icon: "🔥", title: "7-Day Streak", description: "Studied 7 days in a row" },
  { icon: "⭐", title: "Quiz Master", description: "Scored 100% on 5 quizzes" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResumeClick = () => {
    // Find first course with incomplete lessons (coursesInProgress[0] is "in progress")
    const courseToResume = coursesInProgress[0];
    const lessonId = courseToResume.firstIncompleteLesson;
    
    toast({
      title: "Resuming learning",
      description: `Continuing ${courseToResume.title}...`,
    });

    // Navigate with delay to show toast
    setTimeout(() => {
      navigate(`/lesson/${courseToResume.id}/${lessonId}`);
    }, 1500);
  };

  const handleLessonClick = (courseId: number, lessonId: number) => {
    navigate(`/lesson/${courseId}/${lessonId}`);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground mt-1">Continue your learning journey</p>
          </div>
          <Button variant="gradient" onClick={handleResumeClick}>
            <Play className="h-4 w-4 mr-2" />
            Resume Learning
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Hours</p>
                  <p className="text-3xl font-bold text-foreground">47.5</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-3xl font-bold text-foreground">87%</p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses in Progress */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Courses in Progress</h2>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {coursesInProgress.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`}>
                  <Card variant="interactive" className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                          {course.thumbnail}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate hover:underline">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <Progress value={course.progress} className="flex-1 h-2" variant="gradient" />
                            <span className="text-sm font-medium text-foreground">{course.progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {course.completedLessons} of {course.totalLessons} lessons completed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Lessons */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Lessons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentLessons.map((lesson, index) => (
                  <div
                    key={index}
                    onClick={() => handleLessonClick(lesson.id, lesson.lessonId)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                      <Play className={`h-4 w-4 ${lesson.completed ? 'text-green-500' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.course} • {lesson.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <div className="h-10 w-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-xl flex items-center justify-center text-xl">
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
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

export default StudentDashboard;