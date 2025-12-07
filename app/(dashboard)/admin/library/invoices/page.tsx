"use client";

import { useState } from "react";
import Link from "next/link";

interface Invoice {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}

// Mock data - will be replaced with API calls
const mockInvoices: Invoice[] = [];

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    return invoice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           invoice.nameAr.includes(searchQuery);
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
      {filteredInvoices.length > 0 ? (
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
                  {invoice.description}
                </p>
                <div className="flex items-center justify-end mt-4">
                  <button className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm">
                    تحميل
                  </button>
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
          <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              إضافة نموذج فاتورة جديد
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم النموذج (عربي) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: فاتورة خدمات تصميم"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم النموذج (إنجليزي)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Design Services Invoice"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  الوصف
                </label>
                <textarea
                  rows={3}
                  placeholder="وصف مختصر للفاتورة..."
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  ملف النموذج (PDF, DOCX, XLSX)
                </label>
                <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer">
                  <span className="text-3xl mb-2 block">📁</span>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    اسحب الملف هنا أو انقر للاختيار
                  </p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  إضافة النموذج
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] font-medium rounded-lg hover:bg-[var(--color-border)] transition-colors"
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
