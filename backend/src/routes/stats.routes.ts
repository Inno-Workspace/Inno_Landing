import { Router } from "express";
import {
  getAdminStats,
  getClientStats,
  updateClientStats,
  getActivityLog,
} from "../controllers/stats.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Admin routes
router.get("/admin", requireAdmin, getAdminStats);
router.get("/activity", requireAdmin, getActivityLog);
router.put("/client/:clientId", requireAdmin, updateClientStats);

// Client routes (can access their own stats)
router.get("/client", getClientStats);
router.get("/client/:clientId", getClientStats);

export default router;
