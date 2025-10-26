// src/App.js
import React, { useState } from 'react';
import { useAnalysisData } from './components/AnalysisContext';
import HeaderControls from './components/HeaderControls';
import PreviewPanel from './components/PreviewPanel';
import ResultsDashboard from './components/ResultsDashboard';
import HighlightedDocument from './components/HighlightedDocument';

// Helper function
const sanitizeTermForId = (term) => {
  return term.replace(/[^a-zA-Z0-9-_]/g, '-');
};

export default function App() {
  const { text, handleTextChange, highlightedHtml } = useAnalysisData();
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [currentOccurrence, setCurrentOccurrence] = useState({});

  const scrollToTerm = (termKey, occurrenceNum) => {
    const anchorId = 'match-' + sanitizeTermForId(termKey) + '-' + occurrenceNum;
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentOccurrence(prev => ({ ...prev, [termKey]: occurrenceNum }));
      // Add highlight pulse
      element.style.outline = '3px solid #3b82f6';
      setTimeout(() => {
        element.style.outline = '';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <HeaderControls />
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste case text here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm"
          />
        </div>

        {highlightedHtml && (
          <>
            <PreviewPanel
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              scrollToTerm={scrollToTerm}
              setCurrentOccurrence={setCurrentOccurrence}
            />
            <ResultsDashboard
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              currentOccurrence={currentOccurrence}
              setCurrentOccurrence={setCurrentOccurrence}
              scrollToTerm={scrollToTerm}
            />
            <HighlightedDocument />
          </>
        )}
      </div>
    </div>
  );
}