import prisma from "../config/database";
import { UserResponse } from "../types/user";

export class UserService {
  static async getProfile(username: string): Promise<UserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
          goals: true,
        },
      });

      return {
        success: true,
        message: "查询用户资料成功",
        data: {
          id: user?.id ?? 0,
          username: user?.username ?? "",
          gender: user?.gender ?? "",
          age: user?.age ?? 0,
          height: user?.height ?? 0,
          weight: user?.weight ?? 0,
          targetWeight: user?.goals[0]?.targetWeight ?? 0,
          deadline: user?.goals[0]?.deadline ?? new Date(),
        },
      };
    } catch (error) {
      console.error("查询用户资料失败:", error);
      return {
        success: false,
        message: "查询用户资料失败",
      };
    }
  }
}
