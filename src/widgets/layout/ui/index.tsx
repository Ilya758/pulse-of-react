import { JSX, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InnerLayout } from './inner-layout';
import { TocContentProvider } from '../model';

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const { pathname } = useLocation();
  const [isMounted, setIsMounted] = useState(true);
  const contextValue = useMemo(
    () => ({
      signalContentLoaded: () => {
        if (isMounted)
          setTimeout(() => {
            setIsMounted(false);
          }, 500);
        else {
          setIsContentLoaded(true);
        }
      },
      isContentLoaded,
    }),
    [isContentLoaded, isMounted],
  );

  useEffect(() => {
    return () => {
      setIsContentLoaded(false);
    };
  }, [isMounted, pathname]);

  return (
    <TocContentProvider value={contextValue}>
      <InnerLayout>{children}</InnerLayout>
    </TocContentProvider>
  );
};

