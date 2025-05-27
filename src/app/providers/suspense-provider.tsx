import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';

export const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Center style={{ height: '100vh', width: '100%' }}>
          <Loader color="indigo" type="dots" size="xl" />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
};

