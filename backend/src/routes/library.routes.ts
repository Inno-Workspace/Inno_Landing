import { Router } from "express";
import {
  getLibraryItems,
  getLibraryItem,
  createLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
  getInvoices,
  getTemplates,
  getContracts,
} from "../controllers/library.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { upload, handleMulterError } from "../middleware/upload.middleware.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// General library routes (admin only for create/update/delete)
router.get("/", getLibraryItems);
router.get("/:id", getLibraryItem);
router.post("/", requireAdmin, upload.single("file"), handleMulterError, createLibraryItem);
router.put("/:id", requireAdmin, upload.single("file"), handleMulterError, updateLibraryItem);
router.delete("/:id", requireAdmin, deleteLibraryItem);

// Specific type routes (accessible by all authenticated users)
router.get("/invoices/all", getInvoices);
router.get("/templates/all", getTemplates);
router.get("/contracts/all", getContracts);

export default router;
