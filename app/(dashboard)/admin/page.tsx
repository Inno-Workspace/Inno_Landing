"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface AdminStats {
  overview: {
    totalClients: number;
    activeClients: number;
    totalFiles: number;
    totalStorage: number;
    expiringSubscriptions: number;
  };
  subscriptionsByTier: {
    gold: number;
    platinum: number;
    diamond: number;
  };
  recentClients: Array<{
    id: string;
    companyName: string;
    subscriptionTier: string;
    createdAt: string;
  }>;
  recentActivity: Array<{
    id: string;
    action: string;
    description: string;
    createdAt: string;
    user: { name: string; email: string };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getAdminStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب الإحصائيات");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatStorage = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        لوحة التحكم
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي العملاء"
          value={stats?.overview.totalClients || 0}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="العملاء النشطين"
          value={stats?.overview.activeClients || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          title="إجمالي الملفات"
          value={stats?.overview.totalFiles || 0}
          icon="📁"
          color="purple"
        />
        <StatCard
          title="اشتراكات تنتهي قريباً"
          value={stats?.overview.expiringSubscriptions || 0}
          icon="⚠️"
          color="yellow"
        />
      </div>

      {/* Subscriptions by Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TierCard
          tier="Gold"
          tierAr="ذهبي"
          count={stats?.subscriptionsByTier.gold || 0}
          color="from-yellow-400 to-yellow-600"
        />
        <TierCard
          tier="Platinum"
          tierAr="بلاتيني"
          count={stats?.subscriptionsByTier.platinum || 0}
          color="from-gray-300 to-gray-500"
        />
        <TierCard
          tier="Diamond"
          tierAr="ماسي"
          count={stats?.subscriptionsByTier.diamond || 0}
          color="from-cyan-400 to-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              أحدث العملاء
            </h2>
            <Link
              href="/admin/clients"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentClients.map((client) => (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
              >
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {client.companyName}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {formatDate(client.createdAt)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    client.subscriptionTier === "DIAMOND"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : client.subscriptionTier === "PLATINUM"
                      ? "bg-gray-500/20 text-gray-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {client.subscriptionTier === "DIAMOND"
                    ? "ماسي"
                    : client.subscriptionTier === "PLATINUM"
                    ? "بلاتيني"
                    : "ذهبي"}
                </span>
              </Link>
            ))}
            {(!stats?.recentClients || stats.recentClients.length === 0) && (
              <p className="text-center text-[var(--color-text-muted)] py-4">
                لا يوجد عملاء بعد
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            آخر النشاطات
          </h2>
          <div className="space-y-3">
            {stats?.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-primary)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-sm">
                  {getActivityIcon(activity.action)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-text-primary)]">
                    {activity.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {activity.user.name} • {formatDate(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
              <p className="text-center text-[var(--color-text-muted)] py-4">
                لا توجد نشاطات بعد
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/clients/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-accent)]/10 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm text-[var(--color-text-secondary)]">إضافة عميل</span>
          </Link>
          <Link
            href="/admin/files"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-accent)]/10 transition-colors"
          >
            <span className="text-2xl">📤</span>
            <span className="text-sm text-[var(--color-text-secondary)]">رفع ملف</span>
          </Link>
          <Link
            href="/admin/services/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-accent)]/10 transition-colors"
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-sm text-[var(--color-text-secondary)]">إضافة خدمة</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[var(--color-accent)]/10 transition-colors"
          >
            <span className="text-2xl">💬</span>
            <span className="text-sm text-[var(--color-text-secondary)]">الرسائل</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: "blue" | "green" | "purple" | "yellow";
}) {
  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${colorClasses[color]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
          <p className="text-sm text-[var(--color-text-muted)]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function TierCard({
  tier,
  tierAr,
  count,
  color,
}: {
  tier: string;
  tierAr: string;
  count: number;
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-white/80">{tierAr}</p>
        </div>
        <div className="text-4xl opacity-50">
          {tier === "Gold" ? "🥇" : tier === "Platinum" ? "🥈" : "💎"}
        </div>
      </div>
    </div>
  );
}

function getActivityIcon(action: string) {
  switch (action) {
    case "LOGIN":
      return "🔑";
    case "CREATE_CLIENT":
      return "👤";
    case "UPDATE_CLIENT":
      return "✏️";
    case "DELETE_CLIENT":
      return "🗑️";
    case "UPLOAD_FILE":
      return "📤";
    case "DELETE_FILE":
      return "📁";
    default:
      return "📋";
  }
}
