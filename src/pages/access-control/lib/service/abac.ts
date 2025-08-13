import { AccessRequest } from '../../model';

export class SimpleABACService {
  public checkAccess(request: AccessRequest): {
    allowed: boolean;
    reason: string;
    policies: string[];
  } {
    const { context = {} } = request;
    const policies: string[] = [];

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
        return {
          allowed: true,
          reason: 'Access granted (no specific policies apply)',
          policies: [],
        };
      }
    }
  }

  private evaluateDocumentPolicies(request: AccessRequest, context: any, policies: string[]) {
    if (request.action === 'edit') {
      return this.evaluateManagerEditPolicy(request, context, policies);
    }

    const timeResult = this.evaluateTimePolicy(context, policies);

    if (!timeResult.allowed) return timeResult;

    return {
      allowed: true,
      reason: 'Access granted by policies',
      policies: [...policies, 'business-hours'],
    };
  }

  private evaluateReportPolicies(request: AccessRequest, context: any, policies: string[]) {
    const timeResult = this.evaluateTimePolicy(context, policies);

    if (!timeResult.allowed) return timeResult;

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
    _request: AccessRequest,
    context: any,
    policies: string[],
  ) {
    const ip = context.ip_address as string;

    if (ip && (ip.startsWith('192.168.1.') || ip.startsWith('10.0.'))) {
      return {
        allowed: true,
        reason: 'Access granted by policies',
        policies: [...policies, 'office-network'],
      };
    }

    return {
      allowed: false,
      reason: 'Access denied: Must be on office network for sensitive documents',
      policies: ['office-network'],
    };
  }

  private evaluateTimePolicy(context: any, _policies: string[]) {
    const time = context.time as string;

    if (!time) return { allowed: true, reason: 'No time context', policies: [] };

    const hour = parseInt(time.split(':')[0]);

    if (hour >= 9 && hour <= 17) {
      return { allowed: true, reason: 'Business hours', policies: [] };
    }

    return {
      allowed: false,
      reason: 'Access denied: Outside business hours (9 AM - 5 PM)',
      policies: ['business-hours'],
    };
  }

  private evaluateManagerEditPolicy(request: AccessRequest, context: any, policies: string[]) {
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
        reason: `Access denied: Manager can only edit documents from their own department (${userDept} vs ${resourceDept})`,
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
    _request: AccessRequest,
    context: any,
    policies: string[],
  ) {
    const userDept = context.department as string;
    const resourceDept = context.resourceDepartment as string;

    if (resourceDept && userDept && userDept !== resourceDept) {
      return {
        allowed: false,
        reason: `Access denied: Users can only read reports from their own department (${userDept} vs ${resourceDept})`,
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
}

