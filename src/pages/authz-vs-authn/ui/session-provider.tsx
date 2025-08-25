import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Role } from '../model';

export type Session = {
  userId: string;
  role: Role;
  issuedAt: number;
  expiresAt: number;
};

type SessionContextType = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (userId: string, role?: Role) => void;
  logout: () => void;
  refresh: (minutes?: number) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);
const STORAGE_KEY = 'app.session';

export const SessionProvider = ({
  children,
  persist = true,
}: {
  children: React.ReactNode;
  persist?: boolean;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const isAuthenticated = !!session && Date.now() < session.expiresAt;

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

  useEffect(() => {
    if (!persist) return;
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session, persist]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue ? (JSON.parse(e.newValue) as Session) : null;
      setSession(next);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = useCallback((userId: string, role: Role = 'user') => {
    const now = Date.now();
    setSession({ userId, role, issuedAt: now, expiresAt: now + 30 * 60 * 1000 });
  }, []);

  const logout = useCallback(() => setSession(null), []);

  const refresh = useCallback((minutes = 30) => {
    setSession((prev) => {
      if (!prev) return prev;
      const now = Date.now();
      return { ...prev, issuedAt: now, expiresAt: now + minutes * 60 * 1000 };
    });
  }, []);

  const value = useMemo(
    () => ({ session, isAuthenticated, login, logout, refresh }),
    [session, isAuthenticated, login, logout, refresh],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within a SessionProvider');
  return ctx;
};

export const useIdleSession = (idleMs: number = 10 * 60 * 1000) => {
  const { logout, refresh } = useSession();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (document.hidden) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      refresh();
      timerRef.current = window.setTimeout(() => {
        logout();
      }, idleMs);
    };

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'visibilitychange',
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer as any));
    };
  }, [idleMs, refresh, logout]);
};

