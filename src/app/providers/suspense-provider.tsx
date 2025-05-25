import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';

export const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Center style={{ height: 'calc(100vh - 60px - 2 * var(--mantine-spacing-md))' }}>
          <Loader color="indigo" type="dots" />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
};

