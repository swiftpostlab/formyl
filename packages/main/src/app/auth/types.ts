export interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  error?: unknown;
  error_description?: string;
  error_uri?: string;
}

export interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GoogleTokenResponse) => void;
  error_callback?: (error: unknown) => void;
}

export interface TokenClient {
  requestAccessToken: (overrideConfig?: {
    prompt?: string;
    login_hint?: string;
  }) => void;
}

export interface GoogleAuthScriptClient {
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (config: TokenClientConfig) => TokenClient;
        hasGrantedAllScopes: (
          tokenResponse: GoogleTokenResponse,
          firstScope: string,
          ...restScopes: string[]
        ) => boolean;
      };
    };
  };
}

export const isWindowWithGoogleAuthScriptClient = (
  window: Window,
): window is Window & GoogleAuthScriptClient => {
  return (
    'google' in window &&
    typeof window.google === 'object' &&
    window.google != null &&
    'accounts' in window.google &&
    typeof window.google.accounts === 'object' &&
    window.google.accounts != null &&
    'oauth2' in window.google.accounts &&
    typeof window.google.accounts.oauth2 === 'object' &&
    window.google.accounts.oauth2 != null &&
    'initTokenClient' in window.google.accounts.oauth2
  );
};

export const googleAuthErrorTypes = {
  /**
   * The popup window failed to open.
   * Usually caused by a browser popup blocker or the action not being
   * triggered by a direct user gesture (click).
   */
  POPUP_FAILED_TO_OPEN: 'popup_failed_to_open',

  /**
   * The user manually closed the popup window before completing the sign-in flow.
   */
  POPUP_CLOSED: 'popup_closed',

  /**
   * Added: The user clicked "Cancel" or "Deny" in the consent screen.
   */
  ACCESS_DENIED: 'access_denied',

  /**
   * The Google library failed to initialize or load the iframe required for the popup.
   * Often happens due to network issues or restrictive Content Security Policy (CSP).
   */
  UNKNOWN: 'unknown',
} as const;

export type GoogleAuthErrorType =
  (typeof googleAuthErrorTypes)[keyof typeof googleAuthErrorTypes];

export interface GoogleAuthError {
  type: GoogleAuthErrorType;
  message?: string;
  stack?: string;
}

export const isGoogleAuthError = (error: unknown): error is GoogleAuthError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'type' in error &&
    typeof error.type === 'string' &&
    Object.values(googleAuthErrorTypes).includes(
      error.type as GoogleAuthErrorType,
    )
  );
};
