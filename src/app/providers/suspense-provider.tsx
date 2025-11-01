import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';
import { useThemeColorContext } from '@/shared';

export const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  const { primaryColor } = useThemeColorContext();

  return (
    <Suspense
      fallback={
        <Center style={{ height: '100vh', width: '100%' }}>
          <Loader color={primaryColor} size="xl" type="bars" />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
};
