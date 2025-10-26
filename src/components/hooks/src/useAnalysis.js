// src/hooks/useAnalysis.js
import { useState, useMemo } from 'react';
import { categories } from '../categories'; // Import the categories

// --- NEW ---
// Regex to find the start of the judicial opinion
const JUDGE_LINE_REGEX = /(?:\bBefore:.*Judges)|(?:\bPER CURIAM)|(?:^\s*Judges:)/im;

// Helper function (unchanged)
const sanitizeTermForId = (term) => {
  return term.replace(/[^a-zA-Z0-9-_]/g, '-');
};

// --- NEW HELPER FUNCTION ---
/**
 * Performs a split analysis on the text.
 * - Analyzes "amicus" patterns above the judge line.
 * - Analyzes all other patterns below the judge line.
 * @param {string} fullText - The entire document text.
 * @param {object} categories - The imported categories object.
 * @returns {Array} - A single, unsorted array of all match objects.
 */
const getSplitAnalysis = (fullText, categories) => {
  let textAbove = fullText;
  let textBelow = "";
  let splitIndex = 0;
  const allMatches = [];

  // 1. Find the judge line and split the text
  const judgeLineMatch = JUDGE_LINE_REGEX.exec(fullText);
  if (judgeLineMatch) {
    splitIndex = judgeLineMatch.index;
    textAbove = fullText.substring(0, splitIndex);
    textBelow = fullText.substring(splitIndex);
  } else {
    console.warn("No judge line found. Analyzing all text as 'below'.");
    textBelow = fullText; // Default: all text is "below"
  }

  // 2. Pass 1: Analyze "above" text for Amicus briefs ONLY
  const amicusCategory = categories.amicus;
  if (amicusCategory && amicusCategory.patterns) {
    amicusCategory.patterns.forEach(pattern => {
      const regex = new RegExp(pattern.source, pattern.flags); // Re-create regex to reset state
      let match;
      while ((match = regex.exec(textAbove)) !== null) {
        allMatches.push({
          start: match.index, // Index is correct relative to textAbove
          end: match.index + match[0].length,
          text: match[0],
          category: 'amicus',
          termKey: match[0].toLowerCase()
        });
        // Prevent infinite loops
        if (match.index === regex.lastIndex) regex.lastIndex++;
      }
    });
  }

  // 3. Pass 2: Analyze "below" text for ALL OTHER categories
  Object.entries(categories).forEach(([categoryKey, categoryData]) => {
    // Skip amicus (already done) or empty patterns
    if (categoryKey === 'amicus' || !categoryData.patterns) return;

    categoryData.patterns.forEach(pattern => {
      const regex = new RegExp(pattern.source, pattern.flags); // Re-create regex
      let match;
      while ((match = regex.exec(textBelow)) !== null) {
        // *** CRITICAL: Adjust index by the split point ***
        const adjustedStart = match.index + splitIndex;
        allMatches.push({
          start: adjustedStart,
          end: adjustedStart + match[0].length,
          text: match[0],
          category: categoryKey,
          termKey: match[0].toLowerCase()
        });
        // Prevent infinite loops
        if (match.index === regex.lastIndex) regex.lastIndex++;
      }
    });
  });

  // 4. Return the combined, unsorted matches
  return allMatches;
};
// --- END OF NEW HELPER FUNCTION ---


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
    const termOccurrenceCount = {};

    // --- MODIFIED ---
    // This one line replaces your entire match-finding loop.
    const allMatches = getSplitAnalysis(text, categories);
    // --- END OF MODIFICATION ---

    // --- The rest of your logic is UNCHANGED ---
    // It now sorts, filters, and formats the results from getSplitAnalysis

    // Sort all matches (from both passes) by their start position
    allMatches.sort((a, b) => a.start - b.start);

    // Filter for overlaps, build contexts, and build counts
    const filteredMatches = [];
    let lastEnd = -1;

    allMatches.forEach(match => {
      if (match.start >= lastEnd) {
        // Initialize category in newCounts if it doesn't exist
        if (!newCounts[match.category]) {
          newCounts[match.category] = {};
        }

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
a         match: match.text,
          after: text.slice(match.end, contextEnd)
        });

        filteredMatches.push(match);
        lastEnd = match.end;
        newCounts[match.category][key] = (newCounts[match.category][key] || 0) + 1;
      }
    });

    // Build the final HTML
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

  // --- ALL YOUR HANDLERS AND DOWNLOADERS ARE UNCHANGED ---

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e) => {
    // ... (this function is unchanged)
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
s   }
  };

  const downloadHighlighted = () => {
    // ... (this function is unchanged)
    const { counts, highlightedHtml } = analysisResults;
    const legendItems = Object.entries(categories).map(([key, cat]) =>
      `<div style="display:inline-block;margin-right:20px"><span style="display:inline-block;width:20px;height:20px;background-color:${cat.color};border:1px solid #ccc;margin-right:5px"></span>${cat.label}</div>`
    ).join('');

    let countsTable = '<h3>Citation Counts</h3><table style="width:100%;border-collapse:collapse;margin:20px 0"><thead><tr><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Category</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Term</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Count</th></tr></thead><tbody>';

    // Initialize counts object for all categories to prevent errors
    const allCategoryCounts = {};
    Object.keys(categories).forEach(key => {
      allCategoryCounts[key] = counts[key] || {};
    });

    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(allCategoryCounts[key]).sort((a, b) => b[1] - a[1]);
      if (entries.length > 0) {
        entries.forEach(([term, count], idx) => {
          countsTable += '<tr>';
          if (idx === 0) {
            countsTable += `<td rowspan="${entries.length}" style="border:1px solid #ddd;padding:8px;background-color:${cat.color};font-weight:bold">${cat.label}</td>`;
          }
          countsTable += `<td style="border:1px solid #ddd;padding:8px">${term}</td><td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold">${count}</td></tr>`;
fs       });
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
    // ... (this function is unchanged)
  F  const { counts } = analysisResults;
    let csvContent = 'Category,Term/Citation,Count\n';
 
     // Initialize counts object for all categories to prevent errors
     const allCategoryCounts = {};
     Object.keys(categories).forEach(key => {
       allCategoryCounts[key] = counts[key] || {};
     });

    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(allCategoryCounts[key]).sort((a, b) => b[1] - a[1]);
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
