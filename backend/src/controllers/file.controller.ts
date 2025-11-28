import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import QRCode from "qrcode";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

const UPLOADS_DIR = "uploads";
const BASE_URL = process.env.BASE_URL || "http://localhost:6868";

// Get files with pagination
export async function getFiles(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const clientId = req.query.clientId as string;
    const isLibrary = req.query.library === "true";
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const where: any = {};

    if (clientId) {
      where.clientId = clientId;
    }

    if (isLibrary) {
      where.isLibrary = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { originalName: { contains: search, mode: "insensitive" } },
      ];
    }

    // If user is a client, only show their files or library files
    if (req.user?.role === "CLIENT" && req.user?.clientId) {
      where.OR = [{ clientId: req.user.clientId }, { isLibrary: true }];
    }

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        skip,
        take: limit,
        include: {
          client: {
            select: {
              id: true,
              companyName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.file.count({ where }),
    ]);

    sendPaginated(res, files, page, limit, total);
  } catch (error) {
    console.error("Get files error:", error);
    sendError(res, "حدث خطأ أثناء جلب الملفات", 500);
  }
}

// Get single file
export async function getFile(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
    });

    if (!file) {
      sendError(res, "الملف غير موجود", 404);
      return;
    }

    // Check access
    if (
      req.user?.role === "CLIENT" &&
      file.clientId !== req.user.clientId &&
      !file.isLibrary
    ) {
      sendError(res, "غير مصرح بالوصول لهذا الملف", 403);
      return;
    }

    sendSuccess(res, file);
  } catch (error) {
    console.error("Get file error:", error);
    sendError(res, "حدث خطأ أثناء جلب الملف", 500);
  }
}

// Upload file
export async function uploadFile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      sendError(res, "لم يتم تحميل أي ملف", 400);
      return;
    }

    const { clientId, isLibrary, generateQR } = req.body;
    const file = req.file;

    // Build file URL
    const fileUrl = `${BASE_URL}/uploads/${file.filename}`;

    // Generate QR code if requested
    let qrCodeUrl: string | null = null;
    if (generateQR === "true" || generateQR === true) {
      const qrCodeFileName = `qr_${file.filename}.png`;
      const qrCodePath = path.join(UPLOADS_DIR, "qrcodes", qrCodeFileName);

      // Ensure qrcodes directory exists
      const qrDir = path.join(UPLOADS_DIR, "qrcodes");
      if (!fs.existsSync(qrDir)) {
        fs.mkdirSync(qrDir, { recursive: true });
      }

      await QRCode.toFile(qrCodePath, fileUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      qrCodeUrl = `${BASE_URL}/uploads/qrcodes/${qrCodeFileName}`;
    }

    // Save to database
    const savedFile = await prisma.file.create({
      data: {
        name: file.filename,
        originalName: file.originalname,
        path: file.path,
        url: fileUrl,
        mimeType: file.mimetype,
        size: file.size,
        qrCode: qrCodeUrl,
        clientId: clientId || (req.user?.role === "CLIENT" ? req.user.clientId : null),
        isLibrary: isLibrary === "true" || isLibrary === true,
      },
    });

    // Update client statistics
    if (savedFile.clientId) {
      await prisma.clientStatistics.upsert({
        where: { clientId: savedFile.clientId },
        update: {
          totalFiles: { increment: 1 },
          totalStorage: { increment: file.size },
          lastUpdated: new Date(),
        },
        create: {
          clientId: savedFile.clientId,
          totalFiles: 1,
          totalStorage: file.size,
        },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "UPLOAD_FILE",
        description: `رفع ملف: ${file.originalname}`,
        metadata: { fileId: savedFile.id, size: file.size },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, savedFile, "تم رفع الملف بنجاح", 201);
  } catch (error) {
    console.error("Upload file error:", error);
    sendError(res, "حدث خطأ أثناء رفع الملف", 500);
  }
}

// Generate QR code for existing file
export async function generateQRCode(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      sendError(res, "الملف غير موجود", 404);
      return;
    }

    // Generate QR code
    const qrCodeFileName = `qr_${file.name}.png`;
    const qrCodePath = path.join(UPLOADS_DIR, "qrcodes", qrCodeFileName);

    // Ensure qrcodes directory exists
    const qrDir = path.join(UPLOADS_DIR, "qrcodes");
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    await QRCode.toFile(qrCodePath, file.url, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    const qrCodeUrl = `${BASE_URL}/uploads/qrcodes/${qrCodeFileName}`;

    // Update file record
    const updatedFile = await prisma.file.update({
      where: { id },
      data: { qrCode: qrCodeUrl },
    });

    sendSuccess(res, updatedFile, "تم إنشاء رمز QR بنجاح");
  } catch (error) {
    console.error("Generate QR code error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء رمز QR", 500);
  }
}

// Delete file
export async function deleteFile(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      sendError(res, "الملف غير موجود", 404);
      return;
    }

    // Check access
    if (
      req.user?.role === "CLIENT" &&
      file.clientId !== req.user.clientId
    ) {
      sendError(res, "غير مصرح بحذف هذا الملف", 403);
      return;
    }

    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete QR code if exists
    if (file.qrCode) {
      const qrPath = path.join(
        UPLOADS_DIR,
        "qrcodes",
        path.basename(file.qrCode)
      );
      if (fs.existsSync(qrPath)) {
        fs.unlinkSync(qrPath);
      }
    }

    // Update client statistics
    if (file.clientId) {
      await prisma.clientStatistics.update({
        where: { clientId: file.clientId },
        data: {
          totalFiles: { decrement: 1 },
          totalStorage: { decrement: file.size },
          lastUpdated: new Date(),
        },
      });
    }

    // Delete from database
    await prisma.file.delete({ where: { id } });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "DELETE_FILE",
        description: `حذف ملف: ${file.originalName}`,
        metadata: { fileName: file.originalName },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, null, "تم حذف الملف بنجاح");
  } catch (error) {
    console.error("Delete file error:", error);
    sendError(res, "حدث خطأ أثناء حذف الملف", 500);
  }
}

// Get library files (public for all clients)
export async function getLibraryFiles(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where: { isLibrary: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.file.count({ where: { isLibrary: true } }),
    ]);

    sendPaginated(res, files, page, limit, total);
  } catch (error) {
    console.error("Get library files error:", error);
    sendError(res, "حدث خطأ أثناء جلب ملفات المكتبة", 500);
  }
}
