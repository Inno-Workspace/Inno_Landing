"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/api"}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api.getToken()}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "تم تحديث الملف الشخصي بنجاح" });
        refreshUser();
      } else {
        setMessage({ type: "error", text: data.message || "فشل تحديث الملف الشخصي" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تحديث الملف الشخصي" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "كلمة المرور الجديدة غير متطابقة" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:6868/api"}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api.getToken()}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "تم تغيير كلمة المرور بنجاح" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: data.message || "فشل تغيير كلمة المرور" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تغيير كلمة المرور" });
    } finally {
      setIsSaving(false);
    }
  };

  const getRoleName = (role?: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "مدير عام";
      case "ADMIN":
        return "مدير";
      case "CLIENT":
        return "عميل";
      default:
        return role || "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">الملف الشخصي</h1>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg mb-6 ${
            message.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-400" : "bg-red-500/10 border border-red-500/50 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Header */}
      <div className="dashboard-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-teal-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{user?.name}</h2>
            <p className="text-[var(--color-text-muted)]" dir="ltr">
              {user?.email}
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full text-sm">
              {getRoleName(user?.role)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "info" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
          }`}
        >
          المعلومات الشخصية
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "password" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
          }`}
        >
          كلمة المرور
        </button>
      </div>

      {/* Profile Info Form */}
      {activeTab === "info" && (
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">تعديل المعلومات الشخصية</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">الاسم</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="dashboard-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                required
                dir="ltr"
                className="dashboard-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                dir="ltr"
                className="dashboard-input w-full"
              />
            </div>

            <button type="submit" disabled={isSaving} className="dashboard-btn w-full">
              {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </form>
        </div>
      )}

      {/* Password Form */}
      {activeTab === "password" && (
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">تغيير كلمة المرور</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">كلمة المرور الحالية</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                required
                dir="ltr"
                className="dashboard-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                required
                dir="ltr"
                minLength={6}
                className="dashboard-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
                dir="ltr"
                minLength={6}
                className="dashboard-input w-full"
              />
            </div>

            <button type="submit" disabled={isSaving} className="dashboard-btn w-full">
              {isSaving ? "جاري التغيير..." : "تغيير كلمة المرور"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
