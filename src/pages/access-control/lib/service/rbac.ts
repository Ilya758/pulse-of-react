import { Permission, Role, User, ROLE_DEFINITIONS } from '../../model';

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
}
