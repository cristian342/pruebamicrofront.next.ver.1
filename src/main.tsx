import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './infrastructure/ui/App.tsx'; // Importa el componente principal de la aplicación
import { CssBaseline } from '@mui/material'; // Importa componentes y funciones de Material-UI
import './types/dayjs-timezone.d.ts'; // Importa las definiciones de tipos para dayjs timezone

// Punto de entrada principal de la aplicación React.
// Renderiza el componente 'App' dentro del elemento HTML con el ID 'root'.
ReactDOM.createRoot(document.getElementById('root')!).render(
    // React.StrictMode es una herramienta para destacar problemas potenciales en una aplicación.
    // Activa comprobaciones y advertencias adicionales durante el desarrollo.
    <React.StrictMode>
        {/* CssBaseline: Un componente de Material-UI que aplica una base de estilos CSS consistente
            en todos los navegadores. Ayuda a eliminar inconsistencias de estilo predeterminadas. */}
        <CssBaseline />
        {/* App: El componente principal de la aplicación que contiene la estructura, el enrutamiento y las páginas. */}
        <App />
    </React.StrictMode>
);
