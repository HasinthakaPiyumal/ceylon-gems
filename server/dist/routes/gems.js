"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const gems_controller_1 = require("../controllers/gems.controller");
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
router.post("/", gems_controller_1.createGem);
router.get("/", gems_controller_1.listGems);
router.get("/categories", gems_controller_1.listCategories);
router.get("/categories/:category", gems_controller_1.listByCategory);
router.get("/:id", gems_controller_1.getGem);
router.put("/:id", gems_controller_1.updateGem);
router.delete("/:id", gems_controller_1.deleteGem);
exports.default = router;
//# sourceMappingURL=gems.js.map