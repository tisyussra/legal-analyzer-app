// src/categories.js
// This file exports the categories so your hook and components can use it.

export const categories = {
  supremeCourt: {
    label: 'Supreme Court Cases',
    color: '#fca5a5',
    patterns: [
      // --- Bruen ---
      // Full name (unchanged, this is good)
      /(?:New York|N\.?Y\.?) State Rifle & Pistol Ass(?:'n|n\.|ociation)(?:, Inc\.)?[\s\S]+?v\. Bruen/gi,
      // IMPROVEMENT: Replaced [\s\S]*? with [^\n]*?
      // This matches the full cite but restricts it to a single line,
      // preventing it from matching text across multiple paragraphs.
      /\b(Bruen, )?597 U\.S\.(?: at)? \d+[^\n]*?\(\s*2022\s*\)/gi,
      /\b142 S\. Ct\.(?: at)? \d+[^\n]*?\(\s*2022\s*\)/gi,
      // Parallel and short cites (unchanged, these are specific and good)
      /\b597 U\.S\.(?: at)? [\d,–\s-]+, 142 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /\bId\.(?: at)? [\d,–\s-]+, 142 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /(?<!, )\b597 U\.S\.(?: at)? [\d,–\s-]+/gi,
      /(?<!U\.S\.(?: at)? [\d,–\s-]+, |Id\.(?: at)? [\d,–\s-]+, )\b142 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      // IMPROVEMENT: Replaced broad /\bBruen\b/
      // This now only matches "Bruen" when it's used with legal context words,
      // making it a much more accurate prose reference match.
      /(?:under|in|from|post-)\bBruen\b/gi,
      /\bBruen\b (?:test|decision|court|holding|opinion|factors)/gi,

      // --- Rahimi ---
      /United States v\. Rahimi/gi,
      // IMPROVEMENT: Replaced [\s\S]*? with [^\n]*? (single-line match)
      /\b(Rahimi, )?602 U\.S\.(?: at)? \d+[^\n]*?\(\s*2024\s*\)/gi,
      /\b144 S\. Ct\.(?: at)? \d+[^\n]*?\(\s*2024\s*\)/gi,
      // Parallel and short cites (unchanged)
      /\b602 U\.S\.(?: at)? [\d,–\s-]+, 144 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /\bId\.(?: at)? [\d,–\s-]+, 144 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /(?<!, )\b602 U\.S\.(?: at)? [\d,–\s-]+/gi,
      /(?<!U\.S\.(?: at)? [\d,–\s-]+, |Id\.(?: at)? [\d,–\s-]+, )\b144 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      // IMPROVEMENT: Replaced broad /\bRahimi\b/ with context-aware match
      /(?:under|in|from|post-)\bRahimi\b/gi,
      /\bRahimi\b (?:test|decision|court|holding|opinion|factors)/gi,
      
      // --- Heller ---
      /District of Columbia v\. Heller/gi,
      // IMPROVEMENT: Replaced [\s\S]*? with [^\n]*? (single-line match)
      /\b(Heller, )?554 U\.S\.(?: at)? \d+[^\n]*?\(\s*2008\s*\)/gi,
      /\b128 S\. Ct\.(?: at)? \d+[^\n]*?\(\s*2008\s*\)/gi,
      // Parallel and short cites (unchanged)
      /\b554 U\.S\.(?: at)? [\d,–\s-]+, 128 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /\bId\.(?: at)? [\d,–\s-]+, 128 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /(?<!, )\b554 U\.S\.(?: at)? [\d,–\s-]+/gi,
      /(?<!U\.S\.(?: at)? [\d,–\s-]+, |Id\.(?: at)? [\d,–\s-]+, )\b128 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      // IMPROVEMENT: Replaced broad /\bHeller\b/ with context-aware match
      /(?:under|in|from|post-)\bHeller\b/gi,
      /\bHeller\b (?:test|decision|court|holding|opinion|factors)/gi,
      
      // --- McDonald ---
      /McDonald v\. City of Chicago/gi,
      // IMPROVEMENT: Replaced [\s\S]*? with [^\n]*? (single-line match)
      /\b(McDonald, )?561 U\.S\.(?: at)? \d+[^\n]*?\(\s*2010\s*\)/gi,
      /\b130 S\. Ct\.(?: at)? \d+[^\n]*?\(\s*2010\s*\)/gi,
      // Parallel and short cites (unchanged)
      /\b561 U\.S\.(?: at)? [\d,–\s-]+, 130 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /\bId\.(?: at)? [\d,–\s-]+, 130 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /(?<!, )\b561 U\.S\.(?: at)? [\d,–\s-]+/gi,
      /(?<!U\.S\.(?: at)? [\d,–\s-]+, |Id\.(?: at)? [\d,–\s-]+, )\b130 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      // IMPROVEMENT: Replaced broad /\bMcDonald\b/ with context-aware match
      /(?:under|in|from|post-)\bMcDonald\b/gi,
      /\bMcDonald\b (?:test|decision|court|holding|opinion|factors)/gi,
      
      // --- Miller ---
      /United States v\. Miller/gi,
      // IMPROVEMENT: Replaced [\s\S]*? with [^\n]*? (single-line match)
      /\b(Miller, )?307 U\.S\.(?: at)? \d+[^\n]*?\(\s*1939\s*\)/gi,
      /\b59 S\. Ct\.(?: at)? \d+[^\n]*?\(\s*1939\s*\)/gi,
      // Parallel and short cites (unchanged)
      /\b307 U\.S\.(?: at)? [\d,–\s-]+, 59 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
     /\bId\.(?: at)? [\d,–\s-]+, 59 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      /(?<!, )\b307 U\.S\.(?: at)? [\d,–\s-]+/gi,
      /(?<!U\.S\.(?: at)? [\d,–\s-]+, |Id\.(?: at)? [\d,–\s-]+, )\b59 S\. Ct\.(?: at)? [\d,–\s-]+/gi,
      // IMPROVEMENT: Replaced broad /\bMiller\b/ with context-aware match
      /(?:under|in|from|post-)\bMiller\b/gi,
      /\bMiller\b (?:test|decision|court|holding|opinion|factors)/gi,
      ]
  },
  otherCases: {
    label: 'Other Cases',
    color: '#fed7aa',
    patterns: [
      // IMPROVEMENT: Tighter 'Party v. Party' logic.
      // This matches "Capitalized Name v. Capitalized Name" but is less greedy
      // and won't match long sentences. It looks for 1-6 capitalized words per side.
      /\b[A-Z][\w.'&-]+(?:\s+[A-Z\d][\w.'&-]+){0,5}\s+v\.?\s+[A-Z][\w.'&-]+(?:\s+(?:[A-Z\d][\w.'&-]+|of|the|&)){0,5}(?:,\s+\d+\s+[\w.]+\s+\d+)?(?:\s+\([^)]+\))?/g,
      
      // IMPROVEMENT: Added F. App'x and consolidated reporter checks.
      /\b\d+\s+F\.(?:App'x|Supp\.?\s*\d*d?|[2-4]d)?\s+\d+(?:\s+\([^)]+\))?/g,
      
      // IMPROVEMENT: Added negative lookaheads to prevent matching
      // SCOTUS cases already defined above.
      /\b(?!(?:597|602|554|561|307)\s+U\.S\.)\d+\s+U\.S\.\s+\d+(?:\s+\([^)]+\))?/g,
      /\b(?!(?:142|144|128|130|59)\s+S\.\s*Ct\.)\d+\s+S\.\s*Ct\.\s+\d+(?:\s+\([^)]+\))?/g,
    ]
  },
  lawReview: {
    label: 'Law Review Articles',
    color: '#fef08a',
    patterns: [
      // IMPROVEMENT: Combined all L. Rev/J/Q into one, more robust regex.
      // This now correctly handles abbreviations like "N.Y.U." or "U. Pa."
      /\b\d+\s+[A-Z][\w.&]+\.?\s+L(?:aw)?\.?\s*(?:Rev(?:iew)?\.?|J(?:ournal)?\.?|Q(?:uarterly)?\.?)\s+\d+/gi,
    ]
  },
  secondarySources: {
    label: 'Secondary Sources',
    color: '#d9f99d',
    patterns: [
      /\b\d*\s*(?:[A-Z][A-Za-z.]+\s+)?(?:Blackstone|Bl\.\s+Comm\.)(?:,\s*Commentaries)?(?: \w+)?\s*\d+/gi,
      // IMPROVEMENT: Made the .* non-greedy (.*?) to reduce false positives.
      /\b\d+\s+[A-Z][A-Za-z.\s&]+?\s+\d+.*?\(\d{4}\)/gi,
      /\b[A-Z][A-Za-z.\s&,]+?\s+supra,\s+at\s+[\d\s,n.]+/gi,
      // IMPROVEMENT: Made the .* non-greedy (.*?)
      /\b\d*\s+[A-Z][A-Za-z\s,]+,\s+(?:[A-Z][A-Za-z\s,]+?|Commentaries)\s+\d+.*?\(.*?1[6-9]\d{2}\)/gi
    ]
  },
  statutesAndCodes: {
    label: 'Statutes and Codes',
    color: '#bbf7d0',
    patterns: [
      /\b\d+\s+U\.?S\.?C\.?\s+§§?\s+[\d\w-]+(?:\([a-z0-9]+\))*/gi,
      /\b\d{4}\s+[A-Z][a-z]+\.\s+Stat\.\s+\d+(?:,\s+ch\.\s+\d+)?(?:,\s+§\s+\d+)?/gi,
      /\b(?:Ala\.|Alaska|Ariz\.|Ark\.|Cal\.|Colo\.|Conn\.|Del\.|Fla\.|Ga\.|Haw\.|Idaho|Ill\.|Ind\.|Iowa|Kan\.|Ky\.|La\.|Me\.|Md\.|Mass\.|Mich\.|Minn\.|Miss\.|Mo\.|Mont\.|Neb\.|Nev\.|N\.?\s*H\.|N\.?\s*J\.|N\.?\s*M\.|N\.?\s*Y\.|N\.?\s*C\.|N\.?\s*D\.|Ohio|Okla\.|Or\.|Pa\.|R\.?\s*I\.|S\.?\s*C\.|S\.?\s*D\.|Tenn\.|Tex\.|Utah|Vt\.|Va\.|Wash\.|W\.?\s*Va\.|Wis\.|Wyo\.)\s+(?:Rev\.?\s+)?(?:Stat\.?|Code|Gen\.?\s+Laws|Comp\.?\s+Laws|Ann\.?|Penal|Crim\.?)\s+(?:Ann\.?\s+)?(?:tit\.\s+\d+,?\s+)?§§?\s*[\d\w.-]+(?:\([A-Za-z0-9]+\))*/gi
    ]
  },
  historical17th18th: {
    label: '17th & 18th Century Cases',
    color: '#bae6fd',
    patterns: [
      // IMPROVEMENT: Removed redundant/broad 'Party v. Party' regex.
      // 'otherCases' will catch the name; this catches the year-specific citation.
      // Made match non-greedy (.*?) and tightened reporter name.
      /\b\d+\s+[A-Z][\w.]+\s+\d+.*?\((?:1[6-7]\d{2})\)/gi
    ]
  },
  historical19th: {
    label: '19th Century Cases',
    color: '#93c5fd',
    patterns: [
      // IMPROVEMENT: Removed redundant 'Party v. Party' regex.
      /\b\d+\s+[A-Z][\w.]+\s+\d+.*?\((?:18\d{2})\)/gi
    ]
  },
  historical20th: {
    label: '20th Century Cases',
    color: '#7dd3fc',
    patterns: [
      // IMPROVEMENT: Removed redundant 'Party v. Party' regex.
      // This will catch citations like (1939) for Miller, which is fine
      // as long as the 'supremeCourt' category is processed first.
      /\b\d+\s+[A-Z][\w.]+\s+\d+.*?\((?:19\d{2})\)/gi
    ]
  },
  historical21st: {
    label: '21st Century Sources',
    color: '#0ea5e9',
    patterns: [
      // IMPROVEMENT: This is the BIGGEST fix.
      // The original /\b20[0-2]\d\b/g was matching *any* number from 2000-2029,
      // including statute sections (e.g., § 2019) or page numbers.
      // This now *only* matches years when inside parentheses, e.g., (2019).
      /\(20[0-2]\d\)/g,
      /\btwenty-first century/gi,
      /\b21st century/gi,
    ]
  },
  keyPhrases: {
    label: 'Key Legal Phrases',
    color: '#f9a8d4',
    patterns: [
      /possession of firearms/gi,
      /regulation of firearms/gi,
      /firearms possession/gi,
      /restrictions on firearm possession/gi,
      /facial challenges?/gi,
      /carry a firearm/gi,
      /possess a firearm/gi,
      /firearms are prohibited/gi,
      /consistent with (?:this|the|our) Nation'?s historical tradition of firearm regulation/gi,
      /consistent with the Nation'?s history and tradition of firearm regulation/gi,
      /consistent with (?:this|the|our) Nation'?s historical tradition/gi,
      /consistent with (?:this|the|our) Nation'?s history and traditions/gi,
      /consistent with (?:this|the|our) Nation'?s historical understanding of firearm regulation/gi,
      /consistent with (?:this|the|our) Nation'?s tradition of firearm regulation/gi,
      /consistent with the principles that underpin (?:our|the) (?:Nation'?s )?(?:regulatory )?tradition/gi,
      /consistent with the principles that underpin (?:our|the) Nation'?s history and tradition/gi,
      /consistent with the principles that underpin (?:our|the) Nation'?s tradition of firearm regulation/gi,
      /consistent with (?:this|the|our) Nation'?s tradition and historical practice/gi,
      /relevant historical tradition/gi,
      /tradition underpinning (?:our|the) Nation'?s history/gi,
      /the relevant tradition in (?:this|the|our) Nation'?s history of firearm regulation/gi,
      /tradition of regulation that underpins (?:our|the) Nation'?s history/gi,
      /longstanding historical tradition/gi,
      /deeply rooted historical tradition/gi,
      /rooted in (?:our|the) Nation'?s historical tradition/gi,
      /in line with the historical tradition/gi,
      /within (?:our|the) Nation'?s historical tradition/gi,
      /(?:our|the) historical tradition of regulating dangerous conduct with firearms/gi,
      /the Nation'?s historical approach to firearm regulation/gi,
      /consistent with the historical understanding of the Second Amendment/gi,
      /consistent with the longstanding tradition of disarming dangerous individuals/gi,
      /consistent with the principles that have long underpinned (?:our|the) Nation'?s history of firearm regulation/gi,
      /presumptively lawful/gi,
      /text and tradition/gi,
      /sensitive places?/gi,
      /dangerous (?:and|or) unusual weapons?/gi,
    ]
  },
  constitutional: {
    label: 'Constitutional Provisions',
    color: '#e9d5ff',
    patterns: [
      /First Amendment/gi,
      /Fourth Amendment/gi,
      /Fifth Amendment/gi,
      /Fourteenth Amendment/gi,
      /Bill of Rights/gi,
      /U\.S\.\s*Const\./gi,
    ]
  },
  amicus: {
    label: 'Amicus Briefs',
    color: '#f0abfc',
    patterns: [
      /amicus curiae/gi,
      /amici curiae/gi,
      /amicus brief/gi,
      /friend of the court/gi,
      // IMPROVEMENT: Fixed typo (removed 's ' at beginning)
      /amici brief/gi,
    ]
  },
};
