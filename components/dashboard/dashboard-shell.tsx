"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import LiveUsersPanel from "@/components/dashboard/live-users-panel";

function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [isLivePanelOpen, setIsLivePanelOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex" dir="rtl">
      <DashboardSidebar isAdmin={isAdmin} />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader user={user} />
        <main className="flex-1 p-6 overflow-auto dashboard-scrollbar">{children}</main>
      </div>
      {isAdmin && (
        <LiveUsersPanel isOpen={isLivePanelOpen} onToggle={() => setIsLivePanelOpen(!isLivePanelOpen)} />
      )}
    </div>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
