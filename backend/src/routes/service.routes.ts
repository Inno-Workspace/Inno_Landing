import { Router } from "express";
import { body } from "express-validator";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  assignServiceToClient,
  removeServiceFromClient,
  getClientServices,
} from "../controllers/service.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Validation rules
const createServiceValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("اسم الخدمة مطلوب"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("السعر يجب أن يكون رقماً موجباً"),
  body("availableFor")
    .optional()
    .isArray()
    .withMessage("availableFor يجب أن يكون مصفوفة"),
];

const assignServiceValidation = [
  body("serviceId")
    .notEmpty()
    .withMessage("معرف الخدمة مطلوب"),
  body("clientId")
    .notEmpty()
    .withMessage("معرف العميل مطلوب"),
];

// All routes require authentication
router.use(authenticate);

// Public routes (for clients)
router.get("/", getServices);
router.get("/:id", getService);
router.get("/client/:clientId", getClientServices);

// Admin routes
router.post("/", requireAdmin, createServiceValidation, validateRequest, createService);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);
router.post("/assign", requireAdmin, assignServiceValidation, validateRequest, assignServiceToClient);
router.delete("/:serviceId/client/:clientId", requireAdmin, removeServiceFromClient);

export default router;
