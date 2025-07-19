# Express Rules

- Use `express.Router()` per module (user, weight, etc.)
- Each route file should only define its own module's endpoints
- Export default routers from each file: `export default router`

**Example (src/routes/user.ts):**

```ts
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
```

Don't define app inside route files

Mount routers centrally in src/server.ts:

```ts
import userRoutes from "./routes/user";
app.use("/api/user", userRoutes);
```
