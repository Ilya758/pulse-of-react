export const SESSION_PROVIDER_CODE = `import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Session = {
  userId: string;
  role: 'guest' | 'user' | 'manager' | 'admin';
  issuedAt: number;
  expiresAt: number; // epoch ms
};

type SessionContextType = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (userId: string, role?: Session['role']) => void;
  logout: () => void;
  refresh: (minutes?: number) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const STORAGE_KEY = 'app.session';

export const SessionProvider: React.FC<{ children: React.ReactNode; persist?: boolean }> = ({ children, persist = true }) => {
  const [session, setSession] = useState<Session | null>(null);
  const isAuthenticated = !!session && Date.now() < session.expiresAt;

  // Rehydrate from storage (optional)
  useEffect(() => {
    if (!persist) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Session;
        setSession(parsed);
      } catch {}
    }
  }, [persist]);

  // Persist to storage
  useEffect(() => {
    if (!persist) return;
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session, persist]);

  // Cross-tab sync (storage event)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue ? (JSON.parse(e.newValue) as Session) : null;
      setSession(next);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = useCallback((userId: string, role: Session['role'] = 'user') => {
    const now = Date.now();
    setSession({ userId, role, issuedAt: now, expiresAt: now + 30 * 60 * 1000 }); // 30 minutes
  }, []);

  const logout = useCallback(() => setSession(null), []);

  const refresh = useCallback((minutes = 30) => {
    setSession((prev) => {
      if (!prev) return prev;
      const now = Date.now();
      return { ...prev, issuedAt: now, expiresAt: now + minutes * 60 * 1000 };
    });
  }, []);

  const value = useMemo(() => ({ session, isAuthenticated, login, logout, refresh }), [session, isAuthenticated, login, logout, refresh]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};`;

export const SESSION_GUARDS_CODE = `import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from './session-provider';

export const ProtectedRoute: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useSession();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export const FeatureToggle: React.FC<{ allow: boolean; fallback?: React.ReactNode }> = ({ allow, fallback = null, children }) => {
  if (!allow) return <>{fallback}</>;
  return <>{children}</>;
};`;

export const SESSION_IDLE_TIMEOUT_CODE = `import { useEffect, useRef } from 'react';
import { useSession } from './session-provider';

const DEFAULT_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'visibilitychange'];

export const useIdleSession = (idleMs: number = 10 * 60 * 1000) => {
  const { logout, refresh } = useSession();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (document.hidden) return; // don't refresh while tab hidden
      if (timerRef.current) window.clearTimeout(timerRef.current);
      refresh();
      timerRef.current = window.setTimeout(() => {
        logout();
      }, idleMs);
    };

    DEFAULT_EVENTS.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      DEFAULT_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer as any));
    };
  }, [idleMs, refresh, logout]);
};`;

export const SESSION_STORAGE_STRATEGIES_CODE = `// Storage strategies (client-only)
// 1) Memory-only: safest against XSS, but lost on refresh
// 2) localStorage: persists and syncs across tabs (storage event), vulnerable to XSS
// 3) Session cookies (httpOnly, secure): safest for tokens but needs server; client reads only session state flag

// Multi-tab sync with BroadcastChannel
const channel = new BroadcastChannel('session');
export const broadcastSession = (payload: any) => channel.postMessage(payload);
export const listenSession = (cb: (payload: any) => void) => {
  const handler = (e: MessageEvent) => cb(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
};`;

export const GUARD_USAGE_CODE = `import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { SessionProvider, useSession } from './session-provider';
import { ProtectedRoute, FeatureToggle } from './session-guards';

const Home = () => <div>Home</div>;
const Dashboard = () => <div>Dashboard</div>;

const Admin = () => {
  const { session } = useSession();
  const allow = session?.role === 'admin';
  return (
    <FeatureToggle allow={!!allow} fallback={<Navigate to="/app" replace />}> 
      <div>Admin Panel</div>
    </FeatureToggle>
  );
};

const AppLayout = () => (
  <div>
    <h2>App</h2>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/app',
    element: <ProtectedRoute />, // requires authentication
    children: [
      { element: <AppLayout />, children: [
        { index: true, element: <Dashboard /> },
        { path: 'admin', element: <Admin /> },
      ]},
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export const Root = () => (
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
);`;

