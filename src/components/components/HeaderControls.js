// src/components/HeaderControls.js
import React from 'react';
import { useAnalysisData } from '../context/AnalysisContext';
import { categories } from '../categories';
import { Upload, Download } from 'lucide-react';

export default function HeaderControls() {
  const {
    isLoading,
    handleFileUpload,
    highlightedHtml,
    downloadHighlighted,
    downloadCSV
  } = useAnalysisData();

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Second Amendment Opinion Analyzer</h1>
      <p className="text-gray-600 mb-6">Upload or paste a case opinion to highlight key terms</p>

      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700">
          <Upload className="w-5 h-5" />
          <span>{isLoading ? 'Processing...' : 'Upload Document'}</span>
          <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" disabled={isLoading} />
        </label>
        {highlightedHtml && (
          <>
            <button onClick={downloadHighlighted} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-5 h-5" />
              Download HTML
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Download CSV
            </button>
          </>
        )}
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded border" style={{ backgroundColor: cat.color }}></div>
              <span className="text-sm text-gray-700">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}