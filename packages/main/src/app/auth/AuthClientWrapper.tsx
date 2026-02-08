'use client';

import GoogleDriveAuthHandler from './GoogleDriveAuthHandler';
import { isGoogleAuthError } from './types';
import Stack from '@swiftpost/elysium/ui/base/Stack';
import { staticTheme } from '@/styles/staticTheme';
import Text from '@swiftpost/elysium/ui/base/Text';
import { useState } from 'react';
import { useSessionStorageValue } from '@/features/storage/hooks/useSessionStorageValue';
import { sessionStorageKeys } from '@/features/storage/sessionStorage';

const AuthClientWrapper = () => {
  const [errorString, setErrorString] = useState<string>();
  const { value: token, setValue: setToken } = useSessionStorageValue(
    sessionStorageKeys.DRIVE_ACCESS_TOKEN,
  );

  return (
    <>
      {token == null ?
        <>
          <Stack marginBottom={staticTheme.spacing(2)}>
            <Text>You need to allow access to your Google Drive</Text>
            <Text fontSize={staticTheme.spacing(1.33)}>
              {
                "This is based on Google's third-party cookies until Google updates it."
              }
            </Text>
            <Text color="red">{errorString}</Text>
          </Stack>
          <GoogleDriveAuthHandler
            onSuccess={(token) => {
              setToken(token);
              setErrorString(undefined);
            }}
            onError={(e) => {
              if (isGoogleAuthError(e)) {
                setErrorString(e.message ?? 'Unknown error, please try again.');
                return;
              }

              console.log('Unknown error:', e);
              setErrorString('Unknown error, please try again.');
            }}
          />
        </>
      : <Text>Access succeeded</Text>}
    </>
  );
};

export default AuthClientWrapper;
