import type { Document } from '../../domain/models/Document.js'; // Importa la interfaz de tipo Documento
import type { DocumentRepository } from '../../domain/repositories/DocumentRepository.js'; // Importa la interfaz del repositorio de documentos

// Mock implementation for demonstration purposes
const mockDocumentRepository: DocumentRepository = {
  getAll: async () => [],
  findById: async (id) => null,
  save: async (document) => {
    console.log('Mock saving document:', document);
    return document;
  },
  delete: async (id) => undefined,
};

export const createDocument = (repository: DocumentRepository) => async (
  document: Omit<Document, 'id' | 'status'>
): Promise<Document> => {
  const newDocument: Document = {
    ...document,
    id: Math.random().toString(36).substring(2, 15), // Simple mock ID
    status: 'active', // Default status
  };
  await repository.save(newDocument);
  return newDocument;
};
