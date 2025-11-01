import {
  Alert,
  Badge,
  Button,
  Divider,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconShield, IconShieldCheck, IconShieldX, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { HybridAccessControlService, hashUserId, SimpleFeatureToggleService } from '../lib';
import {
  ACTION_SELECT_OPTIONS,
  AccessContext,
  AccessDecision,
  AccessRequest,
  DEPARTMENT_SELECT_OPTIONS,
  generateUserSelectOptions,
  Permission,
  RESOURCE_SELECT_OPTIONS,
  TIME_CONTEXT_SELECT_OPTIONS,
  USER_ROLES,
  User,
} from '../model';

export const Example = () => {
  const [accessControl] = useState(() => new HybridAccessControlService());
  const [featureToggles] = useState(() => new SimpleFeatureToggleService());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [resource, setResource] = useState('documents');
  const [action, setAction] = useState('read');
  const [context, setContext] = useState<AccessContext>({
    department: 'engineering',
    ip_address: '192.168.1.100',
    resourceDepartment: 'engineering',
    time: '14:30',
  });
  const [accessDecision, setAccessDecision] = useState<AccessDecision | null>(null);
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);

  useEffect(() => {
    const sampleUser: User = {
      id: 'alice',
      roles: ['user'],
    };
    setCurrentUser(sampleUser);
    accessControl.addUser(sampleUser);
    accessControl.assignRoleToUser(sampleUser.id, 'user');
    setUserPermissions(accessControl.getUserPermissions(sampleUser.id));
    setEnabledFeatures(featureToggles.getEnabledFeatures(sampleUser));
  }, [
    accessControl.addUser,
    accessControl.assignRoleToUser,
    accessControl.getUserPermissions,
    featureToggles.getEnabledFeatures,
  ]);

  const checkAccess = () => {
    if (!currentUser) return;

    const request: AccessRequest = {
      action,
      context,
      resource,
      timestamp: new Date(),
      user: currentUser,
    };

    const decision = accessControl.checkAccess(request);
    setAccessDecision(decision);
  };

  const changeUserId = (userId: string) => {
    const newRole = USER_ROLES[userId] || 'user';
    const updatedUser: User = {
      id: userId,
      roles: [newRole],
    };

    accessControl.addUser(updatedUser);
    accessControl.assignRoleToUser(userId, newRole);
    setCurrentUser(updatedUser);
    setUserPermissions(accessControl.getUserPermissions(userId));
    setEnabledFeatures(featureToggles.getEnabledFeatures(updatedUser));
  };

  return (
    <Stack gap="xl">
      <Paper p="lg" withBorder>
        <Group mb="md">
          <IconUser size={20} />
          <Title order={4}>Access Control Demo</Title>
          <Badge color="blue">Hybrid RBAC + ABAC</Badge>
          "kek"
        </Group>

        <Stack gap="lg">
          <SimpleGrid cols={2} spacing="lg">
            <Select
              data={generateUserSelectOptions(hashUserId)}
              label="User"
              onChange={(value) => value && changeUserId(value)}
              value={currentUser?.id || ''}
            />
            <Select
              data={RESOURCE_SELECT_OPTIONS}
              label="Resource"
              onChange={(value) => value && setResource(value)}
              value={resource}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="lg">
            <Select
              data={ACTION_SELECT_OPTIONS}
              label="Action"
              onChange={(value) => value && setAction(value)}
              value={action}
            />
            <Select
              data={TIME_CONTEXT_SELECT_OPTIONS}
              label="Time Context"
              onChange={(value) => value && setContext({ ...context, time: value })}
              value={context.time}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="lg">
            <TextInput
              description="Try 8.8.8.8 (denied) vs 192.168.1.100 (allowed)"
              label="IP Address"
              onChange={(e) => setContext({ ...context, ip_address: e.target.value })}
              placeholder="192.168.1.100"
              value={context.ip_address}
            />
            <Select
              data={DEPARTMENT_SELECT_OPTIONS}
              description="User's department for access control"
              label="User Department"
              onChange={(value) => value && setContext({ ...context, department: value })}
              value={context.department}
            />
          </SimpleGrid>

          <Group align="flex-end" justify="flex-start">
            <Select
              data={DEPARTMENT_SELECT_OPTIONS}
              description="Department of the resource being accessed"
              label="Resource Department"
              onChange={(value) => value && setContext({ ...context, resourceDepartment: value })}
              value={context.resourceDepartment}
            />
            <Button leftSection={<IconShield size={16} />} onClick={checkAccess}>
              Check Access
            </Button>
          </Group>
        </Stack>
      </Paper>

      <SimpleGrid cols={2} spacing="lg">
        {currentUser && (
          <Paper p="lg" withBorder>
            <Group mb="md">
              <IconUser size={20} />
              <Title order={4}>User Profile & Permissions</Title>
            </Group>

            <Stack gap="md">
              <div>
                <Text fw={500} mb="xs" size="sm">
                  User Details
                </Text>
                <Group gap="xs" mb="xs">
                  <Badge size="sm" variant="outline">
                    {currentUser.roles?.join(', ')}
                  </Badge>
                  <Badge size="sm" variant="outline">
                    ID: {currentUser.id}
                  </Badge>
                </Group>
                <Text c="dimmed" size="xs">
                  Hash: {hashUserId(currentUser.id)} (Hash % 100 ={' '}
                  {hashUserId(currentUser.id) % 100})
                </Text>
              </div>

              <div>
                <Text fw={500} mb="xs" size="sm">
                  Permissions
                </Text>
                {userPermissions.length > 0 ? (
                  <Group gap="xs">
                    {userPermissions.map((permission) => (
                      <Badge key={permission.id} size="sm" variant="light">
                        {permission.resource}:{permission.action}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  <Text c="dimmed" size="sm">
                    No permissions assigned
                  </Text>
                )}
              </div>

              <div>
                <Text fw={500} mb="xs" size="sm">
                  Enabled Features
                </Text>
                {enabledFeatures.length ? (
                  <Group gap="xs">
                    {enabledFeatures.map((featureId) => (
                      <Badge color="green" key={featureId} size="sm" variant="light">
                        {featureId}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  <Text c="dimmed" size="sm">
                    No features enabled for this user
                  </Text>
                )}
              </div>
            </Stack>
          </Paper>
        )}

        {accessDecision && (
          <Paper p="lg" withBorder>
            <Group mb="md">
              {accessDecision.allowed ? (
                <IconShieldCheck color="green" size={24} />
              ) : (
                <IconShieldX color="red" size={24} />
              )}
              <Title order={4}>
                Access Decision: {accessDecision.allowed ? 'GRANTED' : 'DENIED'}
              </Title>
            </Group>

            <Alert color={accessDecision.allowed ? 'green' : 'red'} mb="md" variant="light">
              {accessDecision.reason}
            </Alert>

            {accessDecision.policies.length > 0 && (
              <Stack gap="xs">
                <Text fw={500} size="sm">
                  Applied Policies:
                </Text>
                <Group gap="xs">
                  {accessDecision.policies.map((policy) => (
                    <Badge key={policy} size="sm" variant="outline">
                      {policy}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            )}

            <Divider my="md" />

            <Text c="dimmed" size="xs">
              Decision made at: {accessDecision?.timestamp?.toLocaleTimeString()}
            </Text>
          </Paper>
        )}
      </SimpleGrid>
    </Stack>
  );
};
