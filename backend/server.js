const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/usps');

const app = express();

const allowedOrigins = new Set([
  'https://sammatcha.github.io',
  'http://localhost:3000'
]);

let corsOptions = {
  origin: function (origin, callback){
    if (!origin || allowedOrigins.has(origin)) return callback(null,true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: false,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
}

// ---- Core prod settings ----
const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.set('env', process.env.NODE_ENV || 'production');
app.disable('x-powered-by');

// ---- Middleware ----
// Apply CORS before other middleware to ensure preflight requests are handled
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Handle preflight requests

app.use(helmet());                 // sensible security headers
app.use(compression());            // gzip responses
app.use(morgan('combined'));       // access logs (swap for pino-http for JSON)

app.use(express.json({ limit: '1mb' })); // prevent huge bodies

// ---- Routes ----
app.use('/api', routes);

// Simple health endpoints (for load balancer / k8s)
app.get('/healthz', (_req, res) => res.status(200).send('ok'));
app.get('/readyz', (_req, res) => res.status(200).send('ready'));

// ---- Error handling ----
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

// ---- Start & graceful shutdown ----
const server = app.listen(PORT, () => {
  console.log(`API listening on: ${PORT}`);
  console.log(`cors allowed origin:`, [...allowedOrigins]);
});

const shutdown = (sig) => () => {
  console.log(`\n${sig} received, shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000); // hard timeout
};
['SIGINT','SIGTERM'].forEach(s => process.on(s, shutdown(s)));
