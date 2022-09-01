import React from "react";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Style/MUI_style";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </UserProvider>
  );
}
export default App;
