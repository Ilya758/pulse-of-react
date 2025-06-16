export const WITH_AUTH_HOC_CODE = `interface WithAuthProps {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & WithAuthProps>,
) => {
  return (props: P) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<WithAuthProps['user']>(null);

    const onLogin = () => {
      setIsAuthenticated(true);
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      });
    };

    const onLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    );
  };
};`;

export const WITH_LOADING_HOC_CODE = `interface WithLoadingProps {
  isLoggingIn: boolean;
}

const withLoading = <P extends object>(
  WrappedComponent: ComponentType<P & WithLoadingProps>,
) => {
  return (props: P) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
      setIsLoggingIn(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulate login
      } finally {
        setIsLoggingIn(false);
      }
    };

    return (
      <WrappedComponent
        {...props}
        isLoggingIn={isLoggingIn}
        onLogin={handleLogin}
      />
    );
  };
};`;

export const WITH_ANALYTICS_HOC_CODE = `import { ComponentType } from 'react';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export interface WithAnalyticsProps {
  trackEvent: (eventName: string, data?: Record<string, unknown>) => void;
}

export const withAnalytics = <P extends object>(
  WrappedComponent: ComponentType<P & WithAnalyticsProps>,
) => {
  return (props: P) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)', true);

    const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
      const getNotificationConfig = () => {
        switch (eventName) {
          case 'error': {
            return {
              color: 'red',
              icon: <IconAlertCircle size={16} />,
            };
          }

          case 'profile': {
            return {
              color: 'green',
              icon: <IconInfoCircle size={16} />,
            };
          }

          case 'logout': {
            return {
              color: 'orange',
              icon: <IconInfoCircle size={16} />,
            };
          }

          default: {
            return {
              color: 'blue',
              icon: <IconInfoCircle size={16} />,
            };
          }
        }
      };

      notifications.show({
        autoClose: 3000,
        title: 'Analytics Event',
        position: isDesktop ? 'bottom-right' : 'top-right',
        message: \`\${eventName}\${data ? \`: \${JSON.stringify(data)}\` : ''}\`,
        ...getNotificationConfig(),
      });
    };

    return <WrappedComponent {...props} trackEvent={trackEvent} />;
  };
};`;

export const DASHBOARD_COMPONENT_CODE = `const Dashboard = ({
  isAuthenticated,
  user,
  onLogin,
  onLogout,
  trackEvent,
  isLoggingIn,
}: DashboardComponentProps) => {
  const [error, setError] = useState<Error | null>(null);

  const simulateError = () => {
    trackEvent('error', {
      timestamp: new Date().toISOString(),
      userId: user?.id,
      userRole: user?.role,
    });
    setError(new Error('This is a simulated error!'));
  };

  const resetError = () => {
    setError(null);
  };

  if (error) {
    return (
      <Paper p="md" withBorder h={{ base: 'auto', sm: 200 }}>
        <Alert
          title="Something went wrong"
          color="red"
          variant="light"
          withCloseButton
          onClose={resetError}
          style={{ width: '100%' }}
        >
          <Text size="sm">{error.message}</Text>
          <Button variant="white" color="red" size="xs" mt="md" onClick={resetError}>
            Try again
          </Button>
        </Alert>
      </Paper>
    );
  }

  if (!isAuthenticated) {
    return (
      <Paper p="md" withBorder h={{ base: 'auto', sm: 200 }}>
        <Stack>
          <Title order={3}>Dashboard</Title>
          <Text c="dimmed">Please log in to view your dashboard</Text>
          <Button
            onClick={() => {
              trackEvent('login', { timestamp: new Date().toISOString() });
              onLogin();
            }}
            loading={isLoggingIn}
          >
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder h={{ base: 'auto', sm: 200 }}>
      <Stack>
        <Group justify="space-between">
          <Title order={3}>Dashboard</Title>
          <Badge color={user?.role === 'admin' ? 'blue' : 'gray'}>{user?.role}</Badge>
        </Group>

        <Text>Welcome, {user?.name}!</Text>
        <Text size="sm" c="dimmed">
          {user?.email}
        </Text>

        <Group>
          <Button
            variant="light"
            color="green"
            onClick={() => {
              trackEvent('profile', {
                userId: user?.id,
                userRole: user?.role,
                timestamp: new Date().toISOString(),
              });
            }}
          >
            View Profile
          </Button>
          <Button
            color="orange"
            variant="light"
            onClick={() => {
              trackEvent('logout', {
                userId: user?.id,
                userRole: user?.role,
                timestamp: new Date().toISOString(),
              });
              onLogout();
            }}
          >
            Log Out
          </Button>
          <Button variant="light" color="red" onClick={simulateError}>
            Simulate Error
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};`;

export const USAGE_EXAMPLE_CODE = `// Compose HOCs
export const Example = withAuth(withLoading(withAnalytics(Dashboard)));`;

