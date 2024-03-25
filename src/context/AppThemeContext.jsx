import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks';


const AppThemeContext = React.createContext();
const AppThemeUpdateContext = React.createContext();

export const useAppTheme = () => {
  return useContext(AppThemeContext);
};

export const useAppThemeUpdate = () => {
  return useContext(AppThemeUpdateContext);
};

export const AppThemeProvider = ({ children }) => {
  const [modeValueStored, setModeValueStored] = useLocalStorage('darkMode', null);

  const setLightMode = () => {
    setModeValueStored(false);
  };

  const setDarkMode = () => {
    setModeValueStored(true);
  }

  return (
    <AppThemeContext.Provider value={modeValueStored}>
      <AppThemeUpdateContext.Provider value={{setLightMode, setDarkMode}}>
        {children}
      </AppThemeUpdateContext.Provider>
    </AppThemeContext.Provider>
  );
};
