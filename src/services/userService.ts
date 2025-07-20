import prisma from "../config/database";
import { UserResponse } from "../types/user";

export class UserService {
  static async getProfile(username: string): Promise<UserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
          goals: true,
          weightLogs: true,
        },
      });

      const bmi = (user!.weight / (user!.height / 100) ** 2).toFixed(1);

      return {
        success: true,
        message: "查询用户资料成功",
        data: {
          id: user?.id ?? 0,
          username: user?.username ?? "",
          gender: user?.gender ?? "",
          age: user?.age ?? 0,
          height: user?.height ?? 0,
          initialWeight: user?.weight ?? 0,
          currentWeight:
            user?.weightLogs[user?.weightLogs.length - 1]?.weight ??
            user?.weight ??
            0,
          targetWeight: user?.goals[0]?.targetWeight ?? 0,
          deadline: user?.goals[0]?.deadline ?? new Date(),
          bmi: Number(bmi),
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
