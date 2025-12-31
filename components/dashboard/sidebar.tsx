"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isAdmin: boolean;
}

const adminLinks = [
  { href: "/admin", label: "لوحة التحكم", icon: "📊" },
  { href: "/admin/clients", label: "العملاء", icon: "👥" },
  { href: "/admin/subscriptions", label: "الاشتراكات", icon: "📅" },
  { href: "/admin/files", label: "الملفات", icon: "📁" },
  { href: "/admin/library", label: "المكتبة", icon: "📚" },
  { href: "/admin/library/templates", label: "القوالب", icon: "🎨", indent: true },
  { href: "/admin/library/invoices", label: "الفواتير", icon: "🧾", indent: true },
  { href: "/admin/library/contracts", label: "العقود", icon: "📝", indent: true },
  { href: "/admin/services", label: "الخدمات", icon: "⚙️" },
  { href: "/admin/messages", label: "الرسائل", icon: "💬" },
  { href: "/admin/managers", label: "المديرين", icon: "👔" },
];

const clientLinks = [
  { href: "/dashboard", label: "لوحة التحكم", icon: "📊" },
  { href: "/dashboard/files", label: "ملفاتي", icon: "📁" },
  { href: "/dashboard/services", label: "خدماتي", icon: "⚙️" },
  { href: "/dashboard/messages", label: "الرسائل", icon: "💬" },
];

export default function DashboardSidebar({ isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const links = isAdmin ? adminLinks : clientLinks;

  const isActiveLink = (href: string) => {
    if (href === "/admin" || href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] min-h-screen p-5 flex flex-col shrink-0 order-first">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold text-[var(--color-accent)]">INNO</h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            {isAdmin ? "لوحة الإدارة" : "لوحة العميل"}
          </p>
        </Link>
      </div>

      <nav className="space-y-1.5 flex-1">
        {links.map((link) => {
          const isActive = isActiveLink(link.href);
          const isIndented = 'indent' in link && link.indent;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isIndented ? "mr-4 py-2" : ""
              } ${
                isActive
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className={`${isIndented ? "text-lg w-5" : "text-xl w-6"} text-center`}>{link.icon}</span>
              <span className={`${isIndented ? "text-sm" : ""} font-medium`}>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
        <div className="p-4 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] text-center">الإصدار 1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
