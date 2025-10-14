const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/usps');

const app = express();

// ---- Core prod settings ----
const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.set('env', process.env.NODE_ENV || 'production');
app.disable('x-powered-by');

// ---- Middleware ----
app.use(helmet());                 // sensible security headers
app.use(compression());            // gzip responses
app.use(morgan('combined'));       // access logs (swap for pino-http for JSON)
app.use(cors({ 
    origin: ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    optionsSuccessStatus:200,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true

 })); // restrict CORS in prod


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
  console.log(`"cors origin:" ${ORIGIN}`)
});

const shutdown = (sig) => () => {
  console.log(`\n${sig} received, shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000); // hard timeout
};
['SIGINT','SIGTERM'].forEach(s => process.on(s, shutdown(s)));
