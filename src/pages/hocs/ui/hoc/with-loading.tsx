import { Group, Loader, Paper } from '@mantine/core';
import { ComponentType, useEffect, useState } from 'react';

export interface WithLoadingProps {
  isLoading: boolean;
}

export const withLoading = <P extends object>(
  WrappedComponent: ComponentType<P & WithLoadingProps>,
) =>
  function WithLoadingComponent(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <Paper
          h={200}
          p="md"
          style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
          withBorder
        >
          <Group justify="center" p="xl">
            <Loader size="lg" />
          </Group>
        </Paper>
      );
    }

    return <WrappedComponent {...props} isLoading={isLoading} />;
  };
