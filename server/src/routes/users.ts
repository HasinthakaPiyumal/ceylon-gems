import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { deleteAllUsers } from "../controllers/users.controller";

const router = Router();

router.delete("/", requireAuth, requireRole("ADMIN"), deleteAllUsers);

export default router;
