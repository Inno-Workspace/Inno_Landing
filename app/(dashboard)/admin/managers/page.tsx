"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Manager {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "ADMIN",
    isActive: true,
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await api.getManagers();
      if (response.success && response.data) {
        setManagers(response.data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (manager?: Manager) => {
    if (manager) {
      setSelectedManager(manager);
      setFormData({
        name: manager.name,
        email: manager.email,
        phone: manager.phone || "",
        password: "",
        role: manager.role,
        isActive: manager.isActive,
      });
    } else {
      setSelectedManager(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "ADMIN",
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let response;
      if (selectedManager) {
        const updateData: Record<string, unknown> = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          isActive: formData.isActive,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        response = await api.updateManager(selectedManager.id, updateData);
      } else {
        response = await api.createManager(formData);
      }

      if (response.success) {
        setMessage({ type: "success", text: selectedManager ? "تم تحديث المدير بنجاح" : "تم إنشاء المدير بنجاح" });
        setShowModal(false);
        fetchManagers();
      } else {
        setMessage({ type: "error", text: response.message || "حدث خطأ" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء حفظ البيانات" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedManager) return;

    try {
      const response = await api.deleteManager(selectedManager.id);
      if (response.success) {
        setMessage({ type: "success", text: "تم حذف المدير بنجاح" });
        setShowDeleteModal(false);
        setSelectedManager(null);
        fetchManagers();
      } else {
        setMessage({ type: "error", text: response.message || "فشل حذف المدير" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء حذف المدير" });
    }
  };

  const handleToggleActive = async (manager: Manager) => {
    try {
      const response = await api.updateManager(manager.id, { isActive: !manager.isActive });
      if (response.success) {
        setMessage({ type: "success", text: manager.isActive ? "تم تعطيل المدير" : "تم تفعيل المدير" });
        fetchManagers();
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ" });
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "لم يسجل دخول";
    return new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      SUPER_ADMIN: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      ADMIN: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };
    const names: Record<string, string> = { SUPER_ADMIN: "مدير عام", ADMIN: "مدير" };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[role] || styles.ADMIN}`}>
        {names[role] || role}
      </span>
    );
  };

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
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">إدارة المديرين</h1>
        <button onClick={() => openEditModal()} className="dashboard-btn">
          + إضافة مدير
        </button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">إجمالي المديرين</p>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">{managers.length}</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">مديرين نشطين</p>
          <p className="text-3xl font-bold text-green-400">{managers.filter((m) => m.isActive).length}</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">مديرين معطلين</p>
          <p className="text-3xl font-bold text-red-400">{managers.filter((m) => !m.isActive).length}</p>
        </div>
      </div>

      {/* Managers Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>المدير</th>
              <th>الصلاحية</th>
              <th>الحالة</th>
              <th>آخر دخول</th>
              <th>تاريخ الإنشاء</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold">
                      {manager.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{manager.name}</p>
                      <p className="text-sm text-[var(--color-text-muted)]" dir="ltr">
                        {manager.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{getRoleBadge(manager.role)}</td>
                <td>
                  <button
                    onClick={() => handleToggleActive(manager)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      manager.isActive ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}
                  >
                    {manager.isActive ? "نشط" : "معطل"}
                  </button>
                </td>
                <td className="text-[var(--color-text-muted)]">{formatDate(manager.lastLogin)}</td>
                <td className="text-[var(--color-text-muted)]">{formatDate(manager.createdAt)}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(manager)} className="px-3 py-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm hover:bg-[var(--color-accent)]/30 transition-colors">
                      تعديل
                    </button>
                    <button
                      onClick={() => {
                        setSelectedManager(manager);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {managers.length === 0 && <div className="text-center py-12 text-[var(--color-text-muted)]">لا يوجد مديرين</div>}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{selectedManager ? "تعديل المدير" : "إضافة مدير جديد"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الاسم *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">البريد الإلكتروني *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  dir="ltr"
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">رقم الهاتف</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} dir="ltr" className="dashboard-input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {selectedManager ? "كلمة المرور (اتركها فارغة للإبقاء على الحالية)" : "كلمة المرور *"}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required={!selectedManager}
                  dir="ltr"
                  minLength={6}
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الصلاحية</label>
                <select value={formData.role} onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))} className="dashboard-input w-full">
                  <option value="ADMIN">مدير</option>
                  <option value="SUPER_ADMIN">مدير عام</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 rounded border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-accent)]"
                />
                <span className="text-[var(--color-text-secondary)]">الحساب نشط</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSaving} className="flex-1 dashboard-btn">
                  {isSaving ? "جاري الحفظ..." : selectedManager ? "حفظ التغييرات" : "إضافة المدير"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)] max-w-sm w-full">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">تأكيد الحذف</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              هل أنت متأكد من حذف المدير <span className="text-[var(--color-text-primary)] font-medium">"{selectedManager.name}"</span>؟
            </p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                حذف
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
