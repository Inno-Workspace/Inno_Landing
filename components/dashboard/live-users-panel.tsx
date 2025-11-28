"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

interface OnlineUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isOnline: boolean;
  lastActivity?: string;
  client?: {
    id: string;
    companyName: string;
  };
}

interface LiveUsersPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function LiveUsersPanel({ isOpen, onToggle }: LiveUsersPanelProps) {
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOnlineUsers = useCallback(async () => {
    try {
      const response = await api.getOnlineUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (err) {
      setError("فشل في جلب المستخدمين");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update heartbeat and fetch users
  useEffect(() => {
    fetchOnlineUsers();

    // Send heartbeat every 30 seconds
    const heartbeatInterval = setInterval(async () => {
      try {
        await api.updateUserOnlineStatus(true);
      } catch (err) {
        // Ignore heartbeat errors
      }
    }, 30000);

    // Refresh online users every 10 seconds
    const refreshInterval = setInterval(fetchOnlineUsers, 10000);

    // Set online status on mount
    api.updateUserOnlineStatus(true);

    // Set offline status on unmount
    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(refreshInterval);
      api.updateUserOnlineStatus(false);
    };
  }, [fetchOnlineUsers]);

  const handleToggleActive = async (user: OnlineUser) => {
    try {
      await api.setUserActiveStatus(user.id, !user.isActive);
      fetchOnlineUsers();
    } catch (err) {
      // Handle error
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "مدير عام";
      case "ADMIN":
        return "مدير";
      case "CLIENT":
        return "عميل";
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-purple-500/20 text-purple-400";
      case "ADMIN":
        return "bg-blue-500/20 text-blue-400";
      case "CLIENT":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTimeAgo = (date?: string) => {
    if (!date) return "";
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "الآن";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    return `منذ ${hours} ساعة`;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-1/2 -translate-y-1/2 ${isOpen ? "left-72" : "left-0"} z-40 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-2 rounded-l-none rounded-r-lg transition-all duration-300 hover:bg-[var(--color-accent)]/20`}
        title={isOpen ? "إغلاق" : "المتصلون"}
      >
        <span className="relative">
          👥
          {users.length > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
              {users.length}
            </span>
          )}
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] transform transition-transform duration-300 z-30 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              المتصلون الآن
            </h2>
            <span className="text-sm text-[var(--color-text-muted)]">{users.length}</span>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 dashboard-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="dashboard-spinner"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400 text-sm">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-[var(--color-text-muted)] text-sm">لا يوجد مستخدمين متصلين</div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="p-3 bg-[var(--color-bg-primary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-[var(--color-bg-primary)] ${user.isOnline ? "bg-green-500" : "bg-gray-500"}`}></span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-[var(--color-text-primary)] text-sm truncate">{user.name}</p>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] truncate" dir="ltr">
                      {user.email}
                    </p>
                    {user.client && (
                      <p className="text-xs text-[var(--color-accent)] truncate mt-0.5">{user.client.companyName}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-xs ${getRoleBadgeColor(user.role)}`}>
                        {getRoleName(user.role)}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">{getTimeAgo(user.lastActivity)}</span>
                    </div>
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="mt-2 pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--color-text-muted)]">الحالة</span>
                  <button
                    onClick={() => handleToggleActive(user)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      user.isActive
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}
                  >
                    {user.isActive ? "نشط" : "معطل"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--color-border)]">
          <button
            onClick={fetchOnlineUsers}
            className="w-full px-3 py-2 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg text-sm hover:bg-[var(--color-border)] transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>تحديث</span>
          </button>
        </div>
      </div>
    </>
  );
}
