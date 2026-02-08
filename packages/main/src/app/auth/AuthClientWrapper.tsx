'use client';

import { useState } from 'react';
import Stack from '@swiftpost/elysium/ui/base/Stack';
import Text from '@swiftpost/elysium/ui/base/Text';
import Button from '@swiftpost/elysium/ui/base/Button';
import { staticTheme } from '@/styles/staticTheme';

import GoogleDriveAuthHandler from './GoogleDriveAuthHandler';
import { isGoogleAuthError, googleAuthErrorTypes } from './types';
import { useSessionStorageValue } from '@/features/storage/hooks/useSessionStorageValue';
import { sessionStorageKeys } from '@/features/storage/sessionStorage';
import { useDriveSync, AppData } from './hooks/useDriveSync';

const ERROR_MESSAGES = {
  [googleAuthErrorTypes.POPUP_FAILED_TO_OPEN]:
    'The popup was blocked. Please allow popups for this site.',
  [googleAuthErrorTypes.POPUP_CLOSED]: 'Login cancelled.',
  [googleAuthErrorTypes.ACCESS_DENIED]:
    'Access denied. We need permission to save your data.',
  [googleAuthErrorTypes.UNKNOWN]: 'An unknown error occurred.',
} as const;

const AuthenticatedView = ({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) => {
  const {
    data,
    isLoading,
    isSaving,
    error: syncError,
    saveData,
  } = useDriveSync(token, onLogout);

  const handleUpdateTimestamp = () => {
    if (!data) {
      return;
    }

    // Create new data object
    const newData: AppData = {
      ...data,
      lastActive: Date.now(),
      // Toggle theme just to show another field changing
      theme: data.theme === 'light' ? 'dark' : 'light',
    };

    void saveData(newData);
  };

  if (isLoading) {
    return <Text>Loading configuration from Drive...</Text>;
  }

  return (
    <Stack spacing={2} padding={2} border="1px solid #ccc" borderRadius={4}>
      <Text fontSize={20} fontWeight="bold">
        Drive Connected ✅
      </Text>

      {syncError && <Text color="red">Sync Error: {syncError}</Text>}

      <Stack spacing={1}>
        <Text>
          <strong>Current Data (from Drive):</strong>
        </Text>
        <Text
          component="pre"
          sx={{
            background: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </Text>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleUpdateTimestamp}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Update Timestamp & Theme'}
        </Button>

        <Button variant="outlined" onClick={onLogout} color="error">
          Disconnect
        </Button>
      </Stack>

      {isSaving && (
        <Text fontSize={12} color="gray">
          Syncing to Google Drive...
        </Text>
      )}
    </Stack>
  );
};

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
                const displayMessage = e.message ?? ERROR_MESSAGES[e.type];

                setErrorString(displayMessage);
                return;
              }

              console.log('Unknown error:', e);
              setErrorString('Unknown error, please try again.');
            }}
          />
        </>
      : <AuthenticatedView
          token={token}
          onLogout={() => {
            setToken(null);
            setErrorString(undefined);
          }}
        />
      }
    </>
  );
};

export default AuthClientWrapper;
