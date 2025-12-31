import { Router } from "express";
import { body, query } from "express-validator";
import {
  updateSubscription,
  getExpiringSubscriptions,
  renewSubscription,
  cancelSubscription,
  getSubscriptionStats,
} from "../controllers/subscription.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Validation rules
const updateSubscriptionValidation = [
  body("tier")
    .optional()
    .isIn(["GOLD", "PLATINUM", "DIAMOND"])
    .withMessage("نوع الاشتراك غير صحيح"),
  body("status")
    .optional()
    .isIn(["ACTIVE", "EXPIRED", "CANCELLED", "PENDING"])
    .withMessage("حالة الاشتراك غير صحيحة"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("تاريخ البداية غير صحيح"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("تاريخ الانتهاء غير صحيح"),
];

const renewSubscriptionValidation = [
  body("months")
    .optional()
    .isInt({ min: 1, max: 36 })
    .withMessage("عدد الأشهر يجب أن يكون بين 1 و 36"),
  body("tier")
    .optional()
    .isIn(["GOLD", "PLATINUM", "DIAMOND"])
    .withMessage("نوع الاشتراك غير صحيح"),
];

const queryValidation = [
  query("days")
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage("عدد الأيام غير صحيح"),
];

// All routes require authentication and admin role
router.use(authenticate, requireAdmin);

// Routes
router.get("/stats", getSubscriptionStats);
router.get("/expiring", queryValidation, validateRequest, getExpiringSubscriptions);
router.put("/:clientId", updateSubscriptionValidation, validateRequest, updateSubscription);
router.post("/:clientId/renew", renewSubscriptionValidation, validateRequest, renewSubscription);
router.post("/:clientId/cancel", cancelSubscription);

export default router;
