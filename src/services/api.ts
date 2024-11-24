import { config } from '../config/env';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function removeBackground(file: File): Promise<Blob> {
  if (!config.apiKey) {
    throw new Error('API key is not configured');
  }

  const formData = new FormData();
  formData.append('image_file', file);

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'X-Api-Key': config.apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to process image';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Use default error message if JSON parsing fails
    }
    throw new ApiError(response.status, errorMessage);
  }

  return response.blob();
}