import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password, isNewUser } = await req.json();

  if (isNewUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, password: hashedPassword });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  }

  const user = await db.select().from(users).where({ email }).first();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful" });
}
