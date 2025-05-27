import { ROUTES } from '../model';

export const allowTOC = (pathname: string) => {
  return ROUTES.some((route) => route.href === pathname);
};
