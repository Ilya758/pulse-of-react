import { AccessDecision, AccessRequest, User } from '../../model';
import { SimpleABACService } from './abac';
import { SimpleRBACService } from './rbac';

export class HybridAccessControlService {
  private rbacService: SimpleRBACService;
  private abacService: SimpleABACService;

  constructor() {
    this.rbacService = new SimpleRBACService();
    this.abacService = new SimpleABACService();
  }

  public checkAccess(request: AccessRequest): AccessDecision {
    const hasRBACAccess = this.rbacService.checkAccess(
      request.user.id,
      request.resource,
      request.action,
    );

    if (!hasRBACAccess) {
      return {
        allowed: false,
        policies: [],
        reason: 'Access denied by RBAC - insufficient role permissions',
        timestamp: new Date(),
      };
    }

    const abacResult = this.abacService.checkAccess(request);

    const decision = {
      allowed: abacResult.allowed,
      policies: abacResult.policies,
      reason: abacResult.reason,
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
}
