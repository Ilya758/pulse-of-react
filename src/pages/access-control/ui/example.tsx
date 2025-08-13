import { useState, useEffect } from 'react';
import {
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Select,
  TextInput,
  Alert,
  Paper,
  Title,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import { IconShield, IconShieldCheck, IconShieldX, IconUser } from '@tabler/icons-react';
import { User, AccessRequest, AccessDecision, Permission, AccessContext } from '../model';
import { hashUserId, HybridAccessControlService, SimpleFeatureToggleService } from '../lib';
import {
  USER_ROLES,
  RESOURCE_SELECT_OPTIONS,
  ACTION_SELECT_OPTIONS,
  TIME_CONTEXT_SELECT_OPTIONS,
  DEPARTMENT_SELECT_OPTIONS,
  generateUserSelectOptions,
} from '../model';

export const Example = () => {
  const [accessControl] = useState(() => new HybridAccessControlService());
  const [featureToggles] = useState(() => new SimpleFeatureToggleService());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [resource, setResource] = useState('documents');
  const [action, setAction] = useState('read');
  const [context, setContext] = useState<AccessContext>({
    time: '14:30',
    ip_address: '192.168.1.100',
    department: 'engineering',
    resourceDepartment: 'engineering',
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
  }, []);

  const checkAccess = () => {
    if (!currentUser) return;

    const request: AccessRequest = {
      user: currentUser,
      resource,
      action,
      context,
      timestamp: new Date(),
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
      <Paper withBorder p="lg">
        <Group mb="md">
          <IconUser size={20} />
          <Title order={4}>Access Control Demo</Title>
          <Badge color="blue">Hybrid RBAC + ABAC</Badge>
        </Group>

        <Stack gap="lg">
          <SimpleGrid cols={2} spacing="lg">
            <Select
              label="User"
              value={currentUser?.id || ''}
              onChange={(value) => value && changeUserId(value)}
              data={generateUserSelectOptions(hashUserId)}
            />
            <Select
              label="Resource"
              value={resource}
              onChange={(value) => value && setResource(value)}
              data={RESOURCE_SELECT_OPTIONS}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="lg">
            <Select
              label="Action"
              value={action}
              onChange={(value) => value && setAction(value)}
              data={ACTION_SELECT_OPTIONS}
            />
            <Select
              label="Time Context"
              value={context.time}
              onChange={(value) => value && setContext({ ...context, time: value })}
              data={TIME_CONTEXT_SELECT_OPTIONS}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="lg">
            <TextInput
              label="IP Address"
              value={context.ip_address}
              onChange={(e) => setContext({ ...context, ip_address: e.target.value })}
              placeholder="192.168.1.100"
              description="Try 8.8.8.8 (denied) vs 192.168.1.100 (allowed)"
            />
            <Select
              label="User Department"
              value={context.department}
              onChange={(value) => value && setContext({ ...context, department: value })}
              data={DEPARTMENT_SELECT_OPTIONS}
              description="User's department for access control"
            />
          </SimpleGrid>

          <Group justify="flex-start" align="flex-end">
            <Select
              label="Resource Department"
              value={context.resourceDepartment}
              onChange={(value) => value && setContext({ ...context, resourceDepartment: value })}
              data={DEPARTMENT_SELECT_OPTIONS}
              description="Department of the resource being accessed"
            />
            <Button onClick={checkAccess} leftSection={<IconShield size={16} />}>
              Check Access
            </Button>
          </Group>
        </Stack>
      </Paper>

      <SimpleGrid cols={2} spacing="lg">
        {currentUser && (
          <Paper withBorder p="lg">
            <Group mb="md">
              <IconUser size={20} />
              <Title order={4}>User Profile & Permissions</Title>
            </Group>

            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} mb="xs">
                  User Details
                </Text>
                <Group gap="xs" mb="xs">
                  <Badge variant="outline" size="sm">
                    {currentUser.roles?.join(', ')}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    ID: {currentUser.id}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  Hash: {hashUserId(currentUser.id)} (Hash % 100 ={' '}
                  {hashUserId(currentUser.id) % 100})
                </Text>
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">
                  Permissions
                </Text>
                {userPermissions.length > 0 ? (
                  <Group gap="xs">
                    {userPermissions.map((permission) => (
                      <Badge key={permission.id} variant="light" size="sm">
                        {permission.resource}:{permission.action}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  <Text size="sm" c="dimmed">
                    No permissions assigned
                  </Text>
                )}
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">
                  Enabled Features
                </Text>
                {enabledFeatures.length ? (
                  <Group gap="xs">
                    {enabledFeatures.map((featureId) => (
                      <Badge key={featureId} color="green" variant="light" size="sm">
                        {featureId}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  <Text size="sm" c="dimmed">
                    No features enabled for this user
                  </Text>
                )}
              </div>
            </Stack>
          </Paper>
        )}

        {accessDecision && (
          <Paper withBorder p="lg">
            <Group mb="md">
              {accessDecision.allowed ? (
                <IconShieldCheck size={24} color="green" />
              ) : (
                <IconShieldX size={24} color="red" />
              )}
              <Title order={4}>
                Access Decision: {accessDecision.allowed ? 'GRANTED' : 'DENIED'}
              </Title>
            </Group>

            <Alert color={accessDecision.allowed ? 'green' : 'red'} variant="light" mb="md">
              {accessDecision.reason}
            </Alert>

            {accessDecision.policies.length > 0 && (
              <Stack gap="xs">
                <Text size="sm" fw={500}>
                  Applied Policies:
                </Text>
                <Group gap="xs">
                  {accessDecision.policies.map((policy) => (
                    <Badge key={policy} variant="outline" size="sm">
                      {policy}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            )}

            <Divider my="md" />

            <Text size="xs" c="dimmed">
              Decision made at: {accessDecision?.timestamp?.toLocaleTimeString()}
            </Text>
          </Paper>
        )}
      </SimpleGrid>
    </Stack>
  );
};

