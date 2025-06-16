import { Button, Paper, Text, Title, Stack, Group, Badge, Alert } from '@mantine/core';
import { useState } from 'react';
import {
  withAuth,
  withLoading,
  withAnalytics,
  WithAuthProps,
  WithLoadingProps,
  WithAnalyticsProps,
} from './hoc';

type DashboardComponentProps = WithAuthProps & WithLoadingProps & WithAnalyticsProps;

const Dashboard = ({
  isAuthenticated,
  isLoggingIn,
  user,
  onLogin,
  onLogout,
  trackEvent,
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
          color="red"
          onClose={resetError}
          style={{ width: '100%' }}
          title="Something went wrong"
          variant="light"
          withCloseButton
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
            color="green"
            onClick={() => {
              trackEvent('profile', {
                userId: user?.id,
                userRole: user?.role,
                timestamp: new Date().toISOString(),
              });
            }}
            variant="light"
          >
            View Profile
          </Button>
          <Button
            color="orange"
            onClick={() => {
              trackEvent('logout', {
                userId: user?.id,
                userRole: user?.role,
                timestamp: new Date().toISOString(),
              });
              onLogout();
            }}
            variant="light"
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
};

export const Example = withAuth(withLoading(withAnalytics(Dashboard)));

