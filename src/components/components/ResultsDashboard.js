// src/components/ResultsDashboard.js
import React from 'react';
import { useAnalysisData } from './AnalysisContext';
import { categories } from '../categories';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ResultsDashboard({
  setSelectedTerm,
  currentOccurrence,
  setCurrentOccurrence,
  scrollToTerm
}) {
  const { counts, termContexts } = useAnalysisData();

  const navigateTerm = (termKey, direction, totalCount) => {
    const current = currentOccurrence[termKey] || 1;
    let next = current + direction;
    if (next < 1) next = totalCount;
    if (next > totalCount) next = 1;
    scrollToTerm(termKey, next);
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
    setCurrentOccurrence(prev => ({ ...prev, [term]: 1 }));
    setTimeout(() => {
      const panel = document.getElementById('preview-panel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Object.entries(categories).map(([key, cat]) => {
        const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
        return (
          <div key={key} className="bg-white rounded-lg shadow p-4" style={{ borderLeft: '4px solid ' + cat.color }}>
            <h3 className="font-bold mb-3">{cat.label}</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {entries.length > 0 ? entries.map(([term, count]) => {
                const current = currentOccurrence[term] || 1;

                return (
                  <div key={term} className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded border border-gray-200">
                    <button
                      onClick={() => handleTermClick(term)}
                      className="text-indigo-600 hover:underline text-left font-medium text-sm break-words"
                      style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                    >
                      {term}
                    </button>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">
                        {count} {count === 1 ? 'occurrence' : 'occurrences'}
                      </span>
                      {count > 1 && (
                        <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                          <button
                            onClick={() => navigateTerm(term, -1, count)}
                            className="hover:bg-gray-200 rounded p-0.5"
                            title="Previous occurrence"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold min-w-[30px] text-center">
                            {current}/{count}
                          </span>
                          <button
                            onClick={() => navigateTerm(term, 1, count)}
                            className="hover:bg-gray-200 rounded p-0.5"
                            title="Next occurrence"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }) : (
                <p className="text-gray-400 text-sm">None found</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
