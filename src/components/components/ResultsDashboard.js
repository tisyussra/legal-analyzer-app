// src/components/ResultsDashboard.js
import React from 'react';
import { useAnalysisData } from '../context/AnalysisContext';
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
                const context = termContexts[term] && termContexts[term][0]
                  ? '...' + termContexts[term][0].before.slice(-40) + ' '
                  : '';

                return (
                  <div key={term} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center gap-2">
                      <button
                        onClick={() => handleTermClick(term)}
                        className="text-indigo-600 hover:underline truncate flex-1 text-left"
                      >
                        {context && (
                          <span className="text-gray-500 text-xs">{context}</span>
                        )}
                        <span className="font-semibold">{term}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        {count > 1 && (
                          <div className="flex items-center gap-1">
                            <button onClick={() => navigateTerm(term, -1, count)} className="p-1 hover:bg-gray-200 rounded">
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <span className="text-xs min-w-[30px] text-center">{current}/{count}</span>
                            <button onClick={() => navigateTerm(term, 1, count)} className="p-1 hover:bg-gray-200 rounded">
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        {count === 1 && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold">{count}</span>
t                     )}
                      </div>
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