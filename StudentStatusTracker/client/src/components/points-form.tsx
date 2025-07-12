import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus, Save } from "lucide-react";
import { Student } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";

interface PointsFormProps {
  student: Student;
}

export function PointsForm({ student }: PointsFormProps) {
  const [actionType, setActionType] = useState<"add" | "subtract" | null>(null);
  const [pointsAmount, setPointsAmount] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const pointsOptions = {
    positive: [
      { value: "5", label: "Participation in competition (+5)" },
      { value: "5", label: "Helping others (+5)" },
      { value: "10", label: "Room cleaning competition 1st (+10)" },
      { value: "7", label: "Room cleaning competition 2nd (+7)" },
      { value: "5", label: "Room cleaning competition 3rd (+5)" },
      { value: "15", label: "Winners in competition (+15)" },
      { value: "10", label: "Good discipline (+10)" },
    ],
    negative: [
      { value: "5", label: "No Dress code (-5)" },
      { value: "3", label: "Incomplete homework (-3)" },
      { value: "3", label: "Late from playing bell (-3)" },
      { value: "10", label: "Absent to school (-10)" },
      { value: "7", label: "No room cleaning (-7)" },
      { value: "10", label: "Late for prayer (-10)" },
      { value: "10", label: "Fighting (-10)" },
      { value: "5", label: "Indiscipline in study hour (-5)" },
      { value: "5", label: "Roaming outside (-5)" },
      { value: "10", label: "Not speaking in English (-10)" },
      { value: "10", label: "Late for pooja (-10)" },
      { value: "3", label: "Talking in studying (-3)" },
      { value: "10", label: "No discipline (-10)" },
      { value: "5", label: "Speaking Bad words (-5)" },
      { value: "10", label: "Disobeying in-charges (-10)" },
      { value: "20", label: "Damaging gurukul properties (-20)" },
      { value: "3", label: "No pooja equipment (-3)" },
      { value: "3", label: "No cupboard cleaning (-3)" },
    ],
  };

  const updatePointsMutation = useMutation({
    mutationFn: async (data: {
      studentId: number;
      pointsChanged: number;
      reason: string;
      action: string;
      notes?: string;
    }) => {
      await apiRequest("POST", "/api/points", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Points updated successfully!",
      });
      // Reset form
      setActionType(null);
      setPointsAmount("");
      setReason("");
      setNotes("");
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions/recent"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update points. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!actionType || !pointsAmount || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const points = parseInt(pointsAmount);
    const pointsChanged = actionType === "add" ? points : -points;

    updatePointsMutation.mutate({
      studentId: student.id,
      pointsChanged,
      reason,
      action: actionType === "add" ? "Add Points" : "Subtract Points",
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">Action Type</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={actionType === "add" ? "default" : "outline"}
            className="flex items-center justify-center space-x-2"
            onClick={() => setActionType("add")}
          >
            <Plus className="w-4 h-4" />
            <span>Add Points</span>
          </Button>
          <Button
            type="button"
            variant={actionType === "subtract" ? "default" : "outline"}
            className="flex items-center justify-center space-x-2"
            onClick={() => setActionType("subtract")}
          >
            <Minus className="w-4 h-4" />
            <span>Subtract Points</span>
          </Button>
        </div>
      </div>

      {actionType && (
        <>
          <div>
            <Label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-2">
              Points Amount
            </Label>
            <Input
              id="points"
              type="number"
              min="1"
              max="100"
              placeholder="Enter points amount"
              value={pointsAmount}
              onChange={(e) => setPointsAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger>
                <SelectValue placeholder="Select reason..." />
              </SelectTrigger>
              <SelectContent>
                {(actionType === "add" ? pointsOptions.positive : pointsOptions.negative).map((option, index) => (
                  <SelectItem key={index} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Optional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={updatePointsMutation.isPending}
          >
            {updatePointsMutation.isPending ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Updating...</span>
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Points
              </>
            )}
          </Button>
        </>
      )}
    </form>
  );
}
