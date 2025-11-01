import { Alert, Badge, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import {
  WithAnalyticsProps,
  WithAuthProps,
  WithLoadingProps,
  withAnalytics,
  withAuth,
  withLoading,
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
      <Paper h={{ base: 'auto', sm: 200 }} p="md" withBorder>
        <Alert
          color="red"
          onClose={resetError}
          style={{ width: '100%' }}
          title="Something went wrong"
          variant="light"
          withCloseButton
        >
          <Text size="sm">{error.message}</Text>
          <Button color="red" mt="md" onClick={resetError} size="xs" variant="white">
            Try again
          </Button>
        </Alert>
      </Paper>
    );
  }

  if (!isAuthenticated) {
    return (
      <Paper h={{ base: 'auto', sm: 200 }} p="md" withBorder>
        <Stack>
          <Title order={3}>Dashboard</Title>
          <Text c="dimmed">Please log in to view your dashboard</Text>
          <Button
            loading={isLoggingIn}
            onClick={() => {
              trackEvent('login', { timestamp: new Date().toISOString() });
              onLogin();
            }}
          >
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper h={{ base: 'auto', sm: 200 }} p="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Title order={3}>Dashboard</Title>
          <Badge color={user?.role === 'admin' ? 'blue' : 'gray'}>{user?.role}</Badge>
        </Group>

        <Text>Welcome, {user?.name}!</Text>
        <Text c="dimmed" size="sm">
          {user?.email}
        </Text>

        <Group>
          <Button
            color="green"
            onClick={() => {
              trackEvent('profile', {
                timestamp: new Date().toISOString(),
                userId: user?.id,
                userRole: user?.role,
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
                timestamp: new Date().toISOString(),
                userId: user?.id,
                userRole: user?.role,
              });
              onLogout();
            }}
            variant="light"
          >
            Log Out
          </Button>
          <Button color="red" onClick={simulateError} variant="light">
            Simulate Error
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const Example = withAuth(withLoading(withAnalytics(Dashboard)));
