import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentSearch } from "@/components/student-search";
import { PointsForm } from "@/components/points-form";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { Student, PointsTransaction } from "@/lib/types";

export function PointsTab() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: recentTransactions, isLoading: transactionsLoading } = useQuery<PointsTransaction[]>({
    queryKey: ["/api/transactions/recent"],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Points Management Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Points Management</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentSearch onStudentSelect={setSelectedStudent} />
          
          {selectedStudent && (
            <>
              {/* Selected Student Info */}
              <Card className="bg-gray-50 mb-6">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Student</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900 ml-2">{selectedStudent.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">ID:</span>
                      <span className="font-mono text-gray-900 ml-2">{selectedStudent.studentId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Room:</span>
                      <span className="text-gray-900 ml-2">{selectedStudent.room}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Current Points:</span>
                      <span className="font-medium text-gray-900 ml-2">{selectedStudent.points}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Grade:</span>
                      <Badge className="ml-2 bg-red-100 text-red-800">{selectedStudent.grade || "D"}</Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={selectedStudent.active ? "default" : "secondary"} className="ml-2">
                        {selectedStudent.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <PointsForm student={selectedStudent} />
            </>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactionsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : recentTransactions && recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.pointsChanged > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.pointsChanged > 0 ? (
                      <Plus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Student ID: {transaction.studentId}</div>
                    <div className="text-sm text-gray-500">{transaction.reason}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(transaction.createdAt).toLocaleString()} • {transaction.addedBy}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.pointsChanged > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.pointsChanged > 0 ? '+' : ''}{transaction.pointsChanged}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recent transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
