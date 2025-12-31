const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/api";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "حدث خطأ غير متوقع");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("حدث خطأ في الاتصال");
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async register(data: { email: string; password: string; name: string; phone?: string }) {
    const response = await this.request<{ user: any; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async getCurrentUser() {
    return this.request<any>("/auth/me");
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    this.setToken(null);
  }

  // Client endpoints
  async getClients(params?: { page?: number; limit?: number; search?: string; tier?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<any[]>(`/clients${query ? `?${query}` : ""}`);
  }

  async getClient(id: string) {
    return this.request<any>(`/clients/${id}`);
  }

  async createClient(data: any) {
    return this.request<any>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: string, data: any) {
    return this.request<any>(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: string) {
    return this.request(`/clients/${id}`, { method: "DELETE" });
  }

  async getClientsSummary() {
    return this.request<any>("/clients/summary");
  }

  // Subscription endpoints
  async updateSubscription(clientId: string, data: any) {
    return this.request<any>(`/subscriptions/${clientId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async renewSubscription(clientId: string, data: { months: number; tier?: string }) {
    return this.request<any>(`/subscriptions/${clientId}/renew`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getExpiringSubscriptions(days?: number) {
    return this.request<any[]>(`/subscriptions/expiring${days ? `?days=${days}` : ""}`);
  }

  async getSubscriptionStats() {
    return this.request<any>("/subscriptions/stats");
  }

  // File endpoints
  async getFiles(params?: { page?: number; clientId?: string; library?: boolean }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<any[]>(`/files${query ? `?${query}` : ""}`);
  }

  async uploadFile(file: File, data?: { clientId?: string; isLibrary?: boolean; generateQR?: boolean }) {
    const formData = new FormData();
    formData.append("file", file);
    if (data?.clientId) formData.append("clientId", data.clientId);
    if (data?.isLibrary) formData.append("isLibrary", "true");
    if (data?.generateQR) formData.append("generateQR", "true");

    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/files`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    return response.json();
  }

  async deleteFile(id: string) {
    return this.request(`/files/${id}`, { method: "DELETE" });
  }

  async generateQRCode(fileId: string) {
    return this.request<any>(`/files/${fileId}/qrcode`, { method: "POST" });
  }

  // Service endpoints
  async getServices(tier?: string) {
    return this.request<any[]>(`/services${tier ? `?tier=${tier}` : ""}`);
  }

  async createService(data: any) {
    return this.request<any>("/services", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request<any>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, { method: "DELETE" });
  }

  async assignServiceToClient(serviceId: string, clientId: string) {
    return this.request("/services/assign", {
      method: "POST",
      body: JSON.stringify({ serviceId, clientId }),
    });
  }

  // Stats endpoints
  async getAdminStats() {
    return this.request<any>("/stats/admin");
  }

  async getClientStats(clientId?: string) {
    return this.request<any>(`/stats/client${clientId ? `/${clientId}` : ""}`);
  }

  async getActivityLog(params?: { page?: number; userId?: string; action?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<any[]>(`/stats/activity${query ? `?${query}` : ""}`);
  }

  // Message endpoints
  async getConversations() {
    return this.request<any[]>("/messages");
  }

  async getConversation(id: string) {
    return this.request<any>(`/messages/${id}`);
  }

  async createConversation(participantIds: string[], subject?: string, initialMessage?: string) {
    return this.request<any>("/messages", {
      method: "POST",
      body: JSON.stringify({ participantIds, subject, initialMessage }),
    });
  }

  async sendMessage(conversationId: string, content: string, attachments?: string[]) {
    return this.request<any>(`/messages/${conversationId}/send`, {
      method: "POST",
      body: JSON.stringify({ content, attachments }),
    });
  }

  async getUnreadCount() {
    return this.request<{ unreadCount: number }>("/messages/unread");
  }

  // Manager endpoints
  async getManagers() {
    return this.request<any[]>("/managers");
  }

  async getManager(id: string) {
    return this.request<any>(`/managers/${id}`);
  }

  async createManager(data: { name: string; email: string; password: string; phone?: string; role?: string; isActive?: boolean }) {
    return this.request<any>("/managers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateManager(id: string, data: Record<string, unknown>) {
    return this.request<any>(`/managers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteManager(id: string) {
    return this.request(`/managers/${id}`, { method: "DELETE" });
  }

  // Online users endpoints
  async getOnlineUsers() {
    return this.request<any[]>("/users/online");
  }

  async updateUserOnlineStatus(isOnline: boolean) {
    return this.request("/users/status", {
      method: "PUT",
      body: JSON.stringify({ isOnline }),
    });
  }

  async setUserActiveStatus(userId: string, isActive: boolean) {
    return this.request(`/users/${userId}/active`, {
      method: "PUT",
      body: JSON.stringify({ isActive }),
    });
  }
}

export const api = new ApiClient();
export default api;
