import { JSX, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TocContentProvider } from '../model';
import { InnerLayout } from './inner-layout';

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const { pathname } = useLocation();
  const [isMounted, setIsMounted] = useState(true);
  const contextValue = useMemo(
    () => ({
      isContentLoaded,
      signalContentLoaded: () => {
        if (isMounted)
          setTimeout(() => {
            setIsMounted(false);
          }, 500);
        else {
          setIsContentLoaded(true);
        }
      },
    }),
    [isContentLoaded, isMounted],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: required to update TOC
  useEffect(
    () => () => {
      setIsContentLoaded(false);
    },
    [isMounted, pathname],
  );

  return (
    <TocContentProvider value={contextValue}>
      <InnerLayout>{children}</InnerLayout>
    </TocContentProvider>
  );
};
