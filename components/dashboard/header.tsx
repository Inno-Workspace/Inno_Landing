"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

export default function DashboardHeader({ user }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "مدير عام";
      case "ADMIN":
        return "مدير";
      case "CLIENT":
        return "عميل";
      default:
        return role;
    }
  };

  return (
    <header className="h-16 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          مرحباً، {user?.name}
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          {user && getRoleName(user.role)}
        </p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 p-1 rounded-full hover:ring-2 hover:ring-[var(--color-accent)]/50 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </button>

        {showDropdown && (
          <div className="absolute left-0 top-full mt-2 w-56 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
              <p className="font-semibold text-[var(--color-text-primary)]">{user?.name}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1" dir="ltr">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => {
                  router.push("/admin/profile");
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)] rounded-lg transition-colors flex items-center gap-3"
              >
                <span>👤</span>
                <span>الملف الشخصي</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-3"
              >
                <span>🚪</span>
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
