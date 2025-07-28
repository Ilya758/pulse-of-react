import { useLocation, useRoutes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ANIMATION = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 6 },
  transition: { duration: 0.25 },
};

export type Props = {
  routes: Parameters<typeof useRoutes>[0];
};

export const PageTransitionProvider = ({ routes }: Props) => {
  const location = useLocation();
  const element = useRoutes(routes, location);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        animate={ANIMATION.animate}
        initial={ANIMATION.initial}
        key={location.key}
        style={{ height: '100%' }}
        transition={ANIMATION.transition}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};

