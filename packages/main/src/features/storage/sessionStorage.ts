export const sessionStorageKeys = {
  /** Google drive access token */
  DRIVE_ACCESS_TOKEN: 'drive_access_token',
};

export type SessionStorageKey =
  (typeof sessionStorageKeys)[keyof typeof sessionStorageKeys];

export const saveToSessionStorage = (key: SessionStorageKey, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
};

export const loadFromSessionStorage = (key: SessionStorageKey) => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error('Error loading from session storage:', error);
    return null;
  }
};
