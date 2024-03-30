import React from "react";

import NewRouter from "./routes";
import ThemeProvider from "./theme";
import { AppThemeProvider } from "./context/AppThemeContext";
import { AppSearchProvider } from "./context/AppSearchContext";

function App() {
  return (
    <AppThemeProvider>
      <ThemeProvider>
        <NewRouter />
      </ThemeProvider>
    </AppThemeProvider>
  );
}

export default App;
