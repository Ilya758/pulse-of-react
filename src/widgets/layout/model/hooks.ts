import { createContext, useContext } from 'react';

interface TocContentContextType {
  signalContentLoaded: () => void;
  isContentLoaded: boolean;
}

const TocContentContext = createContext<TocContentContextType | undefined>(undefined);

export const useTocContent = (): TocContentContextType => {
  const context = useContext(TocContentContext);

  if (!context) {
    throw new Error('useTocContent must be used within a TocContentProvider');
  }

  return context;
};

export const TocContentProvider = TocContentContext.Provider;
