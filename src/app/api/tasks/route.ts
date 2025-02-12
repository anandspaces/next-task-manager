import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { tasks } from "@/db/schema";

export async function GET() {
  const allTasks = await db.select().from(tasks);
  return NextResponse.json(allTasks);
}

export async function POST(req: NextRequest) {
  const { title, description, dueDate } = await req.json();

  // ✅ Explicitly specify the returning fields
  const newTask = await db
    .insert(tasks)
    .values({ title, description, dueDate })
    .returning({ id: tasks.id, title: tasks.title, description: tasks.description, dueDate: tasks.dueDate });

  return NextResponse.json(newTask);
}
