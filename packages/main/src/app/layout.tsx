import type { Metadata } from 'next';
import './globals.css';
import AppRouterCacheProvider from '@swiftpost/elysium/core/AppRouterCacheProvider';
import ThemeProvider from '@swiftpost/elysium/core/ThemeProvider';
import { theme, mainFont } from '@swiftpost/elysium/themes/gamut';

export const metadata: Metadata = {
  title: 'SwiftPost Template',
  description: 'Batteries included website template',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={mainFont.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
