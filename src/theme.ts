import { createTheme } from '@mui/material/styles';

// Define the color palette based on user preferences (blue, yellow, white)
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc400', // A vibrant yellow
    },
    secondary: {
      main: '#1976d2', // A standard Material-UI blue
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff',
    },
    text: {
      primary: '#212121', // Dark grey for primary text
      secondary: '#757575', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif', // Using Roboto as the primary font
    // You can add more typography variants here if needed
  },
  // You can add other Material-UI theme customizations here, e.g., components, spacing, breakpoints
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffc400', // Ensure AppBar uses the new primary yellow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Example: Customize button styles if needed
        },
      },
    },
  },
});

export default theme;
