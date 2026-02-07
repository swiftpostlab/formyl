'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Button from '@swiftpost/elysium/ui/base/Button';
import Stack from '@swiftpost/elysium/ui/base/Stack';

import {
  TokenClient,
  GoogleTokenResponse,
  isWindowWithGoogleAuthScriptClient,
} from './types';

const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';

interface Props {
  onSuccess: (accessToken: string) => void;
  onError?: (error: unknown) => void;
  disabled?: boolean;
}

const GoogleDriveAuthHandler: React.FC<Props> = ({
  onSuccess,
  onError,
  disabled,
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Use a ref for the token client since it's not "state" that triggers UI updates itself
  const tokenClientRef = useRef<TokenClient | null>(null);

  useEffect(() => {
    if (!isScriptLoaded) {
      return;
    }

    // 1. Use your Type Guard to safely access window.google
    if (isWindowWithGoogleAuthScriptClient(window)) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
          scope: SCOPE,
          callback: (response: GoogleTokenResponse) => {
            if (response.error) {
              console.error('Google Auth Error:', response);
              onError?.(response);
              return;
            }

            if (response.access_token) {
              onSuccess(response.access_token);
            }
          },
          error_callback: (err: unknown) => {
            console.error('GIS Error:', err);
            onError?.(err);
          },
        });

        tokenClientRef.current = client;
      } catch (err) {
        console.error('Failed to initialize Token Client:', err);
      }
    }
  }, [isScriptLoaded, onSuccess, onError]);

  const handleConnect = () => {
    const client = tokenClientRef.current;
    if (!client) {
      console.warn('Google Client not initialized');
      return;
    }

    // 2. Trigger the popup
    client.requestAccessToken({ prompt: '' });
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          setIsScriptLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Google script');
        }}
      />

      <Button
        onClick={handleConnect}
        disabled={!isScriptLoaded || disabled}
        variant="contained"
        color="primary"
      >
        {isScriptLoaded ? 'Connect Drive' : 'Loading...'}
      </Button>
    </Stack>
  );
};

export default GoogleDriveAuthHandler;
