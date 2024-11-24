import React from 'react';
import { Loader2 } from 'lucide-react';

export function ProcessingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-gray-700 font-medium">Removing background...</p>
      </div>
    </div>
  );
}