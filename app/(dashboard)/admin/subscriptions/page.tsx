"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface Client {
  id: string;
  companyName: string;
  companyNameAr?: string;
  email: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

export default function SubscriptionsPage() {
  const searchParams = useSearchParams();
  const preselectedClient = searchParams.get("client");

  const [clients, setClients] = useState<Client[]>([]);
  const [expiringClients, setExpiringClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    tier: "GOLD",
    status: "ACTIVE",
    months: 12,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (preselectedClient && clients.length > 0) {
      const client = clients.find((c) => c.id === preselectedClient);
      if (client) {
        openModal(client);
      }
    }
  }, [preselectedClient, clients]);

  const fetchData = async () => {
    try {
      const [clientsRes, expiringRes] = await Promise.all([
        api.getClients({ limit: 100 }),
        api.getExpiringSubscriptions(30),
      ]);
      if (clientsRes.success && clientsRes.data) {
        setClients(clientsRes.data);
      }
      if (expiringRes.success && expiringRes.data) {
        setExpiringClients(expiringRes.data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      tier: client.subscriptionTier,
      status: client.subscriptionStatus,
      months: 12,
    });
    setShowModal(true);
  };

  const handleUpdateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    setIsSaving(true);
    try {
      const response = await api.updateSubscription(selectedClient.id, {
        tier: formData.tier,
        status: formData.status,
      });
      if (response.success) {
        setMessage({ type: "success", text: "تم تحديث الاشتراك بنجاح" });
        setShowModal(false);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "حدث خطأ" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تحديث الاشتراك" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRenewSubscription = async () => {
    if (!selectedClient) return;

    setIsSaving(true);
    try {
      const response = await api.renewSubscription(selectedClient.id, {
        months: formData.months,
        tier: formData.tier,
      });
      if (response.success) {
        setMessage({ type: "success", text: "تم تجديد الاشتراك بنجاح" });
        setShowModal(false);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "حدث خطأ" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تجديد الاشتراك" });
    } finally {
      setIsSaving(false);
    }
  };

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

  const formatDate = (date?: string) => {
    if (!date) return "غير محدد";
    return new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  };

  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return null;
    const days = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const filteredClients = clients.filter((client) => {
    if (filter === "all") return true;
    return client.subscriptionStatus === filter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">إدارة الاشتراكات</h1>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg ${
            message.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-400" : "bg-red-500/10 border border-red-500/50 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Expiring Soon Alert */}
      {expiringClients.length > 0 && (
        <div className="dashboard-card p-4 border-yellow-500/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-semibold text-yellow-400">اشتراكات تنتهي قريباً</h2>
          </div>
          <div className="space-y-2">
            {expiringClients.slice(0, 5).map((client) => {
              const days = getDaysRemaining(client.subscriptionEnd);
              return (
                <div key={client.id} className="flex items-center justify-between p-3 bg-[var(--color-bg-primary)] rounded-lg">
                  <div>
                    <p className="text-[var(--color-text-primary)]">{client.companyName}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      ينتهي في {formatDate(client.subscriptionEnd)} ({days} يوم)
                    </p>
                  </div>
                  <button onClick={() => openModal(client)} className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors">
                    تجديد
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border)] pb-4">
        {[
          { key: "all", label: "الكل" },
          { key: "ACTIVE", label: "نشط" },
          { key: "EXPIRED", label: "منتهي" },
          { key: "PENDING", label: "معلق" },
          { key: "CANCELLED", label: "ملغي" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>العميل</th>
              <th>الباقة</th>
              <th>الحالة</th>
              <th>تاريخ البدء</th>
              <th>تاريخ الانتهاء</th>
              <th>المتبقي</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => {
              const days = getDaysRemaining(client.subscriptionEnd);
              return (
                <tr key={client.id}>
                  <td>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{client.companyName}</p>
                      <p className="text-sm text-[var(--color-text-muted)]" dir="ltr">
                        {client.email}
                      </p>
                    </div>
                  </td>
                  <td>{getTierBadge(client.subscriptionTier)}</td>
                  <td>{getStatusBadge(client.subscriptionStatus)}</td>
                  <td className="text-[var(--color-text-secondary)]">{formatDate(client.subscriptionStart)}</td>
                  <td className="text-[var(--color-text-secondary)]">{formatDate(client.subscriptionEnd)}</td>
                  <td>
                    {days !== null ? (
                      <span className={`font-medium ${days <= 7 ? "text-red-400" : days <= 30 ? "text-yellow-400" : "text-green-400"}`}>
                        {days > 0 ? `${days} يوم` : "منتهي"}
                      </span>
                    ) : (
                      <span className="text-[var(--color-text-muted)]">-</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(client)} className="px-3 py-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm hover:bg-[var(--color-accent)]/30 transition-colors">
                        تعديل
                      </button>
                      <Link href={`/admin/clients/${client.id}`} className="px-3 py-1.5 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg text-sm hover:text-[var(--color-text-primary)] transition-colors">
                        التفاصيل
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-muted)]">لا توجد اشتراكات</div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">إدارة اشتراك {selectedClient.companyName}</h2>
            </div>

            <form onSubmit={handleUpdateSubscription} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الباقة</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tier: e.target.value }))}
                  className="dashboard-input w-full"
                >
                  <option value="GOLD">ذهبي</option>
                  <option value="PLATINUM">بلاتيني</option>
                  <option value="DIAMOND">ماسي</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الحالة</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="dashboard-input w-full"
                >
                  <option value="ACTIVE">نشط</option>
                  <option value="PENDING">معلق</option>
                  <option value="EXPIRED">منتهي</option>
                  <option value="CANCELLED">ملغي</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">تجديد الاشتراك</h3>
                <div className="flex gap-3">
                  <select
                    value={formData.months}
                    onChange={(e) => setFormData((prev) => ({ ...prev, months: Number(e.target.value) }))}
                    className="dashboard-input flex-1"
                  >
                    <option value={1}>شهر واحد</option>
                    <option value={3}>3 أشهر</option>
                    <option value={6}>6 أشهر</option>
                    <option value={12}>سنة</option>
                    <option value={24}>سنتين</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleRenewSubscription}
                    disabled={isSaving}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    تجديد
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSaving} className="flex-1 dashboard-btn">
                  {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
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
