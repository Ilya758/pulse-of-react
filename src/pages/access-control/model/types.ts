export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
}

export interface User {
  id: string;
  roles: string[];
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  conditions: PolicyCondition[];
  resources: string[];
  actions: string[];
}

export interface PolicyCondition {
  attribute: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: string | number | boolean | (string | number)[];
}

export interface AccessContext {
  time?: string;
  ip_address?: string;
  department?: string;
  resourceDepartment?: string;
  location?: string;
}

export interface AccessRequest {
  user: User;
  resource: string;
  action: string;
  context?: AccessContext;
  timestamp: Date;
}

export interface AccessDecision {
  allowed: boolean;
  reason: string;
  policies: string[];
  timestamp: Date;
}
