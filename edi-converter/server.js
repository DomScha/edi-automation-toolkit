/**
 * server.js
 *
 * Kleine REST-API rund um den EDI-Parser.
 *
 * Start:
 *   npm install
 *   node server.js
 *
 * Endpoint:
 *   POST /convert
 *   Body (text/plain): rohe EDI-Nachricht
 *   Query-Param (optional): ?format=edifact|x12
 *
 * Beispiel:
 *   curl -X POST "http://localhost:3000/convert?format=edifact" \
 *     --data-binary @examples/sample.edifact \
 *     -H "Content-Type: text/plain"
 */

const express = require('express');
const { parseEdi } = require('./edi-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text({ type: '*/*', limit: '1mb' }));

app.get('/', function (req, res) {
  res.json({
    name: 'edi-converter',
    status: 'ok',
    endpoints: {
      convert: 'POST /convert?format=edifact|x12 (Body: rohe EDI-Nachricht als Text)',
    },
  });
});

app.post('/convert', function (req, res) {
  const raw = req.body;
  const format = req.query.format;

  if (!raw || typeof raw !== 'string' || raw.trim().length === 0) {
    return res.status(400).json({ error: 'Leerer Body. Bitte rohe EDI-Nachricht als Text senden.' });
  }

  try {
    const result = parseEdi(raw, { format: format || undefined });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, function () {
  console.log('edi-converter API laeuft auf http://localhost:' + PORT);
});
