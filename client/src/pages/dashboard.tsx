import { useState } from "react";
import { Header } from "@/components/header";
import { StatsDashboard } from "@/components/stats-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/tabs/dashboard-tab";
import { StudentsTab } from "@/components/tabs/students-tab";
import { PointsTab } from "@/components/tabs/points-tab";
import { RankingsTab } from "@/components/tabs/rankings-tab";
import { AnalyticsTab } from "@/components/tabs/analytics-tab";
import { ReportsTab } from "@/components/tabs/reports-tab";
import { Gauge, Users, Star, Trophy, BarChart3, FileText } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <StatsDashboard />
        
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Dashboard</span>
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <Users className="w-4 h-4" />
                  <span>Students</span>
                </TabsTrigger>
                <TabsTrigger
                  value="points"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <Star className="w-4 h-4" />
                  <span>Points Management</span>
                </TabsTrigger>
                <TabsTrigger
                  value="rankings"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Rankings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="flex items-center space-x-2 py-4 px-6 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                >
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="mt-0 p-6">
              <DashboardTab />
            </TabsContent>
            
            <TabsContent value="students" className="mt-0 p-6">
              <StudentsTab />
            </TabsContent>
            
            <TabsContent value="points" className="mt-0 p-6">
              <PointsTab />
            </TabsContent>
            
            <TabsContent value="rankings" className="mt-0 p-6">
              <RankingsTab />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0 p-6">
              <AnalyticsTab />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0 p-6">
              <ReportsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              © 2025 GSTATUS - Gurukul Points Management System
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
              <div className="text-sm text-gray-600">
                Version 2.0.1
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
