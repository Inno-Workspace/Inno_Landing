import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { sendSuccess, sendError, sendPaginated } from "../utils/response.js";

// Get all conversations for user
export async function getConversations(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const userId = req.user!.id;
    const isAdmin = req.user!.role === "SUPER_ADMIN" || req.user!.role === "ADMIN";

    const where: any = isAdmin
      ? {} // Admins can see all conversations
      : { participants: { has: userId } };

    const [conversations, total] = await Promise.all([
      prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        include: {
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { lastMessageAt: "desc" },
      }),
      prisma.conversation.count({ where }),
    ]);

    // Get participant info
    const conversationsWithParticipants = await Promise.all(
      conversations.map(async (conv) => {
        const participants = await prisma.user.findMany({
          where: { id: { in: conv.participants } },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        });
        return { ...conv, participantDetails: participants };
      })
    );

    sendPaginated(res, conversationsWithParticipants, page, limit, total);
  } catch (error) {
    console.error("Get conversations error:", error);
    sendError(res, "حدث خطأ أثناء جلب المحادثات", 500);
  }
}

// Get single conversation with messages
export async function getConversation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!conversation) {
      sendError(res, "المحادثة غير موجودة", 404);
      return;
    }

    // Check access
    const isAdmin = req.user!.role === "SUPER_ADMIN" || req.user!.role === "ADMIN";
    if (!isAdmin && !conversation.participants.includes(req.user!.id)) {
      sendError(res, "غير مصرح بالوصول لهذه المحادثة", 403);
      return;
    }

    const [messages, totalMessages, participants] = await Promise.all([
      prisma.message.findMany({
        where: { conversationId: id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.message.count({ where: { conversationId: id } }),
      prisma.user.findMany({
        where: { id: { in: conversation.participants } },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
        },
      }),
    ]);

    // Mark unread messages as read
    await prisma.message.updateMany({
      where: {
        conversationId: id,
        senderId: { not: req.user!.id },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    sendSuccess(res, {
      ...conversation,
      participantDetails: participants,
      messages: messages.reverse(), // Oldest first
      pagination: {
        page,
        limit,
        total: totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
      },
    });
  } catch (error) {
    console.error("Get conversation error:", error);
    sendError(res, "حدث خطأ أثناء جلب المحادثة", 500);
  }
}

// Create new conversation
export async function createConversation(req: Request, res: Response): Promise<void> {
  try {
    const { participantIds, subject, initialMessage } = req.body;

    // Include current user in participants
    const allParticipants = [...new Set([req.user!.id, ...participantIds])];

    // Verify all participants exist
    const existingUsers = await prisma.user.findMany({
      where: { id: { in: allParticipants } },
      select: { id: true },
    });

    if (existingUsers.length !== allParticipants.length) {
      sendError(res, "بعض المشاركين غير موجودين", 400);
      return;
    }

    // Create conversation
    const conversation = await prisma.conversation.create({
      data: {
        subject,
        participants: allParticipants,
        lastMessageAt: initialMessage ? new Date() : null,
        messages: initialMessage
          ? {
              create: {
                senderId: req.user!.id,
                content: initialMessage,
              },
            }
          : undefined,
      },
      include: {
        messages: true,
      },
    });

    // Get participant details
    const participants = await prisma.user.findMany({
      where: { id: { in: allParticipants } },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    sendSuccess(
      res,
      { ...conversation, participantDetails: participants },
      "تم إنشاء المحادثة بنجاح",
      201
    );
  } catch (error) {
    console.error("Create conversation error:", error);
    sendError(res, "حدث خطأ أثناء إنشاء المحادثة", 500);
  }
}

// Send message
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.params;
    const { content, attachments } = req.body;

    // Check conversation exists and user has access
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      sendError(res, "المحادثة غير موجودة", 404);
      return;
    }

    const isAdmin = req.user!.role === "SUPER_ADMIN" || req.user!.role === "ADMIN";
    if (!isAdmin && !conversation.participants.includes(req.user!.id)) {
      sendError(res, "غير مصرح بالإرسال في هذه المحادثة", 403);
      return;
    }

    // Create message and update conversation
    const [message] = await prisma.$transaction([
      prisma.message.create({
        data: {
          conversationId,
          senderId: req.user!.id,
          content,
          attachments: attachments || [],
        },
      }),
      prisma.conversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: new Date() },
      }),
    ]);

    sendSuccess(res, message, "تم إرسال الرسالة بنجاح", 201);
  } catch (error) {
    console.error("Send message error:", error);
    sendError(res, "حدث خطأ أثناء إرسال الرسالة", 500);
  }
}

// Get unread messages count
export async function getUnreadCount(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.id;
    const isAdmin = req.user!.role === "SUPER_ADMIN" || req.user!.role === "ADMIN";

    let count: number;

    if (isAdmin) {
      // For admins, count all unread messages not sent by them
      count = await prisma.message.count({
        where: {
          senderId: { not: userId },
          isRead: false,
        },
      });
    } else {
      // For clients, count unread messages in their conversations
      const conversations = await prisma.conversation.findMany({
        where: { participants: { has: userId } },
        select: { id: true },
      });

      count = await prisma.message.count({
        where: {
          conversationId: { in: conversations.map((c) => c.id) },
          senderId: { not: userId },
          isRead: false,
        },
      });
    }

    sendSuccess(res, { unreadCount: count });
  } catch (error) {
    console.error("Get unread count error:", error);
    sendError(res, "حدث خطأ أثناء جلب عدد الرسائل غير المقروءة", 500);
  }
}

// Archive conversation
export async function archiveConversation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const conversation = await prisma.conversation.update({
      where: { id },
      data: { isArchived: true },
    });

    sendSuccess(res, conversation, "تم أرشفة المحادثة بنجاح");
  } catch (error) {
    console.error("Archive conversation error:", error);
    sendError(res, "حدث خطأ أثناء أرشفة المحادثة", 500);
  }
}
