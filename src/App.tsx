import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourseCatalog from "./pages/courses/CourseCatalog";
import CourseDetail from "./pages/courses/CourseDetail";
import LessonViewer from "./pages/courses/LessonViewer";
import Messages from "./pages/Messages";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/lesson/:courseId/:lessonId" element={<LessonViewer />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
