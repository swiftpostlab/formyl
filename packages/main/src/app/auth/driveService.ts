const CONFIG_FILENAME = 'app_config.json';
const MULTIPART_BOUNDARY = 'foo_bar_77';

interface DriveFile {
  id: string;
  name: string;
}

/**
 * 1. Find the existing config file in the hidden AppData folder
 */
export const findConfigFile = async (
  accessToken: string,
): Promise<DriveFile | null> => {
  const query = `name = '${CONFIG_FILENAME}' and 'appDataFolder' in parents and trashed = false`;

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id, name)`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error searching for file: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;
  return (
      typeof data === 'object' &&
        data != null &&
        'files' in data &&
        Array.isArray(data.files) &&
        data.files.length > 0
    ) ?
      (data.files[0] as DriveFile)
    : null;
};

/**
 * 2. Upload (Create or Update) the Config File
 */
export const saveConfigFile = async (
  accessToken: string,
  content: object,
  existingFileId?: string,
): Promise<string> => {
  const metadata = {
    name: CONFIG_FILENAME,
    mimeType: 'application/json',
    parents: existingFileId ? undefined : ['appDataFolder'],
  };

  const body = [
    `--${MULTIPART_BOUNDARY}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    JSON.stringify(metadata),
    `--${MULTIPART_BOUNDARY}`,
    'Content-Type: application/json',
    '',
    JSON.stringify(content, null, 2),
    `--${MULTIPART_BOUNDARY}--`,
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
      'Content-Type': `multipart/related; boundary=${MULTIPART_BOUNDARY}`,
    },
    body: body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save file: ${errorText}`);
  }

  const result = (await response.json()) as DriveFile;
  return result.id;
};

/**
 * 3. Load the content of the Config File
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
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  return (await response.json()) as TData;
};
