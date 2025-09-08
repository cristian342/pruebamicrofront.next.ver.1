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

export const updateDocument = (repository: DocumentRepository) => async (
  document: Document
): Promise<Document> => {
  const updatedDocument = await repository.save(document);
  return updatedDocument;
};
