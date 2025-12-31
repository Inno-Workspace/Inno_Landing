import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

// Get all clients with pagination and search
export async function getClients(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const tier = req.query.tier as string;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    if (tier) {
      where.subscriptionTier = tier;
    }

    if (status) {
      where.subscriptionStatus = status;
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              isActive: true,
            },
          },
          _count: {
            select: {
              files: true,
              services: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count({ where }),
    ]);

    sendPaginated(res, clients, page, limit, total);
  } catch (error) {
    console.error("Get clients error:", error);
    sendError(res, "حدث خطأ أثناء جلب العملاء", 500);
  }
}

// Get single client by ID
export async function getClient(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            isActive: true,
            createdAt: true,
          },
        },
        files: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
        services: {
          include: {
            service: true,
          },
        },
        statistics: true,
      },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    sendSuccess(res, client);
  } catch (error) {
    console.error("Get client error:", error);
    sendError(res, "حدث خطأ أثناء جلب بيانات العميل", 500);
  }
}

// Create new client
export async function createClient(req: Request, res: Response): Promise<void> {
  try {
    const {
      companyName,
      companyNameAr,
      email,
      phone,
      website,
      address,
      description,
      subscriptionTier,
      subscriptionStart,
      subscriptionEnd,
      notes,
      // User credentials
      userName,
      userPassword,
    } = req.body;

    // Check if email exists
    const existingClient = await prisma.client.findUnique({
      where: { email },
    });

    if (existingClient) {
      sendError(res, "البريد الإلكتروني مسجل مسبقاً", 400);
      return;
    }

    // Create client with user account
    const client = await prisma.$transaction(async (tx) => {
      // Create client
      const newClient = await tx.client.create({
        data: {
          companyName,
          companyNameAr,
          email,
          phone,
          website,
          address,
          description,
          subscriptionTier: subscriptionTier || "GOLD",
          subscriptionStatus: "ACTIVE",
          subscriptionStart: subscriptionStart
            ? new Date(subscriptionStart)
            : new Date(),
          subscriptionEnd: subscriptionEnd
            ? new Date(subscriptionEnd)
            : null,
          notes,
        },
      });

      // Create user account for the client
      if (userPassword) {
        const hashedPassword = await hashPassword(userPassword);
        await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            name: userName || companyName,
            phone,
            role: "CLIENT",
            clientId: newClient.id,
          },
        });
      }

      // Create statistics record
      await tx.clientStatistics.create({
        data: {
          clientId: newClient.id,
        },
      });

      return newClient;
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "CREATE_CLIENT",
        description: `إنشاء عميل جديد: ${companyName}`,
        metadata: { clientId: client.id },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, client, "تم إنشاء العميل بنجاح", 201);
  } catch (error) {
    console.error("Create client error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء العميل", 500);
  }
}

// Update client
export async function updateClient(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const {
      companyName,
      companyNameAr,
      email,
      phone,
      website,
      address,
      description,
      logo,
      notes,
    } = req.body;

    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    // Check if new email is already in use by another client
    if (email && email !== existingClient.email) {
      const emailExists = await prisma.client.findUnique({
        where: { email },
      });
      if (emailExists) {
        sendError(res, "البريد الإلكتروني مستخدم من قبل عميل آخر", 400);
        return;
      }
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        companyName,
        companyNameAr,
        email,
        phone,
        website,
        address,
        description,
        logo,
        notes,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "UPDATE_CLIENT",
        description: `تحديث بيانات العميل: ${companyName}`,
        metadata: { clientId: id },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, client, "تم تحديث بيانات العميل بنجاح");
  } catch (error) {
    console.error("Update client error:", error);
    sendError(res, "حدث خطأ أثناء تحديث بيانات العميل", 500);
  }
}

// Delete client
export async function deleteClient(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    // Delete client (cascades to related records)
    await prisma.$transaction(async (tx) => {
      // Delete user if exists
      if (client.user) {
        await tx.user.delete({ where: { id: client.user.id } });
      }
      // Delete client
      await tx.client.delete({ where: { id } });
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: "DELETE_CLIENT",
        description: `حذف العميل: ${client.companyName}`,
        metadata: { clientId: id, companyName: client.companyName },
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    sendSuccess(res, null, "تم حذف العميل بنجاح");
  } catch (error) {
    console.error("Delete client error:", error);
    sendError(res, "حدث خطأ أثناء حذف العميل", 500);
  }
}

// Get client statistics summary (for admin dashboard)
export async function getClientsSummary(req: Request, res: Response): Promise<void> {
  try {
    const [
      totalClients,
      activeClients,
      goldClients,
      platinumClients,
      diamondClients,
      expiringThisMonth,
    ] = await Promise.all([
      prisma.client.count(),
      prisma.client.count({ where: { subscriptionStatus: "ACTIVE" } }),
      prisma.client.count({ where: { subscriptionTier: "GOLD" } }),
      prisma.client.count({ where: { subscriptionTier: "PLATINUM" } }),
      prisma.client.count({ where: { subscriptionTier: "DIAMOND" } }),
      prisma.client.count({
        where: {
          subscriptionEnd: {
            gte: new Date(),
            lte: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          },
        },
      }),
    ]);

    sendSuccess(res, {
      totalClients,
      activeClients,
      byTier: {
        gold: goldClients,
        platinum: platinumClients,
        diamond: diamondClients,
      },
      expiringThisMonth,
    });
  } catch (error) {
    console.error("Get clients summary error:", error);
    sendError(res, "حدث خطأ أثناء جلب إحصائيات العملاء", 500);
  }
}
