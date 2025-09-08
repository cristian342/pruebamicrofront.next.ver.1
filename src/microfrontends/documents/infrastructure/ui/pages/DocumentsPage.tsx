import React, { useState, useEffect } from 'react';
import { DocumentForm } from '../components/DocumentForm.tsx';
import { DocumentDataGridModal } from '../components/DocumentDataGridModal/DocumentDataGridModal.tsx';
import { useDocuments } from '../hooks/useDocuments.js';
import { useDocumentTypes } from '../../../../document-types/infrastructure/ui/hooks/useDocumentTypes.ts';
import type { DocumentType } from '../../../../document-types/domain/models/DocumentType.js';
import { Grid, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container } from '@mui/material';
import type { Document } from '../../../domain/models/Document.js'; // CORRECTED PATH
import ModalMensaje from '../../../../../infrastructure/ui/components/Modals/Modalmessage.tsx';
// Dayjs solo para mostrar la fecha en el modal de "Ver"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import 'dayjs/locale/es';

declare module 'dayjs' {
  interface Dayjs {
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs;
  }
}

dayjs.extend(utc);
dayjs.extend(timezone);
// Trigger re-compilation

export default function DocumentsPage() {
  const {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    reactivateDocument,
    modalOpen, // Destructure from useDocuments
    modalType, // Destructure from useDocuments
    modalMessage, // Destructure from useDocuments
    closeModal, // Destructure from useDocuments
  } = useDocuments();
  const { documentTypes } = useDocumentTypes();

  useEffect(() => {
    console.log('Documents:', documents);
    console.log('Document Types:', documentTypes);
    // Expose data to window for inspection
    (window as any).documents = documents;
    (window as any).documentTypes = documentTypes;
  }, [documents, documentTypes]);

  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDataGridModal, setOpenDataGridModal] = useState(false);

  const handleOpenDataGridModal = () => setOpenDataGridModal(true);
  const handleCloseDataGridModal = () => setOpenDataGridModal(false);

  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setOpenEditDialog(true);
  };

  const handleView = (doc: Document) => {
    setViewingDocument(doc);
    setOpenViewDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      // Modal logic moved to useDocuments hook
      await deleteDocument(id);
    }
  };

  const handleReactivate = async (id: string) => {
    // Modal logic moved to useDocuments hook
    await reactivateDocument(id);
  };

  const handleDownload = (doc: Document) => {
    if (doc.fileContent && doc.fileName && doc.fileType) {
      const base64Data = doc.fileContent.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArray = new Uint8Array([...byteCharacters].map((c) => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: doc.fileType });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = doc.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } else {
      alert('No hay archivo adjunto para descargar.');
    }
  };

  const handleUpdateSubmit = async (docData: Document) => {
    if (!editingDocument) return;
    // Modal logic moved to useDocuments hook
    await updateDocument(docData);
    setOpenEditDialog(false);
    setEditingDocument(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingDocument(null);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewingDocument(null);
  };

  const handleAddDocumentSubmit = async (docData: Omit<Document, 'id' | 'status'>) => {
    // Modal logic moved to useDocuments hook
    await addDocument(docData);
  };

  // Removed local handleCloseModal as it's now managed by useDocuments hook

  // Helpers para el diálogo de visualización
  const tipoDeDocumentoNombre = viewingDocument
    ? documentTypes.find((dt: DocumentType) => String(dt.id) === String(viewingDocument.documentTypeId))?.name ?? 'Desconocido'
    : '';

  const fechaCreacionLocal = viewingDocument
    ? dayjs(viewingDocument.creationDate).tz('America/Bogota').format('DD/MM/YYYY')
    : '';

  return (
    <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}> {/* Added textAlign: 'center' */}
      <Typography variant="h4" gutterBottom>
        SPA de Gestión de Documentos
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h5">{documents.length}</Typography>
          <Typography variant="subtitle1">Documentos Totales</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h5">{documentTypes.length}</Typography>
          <Typography variant="subtitle1">Tipos de Documento</Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on xs, row on sm
        gap: 4, // Spacing between items
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap' // Allow wrapping if needed
      }}>
        <Box component="div" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: { xs: '0 0 100%', sm: '1 1 auto' }, // Grow, shrink, basis
          maxWidth: { xs: '100%', sm: 'none' }, // Ensure full width on xs
          width: { xs: '100%', sm: 'auto' } // Apply xs prop within sx
        }}>
          <Typography variant="h5" gutterBottom>
            Subir Nuevo Documento
          </Typography>
          <DocumentForm
            onSubmit={(d: Omit<Document, 'id' | 'status'>) => { void handleAddDocumentSubmit(d); }}
          />
        </Box>
        <Box component="div" sx={{
          mt: 4, // This might be redundant with gap, but let's keep it for now
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flex: { xs: '0 0 100%', sm: '1 1 auto' }, // Grow, shrink, basis
          maxWidth: { xs: '100%', sm: 'none' }, // Ensure full width on xs
          width: { xs: '100%', sm: 'auto' } // Apply xs prop within sx
        }}>
          <Button variant="contained" onClick={handleOpenDataGridModal}>
            Ver Lista de Documentos
          </Button>
        </Box>
      </Box>

      {/* Editar */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Editar Documento</DialogTitle>
        <DialogContent>
          {editingDocument && (
            // Opción B: envolver para devolver void
            <DocumentForm
              onSubmit={(d: Document | Omit<Document, 'id' | 'status'>) => { void handleUpdateSubmit(d as Document); }}
              // Removed documentTypes prop
              initialData={editingDocument}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      {/* Ver */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="sm">
        <DialogTitle>Ver Documento: {viewingDocument?.name}</DialogTitle>
        <DialogContent>
          {viewingDocument && (
            <Box>
              <Typography variant="subtitle1">
                <strong>Nombre:</strong> {viewingDocument.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Tipo:</strong> {tipoDeDocumentoNombre}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Fecha de Creación:</strong> {fechaCreacionLocal}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Descripción:</strong> {viewingDocument.description}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Estado:</strong> {viewingDocument.status}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {viewingDocument.fileType.startsWith('image/') && (
                  <img
                    src={viewingDocument.fileContent}
                    alt={viewingDocument.fileName}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}

                {viewingDocument.fileType === 'application/pdf' && (
                  <iframe
                    src={viewingDocument.fileContent}
                    width="100%"
                    height="500px"
                    style={{ border: 'none' }}
                  />
                )}

                {!viewingDocument.fileType.startsWith('image/') &&
                  viewingDocument.fileType !== 'application/pdf' && (
                    <Typography>
                      Tipo de archivo no directamente visible.{' '}
                      <a href={viewingDocument.fileContent} download={viewingDocument.fileName}>
                        Descargar Archivo
                      </a>
                    </Typography>
                  )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Mensaje */}
      <ModalMensaje
        open={modalOpen}
        onClose={closeModal}
        resultado={modalType}
        mensajeModal={modalMessage}
      />

      {/* Modal de DataGrid */}
      <DocumentDataGridModal
        open={openDataGridModal}
        onClose={handleCloseDataGridModal}
        documents={documents}
        documentTypes={documentTypes}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onReactivate={handleReactivate}
      />
    </Container>
  );
}
