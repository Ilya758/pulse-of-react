import {
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconLock, IconLockOpen, IconUserShield } from '@tabler/icons-react';
import { useMemo } from 'react';
import { can } from '../lib';
import { Role } from '../model';
import { FeatureToggle } from './feature-toggle';
import { SessionProvider, useSession } from './session-provider';

const ExampleInner = () => {
  const { session, login, logout } = useSession();

  const roleValue = session?.role ?? 'guest';

  const roleBadges = useMemo(() => {
    const items: Role[] = ['guest', 'user', 'manager', 'admin'];

    return (
      <Group>
        {items.map((r) => (
          <Badge color="indigo" key={r} variant={r === roleValue ? 'filled' : 'light'}>
            {r}
          </Badge>
        ))}
      </Group>
    );
  }, [roleValue]);

  return (
    <Stack gap="lg">
      <Card withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Identity (AuthN)</Title>
          {session ? <IconLockOpen size={18} /> : <IconLock size={18} />}
        </Group>

        <Stack gap="sm">
          <Text size="sm">Select current role (simulated login):</Text>
          <SegmentedControl
            data={[
              { label: 'Guest', value: 'guest' },
              { label: 'User', value: 'user' },
              { label: 'Manager', value: 'manager' },
              { label: 'Admin', value: 'admin' },
            ]}
            onChange={(value) => login('alice', value as Role)}
            value={roleValue}
          />
          <Group>{roleBadges}</Group>
          <Group>
            <Button onClick={() => logout()} size="xs" variant="light">
              Logout
            </Button>
          </Group>
        </Stack>
      </Card>

      <Card withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Authorization (AuthZ)</Title>
          <IconUserShield size={18} />
        </Group>

        <Stack gap="md">
          <FeatureToggle
            allow={!!session}
            fallback={
              <Alert color="yellow" variant="light">
                Login required to access private content
              </Alert>
            }
          >
            <Alert color="green" variant="light">
              Private content visible (user is authenticated)
            </Alert>
          </FeatureToggle>

          <FeatureToggle
            allow={can(session, 'edit:report')}
            fallback={
              <Alert color="gray" variant="light">
                No permission to edit reports
              </Alert>
            }
          >
            <Group>
              <Button color="teal">Edit Report</Button>
              <Text c="dimmed" size="sm">
                Allowed for manager and admin
              </Text>
            </Group>
          </FeatureToggle>

          <FeatureToggle
            allow={can(session, 'access:admin')}
            fallback={
              <Center>
                <Text c="dimmed" size="sm">
                  Admin panel hidden
                </Text>
              </Center>
            }
          >
            <Card withBorder>
              <Title mb="xs" order={5}>
                Admin Panel
              </Title>
              <Text size="sm">Dangerous operations and organization-wide settings.</Text>
            </Card>
          </FeatureToggle>
        </Stack>
      </Card>
    </Stack>
  );
};

export const Example = () => (
  <SessionProvider>
    <ExampleInner />
  </SessionProvider>
);
