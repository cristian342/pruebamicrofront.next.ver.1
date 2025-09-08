import React, { Suspense } from 'react';
// Importa componentes de React Router DOM para manejar la navegación en la aplicación.
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DocumentTypeProvider } from '@/microfrontends/document-types/infrastructure/ui/context/DocumentTypeContext.tsx';
// Importa componentes de Material-UI para construir la interfaz de usuario.
import {
    AppBar, // Barra de aplicación superior
    Toolbar, // Contenedor para elementos dentro de la AppBar
    Typography, // Componente para mostrar texto con estilos de Material-UI
    Button, // Botón interactivo
    Box, // Componente utilitario para envolver elementos y aplicar estilos
    Container, // Limita el ancho del contenido para una mejor legibilidad
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from '../../theme.ts'; // Import custom theme

/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento (navegación) y la barra de navegación global.
 */
const DocumentsPage = React.lazy(() => import('@/microfrontends/documents/infrastructure/ui/pages/DocumentsPage.tsx').then(module => ({ default: module.default })));
const DocumentTypeManagementPage = React.lazy(() => import('@/microfrontends/document-types/infrastructure/ui/pages/DocumentTypeManagementPage.tsx'));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <DocumentTypeProvider>
                    <AppBar position="static">
                        <Toolbar sx={{ flexWrap: 'wrap' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.2rem' } }}
                            >
                                SPA de Gestión de Documentos
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                                <Button color="inherit" component={Link} to="/">
                                    Documentos
                                </Button>
                                <Button color="inherit" component={Link} to="/document-types">
                                    Tipos de Documento
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Container maxWidth="lg" sx={{ mt: 4 }}>
                            <Suspense fallback={<div>Cargando...</div>}>
                                <Routes>
                                    <Route path="/" element={<DocumentsPage />} />
                                    <Route path="/document-types" element={<DocumentTypeManagementPage />} />
                                </Routes>
                            </Suspense>
                        </Container>
                    </Box>
                </DocumentTypeProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App; // Exporta el componente App para que pueda ser utilizado en main.tsx
