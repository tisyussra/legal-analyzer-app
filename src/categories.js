// src/categories.js
// This file exports the categories so your hook and components can use it.

export const categories = {
  supremeCourt: {
    label: 'Supreme Court Cases',
    color: '#fca5a5',
    patterns: [
      // Bruen - Full case name (limited to reasonable length)
      /(?:New York|N\.?Y\.?) State Rifle & Pistol Ass(?:'n|n\.|ociation)(?:, Inc\.)?\s+v\.\s+Bruen/gi,
      // Bruen citations with year
      /\b(?:Bruen,\s+)?597\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?)?\s*\(\s*2022\s*\)/gi,
      /\b142\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*\(\s*2022\s*\)/gi,
      // Bruen citations without year (dual reporter)
      /\b597\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*142\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Id. citations for Bruen context
      /\bId\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*142\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Standalone Bruen citations (not preceded by comma)
      /(?<!\d\s*,\s*)\b597\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*,\s*\d+\s+S\.\s*Ct\.)/gi,
      /(?<!U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*)\b142\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*\()/gi,
      // Bruen case name only
      /(?<!v\.\s)(?<!\w)\bBruen\b(?!\s+v\.)/gi,

      // Rahimi - Full case name
      /United\s+States\s+v\.\s+Rahimi/gi,
      // Rahimi citations with year
      /\b(?:Rahimi,\s+)?602\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?)?\s*\(\s*2024\s*\)/gi,
      /\b144\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*\(\s*2024\s*\)/gi,
      // Rahimi citations without year (dual reporter)
      /\b602\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*144\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Id. citations for Rahimi context
      /\bId\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*144\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Standalone Rahimi citations
      /(?<!\d\s*,\s*)\b602\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*,\s*\d+\s+S\.\s*Ct\.)/gi,
      /(?<!U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*)\b144\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*\()/gi,
      // Rahimi case name only
      /(?<!v\.\s)(?<!\w)\bRahimi\b(?!\s+v\.)/gi,

      // Heller - Full case name
      /District\s+of\s+Columbia\s+v\.\s+Heller/gi,
      // Heller citations with year
      /\b(?:Heller,\s+)?554\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?)?\s*\(\s*2008\s*\)/gi,
      /\b128\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*\(\s*2008\s*\)/gi,
      // Heller citations without year (dual reporter)
      /\b554\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*128\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Id. citations for Heller context
      /\bId\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*128\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Standalone Heller citations
      /(?<!\d\s*,\s*)\b554\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*,\s*\d+\s+S\.\s*Ct\.)/gi,
      /(?<!U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*)\b128\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*\()/gi,
      // Heller case name only
      /(?<!v\.\s)(?<!\w)\bHeller\b(?!\s+v\.)/gi,

      // McDonald - Full case name
      /McDonald\s+v\.\s+City\s+of\s+Chicago/gi,
      // McDonald citations with year
      /\b(?:McDonald,\s+)?561\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?)?\s*\(\s*2010\s*\)/gi,
      /\b130\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*\(\s*2010\s*\)/gi,
      // McDonald citations without year (dual reporter)
      /\b561\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*130\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Id. citations for McDonald context
      /\bId\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*130\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Standalone McDonald citations
      /(?<!\d\s*,\s*)\b561\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*,\s*\d+\s+S\.\s*Ct\.)/gi,
      /(?<!U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*)\b130\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*\()/gi,
      // McDonald case name only
      /(?<!v\.\s)(?<!\w)\bMcDonald\b(?!\s+v\.)/gi,

      // Miller - Full case name
      /United\s+States\s+v\.\s+Miller/gi,
      // Miller citations with year
      /\b(?:Miller,\s+)?307\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?)?\s*\(\s*1939\s*\)/gi,
      /\b59\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*\(\s*1939\s*\)/gi,
      // Miller citations without year (dual reporter)
      /\b307\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*59\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Id. citations for Miller context
      /\bId\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*59\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?/gi,
      // Standalone Miller citations
      /(?<!\d\s*,\s*)\b307\s+U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*,\s*\d+\s+S\.\s*Ct\.)/gi,
      /(?<!U\.S\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?\s*,\s*)\b59\s+S\.\s*Ct\.\s*(?:at\s+)?\d+(?:\s*[-–]\s*\d+)?(?!\s*\()/gi,
      // Miller case name only
      /(?<!v\.\s)(?<!\w)\bMiller\b(?!\s+v\.)/gi,
    ]
  },
  otherCases: {
    label: 'Other Cases',
    color: '#fed7aa',
    patterns: [
      /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+(?:,\s+\d+\s+[A-Z][\w.]+\s+\d+)?(?:\s+\([^)]+\))?/g,
      /\b\d+\s+F\.\s*(?:2d|3d|4th|Supp\.\s*\d*d?)?\s*\d+(?:\s+\([^)]+\))?/g,
      /\b\d+\s+U\.S\.\s+\d+(?:\s+\([^)]+\))?/g,
      /\b\d+\s+S\.\s*Ct\.\s+\d+(?:\s+\([^)]+\))?/g,
    ]
  },
  lawReview: {
    label: 'Law Review Articles',
    color: '#fef08a',
    patterns: [
      /\b\d+\s+[A-Z][a-z]+\.?\s+L\.?\s*Rev\.?\s+\d+/gi,
      /\b\d+\s+[A-Z][a-z]+\.?\s+L\.?\s*J\.?\s+\d+/gi,
      /\b\d+\s+[A-Z][a-z]+\.?\s+L\.?\s*Q\.?\s+\d+/gi,
    ]
  },
  secondarySources: {
    label: 'Secondary Sources',
    color: '#d9f99d',
    patterns: [
      /\b\d*\s*(?:[A-Z][A-Za-z.]+\s+)?(?:Blackstone|Bl\.\s+Comm\.)(?:,\s*Commentaries)?(?: \w+)?\s*\d+/gi,
      /\b\d+\s+[A-Z][A-Za-z.\s&]+?\s+\d+.*?\(\d{4}\)/gi,
      /\b[A-Z][A-Za-z.\s&,]+?\s+supra,\s+at\s+[\d\s,n.]+/gi,
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
      /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(1[6-7]\d{2}\)/gi,
      /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(1[6-7]\d{2}\)/gi
    ]
  },
  historical19th: {
    label: '19th Century Cases',
    color: '#93c5fd',
    patterns: [
      /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(18\d{2}\)/gi,
      /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(18\d{2}\)/gi
    ]
  },
  historical20th: {
    label: '20th Century Cases',
    color: '#7dd3fc',
    patterns: [
      /\b[A-Z][A-Za-z'\s.&]+\s+v\.?\s+[A-Z][A-Za-z'\s.&]+,\s+\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(19\d{2}\)/gi,
      /\b\d+\s+[A-Z][A-Za-z.]*\s+\d+.*\(19\d{2}\)/gi
    ]
  },
  historical21st: {
    label: '21st Century Sources',
    color: '#0ea5e9',
    patterns: [
      /\b20[0-2]\d\b/g,
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
      /Second Amendment/gi,
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
      /amici brief/gi,
    ]
  },
};
