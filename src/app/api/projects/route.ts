import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { projects } from "@/db/schema";

export async function GET() {
  const allProjects = await db.select().from(projects);
  return NextResponse.json(allProjects);
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  const newProject = await db.insert(projects).values({ name, description }).returning("*");
  return NextResponse.json(newProject);
}
