"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

interface FileItem {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  qrCodeUrl?: string;
  isLibrary: boolean;
  createdAt: string;
  client?: {
    id: string;
    companyName: string;
  };
}

interface Client {
  id: string;
  companyName: string;
}

export default function FilesPage() {
  const searchParams = useSearchParams();
  const preselectedClient = searchParams.get("client");

  const [files, setFiles] = useState<FileItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState<string>(preselectedClient || "all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadData, setUploadData] = useState({
    clientId: preselectedClient || "",
    isLibrary: !preselectedClient,
    generateQR: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [filesRes, clientsRes] = await Promise.all([
        api.getFiles({ library: true }),
        api.getClients({ limit: 100 }),
      ]);
      if (filesRes.success && filesRes.data) {
        setFiles(filesRes.data);
      }
      if (clientsRes.success && clientsRes.data) {
        setClients(clientsRes.data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء جلب البيانات" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await api.uploadFile(file, {
        clientId: uploadData.clientId || undefined,
        isLibrary: uploadData.isLibrary,
        generateQR: uploadData.generateQR,
      });
      if (response.success) {
        setMessage({ type: "success", text: "تم رفع الملف بنجاح" });
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "فشل رفع الملف" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء رفع الملف" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleGenerateQR = async (file: FileItem) => {
    try {
      const response = await api.generateQRCode(file.id);
      if (response.success) {
        setMessage({ type: "success", text: "تم إنشاء رمز QR بنجاح" });
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "فشل إنشاء رمز QR" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء إنشاء رمز QR" });
    }
  };

  const handleDelete = async () => {
    if (!selectedFile) return;

    try {
      const response = await api.deleteFile(selectedFile.id);
      if (response.success) {
        setMessage({ type: "success", text: "تم حذف الملف بنجاح" });
        setShowDeleteModal(false);
        setSelectedFile(null);
        fetchData();
      } else {
        setMessage({ type: "error", text: response.message || "فشل حذف الملف" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "حدث خطأ أثناء حذف الملف" });
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "🖼️";
    if (mimeType.startsWith("video/")) return "🎬";
    if (mimeType.startsWith("audio/")) return "🎵";
    if (mimeType.includes("pdf")) return "📕";
    if (mimeType.includes("word") || mimeType.includes("document")) return "📘";
    if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "📗";
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("archive")) return "📦";
    return "📄";
  };

  const filteredFiles = files.filter((file) => {
    if (filter === "all") return true;
    if (filter === "library") return file.isLibrary;
    return file.client?.id === filter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">المكتبة والملفات</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"}`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"}`}
          >
            ☰
          </button>
        </div>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg ${
            message.type === "success" ? "bg-green-500/10 border border-green-500/50 text-green-400" : "bg-red-500/10 border border-red-500/50 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload Section */}
      <div className="dashboard-card p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">رفع ملف جديد</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">العميل</label>
            <select
              value={uploadData.clientId}
              onChange={(e) => setUploadData((prev) => ({ ...prev, clientId: e.target.value, isLibrary: !e.target.value }))}
              className="dashboard-input w-full"
            >
              <option value="">المكتبة العامة</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uploadData.generateQR}
                onChange={(e) => setUploadData((prev) => ({ ...prev, generateQR: e.target.checked }))}
                className="w-5 h-5 rounded border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-accent)]"
              />
              <span className="text-[var(--color-text-secondary)]">إنشاء رمز QR</span>
            </label>
          </div>
          <div className="md:col-span-2 flex items-end">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="dashboard-btn w-full flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري الرفع...</span>
                </>
              ) : (
                <>
                  <span>📤</span>
                  <span>اختر ملف للرفع</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-[var(--color-border)] pb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter("library")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "library" ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
          }`}
        >
          المكتبة العامة
        </button>
        {clients.slice(0, 5).map((client) => (
          <button
            key={client.id}
            onClick={() => setFilter(client.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === client.id ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            {client.companyName}
          </button>
        ))}
      </div>

      {/* Files Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => (
            <div key={file.id} className="dashboard-card p-4 group">
              <div className="text-center mb-3">
                <span className="text-5xl">{getFileIcon(file.mimeType)}</span>
              </div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] truncate mb-1" title={file.originalName}>
                {file.originalName}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">{formatSize(file.size)}</p>
              {file.client && <p className="text-xs text-[var(--color-accent)] mt-1">{file.client.companyName}</p>}
              <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={file.url} target="_blank" className="flex-1 px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded text-xs text-center hover:bg-[var(--color-accent)]/30 transition-colors">
                  تحميل
                </a>
                {file.qrCodeUrl ? (
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setShowQRModal(true);
                    }}
                    className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30 transition-colors"
                  >
                    QR
                  </button>
                ) : (
                  <button onClick={() => handleGenerateQR(file)} className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs hover:bg-gray-500/30 transition-colors">
                    +QR
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedFile(file);
                    setShowDeleteModal(true);
                  }}
                  className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-card overflow-hidden">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>الملف</th>
                <th>الحجم</th>
                <th>العميل</th>
                <th>التاريخ</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(file.mimeType)}</span>
                      <span className="text-[var(--color-text-primary)]">{file.originalName}</span>
                    </div>
                  </td>
                  <td className="text-[var(--color-text-secondary)]">{formatSize(file.size)}</td>
                  <td className="text-[var(--color-accent)]">{file.client?.companyName || "المكتبة"}</td>
                  <td className="text-[var(--color-text-muted)]">{formatDate(file.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <a href={file.url} target="_blank" className="px-3 py-1.5 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-lg text-sm hover:bg-[var(--color-accent)]/30 transition-colors">
                        تحميل
                      </a>
                      {file.qrCodeUrl ? (
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowQRModal(true);
                          }}
                          className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
                        >
                          QR
                        </button>
                      ) : (
                        <button onClick={() => handleGenerateQR(file)} className="px-3 py-1.5 bg-gray-500/20 text-gray-400 rounded-lg text-sm hover:bg-gray-500/30 transition-colors">
                          إنشاء QR
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setShowDeleteModal(true);
                        }}
                        className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFiles.length === 0 && <div className="text-center py-12 text-[var(--color-text-muted)]">لا توجد ملفات</div>}
        </div>
      )}

      {filteredFiles.length === 0 && viewMode === "grid" && <div className="text-center py-12 text-[var(--color-text-muted)]">لا توجد ملفات</div>}

      {/* QR Modal */}
      {showQRModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)] max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">رمز QR</h2>
            <p className="text-[var(--color-text-muted)] mb-4">{selectedFile.originalName}</p>
            {selectedFile.qrCodeUrl && (
              <img src={selectedFile.qrCodeUrl} alt="QR Code" className="mx-auto mb-4 bg-white p-2 rounded-lg" />
            )}
            <div className="flex gap-3">
              <a href={selectedFile.qrCodeUrl} download className="flex-1 dashboard-btn">
                تحميل QR
              </a>
              <button onClick={() => setShowQRModal(false)} className="px-6 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)] max-w-sm w-full">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">تأكيد الحذف</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              هل أنت متأكد من حذف الملف <span className="text-[var(--color-text-primary)] font-medium">"{selectedFile.originalName}"</span>؟
            </p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                حذف
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-3 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
