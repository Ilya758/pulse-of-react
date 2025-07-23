import { useThemeColorContext } from '@/shared';
import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';

export const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  const { primaryColor } = useThemeColorContext();

  return (
    <Suspense
      fallback={
        <Center style={{ height: '100vh', width: '100%' }}>
          <Loader color={primaryColor} type="bars" size="xl" />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
};

