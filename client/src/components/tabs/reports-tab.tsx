import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, FileSpreadsheet, File } from "lucide-react";

export function ReportsTab() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [floorFilter, setFloorFilter] = useState("all");
  const [format, setFormat] = useState("");

  const recentReports = [
    {
      name: "Student Performance Summary",
      date: "Jan 11, 2025",
      type: "excel",
      icon: FileSpreadsheet,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      name: "Floor-wise Analysis",
      date: "Jan 10, 2025",
      type: "pdf",
      icon: File,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      name: "Points Transaction History",
      date: "Jan 9, 2025",
      type: "csv",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
  ];

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log("Generating report:", { reportType, startDate, endDate, floorFilter, format });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Generate Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reportType" className="text-sm font-medium text-gray-700">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Student Performance Summary</SelectItem>
                <SelectItem value="floor-analysis">Floor-wise Analysis</SelectItem>
                <SelectItem value="transactions">Points Transaction History</SelectItem>
                <SelectItem value="grades">Grade Distribution Report</SelectItem>
                <SelectItem value="monthly">Monthly Activity Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Date Range</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="floorFilter" className="text-sm font-medium text-gray-700">Filter by Floor</Label>
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Format</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Button
                variant={format === "excel" ? "default" : "outline"}
                className="flex items-center justify-center space-x-2"
                onClick={() => setFormat("excel")}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Excel</span>
              </Button>
              <Button
                variant={format === "pdf" ? "default" : "outline"}
                className="flex items-center justify-center space-x-2"
                onClick={() => setFormat("pdf")}
              >
                <File className="w-4 h-4" />
                <span>PDF</span>
              </Button>
              <Button
                variant={format === "csv" ? "default" : "outline"}
                className="flex items-center justify-center space-x-2"
                onClick={() => setFormat("csv")}
              >
                <FileText className="w-4 h-4" />
                <span>CSV</span>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleGenerateReport}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!reportType || !format}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${report.bgColor} rounded-lg flex items-center justify-center`}>
                    <report.icon className={`w-5 h-5 ${report.color}`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{report.name}</div>
                    <div className="text-sm text-gray-500">Generated on {report.date}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
