import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home, BookOpen, Users, BarChart3, Settings, Bell, Search, Menu, X,
  GraduationCap, MessageSquare, Trophy, CreditCard, LogOut, ChevronDown, Clock, ExternalLink
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "instructor" | "admin";
}

const studentNav = [
  { label: "Dashboard", icon: Home, href: "/student" },
  { label: "My Courses", icon: BookOpen, href: "/student/courses" },
  { label: "Browse Courses", icon: GraduationCap, href: "/courses" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Achievements", icon: Trophy, href: "/achievements" },
  { label: "Leaderboard", icon: BarChart3, href: "/leaderboard" },
];

const instructorNav = [
  { label: "Dashboard", icon: Home, href: "/instructor" },
  { label: "My Courses", icon: BookOpen, href: "/instructor/courses" },
  { label: "Students", icon: Users, href: "/instructor/students" },
  { label: "Analytics", icon: BarChart3, href: "/instructor/analytics" },
  { label: "Messages", icon: MessageSquare, href: "/messages" },
  { label: "Earnings", icon: CreditCard, href: "/instructor/earnings" },
];

const adminNav = [
  { label: "Dashboard", icon: Home, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Courses", icon: BookOpen, href: "/admin/courses" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Payments", icon: CreditCard, href: "/admin/payments" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

// Mock database for search
const searchDatabase = {
  courses: [
    { id: 1, title: "Complete Web Development Bootcamp", category: "Course", icon: "🌐" },
    { id: 2, title: "Data Science Fundamentals", category: "Course", icon: "📊" },
    { id: 3, title: "UI/UX Design Principles", category: "Course", icon: "🎨" },
    { id: 4, title: "Advanced JavaScript", category: "Course", icon: "⚙️" },
    { id: 5, title: "React Mastery", category: "Course", icon: "⚛️" },
  ],
  lessons: [
    { id: 1, title: "Introduction to the Course", category: "Lesson", icon: "📹", courseId: 1 },
    { id: 2, title: "Setting Up Your Development Environment", category: "Lesson", icon: "📹", courseId: 1 },
    { id: 3, title: "CSS Flexbox Deep Dive", category: "Lesson", icon: "📹", courseId: 1 },
    { id: 5, title: "Introduction to CSS", category: "Lesson", icon: "📹", courseId: 1 },
    { id: 7, title: "Box Model Deep Dive", category: "Lesson", icon: "📹", courseId: 1 },
  ],
  users: [
    { id: 1, name: "Dr. Sarah Chen", category: "Instructor", icon: "👨‍🏫" },
    { id: 2, name: "Prof. Michael Brown", category: "Instructor", icon: "👨‍🏫" },
    { id: 3, name: "Jane Williams", category: "Instructor", icon: "👩‍🏫" },
  ],
};

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const staticNotifications: Notification[] = [
    {
      id: 1,
      title: "Course Completed",
      description: 'You\'ve successfully completed "UI/UX Design Masterclass"',
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New Achievement Unlocked",
      description: 'You\'ve unlocked the "7-Day Streak" achievement',
      timestamp: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Message from Dr. Sarah Chen",
      description: "Great work on the latest assignment! Your CSS is improving...",
      timestamp: "1 day ago",
      read: true,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const queryLower = query.toLowerCase();
    const results = [
      ...searchDatabase.courses
        .filter(course => course.title.toLowerCase().includes(queryLower))
        .map(course => ({ ...course, type: "course", href: `/course/${course.id}` })),
      ...searchDatabase.lessons
        .filter(lesson => lesson.title.toLowerCase().includes(queryLower))
        .map(lesson => ({ ...lesson, type: "lesson", href: `/lesson/${lesson.courseId}/${lesson.id}` })),
      ...searchDatabase.users
        .filter(user => user.name.toLowerCase().includes(queryLower))
        .map(user => ({ ...user, type: "user" })),
    ];

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(true);
  };

  const handleSearchResultClick = (result: any) => {
    if (result.href) {
      navigate(result.href);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleLogout = () => {
    // Clear any auth tokens/session data
    localStorage.clear();
    sessionStorage.clear();
    
    // Show logout notification
    // (In a real app, you'd use a toast here)
    console.log("User logged out");
    
    // Redirect to landing page
    navigate("/");
  };

  const navItems = role === "admin" ? adminNav : role === "instructor" ? instructorNav : studentNav;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">LearnHub</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
            >
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                {role === "admin" ? "AD" : role === "instructor" ? "IN" : "ST"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {role === "admin" ? "Admin User" : role === "instructor" ? "Dr. Sarah Chen" : "Alex Student"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start mt-2 text-muted-foreground hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, lessons..." 
                  className="pl-10 h-9" 
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                />

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/50 last:border-b-0"
                        >
                          <span className="text-lg">{result.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{result.title || result.name}</p>
                            <p className="text-xs text-muted-foreground">{result.category}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                    {searchResults.length === 0 && (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No results found
                      </div>
                    )}
                  </div>
                )}

                {showSearchResults && searchQuery && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center text-sm text-muted-foreground">
                    No courses, lessons, or instructors found
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </button>

                {/* Notification Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-40">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {staticNotifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer last:border-b-0 ${
                            !notif.read ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`h-2 w-2 rounded-full flex-shrink-0 mt-1 ${!notif.read ? "bg-primary" : "bg-transparent"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">{notif.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {notif.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {notif.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border flex gap-2">
                      <Link to="/notifications" className="flex-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setNotificationsOpen(false)}
                        >
                          View All
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-9 w-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium text-sm lg:hidden">
                {role.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};