import { DocumentRepository } from '../../domain/repositories/DocumentRepository.js'; // Importa la interfaz del repositorio de documentos
import { Document } from '../../domain/models/Document.js';

// Mock implementation for demonstration purposes
const mockDocumentRepository: DocumentRepository = {
  getAll: async () => [],
  findById: async (id) => null,
  save: async (document: Document) => {
    console.log(`Mock saving document: ${document.id}`);
    return document;
  },
  delete: async (id: string): Promise<void> => {
    // The 'id' parameter is declared as string but was not being used in the mock implementation.
    // Added console.log to use the id and satisfy the TypeScript hint.
    console.log(`Mock deleting document with id: ${id}`);
    return undefined;
  },
};

export const deleteDocument = (repository: DocumentRepository) => async (
  id: string
): Promise<void> => {
  await repository.delete(id);
};
