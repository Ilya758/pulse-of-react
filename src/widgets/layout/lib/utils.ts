import { ROUTES } from '../model';

export const allowTOC = (pathname: string) => {
  return (
    pathname !== '/coming-soon' &&
    ROUTES.some(({ items }) => items.some(({ href }) => href === pathname))
  );
};

