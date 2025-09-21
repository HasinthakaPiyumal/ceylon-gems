import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  createGem,
  listGems,
  listCategories,
  listByCategory,
  getGem,
  updateGem,
  deleteGem,
} from "../controllers/gems.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createGem);
router.get("/", listGems);
router.get("/categories", listCategories);
router.get("/categories/:category", listByCategory);
router.get("/:id", getGem);
router.put("/:id", updateGem);
router.delete("/:id", deleteGem);

export default router;
