import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Medal, Flame, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  coursesCompleted: number;
  streak: number;
  averageScore: number;
  region?: string;
}

interface CourseLeaderboard {
  courseId: number;
  courseName: string;
  entries: LeaderboardEntry[];
}

const globalLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Alex Student",
    avatar: "AS",
    points: 8450,
    coursesCompleted: 12,
    streak: 28,
    averageScore: 94,
  },
  {
    rank: 2,
    name: "Jordan Lee",
    avatar: "JL",
    points: 7920,
    coursesCompleted: 11,
    streak: 21,
    averageScore: 91,
  },
  {
    rank: 3,
    name: "Sam Wilson",
    avatar: "SW",
    points: 7650,
    coursesCompleted: 10,
    streak: 18,
    averageScore: 89,
  },
  {
    rank: 4,
    name: "Taylor Chen",
    avatar: "TC",
    points: 7220,
    coursesCompleted: 9,
    streak: 14,
    averageScore: 87,
  },
  {
    rank: 5,
    name: "Morgan Davis",
    avatar: "MD",
    points: 6890,
    coursesCompleted: 8,
    streak: 12,
    averageScore: 85,
  },
  {
    rank: 6,
    name: "Casey Johnson",
    avatar: "CJ",
    points: 6450,
    coursesCompleted: 7,
    streak: 10,
    averageScore: 83,
  },
  {
    rank: 7,
    name: "Riley Brown",
    avatar: "RB",
    points: 6120,
    coursesCompleted: 6,
    streak: 8,
    averageScore: 81,
  },
  {
    rank: 8,
    name: "Cameron White",
    avatar: "CW",
    points: 5890,
    coursesCompleted: 6,
    streak: 7,
    averageScore: 79,
  },
];

const webDevLeaderboard: CourseLeaderboard = {
  courseId: 1,
  courseName: "Web Development Bootcamp",
  entries: [
    {
      rank: 1,
      name: "Alex Student",
      avatar: "AS",
      points: 2850,
      coursesCompleted: 1,
      streak: 15,
      averageScore: 96,
    },
    {
      rank: 2,
      name: "Taylor Chen",
      avatar: "TC",
      points: 2720,
      coursesCompleted: 1,
      streak: 12,
      averageScore: 94,
    },
    {
      rank: 3,
      name: "Morgan Davis",
      avatar: "MD",
      points: 2590,
      coursesCompleted: 1,
      streak: 10,
      averageScore: 92,
    },
  ],
};

const getRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return <Medal className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-orange-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">{rank}</span>;
  }
};

const LeaderboardRow = ({ entry, isCurrentUser }: { entry: LeaderboardEntry; isCurrentUser?: boolean }) => (
  <div
    className={cn(
      "flex items-center gap-4 p-4 rounded-lg border transition-colors",
      isCurrentUser
        ? "bg-primary/5 border-primary"
        : "border-transparent hover:bg-muted"
    )}
  >
    {/* Rank */}
    <div className="flex items-center justify-center w-8 flex-shrink-0">
      {getRankMedal(entry.rank)}
    </div>

    {/* Avatar and Name */}
    <div className="flex items-center gap-3 flex-1">
      <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
        {entry.avatar}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-foreground">{entry.name}</p>
        {isCurrentUser && (
          <Badge variant="secondary" className="text-xs">
            You
          </Badge>
        )}
      </div>
    </div>

    {/* Stats */}
    <div className="hidden md:flex items-center gap-6">
      <div className="text-right">
        <p className="text-xs text-muted-foreground">Completed</p>
        <p className="font-semibold text-foreground">{entry.coursesCompleted}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">Streak</p>
        <p className="font-semibold text-foreground flex items-center gap-1">
          <Flame className="h-4 w-4 text-red-500" />
          {entry.streak}d
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">Avg Score</p>
        <p className="font-semibold text-foreground">{entry.averageScore}%</p>
      </div>
    </div>

    {/* Points */}
    <div className="text-right">
      <p className="text-xs text-muted-foreground">Points</p>
      <p className="font-bold text-lg text-primary">{entry.points}</p>
    </div>
  </div>
);

export const Leaderboard = () => {
  const [leaderboardType, setLeaderboardType] = useState("global");

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">
              Compete with other learners
            </p>
          </div>

          <Select value={leaderboardType} onValueChange={setLeaderboardType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select leaderboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="web-dev">Web Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Highlights */}
        {leaderboardType === "global" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {globalLeaderboard.slice(0, 3).map((entry, index) => (
              <Card key={entry.rank} className="border-2 border-yellow-500/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium mx-auto mb-3">
                    {entry.avatar}
                  </div>
                  <h3 className="font-bold text-lg text-foreground">
                    {entry.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary mt-2">
                    {entry.points}
                  </p>
                  <p className="text-sm text-muted-foreground">Points</p>
                  <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                    <Badge variant="outline">{entry.coursesCompleted} Courses</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-red-500" />
                      {entry.streak}d
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Main Leaderboard */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              {leaderboardType === "global"
                ? "Global Rankings"
                : "Web Development Rankings"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-4">
              {(leaderboardType === "global"
                ? globalLeaderboard
                : webDevLeaderboard.entries
              ).map((entry) => (
                <LeaderboardRow
                  key={entry.rank}
                  entry={entry}
                  isCurrentUser={entry.name === "Alex Student"}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <p className="text-3xl font-bold text-primary">#1</p>
                </div>
                <Trophy className="h-10 w-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-foreground">8,450</p>
                </div>
                <Target className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Points to 2nd</p>
                  <p className="text-3xl font-bold text-foreground">530</p>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Flame className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>How Rankings Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Points System</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Complete a lesson: 10 points</li>
                  <li>✓ Perfect quiz score: 25 points</li>
                  <li>✓ Complete a course: 100 points</li>
                  <li>✓ Maintain streak: 5 points/day</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Badges</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>🥇 Gold: Top 3 globally</li>
                  <li>🥈 Silver: Top 10 globally</li>
                  <li>🥉 Bronze: Top 25 globally</li>
                  <li>⭐ Star: Course completion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
