import { useState, useCallback, useEffect, useRef } from 'react';
import {
  findConfigFile,
  loadConfigFile,
  saveConfigFile,
  TokenExpiredError,
} from '../driveService';

// 1. Define your App's Data Shape (Replace with your actual config interface)
export interface AppData {
  theme: 'light' | 'dark';
  lastActive: number;
  // ... add your real keys here
}

// 2. Define the Default Data for new users
const DEFAULT_DATA: AppData = {
  theme: 'light',
  lastActive: Date.now(),
};

interface UseDriveSyncReturn {
  data: AppData | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saveData: (newData: AppData) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useDriveSync = (
  accessToken: string | undefined | null,
  onSessionExpired: () => void,
): UseDriveSyncReturn => {
  const [data, setData] = useState<AppData | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent double-init in Strict Mode
  const initAttempted = useRef(false);

  // 1. Initialization Logic (Find -> Load OR Create)
  const initialize = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step A: Search for existing file
      const existingFile = await findConfigFile(accessToken);

      if (existingFile) {
        // Step B1: Found it? Load it.
        setFileId(existingFile.id);
        const content = await loadConfigFile<AppData>(
          accessToken,
          existingFile.id,
        );
        setData(content);
      } else {
        // Step B2: Not found? Create it.
        console.log('No config file found. Creating new one...');
        const newId = await saveConfigFile(accessToken, DEFAULT_DATA);
        setFileId(newId);
        setData(DEFAULT_DATA);
      }
    } catch (err) {
      console.error('Sync Init Error:', err);
      if (err instanceof TokenExpiredError) {
        onSessionExpired();
      } else {
        setError(
          err instanceof Error ? err.message : 'Failed to synchronize data',
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, onSessionExpired]);

  // 2. Trigger Init on Mount (if token exists)
  useEffect(() => {
    if (accessToken && !initAttempted.current && !data) {
      initAttempted.current = true;
      void initialize();
    }
  }, [accessToken, data, initialize]);

  // 3. Manual Save Function
  const saveData = useCallback(
    async (newData: AppData) => {
      if (!accessToken) {
        return;
      }

      // Optimistic UI Update: Update local state immediately
      setData(newData);
      setIsSaving(true);
      setError(null);

      try {
        // Use the fileId we found/created during init
        await saveConfigFile(accessToken, newData, fileId ?? undefined);
      } catch (err) {
        console.error('Save Error:', err);
        if (err instanceof TokenExpiredError) {
          onSessionExpired();
        } else {
          setError('Failed to save changes');
          // Optional: Revert optimistic update here if critical
        }
      } finally {
        setIsSaving(false);
      }
    },
    [accessToken, fileId, onSessionExpired],
  );

  return {
    data,
    isLoading,
    isSaving,
    error,
    saveData,
    refresh: initialize,
  };
};
