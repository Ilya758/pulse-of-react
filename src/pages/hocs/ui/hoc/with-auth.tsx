import { ComponentType, useState } from 'react';

interface User {
  email: string;
  id: number;
  name: string;
  role: 'admin' | 'user';
}

export interface WithAuthProps {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P & WithAuthProps>) =>
  function WithAuthComponent(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = () => {
      setIsLoggingIn(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          email: 'john@example.com',
          id: 1,
          name: 'John Doe',
          role: 'admin',
        });
        setIsLoggingIn(false);
      }, 1000);
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        isLoggingIn={isLoggingIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />
    );
  };
