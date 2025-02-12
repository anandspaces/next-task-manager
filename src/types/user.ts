export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Hashed password (should not be sent to frontend)
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}
