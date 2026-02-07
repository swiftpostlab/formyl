import React from 'react';

import {
  AppRouterCacheProvider as MUIAppRouterCacheProvider,
  AppRouterCacheProviderProps,
} from '@mui/material-nextjs/v15-appRouter';

const AppRouterCacheProvider: React.FC<AppRouterCacheProviderProps> = ({
  children,
  options,
  ...otherProps
}) => {
  return (
    <MUIAppRouterCacheProvider
      options={{ key: 'elysium', ...options }}
      {...otherProps}
    >
      {children}
    </MUIAppRouterCacheProvider>
  );
};

export default AppRouterCacheProvider;
