"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface Client {
  id: string;
  companyName: string;
  companyNameAr?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  logo?: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  notes?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
  };
  files?: Array<{
    id: string;
    name: string;
    originalName: string;
    url: string;
    createdAt: string;
  }>;
  services?: Array<{
    id: string;
    service: {
      id: string;
      name: string;
      nameAr?: string;
    };
  }>;
  statistics?: {
    totalVisits: number;
    uniqueVisitors: number;
    pageViews: number;
    totalFiles: number;
    totalStorage: number;
  };
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.getClient(params.id as string);
        if (response.success && response.data) {
          setClient(response.data);
        } else {
          setError("العميل غير موجود");
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات العميل");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [params.id]);

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      GOLD: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      PLATINUM: "bg-gray-400/20 text-gray-300 border-gray-400/30",
      DIAMOND: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    };
    const names: Record<string, string> = { GOLD: "ذهبي", PLATINUM: "بلاتيني", DIAMOND: "ماسي" };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[tier]}`}>
        {names[tier]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: "bg-green-500/20 text-green-400",
      EXPIRED: "bg-red-500/20 text-red-400",
      CANCELLED: "bg-gray-500/20 text-gray-400",
      PENDING: "bg-yellow-500/20 text-yellow-400",
    };
    const names: Record<string, string> = { ACTIVE: "نشط", EXPIRED: "منتهي", CANCELLED: "ملغي", PENDING: "معلق" };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>{names[status]}</span>;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatStorage = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/admin/clients" className="text-[var(--color-accent)] hover:underline">
          العودة لقائمة العملاء
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/clients" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{client.companyName}</h1>
            {client.companyNameAr && <p className="text-[var(--color-text-muted)]">{client.companyNameAr}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="px-4 py-2 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
          >
            تعديل
          </Link>
          <button
            onClick={() => router.push(`/admin/subscriptions?client=${client.id}`)}
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            إدارة الاشتراك
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm mb-1">الباقة</p>
          {getTierBadge(client.subscriptionTier)}
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm mb-1">الحالة</p>
          {getStatusBadge(client.subscriptionStatus)}
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm mb-1">تاريخ الانتهاء</p>
          <p className="text-[var(--color-text-primary)] font-medium">
            {client.subscriptionEnd ? formatDate(client.subscriptionEnd) : "غير محدد"}
          </p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm mb-1">تاريخ الإنشاء</p>
          <p className="text-[var(--color-text-primary)] font-medium">{formatDate(client.createdAt)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="dashboard-card p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">معلومات الشركة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[var(--color-text-muted)] text-sm">البريد الإلكتروني</p>
                <p className="text-[var(--color-text-primary)]" dir="ltr">{client.email}</p>
              </div>
              {client.phone && (
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">الهاتف</p>
                  <p className="text-[var(--color-text-primary)]" dir="ltr">{client.phone}</p>
                </div>
              )}
              {client.website && (
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">الموقع</p>
                  <a href={client.website} target="_blank" className="text-[var(--color-accent)] hover:underline" dir="ltr">
                    {client.website}
                  </a>
                </div>
              )}
              {client.address && (
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">العنوان</p>
                  <p className="text-[var(--color-text-primary)]">{client.address}</p>
                </div>
              )}
            </div>
            {client.description && (
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-text-muted)] text-sm mb-2">الوصف</p>
                <p className="text-[var(--color-text-secondary)]">{client.description}</p>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="dashboard-card p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">الخدمات المفعلة</h2>
            {client.services && client.services.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {client.services.map((s) => (
                  <span key={s.id} className="px-3 py-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm">
                    {s.service.nameAr || s.service.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[var(--color-text-muted)]">لا توجد خدمات مفعلة</p>
            )}
          </div>

          {/* Recent Files */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">آخر الملفات</h2>
              <Link href={`/admin/files?client=${client.id}`} className="text-sm text-[var(--color-accent)] hover:underline">
                عرض الكل
              </Link>
            </div>
            {client.files && client.files.length > 0 ? (
              <div className="space-y-2">
                {client.files.slice(0, 5).map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📄</span>
                      <div>
                        <p className="text-[var(--color-text-primary)] text-sm">{file.originalName}</p>
                        <p className="text-[var(--color-text-muted)] text-xs">{formatDate(file.createdAt)}</p>
                      </div>
                    </div>
                    <a href={file.url} target="_blank" className="text-[var(--color-accent)] text-sm hover:underline">
                      تحميل
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--color-text-muted)]">لا توجد ملفات</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="dashboard-card p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">الإحصائيات</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">الزيارات</span>
                <span className="text-[var(--color-text-primary)] font-medium">{client.statistics?.totalVisits || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">الزوار</span>
                <span className="text-[var(--color-text-primary)] font-medium">{client.statistics?.uniqueVisitors || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">الملفات</span>
                <span className="text-[var(--color-text-primary)] font-medium">{client.statistics?.totalFiles || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">المساحة</span>
                <span className="text-[var(--color-text-primary)] font-medium">{formatStorage(client.statistics?.totalStorage || 0)}</span>
              </div>
            </div>
          </div>

          {/* User Account */}
          {client.user && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">حساب المستخدم</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">الاسم</p>
                  <p className="text-[var(--color-text-primary)]">{client.user.name}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">البريد</p>
                  <p className="text-[var(--color-text-primary)]" dir="ltr">{client.user.email}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">الحالة</p>
                  <span className={`px-2 py-1 rounded text-xs ${client.user.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {client.user.isActive ? "نشط" : "معطل"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {client.notes && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">ملاحظات داخلية</h2>
              <p className="text-[var(--color-text-secondary)] text-sm">{client.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
