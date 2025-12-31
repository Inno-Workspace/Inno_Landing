"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Service {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  tier: string;
  isActive: boolean;
  createdAt: string;
  _count?: {
    clients: number;
  };
}

interface Client {
  id: string;
  companyName: string;
  subscriptionTier: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [filter, setFilter] = useState<string>("all");

  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    description: "",
    tier: "GOLD",
    isActive: true,
  });

  const [assignData, setAssignData] = useState({
    serviceId: "",
    clientId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, clientsRes] = await Promise.all([
        api.getServices(),
        api.getClients({ limit: 100 }),
      ]);
      if (servicesRes.success && servicesRes.data) {
        setServices(servicesRes.data);
      }
      if (clientsRes.success && clientsRes.data) {
        setClients(clientsRes.data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (service?: Service) => {
    if (service) {
      setSelectedService(service);
      setFormData({
        name: service.name,
        nameAr: service.nameAr || "",
        description: service.description || "",
        tier: service.tier,
        isActive: service.isActive,
      });
    } else {
      setSelectedService(null);
      setFormData({
        name: "",
        nameAr: "",
        description: "",
        tier: "GOLD",
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
      if (selectedService) {
        response = await api.updateService(selectedService.id, formData);
      } else {
        response = await api.createService(formData);
      }

      if (response.success) {
        setMessage({ type: "success", text: selectedService ? "تم تحديث الخدمة بنجاح" : "تم إنشاء الخدمة بنجاح" });
        setShowModal(false);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "حدث خطأ" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء حفظ الخدمة" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    try {
      const response = await api.deleteService(selectedService.id);
      if (response.success) {
        setMessage({ type: "success", text: "تم حذف الخدمة بنجاح" });
        setShowDeleteModal(false);
        setSelectedService(null);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "فشل حذف الخدمة" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء حذف الخدمة" });
    }
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await api.assignServiceToClient(assignData.serviceId, assignData.clientId);
      if (response.success) {
        setMessage({ type: "success", text: "تم تعيين الخدمة للعميل بنجاح" });
        setShowAssignModal(false);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "فشل تعيين الخدمة" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تعيين الخدمة" });
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

  const filteredServices = services.filter((service) => {
    if (filter === "all") return true;
    return service.tier === filter;
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
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">إدارة الخدمات</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
          >
            تعيين خدمة لعميل
          </button>
          <button onClick={() => openEditModal()} className="dashboard-btn">
            + إضافة خدمة
          </button>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">إجمالي الخدمات</p>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">{services.length}</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">خدمات ذهبية</p>
          <p className="text-3xl font-bold text-yellow-400">{services.filter((s) => s.tier === "GOLD").length}</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">خدمات بلاتينية</p>
          <p className="text-3xl font-bold text-gray-300">{services.filter((s) => s.tier === "PLATINUM").length}</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-[var(--color-text-muted)] text-sm">خدمات ماسية</p>
          <p className="text-3xl font-bold text-cyan-400">{services.filter((s) => s.tier === "DIAMOND").length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border)] pb-4">
        {[
          { key: "all", label: "الكل" },
          { key: "GOLD", label: "ذهبي" },
          { key: "PLATINUM", label: "بلاتيني" },
          { key: "DIAMOND", label: "ماسي" },
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div key={service.id} className="dashboard-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{service.nameAr || service.name}</h3>
                {service.nameAr && <p className="text-sm text-[var(--color-text-muted)]">{service.name}</p>}
              </div>
              {getTierBadge(service.tier)}
            </div>
            {service.description && <p className="text-[var(--color-text-secondary)] text-sm mb-4">{service.description}</p>}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${service.isActive ? "bg-green-400" : "bg-red-400"}`}></span>
                <span className="text-sm text-[var(--color-text-muted)]">{service.isActive ? "نشطة" : "معطلة"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-muted)]">{service._count?.clients || 0} عميل</span>
                <button onClick={() => openEditModal(service)} className="px-3 py-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm hover:bg-[var(--color-accent)]/30 transition-colors">
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setShowDeleteModal(true);
                  }}
                  className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && <div className="text-center py-12 text-[var(--color-text-muted)]">لا توجد خدمات</div>}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{selectedService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">اسم الخدمة (إنجليزي) *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">اسم الخدمة (عربي)</label>
                <input type="text" value={formData.nameAr} onChange={(e) => setFormData((prev) => ({ ...prev, nameAr: e.target.value }))} className="dashboard-input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="dashboard-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الباقة المطلوبة</label>
                <select value={formData.tier} onChange={(e) => setFormData((prev) => ({ ...prev, tier: e.target.value }))} className="dashboard-input w-full">
                  <option value="GOLD">ذهبي</option>
                  <option value="PLATINUM">بلاتيني</option>
                  <option value="DIAMOND">ماسي</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 rounded border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-accent)]"
                />
                <span className="text-[var(--color-text-secondary)]">الخدمة نشطة</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSaving} className="flex-1 dashboard-btn">
                  {isSaving ? "جاري الحفظ..." : selectedService ? "حفظ التغييرات" : "إضافة الخدمة"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl w-full max-w-md border border-[var(--color-border)]">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">تعيين خدمة لعميل</h2>
            </div>

            <form onSubmit={handleAssign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الخدمة</label>
                <select
                  value={assignData.serviceId}
                  onChange={(e) => setAssignData((prev) => ({ ...prev, serviceId: e.target.value }))}
                  required
                  className="dashboard-input w-full"
                >
                  <option value="">اختر الخدمة</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nameAr || service.name} ({service.tier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">العميل</label>
                <select
                  value={assignData.clientId}
                  onChange={(e) => setAssignData((prev) => ({ ...prev, clientId: e.target.value }))}
                  required
                  className="dashboard-input w-full"
                >
                  <option value="">اختر العميل</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isSaving} className="flex-1 dashboard-btn">
                  {isSaving ? "جاري التعيين..." : "تعيين الخدمة"}
                </button>
                <button type="button" onClick={() => setShowAssignModal(false)} className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)] max-w-sm w-full">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">تأكيد الحذف</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              هل أنت متأكد من حذف الخدمة <span className="text-[var(--color-text-primary)] font-medium">"{selectedService.nameAr || selectedService.name}"</span>؟
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
