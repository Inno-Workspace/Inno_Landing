import { Router } from "express";
import {
  getOnlineUsers,
  updateUserOnlineStatus,
  updateHeartbeat,
  setUserActiveStatus,
  getAllUsers,
} from "../controllers/user.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// User routes
router.put("/status", updateUserOnlineStatus);
router.post("/heartbeat", updateHeartbeat);

// Admin routes
router.get("/", requireAdmin, getAllUsers);
router.get("/online", requireAdmin, getOnlineUsers);
router.put("/:userId/active", requireAdmin, setUserActiveStatus);

export default router;
