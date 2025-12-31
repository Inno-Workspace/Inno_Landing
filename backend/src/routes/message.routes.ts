import { Router } from "express";
import { body } from "express-validator";
import {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
  getUnreadCount,
  archiveConversation,
} from "../controllers/message.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Validation rules
const createConversationValidation = [
  body("participantIds")
    .isArray({ min: 1 })
    .withMessage("يجب تحديد مشارك واحد على الأقل"),
  body("subject")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("الموضوع يجب أن يكون أقل من 200 حرف"),
];

const sendMessageValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("محتوى الرسالة مطلوب")
    .isLength({ max: 5000 })
    .withMessage("الرسالة طويلة جداً"),
];

// All routes require authentication
router.use(authenticate);

// Routes
router.get("/", getConversations);
router.get("/unread", getUnreadCount);
router.get("/:id", getConversation);
router.post("/", createConversationValidation, validateRequest, createConversation);
router.post("/:conversationId/send", sendMessageValidation, validateRequest, sendMessage);
router.put("/:id/archive", requireAdmin, archiveConversation);

export default router;
