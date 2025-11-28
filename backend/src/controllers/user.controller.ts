import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get online users (users with recent activity)
export const getOnlineUsers = async (req: Request, res: Response) => {
  try {
    // For now, return all active users since lastActivity field may not exist yet
    const onlineUsers = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add mock online status for now
    const usersWithStatus = onlineUsers.map(user => ({
      ...user,
      isOnline: true,
      lastActivity: new Date().toISOString(),
    }));

    res.json({ success: true, data: usersWithStatus });
  } catch (error) {
    console.error("Get online users error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب المستخدمين المتصلين" });
  }
};

// Update user online status
export const updateUserOnlineStatus = async (req: Request, res: Response) => {
  try {
    // For now, just return success since the fields may not exist yet
    res.json({ success: true, message: "تم تحديث حالة الاتصال" });
  } catch (error) {
    console.error("Update online status error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

// Update user heartbeat (called periodically to show user is still active)
export const updateHeartbeat = async (req: Request, res: Response) => {
  try {
    res.json({ success: true });
  } catch (error) {
    console.error("Update heartbeat error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

// Set user active status (admin only)
export const setUserActiveStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "المستخدم غير موجود" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });

    res.json({ success: true, message: isActive ? "تم تفعيل المستخدم" : "تم تعطيل المستخدم" });
  } catch (error) {
    console.error("Set user active status error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ" });
  }
};

// Get all users for admin
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { role, isActive, search } = req.query;

    const where: Record<string, unknown> = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === "true";
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add mock status fields
    const usersWithStatus = users.map(user => ({
      ...user,
      isOnline: false,
      lastActivity: null,
      lastLogin: null,
    }));

    res.json({ success: true, data: usersWithStatus });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب المستخدمين" });
  }
};
