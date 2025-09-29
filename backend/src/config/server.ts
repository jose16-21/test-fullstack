import express from 'express';
import cors from 'cors';
import { config } from './environment';
import externalRoutes from '../interface/routes/external.routes';

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://d3dmhyhi7cmhzt.cloudfront.net', // Production URL
    'http://localhost:3001', // Frontend development
    'http://localhost:3000', // Alternative frontend port
    'http://127.0.0.1:3001', // Alternative localhost
    'http://frontend:80',    // Docker production
    'http://frontend-dev:3001' // Docker development
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'x-request-id'
  ]
};

app.use(cors(corsOptions));
app.use(express.json({ limit: config.requestLimit }));
app.use(express.urlencoded({ extended: true, limit: config.requestLimit }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Routes
app.use('/external', externalRoutes);

export default app;
