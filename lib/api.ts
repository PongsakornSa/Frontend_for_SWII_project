import { getToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

type RequestOptions = RequestInit & {
  auth?: boolean;
};

type ApiSuccess<T> = {
  success?: boolean;
  data?: T;
  token?: string;
  count?: number;
  pagination?: unknown;
  msg?: string;
  message?: string;
  error?: string;
};

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<ApiSuccess<T>> {
  const headers = new Headers(options.headers || {});

  const hasBody = options.body !== undefined && options.body !== null;
  if (hasBody) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });

  const text = await res.text();
  let data: ApiSuccess<T> = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || "Request failed");
  }

  if (!res.ok || data.success === false) {
    throw new Error(data.message || data.msg || data.error || "Request failed");
  }

  return data;
}

export { API_URL };
