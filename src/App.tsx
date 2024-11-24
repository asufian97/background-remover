import React from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { Download, Wand2 } from 'lucide-react';
import { useImageProcessing } from './hooks/useImageProcessing';
import { config } from './config/env';

function App() {
  const {
    originalImage,
    processedImage,
    isProcessing,
    error,
    processImage,
    reset
  } = useImageProcessing();

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'processed-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!config.apiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700">
            Please configure your Remove.bg API key by setting the VITE_REMOVE_BG_API_KEY
            environment variable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wand2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Background Remover</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your image and our AI will automatically remove the background, 
            giving you a clean, professional result in seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!processedImage && (
            <ImageUploader 
              onImageSelect={processImage}
              isProcessing={isProcessing}
            />
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {(originalImage || processedImage) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {originalImage && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-700">Original Image</h3>
                  <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              {processedImage && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-700">Processed Image</h3>
                  <div className="aspect-square rounded-lg overflow-hidden bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABDSURBVDiNY/z//z8DJYCJgUIw8AawIHN+//6NVR7GxsZGlgEsyJxfv35hlQcBFhYWygwY9cLgC4MRmw+IzkjkGgAAWyIXebvvmCEAAAAASUVORK5CYII=')] shadow-lg">
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Download className="w-5 h-5" />
                    Download Image
                  </button>
                </div>
              )}
            </div>
          )}

          {processedImage && (
            <button
              onClick={reset}
              className="mt-8 text-blue-600 hover:text-blue-700 font-medium"
            >
              Process another image
            </button>
          )}
        </div>
      </div>

      {isProcessing && <ProcessingOverlay />}
    </div>
  );
}

export default App;