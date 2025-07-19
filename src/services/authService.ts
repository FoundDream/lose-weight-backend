import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput, AuthResponse } from "../types/auth";

export class AuthService {
  /**
   * 注册用户
   */
  static async register(data: RegisterInput): Promise<AuthResponse> {
    try {
      // 检查用户名是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (existingUser) {
        return {
          success: false,
          message: "用户名已存在",
        };
      }

      // 创建用户
      const hashedPassword = await hashPassword(data.password);
      const user = await prisma.user.create({
        data: {
          username: data.username,
          passwordHash: hashedPassword,
          gender: data.gender,
          age: data.age,
          height: data.height,
          weight: data.weight,
        },
      });

      // 创建目标
      await prisma.goal.create({
        data: {
          userId: user.id,
          targetWeight: data.targetWeight,
          deadline: data.deadline,
        },
      });

      // 生成令牌
      const token = generateToken({
        userId: user.id,
        username: user.username,
      });

      return {
        success: true,
        message: "用户注册成功",
        data: {
          user: {
            id: user.id,
            username: user.username,
          },
          token,
        },
      };
    } catch (error) {
      console.error("注册失败:", error);
      return {
        success: false,
        message: "用户注册失败",
      };
    }
  }

  /**
   * 登录用户
   */
  static async login(data: LoginInput): Promise<AuthResponse> {
    try {
      // 根据用户名查找用户
      const user = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (!user) {
        return {
          success: false,
          message: "无效的用户名或密码",
        };
      }

      // 验证密码
      const isPasswordValid = await comparePassword(
        data.password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        return {
          success: false,
          message: "无效的用户名或密码",
        };
      }

      // 生成令牌
      const token = generateToken({
        userId: user.id,
        username: user.username,
      });

      return {
        success: true,
        message: "登录成功",
        data: {
          user: {
            id: user.id,
            username: user.username,
          },
          token,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "登录失败",
      };
    }
  }
}
