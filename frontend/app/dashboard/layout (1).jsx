"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/");
  }, [router]);

  const logout = async () => {
    // Optionnel: appeler GET /logout (backend stateless)
    try {
      // on ne bloque pas si ça échoue
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001"}/logout`,
        { method: "GET" }
      );
    } catch (e) {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const NavItem = ({ href, label }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        style={{
          padding: "10px 12px",
          borderRadius: 6,
          textDecoration: "none",
          display: "block",
          background: active ? "#eee" : "transparent",
          color: "inherit",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #ddd", padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Port Russell</div>

        <nav style={{ display: "grid", gap: 6 }}>
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/dashboard/catways" label="Catways" />
          <NavItem href="/dashboard/reservations" label="Réservations" />
          <NavItem href="/dashboard/users" label="Utilisateurs" />
          <a
            href="http://127.0.0.1:3001"
            target="_blank"
            rel="noreferrer"
            style={{ padding: "10px 12px", borderRadius: 6, textDecoration: "none", color: "inherit" }}
          >
            Documentation API
          </a>

          <button
            onClick={logout}
            style={{
              marginTop: 8,
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Déconnexion
          </button>
        </nav>
      </aside>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
