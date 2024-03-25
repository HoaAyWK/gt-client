import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
// material
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

//
import { useAppTheme } from '../context/AppThemeContext';
//
import { lightPalette, darkPalette } from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};


export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const darkTheme = useAppTheme();

  useEffect(() => {
    if (darkTheme === null) {
      document.body.classList.add(prefersDarkMode ? 'dark' : 'light');
    } else if (darkTheme === false) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [darkTheme, prefersDarkMode]);

  const theme = useMemo(() => {
    if (darkTheme === null) {
      return createTheme({
        palette: prefersDarkMode ? darkPalette : lightPalette,
        shape: { borderRadius: 8 },
        typography,
        shadows: shadows(prefersDarkMode),
        customShadows: customShadows(prefersDarkMode),
      });
    }

    if (darkTheme) {
      return createTheme({
        palette: darkPalette,
        shape: { borderRadius: 8 },
        typography,
        shadows: shadows(true),
        customShadows: customShadows(true)
      })
    } else if (!darkTheme) {
      return createTheme({
        palette: lightPalette,
        shape: { borderRadius: 8 },
        typography,
        shadows: shadows(false),
        customShadows: customShadows(false)
      });
    }

    return createTheme({
      palette: lightPalette,
      shape: { borderRadius: 8 },
      typography,
      shadows: shadows(false),
      customShadows: customShadows(false)
    });
  }, [prefersDarkMode, darkTheme]);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
