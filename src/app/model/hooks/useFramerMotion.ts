import { useState, useEffect } from 'react';

export const useFramerMotion = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadFramerMotion = () => {
      import('framer-motion')
        .then(() => {
          if (mounted) {
            setIsLoaded(true);
          }
        })
        .catch(() => {
          if (mounted) {
            setIsLoaded(true);
          }
        });
    };

    const timer = setTimeout(loadFramerMotion, 50);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return {
    isLoaded,
  };
};

