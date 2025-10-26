// src/App.js
import React, { useState } from 'react';
import { Upload, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LegalDocumentHighlighter() {
  const [text, setText] = useState('');
  const [highlightedHtml, setHighlightedHtml] = useState('');
  const [counts, setCounts] = useState({});
  const [currentOccurrence, setCurrentOccurrence] = useState({});
  const [opinionStats, setOpinionStats] = useState({ concurrences: 0, dissents: 0 });
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [termContexts, setTermContexts] = useState({});
  const [caseMetadata, setCaseMetadata] = useState({ perCuriam: false });
  const [isLoading, setIsLoading] = useState(false);

  const categories = {
    challengeType: {
      color: '#fcd34d',
      label: 'Challenge Type',
      terms: ['facial challenge', 'as-applied challenge', 'as applied challenge', 'facially unconstitutional', 'unconstitutional as applied']
    },
    caseDisposition: {
      color: '#a7f3d0',
      label: 'Case Disposition',
      terms: ['reversed', 'affirmed', 'vacated', 'remanded', 'reversed and remanded', 'affirmed in part', 'reversed in part', 'vacated and remanded', 'dismissed']
    },
    standardOfReview: {
      color: '#fef3c7',
      label: 'Standard of Review',
      terms: ['de novo', 'abuse of discretion', 'clearly erroneous', 'plain error', 'substantial evidence', 'arbitrary and capricious', 'rational basis', 'strict scrutiny', 'intermediate scrutiny', 'moot', 'mootness', 'standing', 'justiciability']
    },
    circuitCourts: {
      color: '#c7d2fe',
      label: 'SCOTUS & Circuit Court Cases',
      patterns: [
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+U\.?S\.?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\((?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+S\.?\s*Ct\.?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\((?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+F\.\s*(?:3d|4th|App'?x)\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\([^\)]*(?:1st|2d|3d|4th|5th|6th|7th|8th|9th|10th|11th|D\.?C\.|Fed\.)(?:\s+Cir\.?)?\s*(?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b\d+\s+U\.?S\.?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\((?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b\d+\s+S\.?\s*Ct\.?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\((?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b\d+\s+F\.\s*(?:3d|4th|App'?x)\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\([^\)]*(?:1st|2d|3d|4th|5th|6th|7th|8th|9th|10th|11th|D\.?C\.|Fed\.)(?:\s+Cir\.?)?\s*(?:19[0-9]{2}|20[0-9]{2})\)/gi,
        /\b(?:First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|D\.?C\.|Federal)\s+Circuit/gi,
        /\bSupreme\s+Court/gi
      ]
    },
    historicalCases: {
      color: '#d8b4fe',
      label: '17th-18th Century Cases',
      patterns: [
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(1[6-7]\d{2}\)/gi,
        /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(1[6-7]\d{2}\)/gi
      ]
    },
    nineteenthCenturyCases: {
      color: '#c084fc',
      label: '19th Century Cases',
      patterns: [
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(18\d{2}\)/gi,
        /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(18\d{2}\)/gi
      ]
    },
    twentiethCenturyCases: {
      color: '#fbbf24',
      label: '20th Century Cases',
      patterns: [
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(19\d{2}\)/gi,
        /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\(19\d{2}\)/gi
      ]
    },
    twentyFirstCenturyOther: {
      color: '#a3e635',
      label: '21st Century Other Cases',
      patterns: [
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+F\.\s*Supp\.\s*[23]?d?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\([^\)]*20[0-9]{2}\)/gi,
        /\b\d+\s+F\.\s*Supp\.\s*[23]?d?\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\([^\)]*20[0-9]{2}\)/gi,
        /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][a-z.]*\s+\d+(?:\s*,\s*\d+(?:-\d+)?)*\s*\((?:[A-Z][a-z.]*\s+)?20[0-9]{2}\)(?!\s*\((?:1st|2d|3d|4th|5th|6th|7th|8th|9th|10th|11th|D\.?C\.|Fed\.)\s+Cir)/gi
      ]
    },
    landmarkCases: {
      color: '#bbf7d0',
      label: 'Landmark 2A Cases',
      patterns: [
        /\bRahimi\b/g,
        /\bUnited\s+States\s+v\.?\s+Rahimi\b/gi,
        /\bHeller\b/g,
        /\bMcDonald\b/g,
        /\bBruen\b/g,
        /\bDistrict\s+of\s+Columbia\s+v\.?\s+Heller\b/gi,
        /\bMcDonald\s+v\.?\s+(?:City\s+of\s+)?Chicago\b/gi,
        /\bNew\s+York\s+State\s+Rifle\s+&\s+Pistol\s+Ass'?n\.?\s+v\.?\s+Bruen\b/gi
      ]
    },
    stateStatutes: {
      color: '#bfdbfe',
      label: 'State Statutes & Codes',
      patterns: [
        /\b(?:Ala\.|Alaska|Ariz\.|Ark\.|Cal\.|Colo\.|Conn\.|Del\.|Fla\.|Ga\.|Haw\.|Idaho|Ill\.|Ind\.|Iowa|Kan\.|Ky\.|La\.|Me\.|Md\.|Mass\.|Mich\.|Minn\.|Miss\.|Mo\.|Mont\.|Neb\.|Nev\.|N\.?\s*H\.|N\.?\s*J\.|N\.?\s*M\.|N\.?\s*Y\.|N\.?\s*C\.|N\.?\s*D\.|Ohio|Okla\.|Or\.|Pa\.|R\.?\s*I\.|S\.?\s*C\.|S\.?\s*D\.|Tenn\.|Tex\.|Utah|Vt\.|Va\.|Wash\.|W\.?\s*Va\.|Wis\.|Wyo\.)\s+(?:Rev\.?\s+)?(?:Stat\.?|Code|Gen\.?\s+Laws|Comp\.?\s+Laws|Ann\.?|Penal|Crim\.?)\s+(?:Ann\.?\s+)?(?:tit\.\s+\d+,?\s+)?§§?\s*[\d\w.-]+(?:\([A-Za-z0-9]+\))*(?:\s*,\s*\([A-Za-z0-9]+\))*/gi,
        /\b\d+\s+U\.?S\.?C\.?\s+§§?\s+[\d\w-]+(?:\([a-z0-9]+\))*/gi,
        /\b[A-Z][a-z]+\.?\s+(?:Rev\.?\s+)?(?:Stat\.?|Code)\s+§§?\s*[\d\w.-]+(?:\([A-Za-z0-9]+\))*/gi
      ]
    },
    historicalReferences: {
      color: '#fed7aa',
      label: 'Historical References',
      terms: ['founding era', 'founding', 'framers', 'ratification', 'colonial', 'reconstruction', 'historical analogue', 'historical tradition', 'at the founding', 'original public meaning', 'english law', 'england', 'surety', 'sureties', 'going armed', 'go armed', 'went armed', 'carrying arms', 'bearing arms publicly', 'affray', 'blackstone'],
      patterns: [/\b(?:17|18)\d{2}\b(?!\s+(?:U\.?S\.|F\.))/g, /\b(?:seventeenth|eighteenth|nineteenth)\s+century/gi]
    },
    secondarySources: {
      color: '#ddd6fe',
      label: 'Secondary Sources',
      patterns: [
        /\b\d+\s+[A-Z][A-Za-z.]*\s+L\.?\s*(?:J\.|Rev\.|Review)\s+\d+/g,
        /\bRestatement\s+\([A-Za-z]+\)\s+of\s+[A-Za-z\s]+\s+§§?\s+[\d\w.]+/gi
      ]
    },
    keyLanguage: {
      color: '#fecaca',
      label: 'Key Legal Language',
      terms: ['presumptively lawful', 'trapped in amber', 'dangerous and unusual', 'dangerousness', 'common use', 'text and history', 'historical tradition', 'sensitive places', 'bear arms', 'domestic violence']
    },
    opinions: {
      color: '#fde68a',
      label: 'Concurrences & Dissents',
      patterns: [
        /^[A-Z][A-Z\s.]+,\s+(?:Justice|Judge|Circuit Judge|Chief Justice),?\s+(?:concurring|dissenting)/gm,
        /^(?:CONCURRING OPINION|DISSENTING OPINION|CONCURRENCE|DISSENT)/gm,
        /\b(?:concurring|dissenting):/gi
      ]
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const fileType = file.name.split('.').pop().toLowerCase();
    try {
      if (fileType === 'txt') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setText(event.target.result);
          processText(event.target.result);
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

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (newText.trim()) {
      processText(newText);
    } else {
      setHighlightedHtml('');
      setCounts({});
      setOpinionStats({ concurrences: 0, dissents: 0 });
      setCaseMetadata({ perCuriam: false });
      setTermContexts({});
      setSelectedTerm(null);
    }
  };

  const processText = (inputText) => {
    const newCounts = {};
    const newOpinionStats = { concurrences: 0, dissents: 0 };
    const metadata = { perCuriam: /per\s+curiam/i.test(inputText) };
    const allMatches = [];

    Object.entries(categories).forEach(([categoryKey, categoryData]) => {
      newCounts[categoryKey] = {};

      if (categoryData.terms) {
        categoryData.terms.forEach(term => {
          const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          let match;
          while ((match = regex.exec(inputText)) !== null) {
            allMatches.push({
              start: match.index,
              end: match.index + match[0].length,
              text: match[0],
              category: categoryKey,
              termKey: match[0].toLowerCase()
            });
            regex.lastIndex = match.index + 1;
          }
        });
      }

      if (categoryData.patterns) {
        categoryData.patterns.forEach(pattern => {
          const regex = new RegExp(pattern.source, pattern.flags);
          let match;
          while ((match = regex.exec(inputText)) !== null) {
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
      }
    });

    allMatches.sort((a, b) => a.start - b.start);

    const filteredMatches = [];
    const contexts = {};
    let lastEnd = -1;
    const termOccurrenceCount = {};

    allMatches.forEach(match => {
      if (match.start >= lastEnd) {
        const key = match.termKey;
        if (!termOccurrenceCount[key]) {
          termOccurrenceCount[key] = 0;
          contexts[key] = [];
        }
        termOccurrenceCount[key]++;
        match.occurrenceNum = termOccurrenceCount[key];

        // For historical references and 20th century cases, capture more context (specific number of words before)
        let contextBefore;
        if (match.category === 'historicalReferences') {
          const textBeforeMatch = inputText.slice(0, match.start);
          const words = textBeforeMatch.split(/\s+/);
          const lastSixWords = words.slice(-6).join(' ');
          contextBefore = lastSixWords;
        } else if (match.category === 'twentiethCenturyCases') {
          const textBeforeMatch = inputText.slice(0, match.start);
          const words = textBeforeMatch.split(/\s+/);
          const lastFiveWords = words.slice(-5).join(' ');
          contextBefore = lastFiveWords;
        } else {
          const contextStart = Math.max(0, match.start - 100);
          contextBefore = inputText.slice(contextStart, match.start);
        }

        const contextEnd = Math.min(inputText.length, match.end + 100);
        contexts[key].push({
          occurrence: match.occurrenceNum,
          before: contextBefore,
          match: match.text,
          after: inputText.slice(match.end, contextEnd)
        });

        filteredMatches.push(match);
        lastEnd = match.end;
        newCounts[match.category][key] = (newCounts[match.category][key] || 0) + 1;

        if (match.category === 'opinions') {
          const lowerText = match.text.toLowerCase();
          if (lowerText.includes('concurring')) newOpinionStats.concurrences++;
          if (lowerText.includes('dissenting')) newOpinionStats.dissents++;
        }
      }
    });

    let html = '';
    let lastIndex = 0;

    filteredMatches.forEach(match => {
      if (match.start > lastIndex) {
        html += inputText.slice(lastIndex, match.start);
      }
      const color = categories[match.category].color;
      const escapedText = match.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const anchorId = 'match-' + match.termKey.replace(/\s+/g, '-') + '-' + match.occurrenceNum;
      html += '<mark id="' + anchorId + '" style="background-color: ' + color + '; padding: 2px 0; scroll-margin-top: 100px;">' + escapedText + '</mark>';
      lastIndex = match.end;
    });

    if (lastIndex < inputText.length) {
      html += inputText.slice(lastIndex);
    }

    setHighlightedHtml(html);
    setCounts(newCounts);
    setOpinionStats(newOpinionStats);
    setTermContexts(contexts);
    setCaseMetadata(metadata);
  };

  const scrollToTerm = (termKey, occurrenceNum) => {
    if (!occurrenceNum) occurrenceNum = currentOccurrence[termKey] || 1;
    const anchorId = 'match-' + termKey.replace(/\s+/g, '-') + '-' + occurrenceNum;
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentOccurrence(prev => ({ ...prev, [termKey]: occurrenceNum }));
    }
  };

  const navigateTerm = (termKey, direction, totalCount) => {
    const current = currentOccurrence[termKey] || 1;
    let next = current + direction;
    if (next < 1) next = totalCount;
    if (next > totalCount) next = 1;
    scrollToTerm(termKey, next);
  };

  const navigatePreviewTerm = (direction) => {
    if (!selectedTerm) return;

    // Get all terms that have contexts
    const allTerms = Object.keys(termContexts).filter(key => termContexts[key] && termContexts[key].length > 0);
    if (allTerms.length === 0) return;

    const currentIndex = allTerms.indexOf(selectedTerm);
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = allTerms.length - 1;
    if (nextIndex >= allTerms.length) nextIndex = 0;

    setSelectedTerm(allTerms[nextIndex]);
    setCurrentOccurrence(prev => ({ ...prev, [allTerms[nextIndex]]: 1 }));
  };

  const getTermCategory = (term) => {
    for (const [catKey, catData] of Object.entries(categories)) {
      if (counts[catKey] && counts[catKey][term]) {
        return catData.label;
      }
    }
    return '';
  };

  const downloadHighlighted = () => {
    const legendItems = Object.entries(categories).map(([key, cat]) =>
      '<div style="display:inline-block;margin-right:20px"><span style="display:inline-block;width:20px;height:20px;background-color:' + cat.color + ';border:1px solid #ccc;margin-right:5px"></span>' + cat.label + '</div>'
    ).join('');

    let countsTable = '<h3>Citation Counts</h3><table style="width:100%;border-collapse:collapse;margin:20px 0"><thead><tr><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Category</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Term</th><th style="border:1px solid #ddd;padding:8px;background:#4a86e8;color:white">Count</th></tr></thead><tbody>';

    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
      if (entries.length > 0) {
        entries.forEach(([term, count], idx) => {
          countsTable += '<tr>';
          if (idx === 0) {
            countsTable += '<td rowspan="' + entries.length + '" style="border:1px solid #ddd;padding:8px;background-color:' + cat.color + ';font-weight:bold">' + cat.label + '</td>';
          }
          countsTable += '<td style="border:1px solid #ddd;padding:8px">' + term + '</td><td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold">' + count + '</td></tr>';
        });
      }
    });
    countsTable += '</tbody></table>';

    let opinionStatsHtml = '';
    if (opinionStats.concurrences > 0 || opinionStats.dissents > 0) {
      opinionStatsHtml = '<div style="background:#fffbeb;padding:15px;margin:40px 0 20px 0;border:2px solid #fbbf24;border-radius:8px"><h3>Opinion Statistics</h3><table style="margin:10px 0"><tr><td style="padding:5px 10px"><strong>Concurring Opinions:</strong></td><td style="padding:5px 10px">' + opinionStats.concurrences + '</td></tr><tr><td style="padding:5px 10px"><strong>Dissenting Opinions:</strong></td><td style="padding:5px 10px">' + opinionStats.dissents + '</td></tr></table></div>';
    }

    const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Highlighted Legal Document</title></head><body style="font-family:Times New Roman,serif;line-height:1.8;max-width:900px;margin:40px auto;padding:20px"><h1>Legal Document Analysis</h1><div style="margin-bottom:30px;padding:20px;background:#f9fafb">' + legendItems + '</div>' + countsTable + '<hr style="margin:40px 0;border:2px solid #4a86e8"><h2>Highlighted Document</h2><div style="white-space:pre-wrap">' + highlightedHtml + '</div>' + opinionStatsHtml + '</body></html>';

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
    let csvContent = 'Category,Term/Citation,Count\n';

    // Add citation counts
    Object.entries(categories).forEach(([key, cat]) => {
      const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
      entries.forEach(([term, count]) => {
        const escapedTerm = '"' + term.replace(/"/g, '""') + '"';
        csvContent += cat.label + ',' + escapedTerm + ',' + count + '\n';
      });
    });

    // Add blank line
    csvContent += '\n';

    // Add opinion statistics
    csvContent += 'Opinion Statistics,,\n';
    csvContent += 'Concurring Opinions,,' + opinionStats.concurrences + '\n';
    csvContent += 'Dissenting Opinions,,' + opinionStats.dissents + '\n';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Legal Document Highlighter</h1>
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

          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste case text here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm"
          />
        </div>

        {highlightedHtml && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Opinion Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded border-2 border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-700">{opinionStats.concurrences}</div>
                  <div className="text-sm">Concurrences</div>
                </div>
                <div className="bg-red-50 p-4 rounded border-2 border-red-200">
                  <div className="text-3xl font-bold text-red-700">{opinionStats.dissents}</div>
                  <div className="text-sm">Dissents</div>
                </div>
              </div>
            </div>

            {selectedTerm && termContexts[selectedTerm] && (
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
                        <span className="text-gray-600">{ctx.before}</span>
                        <span className="font-bold text-indigo-700 bg-indigo-100 px-1">{ctx.match}</span>
                        <span className="text-gray-600">{ctx.after}...</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(categories).map(([key, cat]) => {
                const entries = Object.entries(counts[key] || {}).sort((a, b) => b[1] - a[1]);
                return (
                  <div key={key} className="bg-white rounded-lg shadow p-4" style={{ borderLeft: '4px solid ' + cat.color }}>
                    <h3 className="font-bold mb-3">{cat.label}</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {entries.length > 0 ? entries.map(([term, count]) => {
                        const current = currentOccurrence[term] || 1;
                        const isHistorical = key === 'historicalReferences';
                        const isTwentiethCentury = key === 'twentiethCenturyCases';
                        const showContext = isHistorical || isTwentiethCentury;
                        const context = showContext && termContexts[term] && termContexts[term][0]
                          ? termContexts[term][0].before + ' '
                          : '';

                        return (
                          <div key={term} className="flex flex-col gap-1 text-sm">
                            <div className="flex justify-between items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedTerm(term);
                                  setCurrentOccurrence(prev => ({ ...prev, [term]: 1 }));
                                  setTimeout(() => {
                                    const panel = document.getElementById('preview-panel');
                                    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }, 100);
                                }}
                                className="text-indigo-600 hover:underline truncate flex-1 text-left"
                              >
                                {showContext && context ? (
                                  <span>
                                    <span className="text-gray-500 text-xs">{context}</span>
                                    <span className="font-semibold">{term}</span>
                                  </span>
                                ) : term}
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
                                )}
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

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Highlighted Document</h2>
              <div className="prose max-w-none whitespace-pre-wrap font-serif leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
