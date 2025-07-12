import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Student } from "@/lib/types";

export function RankingsTab() {
  const [floorFilter, setFloorFilter] = useState("all");
  
  const { data: rankings, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/rankings", { floor: floorFilter }],
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankCardColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const gradeDistribution = [
    { grade: "A+", count: 24, percentage: 4.1, color: "bg-green-500" },
    { grade: "A", count: 87, percentage: 14.9, color: "bg-blue-500" },
    { grade: "B", count: 156, percentage: 26.8, color: "bg-yellow-500" },
    { grade: "C", count: 316, percentage: 54.2, color: "bg-red-500" },
  ];

  const floorRankings = [
    { floor: "Floor 1", avgPoints: 0.0, rank: 1 },
    { floor: "Floor 2", avgPoints: 0.0, rank: 2 },
    { floor: "Floor 3", avgPoints: 0.0, rank: 3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Top Performers */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Top Performers</CardTitle>
              <Select value={floorFilter} onValueChange={setFloorFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Floors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                  <SelectItem value="4">Floor 4</SelectItem>
                  <SelectItem value="5">Floor 5</SelectItem>
                  <SelectItem value="6">Floor 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : rankings && rankings.length > 0 ? (
                rankings.slice(0, 10).map((student, index) => (
                  <div key={student.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${getRankCardColor(index + 1)}`}>
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">
                        {student.studentId} • Room {student.room} • Floor {student.floor}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-gray-900">{student.points}</div>
                      <div className="text-sm text-gray-500">
                        <Badge className={getGradeBadgeColor(student.grade || "D")}>
                          {student.grade || "D"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No students found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gradeDistribution.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 ${grade.color} rounded`}></div>
                    <span className="text-sm font-medium text-gray-700">Grade {grade.grade}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{grade.count}</div>
                    <div className="text-xs text-gray-500">{grade.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floor Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Floor Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {floorRankings.map((floor, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${getRankCardColor(floor.rank)}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {floor.rank}
                    </div>
                    <span className="font-medium text-gray-900">{floor.floor}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-600">{floor.avgPoints}</div>
                    <div className="text-xs text-gray-500">avg points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
