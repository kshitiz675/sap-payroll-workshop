const http = require('http');
const fs = require('fs');
const path = require('path');

// Port for the backend server
const PORT = 3000;

/**
 * Handles incoming HTTP requests. Supports a simple POST /submit endpoint
 * which accepts JSON payloads representing the captured workshop data. Data
 * is persisted to a local JSON file for later analysis. All other requests
 * respond with a generic message. CORS headers are set to allow browser
 * clients running on a different port (such as the static frontend served
 * from a file) to communicate with this backend.
 *
 * Note: In a production environment you would typically use a framework like
 * Express and a database. This implementation avoids external dependencies
 * and keeps state on disk for simplicity.
 */
const server = http.createServer((req, res) => {
  // Set common CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Respond quickly to OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Handle POST submissions
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // Determine file path for persisting data
        const filePath = path.join(__dirname, 'data.json');
        // Write data to disk (overwrites previous content)
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failed to save data' }));
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Data saved successfully' }));
          }
        });
      } catch (e) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Fallback response for other endpoints
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Not found' }));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});