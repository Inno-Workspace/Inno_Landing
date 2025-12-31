"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    role: string;
  };
}

interface Conversation {
  id: string;
  subject?: string;
  createdAt: string;
  updatedAt: string;
  participants: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    unreadCount: number;
  }>;
  messages: Message[];
  _count?: {
    messages: number;
  };
}

interface Client {
  id: string;
  companyName: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [newConversation, setNewConversation] = useState({
    clientId: "",
    subject: "",
    initialMessage: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchData = async () => {
    try {
      const [conversationsRes, clientsRes] = await Promise.all([
        api.getConversations(),
        api.getClients({ limit: 100 }),
      ]);
      if (conversationsRes.success && conversationsRes.data) {
        setConversations(conversationsRes.data);
      }
      if (clientsRes.success && clientsRes.data) {
        setClients(clientsRes.data.filter((c: Client) => c.user));
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversation = async (id: string) => {
    try {
      const response = await api.getConversation(id);
      if (response.success && response.data) {
        setSelectedConversation(response.data);
        setMessages(response.data.messages || []);
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب المحادثة" });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || !newMessage.trim()) return;

    setIsSending(true);
    try {
      const response = await api.sendMessage(selectedConversation.id, newMessage.trim());
      if (response.success) {
        setNewMessage("");
        fetchConversation(selectedConversation.id);
      } else {
        setMessage({ type: "error", text: response.message || "فشل إرسال الرسالة" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء إرسال الرسالة" });
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConversation.clientId || !newConversation.initialMessage.trim()) return;

    const client = clients.find((c) => c.id === newConversation.clientId);
    if (!client?.user?.id) {
      setMessage({ type: "error", text: "العميل المحدد ليس لديه حساب مستخدم" });
      return;
    }

    setIsSending(true);
    try {
      const response = await api.createConversation(
        [client.user.id],
        newConversation.subject || undefined,
        newConversation.initialMessage.trim()
      );
      if (response.success) {
        setShowNewModal(false);
        setNewConversation({ clientId: "", subject: "", initialMessage: "" });
        fetchData();
        if (response.data?.id) {
          fetchConversation(response.data.id);
        }
      } else {
        setMessage({ type: "error", text: response.message || "فشل إنشاء المحادثة" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء إنشاء المحادثة" });
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
  };

  const getOtherParticipant = (conversation: Conversation) => {
    const other = conversation.participants.find((p) => p.user.role !== "SUPER_ADMIN" && p.user.role !== "ADMIN");
    return other?.user || conversation.participants[0]?.user;
  };

  const getTotalUnread = (conversation: Conversation) => {
    return conversation.participants.reduce((sum, p) => sum + p.unreadCount, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">الرسائل</h1>
        <button onClick={() => setShowNewModal(true)} className="dashboard-btn">
          + محادثة جديدة
        </button>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg mb-4 ${
            message.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-400" : "bg-red-500/10 border border-red-500/50 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex h-[calc(100%-5rem)] gap-4">
        {/* Conversations List */}
        <div className="w-80 shrink-0 dashboard-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-[var(--color-text-primary)]">المحادثات</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">لا توجد محادثات</div>
            ) : (
              conversations.map((conversation) => {
                const other = getOtherParticipant(conversation);
                const unread = getTotalUnread(conversation);
                const lastMessage = conversation.messages?.[0];

                return (
                  <div
                    key={conversation.id}
                    onClick={() => fetchConversation(conversation.id)}
                    className={`p-4 border-b border-[var(--color-border)] cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id ? "bg-[var(--color-accent)]/10" : "hover:bg-[var(--color-bg-primary)]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                          {other?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">{other?.name}</p>
                          {conversation.subject && <p className="text-xs text-[var(--color-accent)]">{conversation.subject}</p>}
                        </div>
                      </div>
                      {unread > 0 && (
                        <span className="px-2 py-0.5 bg-[var(--color-accent)] text-white text-xs rounded-full">{unread}</span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-[var(--color-text-muted)] truncate mt-2">{lastMessage.content}</p>
                    )}
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{formatDate(conversation.updatedAt)}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 dashboard-card overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold">
                  {getOtherParticipant(selectedConversation)?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{getOtherParticipant(selectedConversation)?.name}</p>
                  {selectedConversation.subject && <p className="text-sm text-[var(--color-accent)]">{selectedConversation.subject}</p>}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isAdmin = msg.sender.role === "SUPER_ADMIN" || msg.sender.role === "ADMIN";
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[70%] ${isAdmin ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-2xl ${
                            isAdmin
                              ? "bg-[var(--color-accent)] text-white rounded-br-sm"
                              : "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-[var(--color-text-muted)] mt-1 ${isAdmin ? "text-right" : "text-left"}`}>
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--color-border)]">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="اكتب رسالتك..."
                    className="dashboard-input flex-1"
                  />
                  <button type="submit" disabled={isSending || !newMessage.trim()} className="dashboard-btn px-6">
                    {isSending ? "..." : "إرسال"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[var(--color-text-muted)]">
              <div className="text-center">
                <span className="text-6xl mb-4 block">💬</span>
                <p>اختر محادثة للبدء</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Conversation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">محادثة جديدة</h2>
            </div>

            <form onSubmit={handleCreateConversation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">العميل *</label>
                <select
                  value={newConversation.clientId}
                  onChange={(e) => setNewConversation((prev) => ({ ...prev, clientId: e.target.value }))}
                  required
                  className="dashboard-input w-full"
                >
                  <option value="">اختر العميل</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.companyName} - {client.user?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الموضوع</label>
                <input
                  type="text"
                  value={newConversation.subject}
                  onChange={(e) => setNewConversation((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="موضوع المحادثة (اختياري)"
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الرسالة الأولى *</label>
                <textarea
                  value={newConversation.initialMessage}
                  onChange={(e) => setNewConversation((prev) => ({ ...prev, initialMessage: e.target.value }))}
                  required
                  rows={4}
                  placeholder="اكتب رسالتك..."
                  className="dashboard-input w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSending} className="flex-1 dashboard-btn">
                  {isSending ? "جاري الإرسال..." : "إنشاء المحادثة"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
