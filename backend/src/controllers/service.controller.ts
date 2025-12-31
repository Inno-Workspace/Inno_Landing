import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

// Get all services
export async function getServices(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const tier = req.query.tier as string;
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };

    if (tier) {
      where.availableFor = { has: tier };
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: { clients: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.service.count({ where }),
    ]);

    sendPaginated(res, services, page, limit, total);
  } catch (error) {
    console.error("Get services error:", error);
    sendError(res, "حدث خطأ أثناء جلب الخدمات", 500);
  }
}

// Get single service
export async function getService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        clients: {
          include: {
            client: {
              select: {
                id: true,
                companyName: true,
              },
            },
          },
        },
      },
    });

    if (!service) {
      sendError(res, "الخدمة غير موجودة", 404);
      return;
    }

    sendSuccess(res, service);
  } catch (error) {
    console.error("Get service error:", error);
    sendError(res, "حدث خطأ أثناء جلب الخدمة", 500);
  }
}

// Create service (admin only)
export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const { name, nameAr, description, descriptionAr, price, icon, availableFor } =
      req.body;

    const service = await prisma.service.create({
      data: {
        name,
        nameAr,
        description,
        descriptionAr,
        price: price ? parseFloat(price) : null,
        icon,
        availableFor: availableFor || ["GOLD", "PLATINUM", "DIAMOND"],
      },
    });

    sendSuccess(res, service, "تم إنشاء الخدمة بنجاح", 201);
  } catch (error) {
    console.error("Create service error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء الخدمة", 500);
  }
}

// Update service (admin only)
export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, nameAr, description, descriptionAr, price, icon, availableFor, isActive } =
      req.body;

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      sendError(res, "الخدمة غير موجودة", 404);
      return;
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        nameAr,
        description,
        descriptionAr,
        price: price !== undefined ? parseFloat(price) : existingService.price,
        icon,
        availableFor,
        isActive,
      },
    });

    sendSuccess(res, service, "تم تحديث الخدمة بنجاح");
  } catch (error) {
    console.error("Update service error:", error);
    sendError(res, "حدث خطأ أثناء تحديث الخدمة", 500);
  }
}

// Delete service (admin only)
export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      sendError(res, "الخدمة غير موجودة", 404);
      return;
    }

    await prisma.service.delete({ where: { id } });

    sendSuccess(res, null, "تم حذف الخدمة بنجاح");
  } catch (error) {
    console.error("Delete service error:", error);
    sendError(res, "حدث خطأ أثناء حذف الخدمة", 500);
  }
}

// Assign service to client
export async function assignServiceToClient(req: Request, res: Response): Promise<void> {
  try {
    const { serviceId, clientId, endDate } = req.body;

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      sendError(res, "الخدمة غير موجودة", 404);
      return;
    }

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      sendError(res, "العميل غير موجود", 404);
      return;
    }

    // Check if service is available for client's tier
    if (!service.availableFor.includes(client.subscriptionTier)) {
      sendError(res, "هذه الخدمة غير متاحة لمستوى اشتراك العميل", 400);
      return;
    }

    // Create or update assignment
    const clientService = await prisma.clientService.upsert({
      where: {
        clientId_serviceId: {
          clientId,
          serviceId,
        },
      },
      update: {
        isActive: true,
        endDate: endDate ? new Date(endDate) : null,
      },
      create: {
        clientId,
        serviceId,
        endDate: endDate ? new Date(endDate) : null,
      },
      include: {
        service: true,
        client: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
    });

    sendSuccess(res, clientService, "تم تعيين الخدمة للعميل بنجاح");
  } catch (error) {
    console.error("Assign service error:", error);
    sendError(res, "حدث خطأ أثناء تعيين الخدمة", 500);
  }
}

// Remove service from client
export async function removeServiceFromClient(req: Request, res: Response): Promise<void> {
  try {
    const { serviceId, clientId } = req.params;

    const clientService = await prisma.clientService.findUnique({
      where: {
        clientId_serviceId: {
          clientId,
          serviceId,
        },
      },
    });

    if (!clientService) {
      sendError(res, "الخدمة غير مسندة لهذا العميل", 404);
      return;
    }

    await prisma.clientService.delete({
      where: {
        clientId_serviceId: {
          clientId,
          serviceId,
        },
      },
    });

    sendSuccess(res, null, "تم إزالة الخدمة من العميل بنجاح");
  } catch (error) {
    console.error("Remove service error:", error);
    sendError(res, "حدث خطأ أثناء إزالة الخدمة", 500);
  }
}

// Get client's services
export async function getClientServices(req: Request, res: Response): Promise<void> {
  try {
    const { clientId } = req.params;

    const services = await prisma.clientService.findMany({
      where: { clientId, isActive: true },
      include: {
        service: true,
      },
    });

    sendSuccess(res, services);
  } catch (error) {
    console.error("Get client services error:", error);
    sendError(res, "حدث خطأ أثناء جلب خدمات العميل", 500);
  }
}
