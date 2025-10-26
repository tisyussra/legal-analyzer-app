// src/hooks/useAnalysis.js
import { useState, useMemo } from 'react';
import { categories } from '../categories';

// Helper function
const sanitizeTermForId = (term) => {
  return term.replace(/[^a-zA-Z0-9-_]/g, '-');
};

export const useAnalysis = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const analysisResults = useMemo(() => {
    if (!text.trim()) {
      return {
        counts: {},
        termContexts: {},
        highlightedHtml: '',
      };
    }

    const newCounts = {};
    const contexts = {};
    const allMatches = [];
    const termOccurrenceCount = {};

    Object.entries(categories).forEach(([categoryKey, categoryData]) => {
      newCounts[categoryKey] = {};
      if (!categoryData.patterns) return;

      categoryData.patterns.forEach(pattern => {
        const regex = new RegExp(pattern.source, pattern.flags);
        let match;
        while ((match = regex.exec(text)) !== null) {
          allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            category: categoryKey,
            termKey: match[0].toLowerCase()
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      });
    });

    allMatches.sort((a, b) => a.start - b.start);

    const filteredMatches = [];
    let lastEnd = -1;

    allMatches.forEach(match => {
      if (match.start >= lastEnd) {
        const key = match.termKey;
        if (!termOccurrenceCount[key]) {
          termOccurrenceCount[key] = 0;
          contexts[key] = [];
        }
        termOccurrenceCount[key]++;
        match.occurrenceNum = termOccurrenceCount[key];

        const contextStart = Math.max(0, match.start - 100);
        const contextEnd = Math.min(text.length, match.end + 100);
        contexts[key].push({
          occurrence: match.occurrenceNum,
          before: text.slice(contextStart, match.start),
          match: match.text,
          after: text.slice(match.end, contextEnd)
        });

        filteredMatches.push(match);
        lastEnd = match.end;
        newCounts[match.category][key] = (newCounts[match.category][key] || 0) + 1;
      }
    });

    let html = '';
    let lastIndex = 0;

    filteredMatches.forEach(match => {
      if (match.start > lastIndex) {
        html += text.slice(lastIndex, match.start);
      }
      const color = categories[match.category].color;
      const escapedText = match.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const anchorId = 'match-' + sanitizeTermForId(match.termKey) + '-' + match.occurrenceNum;
      html += `<mark id="${anchorId}" style="background-color: ${color}; padding: 2px 0; scroll-margin-top: 100px;">${escapedText}</mark>`;
      lastIndex = match.end;
    });

    if (lastIndex < text.length) {
      html += text.slice(lastIndex);
    }

    return {
      counts: newCounts,
      termContexts: contexts,
      highlightedHtml: html,
    };
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const fileType = file.name.split('.').pop().toLowerCase();
    try {
      if (fileType === 'txt') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setText(event.target.result);
          setIsLoading(false);
        };
        reader.readAsText(file);
      } else {
        alert('Please upload .txt files only');
        setIsLoading(false);
      }
    } catch (err) {
      alert('Error uploading file');
      setIsLoading(false);
    }
  };

  const downloadHighlighted = () => {
    const { counts, highlightedHtml } = analysisResults;
    const legendItems = Object.entries(categories).map(([key, cat]) =>
      `<div style="display:inline-block;margin-right:20px"><span style="display:inline-block;width:20px;height:20px;background-color:${cat.color};border:1px solid #ccc;margin-right:5px"></span>${cat.label}</div>`
    ).join('');

    let countsTable = '<h3>Citation Counts</h3><table style="width:100%;border-collapse:collapse;margin:20px 0"><thead><tr><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Category</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Term</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Count</th></tr></thead><tbody>';

    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
      if (entries.length > 0) {
        entries.forEach(([term, count], idx) => {
          countsTable += '<tr>';
          if (idx === 0) {
            countsTable += `<td rowspan="${entries.length}" style="border:1px solid #ddd;padding:8px;background-color:${cat.color};font-weight:bold">${cat.label}</td>`;
          }
          countsTable += `<td style="border:1px solid #ddd;padding:8px">${term}</td><td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold">${count}</td></tr>`;
        });
      }
    });
    countsTable += '</tbody></table>';

    const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Highlighted Legal Document</title></head><body style="font-family:Times New Roman,serif;line-height:1.8;max-width:900px;margin:40px auto;padding:20px"><h1>Legal Document Analysis</h1><div style="margin-bottom:30px;padding:20px;background:#f9fafb">${legendItems}</div>${countsTable}<hr style="margin:40px 0;border:2px solid #4a86e8"><h2>Highlighted Document</h2><div style="white-space:pre-wrap">${highlightedHtml}</div></body></html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'highlighted_document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const { counts } = analysisResults;
    let csvContent = 'Category,Term/Citation,Count\n';

    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
      entries.forEach(([term, count]) => {
        const escapedTerm = `"${term.replace(/"/g, '""')}"`;
        csvContent += `${cat.label},${escapedTerm},${count}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citation_statistics.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    text,
    handleTextChange,
    handleFileUpload,
    isLoading,
    ...analysisResults,
    downloadHighlighted,
    downloadCSV,
  };
};