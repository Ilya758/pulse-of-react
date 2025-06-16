import { ComponentType, useState, useEffect } from 'react';
import { Paper, Group, Loader } from '@mantine/core';

export interface WithLoadingProps {
  isLoading: boolean;
}

export const withLoading = <P extends object>(
  WrappedComponent: ComponentType<P & WithLoadingProps>,
) => {
  return function WithLoadingComponent(props: P) {
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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
};

