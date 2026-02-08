const CONFIG_FILENAME = 'app_config.json';

// Custom error to help UI detect when to re-authenticate
export class TokenExpiredError extends Error {
  constructor() {
    super('Google Drive access token expired');
    this.name = 'TokenExpiredError';
  }
}

interface DriveFile {
  id: string;
  name: string;
}

interface DriveListResponse {
  files: DriveFile[];
}

/**
 * Type Guard to ensure API response is valid
 */
const isValidDriveListResponse = (data: unknown): data is DriveListResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'files' in data &&
    Array.isArray((data as { files: unknown }).files)
  );
};

/**
 * 1. Find the existing config file
 */
export const findConfigFile = async (
  accessToken: string,
): Promise<DriveFile | null> => {
  const query = `name = '${CONFIG_FILENAME}' and 'appDataFolder' in parents and trashed = false`;

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&spaces=appDataFolder&fields=files(id, name)`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new TokenExpiredError();
    }
    throw new Error(`Error searching for file: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;

  if (isValidDriveListResponse(data) && data.files.length > 0) {
    return data.files[0];
  }

  return null;
};

/**
 * 2. Upload (Create or Update)
 */
export const saveConfigFile = async (
  accessToken: string,
  content: object,
  existingFileId?: string,
): Promise<string> => {
  // Generate a random boundary string to avoid collisions with data
  const boundary = `swiftpost_boundary_${Date.now().toString(36)}`;

  const metadata = {
    name: CONFIG_FILENAME,
    mimeType: 'application/json',
    parents: existingFileId ? undefined : ['appDataFolder'],
  };

  // Construct the body strictly following RFC 1341
  const body = [
    `--${boundary}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    JSON.stringify(metadata),
    `--${boundary}`,
    'Content-Type: application/json',
    '',
    JSON.stringify(content, null, 2),
    `--${boundary}--`,
  ].join('\r\n');

  const method = existingFileId ? 'PATCH' : 'POST';
  const url =
    existingFileId ?
      `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=multipart`
    : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: body,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new TokenExpiredError();
    }
    const errorText = await response.text();
    throw new Error(`Failed to save file: ${errorText}`);
  }

  const result = (await response.json()) as DriveFile;
  return result.id;
};

/**
 * 3. Load content
 */
export const loadConfigFile = async <TData = unknown>(
  accessToken: string,
  fileId: string,
): Promise<TData> => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new TokenExpiredError();
    }
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  return (await response.json()) as TData;
};
