"use client";

import { useState } from "react";
import Link from "next/link";

interface Contract {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: string;
  fileUrl?: string;
  createdAt: string;
}

// Mock data - will be replaced with API calls
const mockContracts: Contract[] = [];

const categories = [
  { value: "all", label: "الكل" },
  { value: "service", label: "عقود الخدمات" },
  { value: "employment", label: "عقود العمل" },
  { value: "nda", label: "اتفاقيات السرية" },
  { value: "partnership", label: "اتفاقيات الشراكة" },
];

export default function ContractsPage() {
  const [contracts] = useState<Contract[]>(mockContracts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredContracts = contracts.filter((contract) => {
    const matchesCategory = selectedCategory === "all" || contract.category === selectedCategory;
    const matchesSearch = contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.nameAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
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
              العقود
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              نماذج العقود والاتفاقيات القانونية
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2"
        >
          <span>+</span>
          إضافة عقد
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="البحث في العقود..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.value
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Grid */}
      {filteredContracts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="h-40 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  {contract.nameAr || contract.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {contract.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] px-2 py-1 rounded">
                    {categories.find(c => c.value === contract.category)?.label || contract.category}
                  </span>
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
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            لا توجد عقود
          </h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            ابدأ بإضافة نماذج عقود واتفاقيات قانونية جاهزة للاستخدام
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            إضافة أول عقد
          </button>
        </div>
      )}

      {/* Add Contract Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              إضافة نموذج عقد جديد
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم العقد (عربي) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: عقد تطوير موقع إلكتروني"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم العقد (إنجليزي)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Website Development Contract"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  نوع العقد
                </label>
                <select className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
                  {categories.filter(c => c.value !== "all").map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  الوصف
                </label>
                <textarea
                  rows={3}
                  placeholder="وصف مختصر للعقد والحالات المناسبة لاستخدامه..."
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  ملف العقد (PDF, DOCX)
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
                  إضافة العقد
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
