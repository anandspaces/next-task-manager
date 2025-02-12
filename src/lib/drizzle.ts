import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL as string, {
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : "require",
});

export const db = drizzle(client);

// ✅ Check if the database is connected
(async () => {
  try {
    await client`SELECT 1`; // Simple query to check connection
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit if DB connection fails
  }
})();
