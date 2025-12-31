"use client";

import { useState } from "react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: string;
  fileUrl?: string;
  createdAt: string;
}

// Mock data - will be replaced with API calls
const mockTemplates: Template[] = [];

const categories = [
  { value: "all", label: "الكل" },
  { value: "web", label: "مواقع الويب" },
  { value: "mobile", label: "تطبيقات الجوال" },
  { value: "branding", label: "الهوية البصرية" },
  { value: "social", label: "السوشيال ميديا" },
];

export default function TemplatesPage() {
  const [templates] = useState<Template[]>(mockTemplates);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.nameAr.includes(searchQuery);
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
              القوالب
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              قوالب التصميم والكود الجاهزة
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2"
        >
          <span>+</span>
          إضافة قالب
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="البحث في القوالب..."
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

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="h-40 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  {template.nameAr || template.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] px-2 py-1 rounded">
                    {categories.find(c => c.value === template.category)?.label || template.category}
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
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            لا توجد قوالب
          </h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            ابدأ بإضافة قوالب تصميم أو كود جاهزة للاستخدام
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            إضافة أول قالب
          </button>
        </div>
      )}

      {/* Add Template Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              إضافة قالب جديد
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم القالب (عربي) *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  اسم القالب (إنجليزي)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  التصنيف
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
                  className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  ملف القالب
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
                  إضافة القالب
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
