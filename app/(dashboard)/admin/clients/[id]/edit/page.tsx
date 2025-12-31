"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    companyNameAr: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    notes: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.getClient(params.id as string);
        if (response.success && response.data) {
          const client = response.data;
          setFormData({
            companyName: client.companyName || "",
            companyNameAr: client.companyNameAr || "",
            email: client.email || "",
            phone: client.phone || "",
            website: client.website || "",
            address: client.address || "",
            description: client.description || "",
            notes: client.notes || "",
          });
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات العميل");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const response = await api.updateClient(params.id as string, formData);
      if (response.success) {
        router.push(`/admin/clients/${params.id}`);
      } else {
        setError(response.message || "حدث خطأ أثناء تحديث العميل");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">تعديل العميل</h1>
        <Link href={`/admin/clients/${params.id}`} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          ← العودة
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">معلومات الشركة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">اسم الشركة (إنجليزي) *</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="dashboard-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">اسم الشركة (عربي)</label>
              <input type="text" name="companyNameAr" value={formData.companyNameAr} onChange={handleChange} className="dashboard-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">البريد الإلكتروني *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required dir="ltr" className="dashboard-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">رقم الهاتف</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} dir="ltr" className="dashboard-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الموقع الإلكتروني</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} dir="ltr" placeholder="https://" className="dashboard-input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">العنوان</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="dashboard-input w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الوصف</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="dashboard-input w-full" />
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">ملاحظات داخلية</h2>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="ملاحظات خاصة بفريق العمل" className="dashboard-input w-full" />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSaving} className="flex-1 dashboard-btn flex items-center justify-center gap-2">
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>جاري الحفظ...</span>
              </>
            ) : (
              "حفظ التغييرات"
            )}
          </button>
          <Link href={`/admin/clients/${params.id}`} className="px-8 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors text-center">
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}
