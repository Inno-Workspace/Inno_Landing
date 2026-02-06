import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:6868";

// Get all library items with pagination and filters
export async function getLibraryItems(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = req.query.type as string;
    const search = (req.query.search as string) || "";
    const category = req.query.category as string;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.libraryItem.count({ where }),
    ]);

    sendPaginated(res, items, page, limit, total);
  } catch (error) {
    console.error("Get library items error:", error);
    sendError(res, "حدث خطأ أثناء جلب العناصر", 500);
  }
}

// Get single library item
export async function getLibraryItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const item = await prisma.libraryItem.findUnique({
      where: { id },
    });

    if (!item) {
      sendError(res, "العنصر غير موجود", 404);
      return;
    }

    sendSuccess(res, item);
  } catch (error) {
    console.error("Get library item error:", error);
    sendError(res, "حدث خطأ أثناء جلب العنصر", 500);
  }
}

// Create library item
export async function createLibraryItem(req: Request, res: Response): Promise<void> {
  try {
    const { name, nameAr, description, descriptionAr, type, category, tags, content } = req.body;

    if (!name || !type) {
      sendError(res, "الاسم والنوع مطلوبان", 400);
      return;
    }

    // Handle file upload if present
    let fileUrl: string | undefined;
    let filePath: string | undefined;
    let fileSize: number | undefined;
    let mimeType: string | undefined;

    if (req.file) {
      fileUrl = `${BASE_URL}/uploads/${req.file.filename}`;
      filePath = req.file.path;
      fileSize = req.file.size;
      mimeType = req.file.mimetype;
    }

    const item = await prisma.libraryItem.create({
      data: {
        name,
        nameAr,
        description,
        descriptionAr,
        type,
        category,
        tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
        content,
        fileUrl,
        filePath,
        fileSize,
        mimeType,
        isActive: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "CREATE_LIBRARY_ITEM",
        description: `إنشاء عنصر مكتبة: ${name}`,
        metadata: { itemId: item.id, type: item.type },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, item, "تم إنشاء العنصر بنجاح", 201);
  } catch (error) {
    console.error("Create library item error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء العنصر", 500);
  }
}

// Update library item
export async function updateLibraryItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, nameAr, description, descriptionAr, category, tags, content, isActive } = req.body;

    const existingItem = await prisma.libraryItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      sendError(res, "العنصر غير موجود", 404);
      return;
    }

    // Handle file upload if present
    let fileUrl = existingItem.fileUrl;
    let filePath = existingItem.filePath;
    let fileSize = existingItem.fileSize;
    let mimeType = existingItem.mimeType;

    if (req.file) {
      // Delete old file if exists
      if (existingItem.filePath && fs.existsSync(existingItem.filePath)) {
        fs.unlinkSync(existingItem.filePath);
      }

      fileUrl = `${BASE_URL}/uploads/${req.file.filename}`;
      filePath = req.file.path;
      fileSize = req.file.size;
      mimeType = req.file.mimetype;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (nameAr !== undefined) updateData.nameAr = nameAr;
    if (description !== undefined) updateData.description = description;
    if (descriptionAr !== undefined) updateData.descriptionAr = descriptionAr;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
    if (content !== undefined) updateData.content = content;
    if (isActive !== undefined) updateData.isActive = isActive === "true" || isActive === true;
    if (req.file) {
      updateData.fileUrl = fileUrl;
      updateData.filePath = filePath;
      updateData.fileSize = fileSize;
      updateData.mimeType = mimeType;
    }

    const item = await prisma.libraryItem.update({
      where: { id },
      data: updateData,
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "UPDATE_LIBRARY_ITEM",
        description: `تحديث عنصر مكتبة: ${item.name}`,
        metadata: { itemId: item.id },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, item, "تم تحديث العنصر بنجاح");
  } catch (error) {
    console.error("Update library item error:", error);
    sendError(res, "حدث خطأ أثناء تحديث العنصر", 500);
  }
}

// Delete library item
export async function deleteLibraryItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const item = await prisma.libraryItem.findUnique({
      where: { id },
    });

    if (!item) {
      sendError(res, "العنصر غير موجود", 404);
      return;
    }

    // Delete physical file if exists
    if (item.filePath && fs.existsSync(item.filePath)) {
      fs.unlinkSync(item.filePath);
    }

    await prisma.libraryItem.delete({
      where: { id },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "DELETE_LIBRARY_ITEM",
        description: `حذف عنصر مكتبة: ${item.name}`,
        metadata: { itemName: item.name },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, null, "تم حذف العنصر بنجاح");
  } catch (error) {
    console.error("Delete library item error:", error);
    sendError(res, "حدث خطأ أثناء حذف العنصر", 500);
  }
}

// Get invoices specifically
export async function getInvoices(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const where: any = {
      type: "INVOICE",
      isActive: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
      ];
    }

    const [invoices, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.libraryItem.count({ where }),
    ]);

    sendPaginated(res, invoices, page, limit, total);
  } catch (error) {
    console.error("Get invoices error:", error);
    sendError(res, "حدث خطأ أثناء جلب الفواتير", 500);
  }
}

// Get templates specifically
export async function getTemplates(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const where: any = {
      type: "TEMPLATE",
      isActive: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
      ];
    }

    const [templates, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.libraryItem.count({ where }),
    ]);

    sendPaginated(res, templates, page, limit, total);
  } catch (error) {
    console.error("Get templates error:", error);
    sendError(res, "حدث خطأ أثناء جلب القوالب", 500);
  }
}

// Get contracts specifically
export async function getContracts(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const where: any = {
      type: "CONTRACT",
      isActive: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { nameAr: { contains: search, mode: "insensitive" } },
      ];
    }

    const [contracts, total] = await Promise.all([
      prisma.libraryItem.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.libraryItem.count({ where }),
    ]);

    sendPaginated(res, contracts, page, limit, total);
  } catch (error) {
    console.error("Get contracts error:", error);
    sendError(res, "حدث خطأ أثناء جلب العقود", 500);
  }
}
