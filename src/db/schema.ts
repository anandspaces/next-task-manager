import { pgTable, serial, text, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enum definitions for task priority and status
export const taskPriorityEnum = pgEnum("task_priority", ["Low", "Medium", "High"]);
export const taskStatusEnum = pgEnum("task_status", ["Pending", "In Progress", "Completed"]);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password").notNull(), // Hashed password
  role: text("role").default("user"), // "admin" or "user"
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: taskPriorityEnum("priority").notNull().default("Medium"),
  status: taskStatusEnum("status").notNull().default("Pending"),
  projectId: serial("project_id").references(() => projects.id, { onDelete: "CASCADE" }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
