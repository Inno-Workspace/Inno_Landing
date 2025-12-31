import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Get all managers (ADMIN and SUPER_ADMIN users)
export const getManagers = async (req: Request, res: Response) => {
  try {
    const managers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ success: true, data: managers });
  } catch (error) {
    console.error("Get managers error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب المديرين" });
  }
};

// Get single manager
export const getManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const manager = await prisma.user.findFirst({
      where: {
        id,
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: "المدير غير موجود" });
    }

    res.json({ success: true, data: manager });
  } catch (error) {
    console.error("Get manager error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب بيانات المدير" });
  }
};

// Create new manager
export const createManager = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role = "ADMIN", isActive = true } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
        isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    res.status(201).json({ success: true, data: manager, message: "تم إنشاء المدير بنجاح" });
  } catch (error) {
    console.error("Create manager error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء إنشاء المدير" });
  }
};

// Update manager
export const updateManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, role, isActive } = req.body;

    // Check if manager exists
    const existingManager = await prisma.user.findFirst({
      where: {
        id,
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
    });

    if (!existingManager) {
      return res.status(404).json({ success: false, message: "المدير غير موجود" });
    }

    // Check if email is taken by another user
    if (email && email !== existingManager.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      });
      if (emailTaken) {
        return res.status(400).json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
      }
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (role !== undefined) updateData.role = role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN";
    if (isActive !== undefined) updateData.isActive = isActive;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const manager = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    res.json({ success: true, data: manager, message: "تم تحديث المدير بنجاح" });
  } catch (error) {
    console.error("Update manager error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء تحديث المدير" });
  }
};

// Delete manager
export const deleteManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;

    // Cannot delete yourself
    if (currentUser.id === id) {
      return res.status(400).json({ success: false, message: "لا يمكنك حذف حسابك الخاص" });
    }

    // Check if manager exists
    const manager = await prisma.user.findFirst({
      where: {
        id,
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: "المدير غير موجود" });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({ success: true, message: "تم حذف المدير بنجاح" });
  } catch (error) {
    console.error("Delete manager error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء حذف المدير" });
  }
};
