/**
 * edi-parser.js
 *
 * Generischer Parser fuer EDIFACT- und X12-Nachrichten -> JSON.
 *
 * EDIFACT: Segmente getrennt durch "'", Elemente durch "+", Komponenten durch ":"
 * X12:     Segmente getrennt durch "~", Elemente durch "*", Komponenten durch ">"
 *
 * Das Format wird automatisch erkannt (anhand des ersten Segment-Tags:
 * "UNB"/"UNH" -> EDIFACT, "ISA" -> X12), kann aber auch erzwungen werden.
 */

const DELIMITERS = {
  edifact: { segment: "'", element: '+', component: ':', release: '?' },
  x12: { segment: '~', element: '*', component: '>', release: '' },
};

function detectFormat(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith('ISA')) return 'x12';
  if (trimmed.startsWith('UNA') || trimmed.startsWith('UNB') || trimmed.startsWith('UNH')) return 'edifact';

  // Fallback: look for typical delimiters
  if (trimmed.includes('~')) return 'x12';
  if (trimmed.includes("'")) return 'edifact';

  throw new Error('Format konnte nicht automatisch erkannt werden. Bitte "format" explizit angeben (edifact|x12).');
}

function splitSegments(raw, delims) {
  return raw
    .split(delims.segment)
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s.length > 0; });
}

function parseSegment(segmentStr, delims) {
  const elements = segmentStr.split(delims.element);
  const tag = elements[0];
  const fields = elements.slice(1).map(function (el) {
    if (delims.component && el.indexOf(delims.component) !== -1) {
      return el.split(delims.component);
    }
    return el;
  });
  return { tag: tag, elements: fields };
}

/**
 * Parses a raw EDI message string into a structured JSON object.
 *
 * @param {string} raw - Raw EDI message content
 * @param {object} [options]
 * @param {'edifact'|'x12'} [options.format] - Force a specific format instead of auto-detecting
 * @returns {object} Parsed representation: { format, segmentCount, segments: [...] }
 */
function parseEdi(raw, options) {
  options = options || {};
  const format = options.format || detectFormat(raw);

  if (!DELIMITERS[format]) {
    throw new Error('Unbekanntes Format: ' + format + '. Erwartet: edifact oder x12.');
  }

  const delims = DELIMITERS[format];
  const segmentStrings = splitSegments(raw, delims);
  const segments = segmentStrings.map(function (s) { return parseSegment(s, delims); });

  return {
    format: format,
    segmentCount: segments.length,
    segments: segments,
  };
}

module.exports = { parseEdi, detectFormat, DELIMITERS };
