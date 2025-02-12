import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default defineConfig({
  schema: "./src/db/schema.ts", // Path to schema file
  out: "./drizzle", // Directory for migrations
  dialect: "postgresql", // Set PostgreSQL as the database dialect
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
  },
});
