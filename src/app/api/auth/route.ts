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
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Now including `name` in the insert operation
      await db.insert(users).values({ name, email, password: hashedPassword }).execute();

      return NextResponse.json({ message: "User created" }, { status: 201 });
    }

    // ✅ Fixed query (use `.then(res => res[0])` to get the first row)
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" });

  } catch (error: any) { // ✅ Explicitly type error
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
