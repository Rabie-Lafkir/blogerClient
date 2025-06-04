// src/hooks/useAuth.ts   ← stays .ts

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';

/* ---------- Types ---------- */
export interface UserJwt {
  id: string;
  username: string;
  email: string;
}

interface AuthContextShape {
  user: UserJwt | null;
  setUser: (u: UserJwt | null) => void;
}

/* ---------- Context ---------- */
const AuthCtx = createContext<AuthContextShape | undefined>(undefined);

/* ---------- Provider (no JSX) ---------- */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserJwt | null>(() => {
    const t = localStorage.getItem('token');
    return t ? jwtDecode<UserJwt>(t) : null;
  });

  // sync user when token changes (e.g. in another tab)
  useEffect(() => {
    const handler = () => {
      const t = localStorage.getItem('token');
      setUser(t ? jwtDecode<UserJwt>(t) : null);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  /* return without JSX */
  return React.createElement(
    AuthCtx.Provider,
    { value: { user, setUser } },
    children
  );
}

/* ---------- Hook ---------- */
export function useAuth(): AuthContextShape {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
