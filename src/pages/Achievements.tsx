import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Star, Target, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: "common" | "uncommon" | "rare" | "epic";
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Course",
    description: "Complete your first course",
    icon: "🎓",
    category: "Courses",
    unlockedDate: "Dec 1, 2024",
    rarity: "common",
  },
  {
    id: 2,
    title: "7-Day Streak",
    description: "Study 7 consecutive days",
    icon: "🔥",
    category: "Dedication",
    unlockedDate: "Dec 3, 2024",
    rarity: "uncommon",
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Score 100% on 5 quizzes",
    icon: "💯",
    category: "Quizzes",
    unlockedDate: "Dec 5, 2024",
    rarity: "rare",
  },
  {
    id: 4,
    title: "Knowledge Seeker",
    description: "Complete 10 courses",
    icon: "📚",
    category: "Courses",
    progress: 3,
    maxProgress: 10,
    rarity: "epic",
  },
  {
    id: 5,
    title: "Speed Runner",
    description: "Complete a course in less than 1 week",
    icon: "⚡",
    category: "Speed",
    unlockedDate: "Dec 4, 2024",
    rarity: "uncommon",
  },
  {
    id: 6,
    title: "30-Day Streak",
    description: "Study 30 consecutive days",
    icon: "💪",
    category: "Dedication",
    progress: 18,
    maxProgress: 30,
    rarity: "epic",
  },
  {
    id: 7,
    title: "Social Butterfly",
    description: "Connect with 5 other students",
    icon: "🦋",
    category: "Social",
    progress: 2,
    maxProgress: 5,
    rarity: "uncommon",
  },
  {
    id: 8,
    title: "Expert",
    description: "Achieve 90% average score across all courses",
    icon: "🌟",
    category: "Performance",
    rarity: "epic",
  },
];

const rarityColors: Record<string, string> = {
  common: "bg-gray-100 text-gray-700 border-gray-300",
  uncommon: "bg-green-100 text-green-700 border-green-300",
  rare: "bg-blue-100 text-blue-700 border-blue-300",
  epic: "bg-purple-100 text-purple-700 border-purple-300",
};

const rarityIcons: Record<string, React.ReactNode> = {
  common: "★",
  uncommon: "★★",
  rare: "★★★",
  epic: "★★★★",
};

export const Achievements = () => {
  const unlockedAchievements = achievements.filter((a) => a.unlockedDate);
  const lockedAchievements = achievements.filter((a) => !a.unlockedDate);

  const totalPoints = unlockedAchievements.length * 10 + 
    lockedAchievements.reduce((sum, a) => {
      if (a.progress && a.maxProgress) {
        return sum + Math.floor((a.progress / a.maxProgress) * 10);
      }
      return sum;
    }, 0);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground mt-1">
            Unlock badges and track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-foreground">{totalPoints}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unlocked</p>
                  <p className="text-3xl font-bold text-foreground">
                    {unlockedAchievements.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="text-3xl font-bold text-foreground">
                    {Math.round(
                      (unlockedAchievements.length / achievements.length) * 100
                    )}
                    %
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                🏆 Unlocked Achievements ({unlockedAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedAchievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{achievement.icon}</div>
                        <Badge className={cn(
                          "border",
                          rarityColors[achievement.rarity]
                        )}>
                          {rarityIcons[achievement.rarity]}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-foreground mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{achievement.category}</span>
                        <span>Unlocked {achievement.unlockedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                🔒 Locked Achievements ({lockedAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedAchievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl grayscale">{achievement.icon}</div>
                        <Badge className={cn(
                          "border",
                          rarityColors[achievement.rarity]
                        )}>
                          {rarityIcons[achievement.rarity]}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-foreground mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>

                      {achievement.progress !== undefined &&
                        achievement.maxProgress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground">
                                Progress
                              </span>
                              <span className="text-xs font-medium">
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <Progress
                              value={
                                (achievement.progress / achievement.maxProgress) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        )}

                      <div className="text-xs text-muted-foreground">
                        {achievement.category}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Achievements;
