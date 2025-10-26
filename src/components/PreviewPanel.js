// src/components/PreviewPanel.js
import React from 'react';
import { useAnalysisData } from '../context/AnalysisContext';
import { categories } from '../categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PreviewPanel({ selectedTerm, setSelectedTerm, scrollToTerm, setCurrentOccurrence }) {
  const { counts, termContexts } = useAnalysisData();

  if (!selectedTerm || !termContexts[selectedTerm]) {
    return null;
  }

  const getTermCategory = (term) => {
    for (const [catKey, catData] of Object.entries(categories)) {
      if (counts[catKey] && counts[catKey][term.toLowerCase()]) {
        return catData.label;
      }
    }
    return 'Unknown';
  };

  const navigatePreviewTerm = (direction) => {
    const allTerms = Object.keys(termContexts).filter(key => termContexts[key] && termContexts[key].length > 0);
    if (allTerms.length === 0) return;

    const currentIndex = allTerms.indexOf(selectedTerm);
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = allTerms.length - 1;
    if (nextIndex >= allTerms.length) nextIndex = 0;

    const newSelectedTerm = allTerms[nextIndex];
    setSelectedTerm(newSelectedTerm);
    setCurrentOccurrence(prev => ({ ...prev, [newSelectedTerm]: 1 }));
  };

  return (
    <div id="preview-panel" className="bg-white rounded-lg shadow-lg p-6 mb-6 border-4 border-indigo-500">
      <div className="text-center mb-2">
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {getTermCategory(selectedTerm)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigatePreviewTerm(-1)}
          className="p-2 hover:bg-gray-200 rounded-full"
          title="Previous term"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-center flex-1">
          References to: {selectedTerm} ({termContexts[selectedTerm].length})
        </h3>
        <button
          onClick={() => navigatePreviewTerm(1)}
          className="p-2 hover:bg-gray-200 rounded-full"
          title="Next term"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button onClick={() => setSelectedTerm(null)} className="text-2xl font-bold ml-2">✕</button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {termContexts[selectedTerm].map((ctx, idx) => (
          <button
            key={idx}
            onClick={() => scrollToTerm(selectedTerm, ctx.occurrence)}
            className="w-full text-left p-3 bg-gray-50 hover:bg-indigo-50 rounded border hover:border-indigo-300"
          >
            <div className="text-xs text-gray-500 mb-1 font-semibold">#{ctx.occurrence}</div>
            <div className="text-sm">
              <span className="text-gray-600">...{ctx.before}</span>
              <span className="font-bold text-indigo-700 bg-indigo-100 px-1">{ctx.match}</span>
              <span className="text-gray-600">{ctx.after}...</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}