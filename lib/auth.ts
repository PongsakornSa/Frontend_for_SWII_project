"use client";

const TOKEN_KEY = "car_rental_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
