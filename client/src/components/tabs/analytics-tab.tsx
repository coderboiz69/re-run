import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Activity } from "lucide-react";

export function AnalyticsTab() {
  const performanceMetrics = [
    { title: "Avg Points/Week", value: "4.2", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Improvement Rate", value: "78%", color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Active This Month", value: "156", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { title: "Engagement Rate", value: "92%", color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const activityTimeline = [
    { 
      title: "342 points awarded today", 
      subtitle: "Highest activity day this week",
      color: "bg-green-500"
    },
    { 
      title: "24 grade improvements", 
      subtitle: "Students moved up in rankings",
      color: "bg-blue-500"
    },
    { 
      title: "5 new students added", 
      subtitle: "Database updated with new entries",
      color: "bg-yellow-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Chart visualization would be implemented here</p>
              <p className="text-sm text-gray-400 mt-2">Using Chart.js or similar library</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Points Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Pie chart visualization would be implemented here</p>
              <p className="text-sm text-gray-400 mt-2">Showing grade distribution</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className={`text-center p-4 ${metric.bgColor} rounded-lg`}>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityTimeline.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${activity.color} rounded-full`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                  <div className="text-xs text-gray-500">{activity.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
