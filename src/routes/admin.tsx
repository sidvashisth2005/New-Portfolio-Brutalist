import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense } from "react";

const LazyAdminLayout = lazy(() =>
  import("../components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const LazyAdminLoginForm = lazy(() =>
  import("../components/admin/AdminLoginForm").then((m) => ({ default: m.AdminLoginForm }))
);

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_session_token");
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
    }
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    sessionStorage.setItem("admin_session_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center font-mono text-xs text-[#E8FF00] uppercase tracking-widest">
          LOADING ADMIN CMS...
        </div>
      }
    >
      {isAuthenticated ? (
        <LazyAdminLayout onLogout={handleLogout} />
      ) : (
        <LazyAdminLoginForm onSuccess={handleLoginSuccess} />
      )}
    </Suspense>
  );
}
