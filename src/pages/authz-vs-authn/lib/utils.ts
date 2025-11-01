import { Role } from '../model';

export const can = (user: { role: Role } | null, permission: string) => {
  if (!user) return false;

  const table: Record<Role, string[]> = {
    admin: ['read:public', 'read:profile', 'edit:report', 'access:admin'],
    guest: ['read:public'],
    manager: ['read:public', 'read:profile', 'edit:report'],
    user: ['read:public', 'read:profile'],
  };

  return table[user.role].includes(permission);
};
