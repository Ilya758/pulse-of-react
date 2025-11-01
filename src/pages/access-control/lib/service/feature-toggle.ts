import { User } from '@/pages/access-control/model';
import { hashUserId } from '../utils';

export class SimpleFeatureToggleService {
  private features: Map<string, any> = new Map();

  constructor() {
    this.initializeFeatures();
  }

  private initializeFeatures() {
    this.features.set('new-analytics', {
      enabled: true,
      id: 'new-analytics',
      name: 'New Analytics Dashboard',
      targetAudience: {
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana'],
        percentage: 95,
        roles: ['admin', 'manager'],
      },
    });

    this.features.set('beta-features', {
      enabled: true,
      id: 'beta-features',
      name: 'Beta Features',
      targetAudience: {
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana', 'grace', 'henry'],
        percentage: 90,
        roles: ['admin', 'manager', 'user'],
      },
    });

    this.features.set('premium-tools', {
      enabled: true,
      id: 'premium-tools',
      name: 'Premium Tools',
      targetAudience: {
        percentage: 100,
        roles: ['admin'],
      },
    });

    this.features.set('early-access', {
      enabled: true,
      id: 'early-access',
      name: 'Early Access Features',
      targetAudience: {
        guaranteedUsers: ['eve', 'frank', 'grace', 'henry'],
        percentage: 90,
        roles: ['admin', 'manager'],
      },
    });

    this.features.set('guest-features', {
      enabled: true,
      id: 'guest-features',
      name: 'Guest Access Features',
      targetAudience: {
        guaranteedUsers: ['frank'],
        percentage: 100,
        roles: ['guest', 'user', 'admin'],
      },
    });
  }

  public isFeatureEnabled(featureId: string, user: User): boolean {
    const feature = this.features.get(featureId);

    if (!feature?.enabled) return false;

    if (feature.targetAudience?.guaranteedUsers?.includes(user.id)) {
      return true;
    }

    if (!feature.targetAudience?.roles?.some((role: string) => user.roles.includes(role))) {
      return false;
    }

    if (feature.targetAudience.percentage) {
      const userHash = hashUserId(user.id);
      const percentage = userHash % 100;

      if (percentage >= feature.targetAudience.percentage) {
        return false;
      }
    }

    return true;
  }

  public getEnabledFeatures(user: User): string[] {
    return Array.from(this.features.keys()).filter((featureId) =>
      this.isFeatureEnabled(featureId, user),
    );
  }
}
