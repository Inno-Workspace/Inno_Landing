"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Invoice {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr?: string;
  fileUrl?: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/api";

      const response = await fetch(`${apiUrl}/library/invoices/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setInvoices(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameAr || !selectedFile) {
      alert("الرجاء إدخال اسم النموذج وتحميل ملف");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/api";

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("nameAr", formData.nameAr);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("descriptionAr", formData.descriptionAr);
      formDataToSend.append("type", "INVOICE");
      formDataToSend.append("file", selectedFile);

      const response = await fetch(`${apiUrl}/library`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert("تم إضافة الفاتورة بنجاح");
        setShowAddModal(false);
        setFormData({ name: "", nameAr: "", description: "", descriptionAr: "" });
        setSelectedFile(null);
        fetchInvoices();
      } else {
        const error = await response.json();
        alert(error.message || "حدث خطأ أثناء إضافة الفاتورة");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("حدث خطأ أثناء إضافة الفاتورة");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    return (
      invoice.name?.toLowerCase().includes(query) ||
      invoice.nameAr?.includes(searchQuery) ||
      invoice.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/library"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            ← المكتبة
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              الفواتير
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              نماذج الفواتير وقوالب الدفع
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2"
        >
          <span>+</span>
          إضافة فاتورة
        </button>
      </div>

      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="البحث في الفواتير..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      {/* Invoices Grid */}
      {loading ? (
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-12 text-center">
          <p className="text-[var(--color-text-muted)]">جاري التحميل...</p>
        </div>
      ) : filteredInvoices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="h-40 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center">
                <span className="text-4xl">🧾</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  {invoice.nameAr || invoice.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {invoice.descriptionAr || invoice.description}
                </p>
                <div className="flex items-center justify-end mt-4">
                  {invoice.fileUrl && (
                    <button
                      onClick={() => handleDownload(invoice.fileUrl!, invoice.nameAr || invoice.name)}
                      className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm"
                    >
                      تحميل
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-12 text-center">
          <div className="text-6xl mb-4">🧾</div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            لا توجد فواتير
          </h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            ابدأ بإضافة نماذج فواتير جاهزة للاستخدام مع العملاء
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            إضافة أول فاتورة
          </button>
        </div>
      )}

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              إضافة نموذج فاتورة جديد
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم النموذج (عربي) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: فاتورة خدمات تصميم"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم النموذج (إنجليزي)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Design Services Invoice"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  الوصف (عربي)
                </label>
                <textarea
                  rows={3}
                  placeholder="وصف مختصر للفاتورة..."
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  الوصف (إنجليزي)
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  ملف النموذج (PDF, DOCX, XLSX) *
                </label>
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 text-center hover:border-[var(--color-accent)] transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.xlsx,.doc,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-3xl mb-2 block">📁</span>
                    {selectedFile ? (
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {selectedFile.name}
                      </p>
                    ) : (
                      <p className="text-sm text-[var(--color-text-muted)]">
                        انقر للاختيار أو اسحب الملف هنا
                      </p>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "جاري الإضافة..." : "إضافة النموذج"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: "", nameAr: "", description: "", descriptionAr: "" });
                    setSelectedFile(null);
                  }}
                  disabled={submitting}
                  className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] font-medium rounded-lg hover:bg-[var(--color-border)] transition-colors disabled:opacity-50"
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
