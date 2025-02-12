import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET as string || "supersecretkey";

/** Hash password */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/** Compare password */
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

/** Generate JWT Token */
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
};

/** Verify JWT Token */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
