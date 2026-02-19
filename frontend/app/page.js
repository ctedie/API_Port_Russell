"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../lib/api";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        Port Russell — Gestion des réservations
      </h1>

      <p style={{ marginBottom: 24 }}>
        Application privée de la capitainerie pour gérer les catways, les
        réservations et les utilisateurs.
      </p>

      <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Connexion</h2>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6 }}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6 }}
            />
          </label>

          {error && (
            <div style={{ color: "crimson", fontSize: 14 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div style={{ marginTop: 16, fontSize: 14 }}>
          <a href={`${apiBase}/docs`} target="_blank" rel="noreferrer">Documentation API</a>        </div>
      </section>
    </main>
  );
}
