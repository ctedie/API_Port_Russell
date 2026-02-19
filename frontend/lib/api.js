/**
 * Base URL of the backend API.
 * Must be exposed to the browser via NEXT_PUBLIC_API_URL.
 * @type {string}
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Wrapper around fetch for API calls.
 * - Adds JSON headers when a body is present
 * - Adds Authorization: Bearer <token> from localStorage if present
 * - Throws an Error for non-2xx responses
 *
 * @param {string} path API path starting with "/"
 * @param {RequestInit} [options]
 * @returns {Promise<any>} Parsed JSON or text response
 * @throws {Error} When the response is not ok
 */
export async function apiFetch(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    ...(options.headers || {}),
  };

  // Ajoute Content-Type seulement si on envoie un body (évite les soucis sur GET)
  const hasBody = options.body !== undefined && options.body !== null;
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data;
}
