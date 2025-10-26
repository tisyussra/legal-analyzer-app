// src/components/PreviewPanel.js
import React from 'react';
import { useAnalysisData } from './AnalysisContext';
import { categories } from '../categories';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PreviewPanel({ selectedTerm, setSelectedTerm, scrollToTerm, setCurrentOccurrence }) {
  const { counts, termContexts } = useAnalysisData();

  if (!selectedTerm || !termContexts[selectedTerm]) {
    return null;
  }

  const getTermCategory = (term) => {
    for (const [catKey, catData] of Object.entries(categories)) {
      if (counts[catKey] && counts[catKey][term]) {
        return { label: catData.label, color: catData.color };
      }
    }
    return { label: 'Unknown', color: '#cccccc' };
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

  const categoryInfo = getTermCategory(selectedTerm);

  return (
    <div id="preview-panel" className="bg-white rounded-lg shadow-lg p-6 mb-6" style={{ borderLeft: '6px solid ' + categoryInfo.color }}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigatePreviewTerm(-1)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          title="Previous term"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex-1 text-center">
          <div className="text-sm font-semibold text-white px-4 py-1 rounded-full inline-block mb-2" style={{ backgroundColor: categoryInfo.color }}>
            {categoryInfo.label}
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {selectedTerm}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {termContexts[selectedTerm].length} {termContexts[selectedTerm].length === 1 ? 'occurrence' : 'occurrences'} found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigatePreviewTerm(1)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Next term"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => setSelectedTerm(null)}
            className="p-2 hover:bg-red-100 rounded-full transition-colors"
            title="Close preview"
          >
            <X className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {termContexts[selectedTerm].map((ctx, idx) => (
          <button
            key={idx}
            onClick={() => scrollToTerm(selectedTerm, ctx.occurrence)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: categoryInfo.color }}>
                Occurrence #{ctx.occurrence}
              </span>
              <span className="text-xs text-gray-400">Click to jump to location</span>
            </div>
            <div className="text-sm leading-relaxed">
              <span className="text-gray-600">...{ctx.before}</span>
              <span className="font-bold text-indigo-700 px-1 py-0.5 rounded" style={{ backgroundColor: categoryInfo.color + '30' }}>
                {ctx.match}
              </span>
              <span className="text-gray-600">{ctx.after}...</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
