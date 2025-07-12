import {
  students,
  pointsTransactions,
  activityLogs,
  systemStats,
  type Student,
  type InsertStudent,
  type UpdateStudent,
  type PointsTransaction,
  type InsertPointsTransaction,
  type ActivityLog,
  type InsertActivityLog,
  type SystemStats,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, like, or, and, sql, count } from "drizzle-orm";

export interface IStorage {
  // Student operations
  getAllStudents(): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | undefined>;
  getStudentByStudentId(studentId: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: UpdateStudent): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  searchStudents(query: string): Promise<Student[]>;

  // Points operations
  addPointsTransaction(transaction: InsertPointsTransaction): Promise<PointsTransaction>;
  getStudentTransactions(studentId: number): Promise<PointsTransaction[]>;
  getAllTransactions(): Promise<PointsTransaction[]>;
  getRecentTransactions(limit: number): Promise<PointsTransaction[]>;

  // Activity logs
  addActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getRecentActivity(limit: number): Promise<ActivityLog[]>;

  // Statistics
  getSystemStats(): Promise<SystemStats>;
  updateSystemStats(): Promise<void>;

  // Rankings
  getTopStudents(limit: number): Promise<Student[]>;
  getStudentsByFloor(floor: string): Promise<Student[]>;
  getStudentsByGrade(grade: string): Promise<Student[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllStudents(): Promise<Student[]> {
    return await db.select().from(students).orderBy(desc(students.points));
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async getStudentByStudentId(studentId: string): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.studentId, studentId));
    return student;
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [newStudent] = await db
      .insert(students)
      .values(student)
      .returning();
    await this.updateSystemStats();
    return newStudent;
  }

  async updateStudent(id: number, student: UpdateStudent): Promise<Student | undefined> {
    const [updatedStudent] = await db
      .update(students)
      .set({ ...student, updatedAt: new Date() })
      .where(eq(students.id, id))
      .returning();
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id));
    await this.updateSystemStats();
    return (result.rowCount || 0) > 0;
  }

  async searchStudents(query: string): Promise<Student[]> {
    return await db
      .select()
      .from(students)
      .where(
        or(
          like(students.name, `%${query}%`),
          like(students.studentId, `%${query}%`),
          like(students.room, `%${query}%`),
          like(students.floor, `%${query}%`)
        )
      )
      .orderBy(desc(students.points));
  }

  async addPointsTransaction(transaction: InsertPointsTransaction): Promise<PointsTransaction> {
    const [newTransaction] = await db
      .insert(pointsTransactions)
      .values(transaction)
      .returning();

    // Update student points
    await db
      .update(students)
      .set({
        points: sql`${students.points} + ${transaction.pointsChanged}`,
        grade: sql`CASE 
          WHEN ${students.points} + ${transaction.pointsChanged} >= 80 THEN 'A+'
          WHEN ${students.points} + ${transaction.pointsChanged} >= 60 THEN 'A'
          WHEN ${students.points} + ${transaction.pointsChanged} >= 40 THEN 'B'
          WHEN ${students.points} + ${transaction.pointsChanged} >= 20 THEN 'C'
          ELSE 'D'
        END`,
        updatedAt: new Date(),
      })
      .where(eq(students.id, transaction.studentId));

    await this.updateSystemStats();
    return newTransaction;
  }

  async getStudentTransactions(studentId: number): Promise<PointsTransaction[]> {
    return await db
      .select()
      .from(pointsTransactions)
      .where(eq(pointsTransactions.studentId, studentId))
      .orderBy(desc(pointsTransactions.createdAt));
  }

  async getAllTransactions(): Promise<PointsTransaction[]> {
    return await db
      .select()
      .from(pointsTransactions)
      .orderBy(desc(pointsTransactions.createdAt));
  }

  async getRecentTransactions(limit: number): Promise<PointsTransaction[]> {
    return await db
      .select()
      .from(pointsTransactions)
      .orderBy(desc(pointsTransactions.createdAt))
      .limit(limit);
  }

  async addActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const [newLog] = await db
      .insert(activityLogs)
      .values(log)
      .returning();
    return newLog;
  }

  async getRecentActivity(limit: number): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit);
  }

  async getSystemStats(): Promise<SystemStats> {
    const [stats] = await db.select().from(systemStats).limit(1);
    if (!stats) {
      await this.updateSystemStats();
      const [newStats] = await db.select().from(systemStats).limit(1);
      return newStats;
    }
    return stats;
  }

  async updateSystemStats(): Promise<void> {
    const [totalStudentsResult] = await db
      .select({ count: count() })
      .from(students);

    const [activeStudentsResult] = await db
      .select({ count: count() })
      .from(students)
      .where(eq(students.active, true));

    const [totalPointsResult] = await db
      .select({ total: sql<number>`sum(${students.points})` })
      .from(students);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayActionsResult] = await db
      .select({ count: count() })
      .from(pointsTransactions)
      .where(sql`${pointsTransactions.createdAt} >= ${today}`);

    const statsData = {
      totalStudents: totalStudentsResult.count,
      activeStudents: activeStudentsResult.count,
      totalPoints: totalPointsResult.total || 0,
      todayActions: todayActionsResult.count,
      lastUpdated: new Date(),
    };

    const [existingStats] = await db.select().from(systemStats).limit(1);
    
    if (existingStats) {
      await db.update(systemStats).set(statsData).where(eq(systemStats.id, existingStats.id));
    } else {
      await db.insert(systemStats).values(statsData);
    }
  }

  async getTopStudents(limit: number): Promise<Student[]> {
    return await db
      .select()
      .from(students)
      .where(eq(students.active, true))
      .orderBy(desc(students.points))
      .limit(limit);
  }

  async getStudentsByFloor(floor: string): Promise<Student[]> {
    return await db
      .select()
      .from(students)
      .where(eq(students.floor, floor))
      .orderBy(desc(students.points));
  }

  async getStudentsByGrade(grade: string): Promise<Student[]> {
    return await db
      .select()
      .from(students)
      .where(eq(students.grade, grade))
      .orderBy(desc(students.points));
  }
}

export const storage = new DatabaseStorage();
