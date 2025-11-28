"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Client {
  id: string;
  companyName: string;
  email: string;
  phone?: string;
  subscriptionTier: "GOLD" | "PLATINUM" | "DIAMOND";
  subscriptionStatus: string;
  subscriptionEnd?: string;
  createdAt: string;
  _count?: {
    files: number;
    services: number;
  };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await api.getClients({
        page,
        limit: 10,
        search: search || undefined,
        tier: tier || undefined,
      });
      if (response.success && response.data) {
        setClients(response.data);
        setTotalPages(response.meta?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, tier]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchClients();
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteClient(id);
      setShowDeleteModal(null);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const getTierBadge = (tier: string) => {
    const styles = {
      GOLD: "bg-yellow-500/20 text-yellow-400",
      PLATINUM: "bg-gray-500/20 text-gray-400",
      DIAMOND: "bg-cyan-500/20 text-cyan-400",
    };
    const names = {
      GOLD: "ذهبي",
      PLATINUM: "بلاتيني",
      DIAMOND: "ماسي",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[tier as keyof typeof styles]}`}>
        {names[tier as keyof typeof names]}
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
    const names: Record<string, string> = {
      ACTIVE: "نشط",
      EXPIRED: "منتهي",
      CANCELLED: "ملغي",
      PENDING: "معلق",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {names[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">العملاء</h1>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          + إضافة عميل
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-4">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="بحث بالاسم أو الإيميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <select
            value={tier}
            onChange={(e) => {
              setTier(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <option value="">كل الباقات</option>
            <option value="GOLD">ذهبي</option>
            <option value="PLATINUM">بلاتيني</option>
            <option value="DIAMOND">ماسي</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            بحث
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-bg-primary)]">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    الشركة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    الباقة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    الملفات
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-muted)]">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-[var(--color-bg-primary)]/50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                      >
                        {client.companyName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)]">
                      {client.email}
                    </td>
                    <td className="px-6 py-4">{getTierBadge(client.subscriptionTier)}</td>
                    <td className="px-6 py-4">{getStatusBadge(client.subscriptionStatus)}</td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)]">
                      {client._count?.files || 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="p-2 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 rounded-lg transition-colors"
                        >
                          👁️
                        </Link>
                        <Link
                          href={`/admin/clients/${client.id}/edit`}
                          className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => setShowDeleteModal(client.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clients.length === 0 && (
              <div className="text-center py-12 text-[var(--color-text-muted)]">
                لا يوجد عملاء
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-[var(--color-border)]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] disabled:opacity-50"
            >
              السابق
            </button>
            <span className="text-[var(--color-text-muted)]">
              صفحة {page} من {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              تأكيد الحذف
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-2 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
