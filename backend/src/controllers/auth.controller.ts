import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Register new user
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name, phone, role } = req.body;

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      sendError(res, "البريد الإلكتروني مسجل مسبقاً", 400);
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: role || "CLIENT",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "REGISTER",
        description: "تسجيل حساب جديد",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(
      res,
      { user, token },
      "تم إنشاء الحساب بنجاح",
      201
    );
  } catch (error) {
    console.error("Register error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء الحساب", 500);
  }
}

// Login
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        client: {
          select: {
            id: true,
            companyName: true,
            subscriptionTier: true,
            subscriptionStatus: true,
          },
        },
      },
    });

    if (!user) {
      sendError(res, "البريد الإلكتروني أو كلمة المرور غير صحيحة", 401);
      return;
    }

    if (!user.isActive) {
      sendError(res, "الحساب معطل، يرجى التواصل مع الإدارة", 401);
      return;
    }

    // Check password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      sendError(res, "البريد الإلكتروني أو كلمة المرور غير صحيحة", 401);
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        description: "تسجيل دخول",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    sendSuccess(
      res,
      { user: userWithoutPassword, token },
      "تم تسجيل الدخول بنجاح"
    );
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, "حدث خطأ أثناء تسجيل الدخول", 500);
  }
}

// Get current user
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            companyName: true,
            subscriptionTier: true,
            subscriptionStatus: true,
            subscriptionEnd: true,
          },
        },
      },
    });

    if (!user) {
      sendError(res, "المستخدم غير موجود", 404);
      return;
    }

    sendSuccess(res, user);
  } catch (error) {
    console.error("Get current user error:", error);
    sendError(res, "حدث خطأ أثناء جلب بيانات المستخدم", 500);
  }
}

// Update profile
export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    const { name, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name,
        phone,
        avatar,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
      },
    });

    sendSuccess(res, user, "تم تحديث الملف الشخصي بنجاح");
  } catch (error) {
    console.error("Update profile error:", error);
    sendError(res, "حدث خطأ أثناء تحديث الملف الشخصي", 500);
  }
}

// Change password
export async function changePassword(req: Request, res: Response): Promise<void> {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user) {
      sendError(res, "المستخدم غير موجود", 404);
      return;
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      sendError(res, "كلمة المرور الحالية غير صحيحة", 400);
      return;
    }

    // Hash and update new password
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "CHANGE_PASSWORD",
        description: "تغيير كلمة المرور",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, null, "تم تغيير كلمة المرور بنجاح");
  } catch (error) {
    console.error("Change password error:", error);
    sendError(res, "حدث خطأ أثناء تغيير كلمة المرور", 500);
  }
}

// Logout (just log the activity, token invalidation should be handled client-side)
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "LOGOUT",
        description: "تسجيل خروج",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, null, "تم تسجيل الخروج بنجاح");
  } catch (error) {
    console.error("Logout error:", error);
    sendError(res, "حدث خطأ أثناء تسجيل الخروج", 500);
  }
}
