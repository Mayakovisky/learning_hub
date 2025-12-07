import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, CheckCircle, Clock } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  type: "course" | "achievement" | "message" | "system";
  timestamp: string;
  read: boolean;
  icon: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Course Completed",
    description: 'You\'ve successfully completed "UI/UX Design Masterclass"',
    type: "course",
    timestamp: "2 hours ago",
    read: false,
    icon: "🎓",
  },
  {
    id: 2,
    title: "New Achievement Unlocked",
    description: 'You\'ve unlocked the "7-Day Streak" achievement',
    type: "achievement",
    timestamp: "5 hours ago",
    read: false,
    icon: "🏆",
  },
  {
    id: 3,
    title: "Message from Dr. Sarah Chen",
    description: "Great work on the latest assignment! Your CSS is improving...",
    type: "message",
    timestamp: "1 day ago",
    read: true,
    icon: "💬",
  },
  {
    id: 4,
    title: "Course Recommendation",
    description: "Based on your interests, we recommend 'React & TypeScript Advanced'",
    type: "system",
    timestamp: "2 days ago",
    read: true,
    icon: "📚",
  },
  {
    id: 5,
    title: "New Course Available",
    description: "Check out our latest course: 'Machine Learning Fundamentals'",
    type: "course",
    timestamp: "3 days ago",
    read: true,
    icon: "🤖",
  },
  {
    id: 6,
    title: "Payment Successful",
    description: "Your subscription has been renewed for another month",
    type: "system",
    timestamp: "1 week ago",
    read: true,
    icon: "✅",
  },
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case "course":
      return "bg-blue-500/10 text-blue-700 border-blue-200";
    case "achievement":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
    case "message":
      return "bg-purple-500/10 text-purple-700 border-purple-200";
    case "system":
      return "bg-gray-500/10 text-gray-700 border-gray-200";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export const Notifications = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline">
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-l-4 transition-colors ${
                notification.read
                  ? "border-l-muted opacity-75"
                  : "border-l-primary bg-primary/5"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="h-3 w-3 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No notifications
              </h3>
              <p className="text-muted-foreground">
                You're all caught up! Check back later for updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
