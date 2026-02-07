'use client';

import {
  ThemeProvider as MUIThemeProvider,
  ThemeProviderProps,
} from '@mui/material/styles';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
