import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-accent)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
