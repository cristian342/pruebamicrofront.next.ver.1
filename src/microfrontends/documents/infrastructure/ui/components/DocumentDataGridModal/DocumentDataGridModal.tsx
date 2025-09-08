import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetter, // CORRECTED TYPE
  GridActionsCellItemProps, // CORRECTED TYPE
  GridRenderCellParams, // Import GridRenderCellParams for renderCell
  GridTreeNodeWithRender, // Import GridTreeNodeWithRender
} from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import type { Document } from '../../../../domain/models/Document.js';
import type { DocumentType } from '../../../../../document-types/domain/models/DocumentType.js';
interface DocumentDataGridModalProps {
  open: boolean;
  onClose: () => void;
  documents: Document[];
  documentTypes: DocumentType[];
  onEdit: (doc: Document) => void;
  onView: (doc: Document) => void;
  onDelete: (id: string) => void;
  onDownload: (doc: Document) => void;
  onReactivate: (id: string) => void;
}

export function DocumentDataGridModal({
  open,
  onClose,
  documents,
  documentTypes,
  onEdit,
  onView,
  onDelete,
  onDownload,
  onReactivate,
}: DocumentDataGridModalProps) {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    {
      field: 'documentTypeId',
      headerName: 'Tipo',
      width: 150,
      valueGetter: (params: GridRenderCellParams<Document, any, string>) => {
        const docType = documentTypes.find(dt => String(dt.id) === String(params.value));
        return docType ? docType.name : 'Desconocido';
      },
    },
    { field: 'description', headerName: 'Descripción', width: 200 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 120,
      renderCell: (params: GridRenderCellParams<Document, 'status'>) => (
        <Typography
          variant="body2"
          color={String(params.value) === 'active' ? 'green' : String(params.value) === 'inactive' ? 'red' : 'gray'}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'creationDate',
      headerName: 'Fecha Creación',
      width: 180,
      valueGetter: (params: GridRenderCellParams<Document, any, string>) => new Date(params.value as string).toLocaleDateString('es-ES'),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params: GridRenderCellParams<Document>) => {
        const document = documents.find(doc => doc.id === params.row.id);
        if (!document) return null;

        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" size="small" onClick={() => onView(document)}>
              Ver
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => onEdit(document)}>
              Editar
            </Button>
            {document.status === 'active' ? (
              <Button variant="contained" color="error" size="small" onClick={() => onDelete(document.id)}>
                Eliminar
              </Button>
            ) : (
              <Button variant="contained" color="success" size="small" onClick={() => onReactivate(document.id)}>
                Reactivar
              </Button>
            )}
            <Button variant="contained" color="info" size="small" onClick={() => onDownload(document)}>
              Descargar
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Lista de Documentos</DialogTitle>
      <DialogContent sx={{ height: 500 }}>
        <DataGrid
          rows={documents}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          getRowId={(row: Document) => row.id}
          sx={{ width: '100%' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
