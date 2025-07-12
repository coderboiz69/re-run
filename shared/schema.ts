import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  room: varchar("room", { length: 20 }).notNull(),
  floor: varchar("floor", { length: 5 }).notNull(),
  points: integer("points").default(0).notNull(),
  grade: varchar("grade", { length: 5 }).default("D"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pointsTransactions = pgTable("points_transactions", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  pointsChanged: integer("points_changed").notNull(),
  reason: varchar("reason", { length: 255 }).notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  notes: text("notes"),
  addedBy: varchar("added_by", { length: 100 }).default("Admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id),
  action: varchar("action", { length: 100 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const systemStats = pgTable("system_stats", {
  id: serial("id").primaryKey(),
  totalStudents: integer("total_students").default(0).notNull(),
  activeStudents: integer("active_students").default(0).notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  todayActions: integer("today_actions").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Relations
export const studentsRelations = relations(students, ({ many }) => ({
  transactions: many(pointsTransactions),
  activityLogs: many(activityLogs),
}));

export const pointsTransactionsRelations = relations(pointsTransactions, ({ one }) => ({
  student: one(students, {
    fields: [pointsTransactions.studentId],
    references: [students.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  student: one(students, {
    fields: [activityLogs.studentId],
    references: [students.id],
  }),
}));

// Zod schemas
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPointsTransactionSchema = createInsertSchema(pointsTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});

export const updateStudentSchema = insertStudentSchema.partial();

// Types
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type UpdateStudent = z.infer<typeof updateStudentSchema>;

export type PointsTransaction = typeof pointsTransactions.$inferSelect;
export type InsertPointsTransaction = z.infer<typeof insertPointsTransactionSchema>;

export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;

export type SystemStats = typeof systemStats.$inferSelect;
