import { z } from "zod";

// Zod schemas for validation
export const RegisterSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
  gender: z.string().min(1).max(10),
  age: z.number().min(1).max(100),
  height: z.number().min(1).max(250),
  weight: z.number().min(1).max(250),
  targetWeight: z.number().min(1).max(250),
  deadline: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()),
});

export const LoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

// TypeScript types derived from Zod schemas
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

// JWT payload type
export interface JwtPayload {
  userId: number;
  username: string;
}

// API response types
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: number;
      username: string;
    };
    token?: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}
