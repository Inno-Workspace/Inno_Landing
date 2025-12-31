import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

// Update client subscription
export async function updateSubscription(req: Request, res: Response): Promise<void> {
  try {
    const { clientId } = req.params;
    const { tier, status, startDate, endDate } = req.body;

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        subscriptionTier: tier || client.subscriptionTier,
        subscriptionStatus: status || client.subscriptionStatus,
        subscriptionStart: startDate ? new Date(startDate) : client.subscriptionStart,
        subscriptionEnd: endDate ? new Date(endDate) : client.subscriptionEnd,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "UPDATE_SUBSCRIPTION",
        description: `تحديث اشتراك العميل: ${client.companyName}`,
        metadata: { clientId, tier, status },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, updatedClient, "تم تحديث الاشتراك بنجاح");
  } catch (error) {
    console.error("Update subscription error:", error);
    sendError(res, "حدث خطأ أثناء تحديث الاشتراك", 500);
  }
}

// Get expiring subscriptions
export async function getExpiringSubscriptions(req: Request, res: Response): Promise<void> {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const where = {
      subscriptionEnd: {
        gte: new Date(),
        lte: futureDate,
      },
      subscriptionStatus: "ACTIVE" as const,
    };

    const [subscriptions, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          companyName: true,
          email: true,
          phone: true,
          subscriptionTier: true,
          subscriptionEnd: true,
        },
        orderBy: { subscriptionEnd: "asc" },
      }),
      prisma.client.count({ where }),
    ]);

    sendPaginated(res, subscriptions, page, limit, total);
  } catch (error) {
    console.error("Get expiring subscriptions error:", error);
    sendError(res, "حدث خطأ أثناء جلب الاشتراكات المنتهية", 500);
  }
}

// Renew subscription
export async function renewSubscription(req: Request, res: Response): Promise<void> {
  try {
    const { clientId } = req.params;
    const { months, tier } = req.body;

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    // Calculate new end date
    const baseDate = client.subscriptionEnd && client.subscriptionEnd > new Date()
      ? client.subscriptionEnd
      : new Date();

    const newEndDate = new Date(baseDate);
    newEndDate.setMonth(newEndDate.getMonth() + (months || 12));

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        subscriptionTier: tier || client.subscriptionTier,
        subscriptionStatus: "ACTIVE",
        subscriptionEnd: newEndDate,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "RENEW_SUBSCRIPTION",
        description: `تجديد اشتراك العميل: ${client.companyName} لمدة ${months || 12} شهر`,
        metadata: { clientId, months, tier, newEndDate },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, updatedClient, "تم تجديد الاشتراك بنجاح");
  } catch (error) {
    console.error("Renew subscription error:", error);
    sendError(res, "حدث خطأ أثناء تجديد الاشتراك", 500);
  }
}

// Cancel subscription
export async function cancelSubscription(req: Request, res: Response): Promise<void> {
  try {
    const { clientId } = req.params;

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: {
        subscriptionStatus: "CANCELLED",
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "CANCEL_SUBSCRIPTION",
        description: `إلغاء اشتراك العميل: ${client.companyName}`,
        metadata: { clientId },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, updatedClient, "تم إلغاء الاشتراك");
  } catch (error) {
    console.error("Cancel subscription error:", error);
    sendError(res, "حدث خطأ أثناء إلغاء الاشتراك", 500);
  }
}

// Get subscription history/summary
export async function getSubscriptionStats(req: Request, res: Response): Promise<void> {
  try {
    const [
      activeGold,
      activePlatinum,
      activeDiamond,
      expiredCount,
      cancelledCount,
      expiringIn7Days,
      expiringIn30Days,
    ] = await Promise.all([
      prisma.client.count({ where: { subscriptionTier: "GOLD", subscriptionStatus: "ACTIVE" } }),
      prisma.client.count({ where: { subscriptionTier: "PLATINUM", subscriptionStatus: "ACTIVE" } }),
      prisma.client.count({ where: { subscriptionTier: "DIAMOND", subscriptionStatus: "ACTIVE" } }),
      prisma.client.count({ where: { subscriptionStatus: "EXPIRED" } }),
      prisma.client.count({ where: { subscriptionStatus: "CANCELLED" } }),
      prisma.client.count({
        where: {
          subscriptionStatus: "ACTIVE",
          subscriptionEnd: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
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

    sendSuccess(res, {
      active: {
        gold: activeGold,
        platinum: activePlatinum,
        diamond: activeDiamond,
        total: activeGold + activePlatinum + activeDiamond,
      },
      expired: expiredCount,
      cancelled: cancelledCount,
      expiring: {
        in7Days: expiringIn7Days,
        in30Days: expiringIn30Days,
      },
    });
  } catch (error) {
    console.error("Get subscription stats error:", error);
    sendError(res, "حدث خطأ أثناء جلب إحصائيات الاشتراكات", 500);
  }
}
