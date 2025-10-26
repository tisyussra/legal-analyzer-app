// src/categories.js
export const categories = {
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
