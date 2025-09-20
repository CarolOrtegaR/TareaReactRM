import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LS_KEY = "authUser";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login: AuthContextType["login"] = async (email, password) => {
    const users = (await import("../data/users.json")).default as Array<{ email: string; password: string }>;
    const match = users.find(u => u.email === email && u.password === password);
    if (match) {
      const u = { email: match.email };
      setUser(u);
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
