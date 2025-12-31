import { Router } from "express";
import { body, query } from "express-validator";
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientsSummary,
} from "../controllers/client.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Validation rules
const createClientValidation = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("اسم الشركة مطلوب")
    .isLength({ min: 2, max: 200 })
    .withMessage("اسم الشركة يجب أن يكون بين 2 و 200 حرف"),
  body("email")
    .isEmail()
    .withMessage("يرجى إدخال بريد إلكتروني صحيح")
    .normalizeEmail(),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("رقم الهاتف غير صحيح"),
  body("website")
    .optional()
    .isURL()
    .withMessage("رابط الموقع غير صحيح"),
  body("subscriptionTier")
    .optional()
    .isIn(["GOLD", "PLATINUM", "DIAMOND"])
    .withMessage("نوع الاشتراك غير صحيح"),
  body("userPassword")
    .optional()
    .isLength({ min: 8 })
    .withMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
];

const updateClientValidation = [
  body("companyName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("اسم الشركة يجب أن يكون بين 2 و 200 حرف"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("يرجى إدخال بريد إلكتروني صحيح")
    .normalizeEmail(),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("رقم الهاتف غير صحيح"),
  body("website")
    .optional()
    .isURL()
    .withMessage("رابط الموقع غير صحيح"),
];

const queryValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("رقم الصفحة غير صحيح"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("عدد العناصر غير صحيح"),
];

// All routes require authentication and admin role
router.use(authenticate, requireAdmin);

// Routes
router.get("/", queryValidation, validateRequest, getClients);
router.get("/summary", getClientsSummary);
router.get("/:id", getClient);
router.post("/", createClientValidation, validateRequest, createClient);
router.put("/:id", updateClientValidation, validateRequest, updateClient);
router.delete("/:id", deleteClient);

export default router;
