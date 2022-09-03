import React from "react";
import Application from "./components/Application";
import { AuthProvider } from "./providers/AuthContext";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Style/MUI_style";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;
