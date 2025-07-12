export interface Student {
  id: number;
  studentId: string;
  name: string;
  room: string;
  floor: string;
  points: number;
  grade?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PointsTransaction {
  id: number;
  studentId: number;
  pointsChanged: number;
  reason: string;
  action: string;
  notes?: string;
  addedBy: string;
  createdAt: string;
}

export interface ActivityLog {
  id: number;
  studentId?: number;
  action: string;
  description: string;
  createdAt: string;
}

export interface SystemStats {
  id: number;
  totalStudents: number;
  activeStudents: number;
  totalPoints: number;
  todayActions: number;
  lastUpdated: string;
}
