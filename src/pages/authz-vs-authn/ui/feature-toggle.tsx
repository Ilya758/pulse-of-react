import { ReactNode } from 'react';

export const FeatureToggle = ({
  allow,
  fallback = null,
  children,
}: {
  allow: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}) => {
  return <>{allow ? children : fallback}</>;
};

