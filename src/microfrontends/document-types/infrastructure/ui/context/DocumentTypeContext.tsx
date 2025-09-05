import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDocumentTypes } from '../hooks/useDocumentTypes.ts';
import type { DocumentType } from '../../../domain/models/DocumentType.ts'; // CORRECTED PATH

interface DocumentTypeContextProps {
  documentTypes: DocumentType[];
  // Add other functions if needed, e.g., addDocumentType, deleteDocumentType
}

const DocumentTypeContext = createContext<DocumentTypeContextProps | undefined>(undefined);

export const DocumentTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { documentTypes, loadDocumentTypes } = useDocumentTypes(); // Use the hook to get document types

  useEffect(() => {
    loadDocumentTypes(); // Ensure types are loaded when the provider mounts
  }, []);

  return (
    <DocumentTypeContext.Provider value={{ documentTypes }}>
      {children}
    </DocumentTypeContext.Provider>
  );
};

export const useDocumentTypeContext = () => {
  const context = useContext(DocumentTypeContext);
  if (!context) {
    throw new Error('useDocumentTypeContext must be used within a DocumentTypeProvider');
  }
  return context;
};
