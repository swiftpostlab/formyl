'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { staticThemeOptions } from './static';

export const theme = createTheme({
  ...staticThemeOptions,
});

export const mainFont = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
