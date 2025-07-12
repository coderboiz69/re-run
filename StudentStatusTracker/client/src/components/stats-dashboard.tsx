import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Star, TrendingUp } from "lucide-react";
import { SystemStats } from "@/lib/types";

export function StatsDashboard() {
  const { data: stats, isLoading } = useQuery<SystemStats>({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12",
      changeText: "from last month"
    },
    {
      title: "Active Students",
      value: stats?.activeStudents || 0,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: stats?.activeStudents && stats?.totalStudents ? 
        `${((stats.activeStudents / stats.totalStudents) * 100).toFixed(1)}%` : "0%",
      changeText: "active rate"
    },
    {
      title: "Total Points",
      value: stats?.totalPoints || 0,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: `+${stats?.todayActions || 0}`,
      changeText: "today"
    },
    {
      title: "Avg Grade",
      value: "C+",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "↗",
      changeText: "trending up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-1">{stat.changeText}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
