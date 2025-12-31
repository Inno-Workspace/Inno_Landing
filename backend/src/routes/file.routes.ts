import { Router } from "express";
import {
  getFiles,
  getFile,
  uploadFile,
  generateQRCode,
  deleteFile,
  getLibraryFiles,
} from "../controllers/file.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { upload, handleMulterError } from "../middleware/upload.middleware.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes
router.get("/", getFiles);
router.get("/library", getLibraryFiles);
router.get("/:id", getFile);
router.post("/", upload.single("file"), handleMulterError, uploadFile);
router.post("/:id/qrcode", generateQRCode);
router.delete("/:id", deleteFile);

// Admin-only: add file to library
router.post("/library", requireAdmin, upload.single("file"), handleMulterError, uploadFile);

export default router;
