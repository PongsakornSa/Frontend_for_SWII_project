"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { clearToken, getToken, saveToken } from "@/lib/auth";
import { User } from "@/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
  setTokenAndRefresh: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await apiFetch<User>("/auth/me", { auth: true });
      setUser(res.data || null);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const setTokenAndRefresh = useCallback(async (token: string) => {
    saveToken(token);
    await refreshUser();
  }, [refreshUser]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    window.location.href = "/login";
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin",
    refreshUser,
    setTokenAndRefresh,
    logout
  }), [user, loading, refreshUser, setTokenAndRefresh, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
