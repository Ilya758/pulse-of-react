import { ROUTES } from '../model';

export const allowTOC = (pathname: string) =>
  pathname !== '/coming-soon'
  && ROUTES.some(({ items }) => items.some(({ href }) => href === pathname));
