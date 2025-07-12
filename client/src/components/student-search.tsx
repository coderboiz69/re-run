import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Student } from "@/lib/types";

interface StudentSearchProps {
  onStudentSelect: (student: Student) => void;
}

export function StudentSearch({ onStudentSelect }: StudentSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: searchResults, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students/search", { q: searchQuery }],
    enabled: searchQuery.length >= 2,
  });

  useEffect(() => {
    setShowResults(searchQuery.length >= 2);
  }, [searchQuery]);

  const handleStudentSelect = (student: Student) => {
    onStudentSelect(student);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="mb-6">
      <Label htmlFor="student-search" className="block text-sm font-medium text-gray-700 mb-2">
        Search Student
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          id="student-search"
          placeholder="Type student name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        
        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 text-center text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto"></div>
                <span className="ml-2">Searching...</span>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              searchResults.map((student) => (
                <div
                  key={student.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">
                    {student.studentId} • Room {student.room} • Floor {student.floor} • Points: {student.points}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No students found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
