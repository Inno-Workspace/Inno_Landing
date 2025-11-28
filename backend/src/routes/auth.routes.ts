import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  logout,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Validation rules
const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("يرجى إدخال بريد إلكتروني صحيح")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("الاسم مطلوب")
    .isLength({ min: 2, max: 100 })
    .withMessage("الاسم يجب أن يكون بين 2 و 100 حرف"),
  body("phone").optional().isMobilePhone("any").withMessage("رقم الهاتف غير صحيح"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("يرجى إدخال بريد إلكتروني صحيح")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
];

const updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("الاسم يجب أن يكون بين 2 و 100 حرف"),
  body("phone").optional().isMobilePhone("any").withMessage("رقم الهاتف غير صحيح"),
];

const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("كلمة المرور الحالية مطلوبة"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل"),
];

// Public routes
router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

// Protected routes
router.get("/me", authenticate, getCurrentUser);
router.put("/profile", authenticate, updateProfileValidation, validateRequest, updateProfile);
router.put("/password", authenticate, changePasswordValidation, validateRequest, changePassword);
router.post("/logout", authenticate, logout);

export default router;
