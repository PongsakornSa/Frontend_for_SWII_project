import { getToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (options.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || data.msg || data.error || "Request failed");
  }

  return data;
}

export { API_URL };
