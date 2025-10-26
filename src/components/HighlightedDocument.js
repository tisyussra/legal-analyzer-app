// src/components/HighlightedDocument.js
import React from 'react';
import { useAnalysisData } from '../context/AnalysisContext';

export default function HighlightedDocument() {
  const { highlightedHtml } = useAnalysisData();

  if (!highlightedHtml) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Highlighted Document</h2>
      <div
        className="prose max-w-none whitespace-pre-wrap font-serif leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}