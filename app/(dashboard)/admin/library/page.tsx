"use client";

import Link from "next/link";

const libraryCategories = [
  {
    title: "القوالب",
    titleEn: "Templates",
    description: "قوالب التصميم والكود الجاهزة للاستخدام",
    href: "/admin/library/templates",
    icon: "🎨",
    count: 0,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "الفواتير",
    titleEn: "Invoices",
    description: "نماذج الفواتير وقوالب الدفع",
    href: "/admin/library/invoices",
    icon: "🧾",
    count: 0,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "العقود",
    titleEn: "Contracts",
    description: "نماذج العقود والاتفاقيات القانونية",
    href: "/admin/library/contracts",
    icon: "📝",
    count: 0,
    color: "from-amber-500 to-orange-600",
  },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            المكتبة
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            إدارة القوالب والفواتير والعقود
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {libraryCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6 hover:border-[var(--color-accent)] transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {category.icon}
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              {category.title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              {category.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] px-3 py-1 rounded-full">
                {category.count} عنصر
              </span>
              <span className="text-[var(--color-accent)] group-hover:translate-x-[-4px] transition-transform">
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          آخر الإضافات
        </h3>
        <div className="text-center py-8 text-[var(--color-text-muted)]">
          لا توجد عناصر حتى الآن. ابدأ بإضافة قوالب أو فواتير أو عقود.
        </div>
      </div>
    </div>
  );
}
