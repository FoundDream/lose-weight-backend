import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router: Router = Router();

router.get("/profile/:username", authenticateToken, UserController.getProfile);

export default router;
