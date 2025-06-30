import { Suspense, lazy, useState } from 'react';
import { Loader, Button, Paper, Alert } from '@mantine/core';
import { If } from '@/shared';

function FallbackComponent() {
  return (
    <Alert color="red">
      Failed to load this feature. Please check your connection or try again later.
    </Alert>
  );
}

const LazyFeature = lazy(() =>
  import('./lazy-feature')
    .then(({ LazyFeature }) => ({ default: LazyFeature }))
    .catch((error) => {
      console.error('Component Failed Loading:', error);
      return { default: FallbackComponent };
    }),
);

export const LazyWithErrorBoundaryExample = () => {
  const [show, setShow] = useState(false);

  return (
    <Paper mb="md">
      <Button onClick={() => setShow((s) => !s)} mb="md">
        {show ? 'Hide' : 'Show'} Lazy Feature
      </Button>
      <If condition={show}>
        <Suspense fallback={<Loader color="indigo" type="dots" />}>
          <LazyFeature />
        </Suspense>
      </If>
    </Paper>
  );
};

