import { Alert, Button, Loader, Paper } from '@mantine/core';
import { lazy, Suspense, useState } from 'react';
import { If, useThemeColorContext } from '@/shared';

function FallbackComponent() {
  return (
    <Alert color="red">
      Failed to load this feature. Please check your connection or try again later.
    </Alert>
  );
}

const LazyFeature = lazy(() =>
  import('./lazy-feature')
    .then(({ LazyFeature: LazyFeatureComponent }) => ({ default: LazyFeatureComponent }))
    .catch((error) => {
      console.error('Component Failed Loading:', error);
      return { default: FallbackComponent };
    }),
);

export const LazyWithErrorBoundaryExample = () => {
  const { primaryColor } = useThemeColorContext();
  const [show, setShow] = useState(false);

  return (
    <Paper mb="md">
      <Button mb="md" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide' : 'Show'} Lazy Feature
      </Button>
      <If condition={show}>
        <Suspense fallback={<Loader color={primaryColor} type="dots" />}>
          <LazyFeature />
        </Suspense>
      </If>
    </Paper>
  );
};
