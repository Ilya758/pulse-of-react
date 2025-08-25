import { Role } from '../model';

export const can = (user: { role: Role } | null, permission: string) => {
  if (!user) return false;

  const table: Record<Role, string[]> = {
    guest: ['read:public'],
    user: ['read:public', 'read:profile'],
    manager: ['read:public', 'read:profile', 'edit:report'],
    admin: ['read:public', 'read:profile', 'edit:report', 'access:admin'],
  };

  return table[user.role].includes(permission);
};

