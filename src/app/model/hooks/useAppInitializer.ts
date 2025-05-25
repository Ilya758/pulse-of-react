import { useEffect, useState } from 'react';

export const useAppInitializer = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const htmlLoader = document.getElementById('app-initial-loader');

      if (htmlLoader) {
        htmlLoader.classList.add('hidden');
        setTimeout(() => htmlLoader.remove(), 300);
      }

      await new Promise((resolve) => setTimeout(resolve));
      setAppReady(true);
    };

    initializeApp();
  }, []);

  return { appReady };
};

