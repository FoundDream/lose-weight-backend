import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterSchema, LoginSchema } from "../types/auth";

export class AuthController {
  /**
   * 注册用户
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // 验证输入
      const validatedData = RegisterSchema.parse(req.body);

      // 调用服务
      const result = await AuthService.register(validatedData);

      // 发送响应
      const statusCode = result.success ? 201 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "无效的输入数据",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * 登录用户
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // 验证输入
      const validatedData = LoginSchema.parse(req.body);

      // 调用服务
      const result = await AuthService.login(validatedData);

      // 发送响应
      const statusCode = result.success ? 200 : 401;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "无效的输入数据",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
