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
  const contextValue = useMemo(
    () => ({
      signalContentLoaded: () => {
        setIsContentLoaded(true);
      },
      isContentLoaded,
    }),
    [isContentLoaded],
  );

  useEffect(() => {
    return () => {
      setIsContentLoaded(false);
    };
  }, [pathname]);

  return (
    <TocContentProvider value={contextValue}>
      <InnerLayout>{children}</InnerLayout>
    </TocContentProvider>
  );
};

