import { Router } from "express";
import {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
} from "../controllers/manager.controller.js";
import { authenticate, requireSuperAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication and super admin access
router.use(authenticate);
router.use(requireSuperAdmin);

router.get("/", getManagers);
router.get("/:id", getManager);
router.post("/", createManager);
router.put("/:id", updateManager);
router.delete("/:id", deleteManager);

export default router;
