import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { projects } from "@/db/schema";

export async function GET() {
  const allProjects = await db.select().from(projects);
  return NextResponse.json(allProjects);
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  
  // ✅ Explicitly specify the returning fields instead of "*"
  const newProject = await db
    .insert(projects)
    .values({ name, description })
    .returning({ id: projects.id, name: projects.name, description: projects.description });

  return NextResponse.json(newProject);
}
