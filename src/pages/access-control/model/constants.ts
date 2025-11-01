import { Role } from './types';

export const USER_ROLES: Record<string, string> = {
  alice: 'user',
  bob: 'manager',
  charlie: 'admin',
  diana: 'manager',
  eve: 'user',
  frank: 'guest',
  grace: 'manager',
  henry: 'user',
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  admin: 'Full system access',
  guest: 'Limited read-only access',
  manager: 'Department management access',
  user: 'Standard user access',
};

export const ROLE_DEFINITIONS: Role[] = [
  {
    description: ROLE_DESCRIPTIONS.admin,
    id: 'admin',
    name: 'Administrator',
    permissions: [
      {
        action: '*',
        description: 'Access to everything',
        id: 'all',
        name: 'All Permissions',
        resource: '*',
      },
    ],
  },
  {
    description: ROLE_DESCRIPTIONS.manager,
    id: 'manager',
    name: 'Manager',
    permissions: [
      {
        action: 'read',
        description: 'Can read documents',
        id: 'read-docs',
        name: 'Read Documents',
        resource: 'documents',
      },
      {
        action: 'edit',
        description: 'Can edit documents',
        id: 'edit-docs',
        name: 'Edit Documents',
        resource: 'documents',
      },
      {
        action: 'delete',
        description: 'Can delete documents',
        id: 'delete-docs',
        name: 'Delete Documents',
        resource: 'documents',
      },
      {
        action: 'read',
        description: 'Can read reports',
        id: 'read-reports',
        name: 'Read Reports',
        resource: 'reports',
      },
      {
        action: 'edit',
        description: 'Can edit reports',
        id: 'edit-reports',
        name: 'Edit Reports',
        resource: 'reports',
      },
    ],
  },
  {
    description: ROLE_DESCRIPTIONS.user,
    id: 'user',
    name: 'User',
    permissions: [
      {
        action: 'read',
        description: 'Can read documents',
        id: 'read-docs',
        name: 'Read Documents',
        resource: 'documents',
      },
      {
        action: 'edit',
        description: 'Can edit own documents',
        id: 'edit-own-docs',
        name: 'Edit Own Documents',
        resource: 'documents',
      },
    ],
  },
  {
    description: ROLE_DESCRIPTIONS.guest,
    id: 'guest',
    name: 'Guest',
    permissions: [
      {
        action: 'read',
        description: 'Can read public content',
        id: 'read-public',
        name: 'Read Public Content',
        resource: 'public',
      },
    ],
  },
];

export const ROLE_DEFINITIONS_CODE = `// Role Definitions for RBAC System
export const ROLE_DEFINITIONS: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: [
      {
        id: 'all',
        name: 'All Permissions',
        resource: '*',
        action: '*',
        description: 'Access to everything',
      },
    ],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Department management access',
    permissions: [
      {
        id: 'read-docs',
        name: 'Read Documents',
        resource: 'documents',
        action: 'read',
        description: 'Can read documents',
      },
      {
        id: 'edit-docs',
        name: 'Edit Documents',
        resource: 'documents',
        action: 'edit',
        description: 'Can edit documents',
      },
      {
        id: 'delete-docs',
        name: 'Delete Documents',
        resource: 'documents',
        action: 'delete',
        description: 'Can delete documents',
      },
      {
        id: 'read-reports',
        name: 'Read Reports',
        resource: 'reports',
        action: 'read',
        description: 'Can read reports',
      },
      {
        id: 'edit-reports',
        name: 'Edit Reports',
        resource: 'reports',
        action: 'edit',
        description: 'Can edit reports',
      },
    ],
  },
  {
    id: 'user',
    name: 'User',
    description: 'Standard user access',
    permissions: [
      {
        id: 'read-docs',
        name: 'Read Documents',
        resource: 'documents',
        action: 'read',
        description: 'Can read documents',
      },
      {
        id: 'edit-own-docs',
        name: 'Edit Own Documents',
        resource: 'documents',
        action: 'edit',
        description: 'Can edit own documents',
      },
    ],
  },
  {
    id: 'guest',
    name: 'Guest',
    description: 'Limited read-only access',
    permissions: [
      {
        id: 'read-public',
        name: 'Read Public Content',
        resource: 'public',
        action: 'read',
        description: 'Can read public content',
      },
    ],
  },
];`;

export const ACCESS_CONTROL_SIGNATURE_CODE = `// Access Control Pattern Signature
// Centralized authorization logic with RBAC/ABAC support
interface AccessControlService {
  checkAccess(user: User, resource: string, action: string, context?: AccessContext): boolean;
  getUserPermissions(user: User): Permission[];
  evaluatePolicy(policy: Policy, request: AccessRequest): boolean;
}

// Usage
const accessControl = new AccessControlService();
const hasAccess = accessControl.checkAccess(user, 'documents', 'read', { time: '9:00 AM' });
`;

export const RBAC_IMPLEMENTATION_CODE = `import { Permission, Role, User, ROLE_DEFINITIONS } from './types';

export class SimpleRBACService {
  private roles: Map<string, Role> = new Map();
  private users: Map<string, User> = new Map();

  constructor() {
    this.initializeDefaultRoles();
  }

  private initializeDefaultRoles() {
    ROLE_DEFINITIONS.forEach((role) => {
      this.roles.set(role.id, role);
    });
  }

  public addUser(user: User): void {
    this.users.set(user.id, user);
  }

  public getUserPermissions(userId: string): Permission[] {
    const user = this.users.get(userId);
    if (!user) return [];

    const permissions = new Map<string, Permission>();

    user.roles.forEach((roleId) => {
      const role = this.roles.get(roleId);
      if (role) {
        role.permissions.forEach((permission) => {
          permissions.set(permission.id, permission);
        });
      }
    });

    return Array.from(permissions.values());
  }

  public checkAccess(userId: string, resource: string, action: string): boolean {
    const permissions = this.getUserPermissions(userId);

    return permissions.some((permission) => {
      if (permission.resource === '*' && permission.action === '*') return true;
      if (permission.resource === '*' && permission.action === action) return true;
      if (permission.resource === resource && permission.action === '*') return true;
      return permission.resource === resource && permission.action === action;
    });
  }

  public assignRoleToUser(userId: string, roleId: string): boolean {
    const user = this.users.get(userId);
    const role = this.roles.get(roleId);

    if (!user || !role) return false;

    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
    }

    return true;
  }

  public removeRoleFromUser(userId: string, roleId: string): boolean {
    const user = this.users.get(userId);

    if (!user) return false;

    const index = user.roles.indexOf(roleId);
    if (index > -1) {
      user.roles.splice(index, 1);
      return true;
    }

    return false;
  }
}`;

export const ABAC_IMPLEMENTATION_CODE = `import { AccessRequest } from './types';

export class SimpleABACService {
  public checkAccess(request: AccessRequest): {
    allowed: boolean;
    reason: string;
    policies: string[];
  } {
    const { context = {} } = request;
    const policies: string[] = [];

    // Use switch-case for cleaner resource-based policy evaluation
    switch (request.resource) {
      case 'documents': {
        return this.evaluateDocumentPolicies(request, context, policies);
      }

      case 'reports': {
        return this.evaluateReportPolicies(request, context, policies);
      }

      case 'sensitive-documents': {
        return this.evaluateSensitiveDocumentPolicies(request, context, policies);
      }

      default: {
        // If no specific policies apply, allow access
        return {
          allowed: true,
          reason: 'Access granted (no specific policies apply)',
          policies: [],
        };
      }
    }
  }

  private evaluateDocumentPolicies(
    request: AccessRequest,
    context: any,
    policies: string[]
  ) {
    // Time-based policy for documents
    if (request.action === 'edit') {
      return this.evaluateManagerEditPolicy(request, context, policies);
    }

    // Time-based policy for all document actions
    const timeResult = this.evaluateTimePolicy(context, policies);
    if (!timeResult.allowed) return timeResult;

    return {
      allowed: true,
      reason: 'Access granted by policies',
      policies: [...policies, 'business-hours'],
    };
  }

  private evaluateReportPolicies(
    request: AccessRequest,
    context: any,
    policies: string[]
  ) {
    // Time-based policy for reports
    const timeResult = this.evaluateTimePolicy(context, policies);
    if (!timeResult.allowed) return timeResult;

    // Department-based policy for reports
    if (request.action === 'read') {
      return this.evaluateReportDepartmentPolicy(request, context, policies);
    }

    return {
      allowed: true,
      reason: 'Access granted by policies',
      policies: [...policies, 'business-hours'],
    };
  }

  private evaluateSensitiveDocumentPolicies(
    request: AccessRequest,
    context: any,
    policies: string[]
  ) {
    // Location-based policy for sensitive documents
    const ip = context.ip_address as string;
    
    if (ip && (ip.startsWith('192.168.1.') || ip.startsWith('10.0.'))) {
      return {
        allowed: true,
        reason: 'Access granted by policies',
        policies: [...policies, 'office-network'],
      };
    } else {
      return {
        allowed: false,
        reason: 'Access denied: Must be on office network for sensitive documents',
        policies: ['office-network'],
      };
    }
  }

  private evaluateTimePolicy(context: any, policies: string[]) {
    const time = context.time as string;
    if (!time) return { allowed: true, reason: 'No time context', policies: [] };

    const hour = parseInt(time.split(':')[0]);
    
    if (hour >= 9 && hour <= 17) {
      return { allowed: true, reason: 'Business hours', policies: [] };
    } else {
      return {
        allowed: false,
        reason: 'Access denied: Outside business hours (9 AM - 5 PM)',
        policies: ['business-hours'],
      };
    }
  }

  private evaluateManagerEditPolicy(
    request: AccessRequest,
    context: any,
    policies: string[]
  ) {
    const userRole = request.user.roles[0];
    
    if (userRole !== 'manager') {
      return {
        allowed: true,
        reason: 'Access granted (not a manager edit operation)',
        policies: [],
      };
    }

    const userDept = context.department as string;
    const resourceDept = context.resourceDepartment as string;

    if (!userDept) {
      return {
        allowed: false,
        reason: 'Access denied: Manager must have department assigned',
        policies: ['department-access'],
      };
    }

    if (resourceDept && userDept !== resourceDept) {
      return {
        allowed: false,
        reason: \`Access denied: Manager can only edit documents from their own department (\${userDept} vs \${resourceDept})\`,
        policies: ['department-access'],
      };
    }

    return {
      allowed: true,
      reason: 'Access granted by policies',
      policies: [...policies, 'department-access'],
    };
  }

  private evaluateReportDepartmentPolicy(
    request: AccessRequest,
    context: any,
    policies: string[]
  ) {
    const userDept = context.department as string;
    const resourceDept = context.resourceDepartment as string;

    if (resourceDept && userDept && userDept !== resourceDept) {
      return {
        allowed: false,
        reason: \`Access denied: Users can only read reports from their own department (\${userDept} vs \${resourceDept})\`,
        policies: ['department-access'],
      };
    }

    if (resourceDept && userDept) {
      return {
        allowed: true,
        reason: 'Access granted by policies',
        policies: [...policies, 'business-hours', 'department-access'],
      };
    }

    return {
      allowed: true,
      reason: 'Access granted by policies',
      policies: [...policies, 'business-hours'],
    };
  }
}`;

export const HYBRID_IMPLEMENTATION_CODE = `import { SimpleABACService } from './abac';
import { SimpleRBACService } from './rbac';
import { AccessRequest, AccessDecision, User } from './types';

export class HybridAccessControlService {
  private rbacService: SimpleRBACService;
  private abacService: SimpleABACService;

  constructor() {
    this.rbacService = new SimpleRBACService();
    this.abacService = new SimpleABACService();
  }

  public checkAccess(request: AccessRequest): AccessDecision {
    // First, check RBAC permissions
    const hasRBACAccess = this.rbacService.checkAccess(
      request.user.id,
      request.resource,
      request.action,
    );

    if (!hasRBACAccess) {
      return {
        allowed: false,
        reason: 'Access denied by RBAC - insufficient role permissions',
        policies: [],
        timestamp: new Date(),
      };
    }

    // If RBAC allows, check ABAC policies
    const abacResult = this.abacService.checkAccess(request);

    const decision = {
      allowed: abacResult.allowed,
      reason: abacResult.reason,
      policies: abacResult.policies,
      timestamp: new Date(),
    };

    return decision;
  }

  public getUserPermissions(userId: string) {
    return this.rbacService.getUserPermissions(userId);
  }

  public assignRoleToUser(userId: string, roleId: string) {
    return this.rbacService.assignRoleToUser(userId, roleId);
  }

  public removeRoleFromUser(userId: string, roleId: string) {
    return this.rbacService.removeRoleFromUser(userId, roleId);
  }

  public addUser(user: User) {
    this.rbacService.addUser(user);
  }
}`;

export const EXAMPLE_USAGE_CODE = `import { useState, useEffect } from 'react';
import { 
  Card, 
  Text, 
  Group, 
  Badge, 
  Button, 
  Stack,
  Select,
  TextInput,
  Checkbox,
  Alert
} from '@mantine/core';
import { IconShield, IconShieldCheck, IconShieldX } from '@tabler/icons-react';
import { HybridAccessControlService } from './hybrid-service';
import { User, AccessRequest, AccessContext } from './types';

export const AccessControlExample = () => {
  const [accessControl] = useState(() => new HybridAccessControlService());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [resource, setResource] = useState('documents');
  const [action, setAction] = useState('read');
  const [context, setContext] = useState<AccessContext>({
    time: '14:30',
    ip_address: '192.168.1.100',
    department: 'engineering'
  });
  const [accessDecision, setAccessDecision] = useState<any>(null);

  // Initialize with sample user
  useEffect(() => {
    const sampleUser: User = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      roles: ['user']
    };
    setCurrentUser(sampleUser);
  }, []);

  const checkAccess = () => {
    if (!currentUser) return;

    const request: AccessRequest = {
      user: currentUser,
      resource,
      action,
      context,
      timestamp: new Date()
    };

    const decision = accessControl.checkAccess(request);
    setAccessDecision(decision);
  };

  const changeUserRole = (roleId: string) => {
    if (!currentUser) return;
    
    // Remove current roles and assign new one
    currentUser.roles.forEach(role => {
      accessControl.removeRoleFromUser(currentUser.id, role);
    });
    accessControl.assignRoleToUser(currentUser.id, roleId);
    
    setCurrentUser({ ...currentUser, roles: [roleId] });
  };

  return (
    <Stack gap="xl">
      <Card withBorder p="lg">
        <Group justify="space-between" mb="md">
          <Text fw={500}>Access Control Demo</Text>
          <Badge color="blue">Hybrid RBAC + ABAC</Badge>
        </Group>
        
        <Stack gap="md">
          <Group grow>
            <Select
              label="User Role"
              value={currentUser?.roles[0] || ''}
              onChange={(value) => value && changeUserRole(value)}
              data={[
                { value: 'guest', label: 'Guest' },
                { value: 'user', label: 'User' },
                { value: 'manager', label: 'Manager' },
                { value: 'admin', label: 'Administrator' }
              ]}
            />
            <Select
              label="Resource"
              value={resource}
              onChange={(value) => value && setResource(value)}
              data={[
                { value: 'documents', label: 'Documents' },
                { value: 'reports', label: 'Reports' },
                { value: 'sensitive-documents', label: 'Sensitive Documents' },
                { value: 'admin-panel', label: 'Admin Panel' },
                { value: 'public', label: 'Public Content' }
              ]}
            />
            <Select
              label="Action"
              value={action}
              onChange={(value) => value && setAction(value)}
              data={[
                { value: 'read', label: 'Read' },
                { value: 'edit', label: 'Edit' },
                { value: 'delete', label: 'Delete' },
                { value: 'create', label: 'Create' }
              ]}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Time Context"
              value={context.time}
              onChange={(e) => setContext({ ...context, time: e.target.value })}
              placeholder="HH:MM"
            />
            <TextInput
              label="IP Address"
              value={context.ip_address}
              onChange={(e) => setContext({ ...context, ip_address: e.target.value })}
              placeholder="192.168.1.100"
            />
            <TextInput
              label="Department"
              value={context.department}
              onChange={(e) => setContext({ ...context, department: e.target.value })}
              placeholder="engineering"
            />
          </Group>

          <Button onClick={checkAccess} leftSection={<IconShield size={16} />}>
            Check Access
          </Button>
        </Stack>
      </Card>

      {accessDecision && (
        <Card withBorder p="lg">
          <Group mb="md">
            {accessDecision.allowed ? (
              <IconShieldCheck size={24} color="green" />
            ) : (
              <IconShieldX size={24} color="red" />
            )}
            <Text fw={500}>
              Access Decision: {accessDecision.allowed ? 'GRANTED' : 'DENIED'}
            </Text>
          </Group>
          
          <Alert 
            color={accessDecision.allowed ? 'green' : 'red'} 
            variant="light"
            mb="md"
          >
            {accessDecision.reason}
          </Alert>
          
          {accessDecision.policies.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>Applied Policies:</Text>
              {accessDecision.policies.map((policy: string) => (
                <Badge key={policy} variant="outline" size="sm">
                  {policy}
                </Badge>
              ))}
            </Stack>
          )}
        </Card>
      )}
    </Stack>
  );
};`;

export const REACT_FEATURE_TOGGLE_CODE = `// React Component-Based Feature Toggles
import React, { createContext, useContext, ReactNode } from 'react';
import { AccessControlService } from './access-control-service';

// Feature Toggle Context
interface FeatureToggleContextType {
  isFeatureEnabled: (featureId: string, user?: User) => boolean;
  getEnabledFeatures: (user?: User) => string[];
}

const FeatureToggleContext = createContext<FeatureToggleContextType | undefined>(undefined);

// Feature Toggle Provider
interface FeatureToggleProviderProps {
  children: ReactNode;
  accessControl: AccessControlService;
  features: FeatureToggle[];
}

export const FeatureToggleProvider: React.FC<FeatureToggleProviderProps> = ({
  children,
  accessControl,
  features,
}) => {
  const isFeatureEnabled = (featureId: string, user?: User): boolean => {
    const feature = features.find(f => f.id === featureId);
    if (!feature || !feature.enabled) return false;

    // Check if user has access to the feature
    if (user && !accessControl.checkAccess(user, featureId, 'read')) {
      return false;
    }

    // Check target audience
    if (feature.targetAudience?.roles && user) {
      if (!feature.targetAudience.roles?.some(role => user.roles.includes(role))) {
        return false;
      }
    }

    // Check percentage rollout
    if (feature.targetAudience?.percentage && user) {
      const userHash = hashUserId(user.id);
      const percentage = userHash % 100;
      if (percentage >= feature.targetAudience.percentage) return false;
    }

    return true;
  };

  const getEnabledFeatures = (user?: User): string[] => {
    return features
      .filter(feature => isFeatureEnabled(feature.id, user))
      .map(feature => feature.id);
  };

  return (
    <FeatureToggleContext.Provider value={{ isFeatureEnabled, getEnabledFeatures }}>
      {children}
    </FeatureToggleContext.Provider>
  );
};

// Custom hook for feature toggles
export const useFeatureToggle = () => {
  const context = useContext(FeatureToggleContext);
  if (!context) {
    throw new Error('useFeatureToggle must be used within a FeatureToggleProvider');
  }
  return context;
};

// Feature Toggle Components
interface FeatureToggleProps {
  featureId: string;
  children: ReactNode;
  fallback?: ReactNode;
  user?: User;
}

export const FeatureToggle: React.FC<FeatureToggleProps> = ({
  featureId,
  children,
  fallback = null,
  user,
}) => {
  const { isFeatureEnabled } = useFeatureToggle();
  
  if (isFeatureEnabled(featureId, user)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

// Usage Examples
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Simple feature toggle */}
      <FeatureToggle featureId="new-analytics" user={user}>
        <NewAnalyticsWidget />
      </FeatureToggle>
      
      {/* Feature toggle with fallback */}
      <FeatureToggle
        featureId="beta-dashboard"
        user={user}
        fallback={<StandardDashboard />}
      >
        <BetaDashboard />
      </FeatureToggle>
      
      {/* Feature toggle with custom fallback */}
      <FeatureToggle
        featureId="advanced-search"
        user={user}
        fallback={<BasicSearch />}
      >
        <AdvancedSearch />
      </FeatureToggle>
    </div>
  );
};

// Utility function for user hashing - ensures consistent feature access
// This is important for percentage rollouts and A/B testing
const hashUserId = (userId: string): number => {
  // Simple, predictable hash for demo purposes
  // Maps user IDs to specific ranges for better testing
  const userHashMap: { [key: string]: number } = {
    alice: 15, // 15% - gets most features
    bob: 35, // 35% - gets most features
    charlie: 55, // 55% - gets most features
    diana: 75, // 75% - gets most features
    eve: 85, // 85% - gets some features
    frank: 95, // 95% - gets few features
    grace: 25, // 25% - gets most features
    henry: 65, // 65% - gets most features
  };

  return userHashMap[userId] || 50; // Default to 50% for unknown users
};

/*
Alternative without user hash (simpler but less consistent):

const isFeatureEnabled = (featureId: string, user?: User): boolean => {
  const feature = features.find(f => f.id === featureId);
  if (!feature || !feature.enabled) return false;

  // Check target audience
  if (feature.targetAudience?.roles && user) {
    if (!feature.targetAudience.roles.some(role => user.roles.includes(role))) {
      return false;
    }
  }

  // Simple random check (user experience may vary between sessions)
  if (feature.targetAudience?.percentage) {
    const random = Math.random() * 100;
    if (random >= feature.targetAudience.percentage) return false;
  }

  return true;
};
*/`;

export const PRACTICAL_DASHBOARD_EXAMPLE_CODE = `// Practical Dashboard Example with Feature Toggles
import React from 'react';
import { FeatureToggle } from './feature-toggle-components';

// App Setup with Feature Toggle Provider
const App: React.FC = () => {
  const accessControl = new HybridAccessControlWithFeatures();
  const features = [
    {
      id: 'new-analytics',
      name: 'New Analytics Dashboard',
      enabled: true,
      targetAudience: { 
        roles: ['admin', 'manager'], 
        percentage: 95,
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana']
      }
    },
    {
      id: 'beta-features',
      name: 'Beta Features',
      enabled: true,
      targetAudience: { 
        roles: ['admin', 'manager', 'user'],
        percentage: 90,
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana', 'grace', 'henry']
      }
    },
    {
      id: 'guest-features',
      name: 'Guest Access Features',
      enabled: true,
      targetAudience: { 
        roles: ['guest', 'user', 'admin'],
        percentage: 100,
        guaranteedUsers: ['frank']
      }
    }
  ];

  return (
    <FeatureToggleProvider accessControl={accessControl} features={features}>
      <Dashboard />
    </FeatureToggleProvider>
  );
};

// Dashboard Component with Feature Toggles
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <UserInfo user={user} />
      </header>
      
      <main>
        {/* Basic Analytics - Always visible */}
        <section>
          <h2>Basic Analytics</h2>
          <BasicAnalyticsWidget />
        </section>
        
        {/* New Analytics - Feature Toggle */}
        <FeatureToggle featureId="new-analytics" user={user}>
          <section>
            <h2>Advanced Analytics</h2>
            <NewAnalyticsWidget />
          </section>
        </FeatureToggle>
        
        {/* Beta Dashboard - Feature Toggle */}
        <FeatureToggle
          featureId="beta-features"
          user={user}
          fallback={
            <section>
              <h2>Standard Dashboard</h2>
              <StandardDashboard />
            </section>
          }
        >
          <section>
            <h2>Beta Dashboard</h2>
            <BetaDashboard />
          </section>
        </FeatureToggle>
        
        {/* Search with Fallback */}
        <section>
          <h2>Search</h2>
          <FeatureToggle
            featureId="advanced-search"
            user={user}
            fallback={<BasicSearch />}
          >
            <AdvancedSearch />
          </FeatureToggle>
        </section>
      </main>
    </div>
  );
};

// Component implementations
const BasicAnalyticsWidget: React.FC = () => (
  <div>Basic analytics content</div>
);

const NewAnalyticsWidget: React.FC = () => (
  <div>New advanced analytics with charts and insights</div>
);

const BetaDashboard: React.FC = () => (
  <div>Beta dashboard with experimental features</div>
);

const StandardDashboard: React.FC = () => (
  <div>Standard dashboard with stable features</div>
);

const AdminPanel: React.FC = () => (
  <div>Admin panel with system controls</div>
);

const BasicSearch: React.FC = () => (
  <input type="text" placeholder="Basic search..." />
);

const AdvancedSearch: React.FC = () => (
  <div>
    <input type="text" placeholder="Advanced search..." />
    <select>
      <option>All Categories</option>
      <option>Users</option>
      <option>Documents</option>
    </select>
    <button>Search</button>
  </div>
);

const UserInfo: React.FC<{ user: User }> = ({ user }) => (
  <div>
    <span>Welcome, User {user.id}</span>
    <span>Roles: {user.roles.join(', ')}</span>
  </div>
);`;

export const USER_SELECT_OPTIONS = [
  {
    label: 'Alice (Hash: 15) - User Role',
    value: 'alice',
  },
  {
    label: 'Bob (Hash: 35) - Manager Role',
    value: 'bob',
  },
  {
    label: 'Charlie (Hash: 55) - Admin Role',
    value: 'charlie',
  },
  {
    label: 'Diana (Hash: 75) - Manager Role',
    value: 'diana',
  },
  {
    label: 'Eve (Hash: 85) - User Role',
    value: 'eve',
  },
  {
    label: 'Frank (Hash: 95) - Guest Role',
    value: 'frank',
  },
  {
    label: 'Grace (Hash: 25) - Manager Role',
    value: 'grace',
  },
  {
    label: 'Henry (Hash: 65) - User Role',
    value: 'henry',
  },
];

export const RESOURCE_SELECT_OPTIONS = [
  { label: 'Documents', value: 'documents' },
  { label: 'Reports', value: 'reports' },
  { label: 'Sensitive Documents', value: 'sensitive-documents' },
  { label: 'Admin Panel', value: 'admin-panel' },
  { label: 'Public Content', value: 'public' },
];

export const ACTION_SELECT_OPTIONS = [
  { label: 'Read', value: 'read' },
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' },
  { label: 'Create', value: 'create' },
];

export const TIME_CONTEXT_SELECT_OPTIONS = [
  { label: '08:00 (Outside business hours)', value: '08:00' },
  { label: '14:30 (Business hours)', value: '14:30' },
  { label: '22:00 (Outside business hours)', value: '22:00' },
];

export const DEPARTMENT_SELECT_OPTIONS = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Sales', value: 'sales' },
];

export const generateUserSelectOptions = (hashUserId: (id: string) => number) =>
  USER_SELECT_OPTIONS.map((option) => ({
    ...option,
    label: option.label.replace(/Hash: \d+/, `Hash: ${hashUserId(option.value) % 100}`),
  }));
