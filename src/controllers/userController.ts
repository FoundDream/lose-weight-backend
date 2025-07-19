import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const username = req.params.username;
      if (!username) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const result = await UserService.getProfile(username);

      res.json(result);
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
