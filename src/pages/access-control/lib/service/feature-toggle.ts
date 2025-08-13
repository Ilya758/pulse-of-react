import { User } from '@/pages/access-control/model';
import { hashUserId } from '../utils';

export class SimpleFeatureToggleService {
  private features: Map<string, any> = new Map();

  constructor() {
    this.initializeFeatures();
  }

  private initializeFeatures() {
    this.features.set('new-analytics', {
      id: 'new-analytics',
      name: 'New Analytics Dashboard',
      enabled: true,
      targetAudience: {
        roles: ['admin', 'manager'],
        percentage: 95,
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana'],
      },
    });

    this.features.set('beta-features', {
      id: 'beta-features',
      name: 'Beta Features',
      enabled: true,
      targetAudience: {
        roles: ['admin', 'manager', 'user'],
        percentage: 90,
        guaranteedUsers: ['alice', 'bob', 'charlie', 'diana', 'grace', 'henry'],
      },
    });

    this.features.set('premium-tools', {
      id: 'premium-tools',
      name: 'Premium Tools',
      enabled: true,
      targetAudience: {
        roles: ['admin'],
        percentage: 100,
      },
    });

    this.features.set('early-access', {
      id: 'early-access',
      name: 'Early Access Features',
      enabled: true,
      targetAudience: {
        roles: ['admin', 'manager'],
        percentage: 90,
        guaranteedUsers: ['eve', 'frank', 'grace', 'henry'],
      },
    });

    this.features.set('guest-features', {
      id: 'guest-features',
      name: 'Guest Access Features',
      enabled: true,
      targetAudience: {
        roles: ['guest', 'user', 'admin'],
        percentage: 100,
        guaranteedUsers: ['frank'],
      },
    });
  }

  public isFeatureEnabled(featureId: string, user: User): boolean {
    const feature = this.features.get(featureId);

    if (!feature || !feature.enabled) return false;

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

