import { useState } from 'react';
import { removeBackground, ApiError } from '../services/api';

interface ProcessingState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}

export function useImageProcessing() {
  const [state, setState] = useState<ProcessingState>({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    error: null,
  });

  const processImage = async (file: File) => {
    setState(prev => ({
      ...prev,
      error: null,
      isProcessing: true,
      originalImage: URL.createObjectURL(file),
    }));

    try {
      const processedBlob = await removeBackground(file);
      setState(prev => ({
        ...prev,
        processedImage: URL.createObjectURL(processedBlob),
        isProcessing: false,
      }));
    } catch (err) {
      let errorMessage = 'Failed to process image. Please try again.';
      
      if (err instanceof ApiError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
      }));
    }
  };

  const reset = () => {
    setState({
      originalImage: null,
      processedImage: null,
      isProcessing: false,
      error: null,
    });
  };

  return {
    ...state,
    processImage,
    reset,
  };
}