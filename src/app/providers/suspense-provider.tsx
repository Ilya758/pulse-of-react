import { Center, Loader } from '@mantine/core';
import { JSX, Suspense } from 'react';

export const SuspenseProvider = ({ children }: { children: JSX.Element }) => {
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

