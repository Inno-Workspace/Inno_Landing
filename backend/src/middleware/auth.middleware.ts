import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt.js";
import { sendError } from "../utils/response.js";
import prisma from "../config/prisma.js";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name: string;
        clientId?: string | null;
      };
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      sendError(res, "لم يتم توفير رمز المصادقة", 401);
      return;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload) {
      sendError(res, "رمز المصادقة غير صالح أو منتهي الصلاحية", 401);
      return;
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        clientId: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      sendError(res, "المستخدم غير موجود أو غير نشط", 401);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    sendError(res, "خطأ في المصادقة", 500);
    return;
  }
}

// Middleware to check if user is admin
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    sendError(res, "غير مصرح", 401);
    return;
  }

  if (req.user.role !== "SUPER_ADMIN" && req.user.role !== "ADMIN") {
    sendError(res, "صلاحيات غير كافية", 403);
    return;
  }

  next();
}

// Middleware to check if user is super admin
export function requireSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    sendError(res, "غير مصرح", 401);
    return;
  }

  if (req.user.role !== "SUPER_ADMIN") {
    sendError(res, "صلاحيات غير كافية - مطلوب صلاحيات المدير العام", 403);
    return;
  }

  next();
}

// Middleware to check if user owns the resource or is admin
export function requireOwnerOrAdmin(
  getOwnerId: (req: Request) => string | undefined
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, "غير مصرح", 401);
      return;
    }

    const ownerId = getOwnerId(req);
    const isOwner = req.user.id === ownerId || req.user.clientId === ownerId;
    const isAdmin =
      req.user.role === "SUPER_ADMIN" || req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      sendError(res, "غير مصرح بالوصول لهذا المورد", 403);
      return;
    }

    next();
  };
}
