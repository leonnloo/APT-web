'use client';

import { CustomDocument } from '@/types';
import React, { createContext, useContext, useState } from 'react';

interface DocumentContextType {
  document: CustomDocument | null;
  setDocument: (document: CustomDocument | null) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [document, setDocument] = useState<CustomDocument | null>(null);

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
