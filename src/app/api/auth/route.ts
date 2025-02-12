import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, isNewUser } = await req.json();

    if (!email || !password || (isNewUser && !name)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isNewUser) {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then((res) => res[0]);

      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        // Insert new user
        await db.insert(users).values({ name, email, password: hashedPassword }).execute();
        return NextResponse.json({ message: "User created" }, { status: 201 });
      } catch (dbError) {
        console.error("Database Error:", dbError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    }

    // Login Logic
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
