import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError } from "../utils/response.js";

// Get admin dashboard statistics
export async function getAdminStats(req: Request, res: Response): Promise<void> {
  try {
    const [
      totalClients,
      activeClients,
      totalFiles,
      totalStorageResult,
      recentClients,
      recentActivity,
      subscriptionsByTier,
      expiringSubscriptions,
    ] = await Promise.all([
      // Total clients
      prisma.client.count(),

      // Active clients
      prisma.client.count({
        where: { subscriptionStatus: "ACTIVE" },
      }),

      // Total files
      prisma.file.count(),

      // Total storage
      prisma.clientStatistics.aggregate({
        _sum: { totalStorage: true },
      }),

      // Recent clients
      prisma.client.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          companyName: true,
          subscriptionTier: true,
          createdAt: true,
        },
      }),

      // Recent activity
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),

      // Subscriptions by tier
      prisma.client.groupBy({
        by: ["subscriptionTier"],
        _count: true,
      }),

      // Expiring subscriptions (next 30 days)
      prisma.client.count({
        where: {
          subscriptionStatus: "ACTIVE",
          subscriptionEnd: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    const tierCounts = subscriptionsByTier.reduce(
      (acc, curr) => {
        acc[curr.subscriptionTier.toLowerCase()] = curr._count;
        return acc;
      },
      { gold: 0, platinum: 0, diamond: 0 } as Record<string, number>
    );

    sendSuccess(res, {
      overview: {
        totalClients,
        activeClients,
        totalFiles,
        totalStorage: totalStorageResult._sum.totalStorage || 0,
        expiringSubscriptions,
      },
      subscriptionsByTier: tierCounts,
      recentClients,
      recentActivity,
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    sendError(res, "حدث خطأ أثناء جلب الإحصائيات", 500);
  }
}

// Get client-specific statistics
export async function getClientStats(req: Request, res: Response): Promise<void> {
  try {
    const clientId =
      req.params.clientId ||
      (req.user?.role === "CLIENT" ? req.user.clientId : null);

    if (!clientId) {
      sendError(res, "معرف العميل مطلوب", 400);
      return;
    }

    // Check access
    if (req.user?.role === "CLIENT" && req.user.clientId !== clientId) {
      sendError(res, "غير مصرح بالوصول لهذه البيانات", 403);
      return;
    }

    const [client, statistics, filesCount, servicesCount] = await Promise.all([
      prisma.client.findUnique({
        where: { id: clientId },
        select: {
          id: true,
          companyName: true,
          subscriptionTier: true,
          subscriptionStatus: true,
          subscriptionStart: true,
          subscriptionEnd: true,
        },
      }),
      prisma.clientStatistics.findUnique({
        where: { clientId },
      }),
      prisma.file.count({
        where: { clientId },
      }),
      prisma.clientService.count({
        where: { clientId, isActive: true },
      }),
    ]);

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    // Calculate days remaining
    let daysRemaining = null;
    if (client.subscriptionEnd) {
      const now = new Date();
      const end = new Date(client.subscriptionEnd);
      daysRemaining = Math.ceil(
        (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
    }

    sendSuccess(res, {
      client,
      statistics: statistics || {
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        avgSessionTime: 0,
        bounceRate: 0,
        totalFiles: filesCount,
        totalStorage: 0,
      },
      filesCount,
      servicesCount,
      daysRemaining,
    });
  } catch (error) {
    console.error("Get client stats error:", error);
    sendError(res, "حدث خطأ أثناء جلب إحصائيات العميل", 500);
  }
}

// Update client statistics (for tracking website visits, etc.)
export async function updateClientStats(req: Request, res: Response): Promise<void> {
  try {
    const { clientId } = req.params;
    const { visits, pageViews, avgSessionTime, bounceRate } = req.body;

    const statistics = await prisma.clientStatistics.upsert({
      where: { clientId },
      update: {
        totalVisits: visits ? { increment: visits } : undefined,
        pageViews: pageViews ? { increment: pageViews } : undefined,
        avgSessionTime: avgSessionTime,
        bounceRate: bounceRate,
        lastUpdated: new Date(),
      },
      create: {
        clientId,
        totalVisits: visits || 0,
        pageViews: pageViews || 0,
        avgSessionTime: avgSessionTime || 0,
        bounceRate: bounceRate || 0,
      },
    });

    sendSuccess(res, statistics, "تم تحديث الإحصائيات بنجاح");
  } catch (error) {
    console.error("Update client stats error:", error);
    sendError(res, "حدث خطأ أثناء تحديث الإحصائيات", 500);
  }
}

// Get activity log
export async function getActivityLog(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const userId = req.query.userId as string;
    const action = req.query.action as string;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (action) {
      where.action = action;
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.activityLog.count({ where }),
    ]);

    sendSuccess(
      res,
      logs,
      undefined,
      200,
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    );
  } catch (error) {
    console.error("Get activity log error:", error);
    sendError(res, "حدث خطأ أثناء جلب سجل النشاط", 500);
  }
}
