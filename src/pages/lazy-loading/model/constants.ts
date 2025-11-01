export const LAZY_LOADING_SIGNATURE_CODE = `const LazyComponent = React.lazy(() => import('./SomeComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
`;

export const LAZY_ERROR_BOUNDARY_CODE = `import { Suspense, lazy, useState } from 'react';
import { Loader, Button, Paper, Alert } from '@mantine/core';
import { useThemeColorContext } from '@/shared';

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
    })
);

export const LazyWithErrorBoundaryExample = () => {
  const { primaryColor } = useThemeColorContext();
  const [show, setShow] = useState(false);

  return (
    <Paper p="md" mb="md">
      <Button onClick={() => setShow((s) => !s)} mb="md">
        {show ? 'Hide' : 'Show'} Lazy Feature
      </Button>
      {show && (
        <Suspense fallback={<Loader color={primaryColor} type="dots" />}>
          <LazyFeature />
        </Suspense>
      )}
    </Paper>
  );
};`;
