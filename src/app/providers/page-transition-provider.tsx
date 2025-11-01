import { lazy, Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { useFramerMotion } from '../model/hooks';

const LazyAnimatePresence = lazy(() =>
  import('framer-motion').then(({ AnimatePresence }) => ({
    default: AnimatePresence,
  })),
);

const LazyMotion = lazy(() =>
  import('framer-motion').then(({ motion }) => ({
    default: motion.div,
  })),
);

export type Props = {
  routes: Parameters<typeof useRoutes>[0];
};

export const PageTransitionProvider = ({ routes }: Props) => {
  const location = useLocation();
  const element = useRoutes(routes, location);
  const { isLoaded } = useFramerMotion();

  const animatedContent = (
    <Suspense fallback={<div style={{ height: '100%' }}>{element}</div>}>
      <LazyAnimatePresence initial={false} mode="wait">
        <LazyMotion
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 6 }}
          key={location.key}
          style={{ height: '100%' }}
          transition={{ duration: 0.25 }}
        >
          {element}
        </LazyMotion>
      </LazyAnimatePresence>
    </Suspense>
  );

  return isLoaded ? animatedContent : element;
};
