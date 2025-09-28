require('dotenv').config();

interface AppConfig {
  // Application
  nodeEnv: string;
  port: number;
  
  // External API
  externalApiUrl: string;
  apiTimeout: number;
  
  // Logger
  logLevel: string;
  logLang: string;
  serviceName: string;
  logFormat: string;
  
  // Server
  requestLimit: string;
}

export const config: AppConfig = {
  // Application Configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // External API Configuration
  externalApiUrl: process.env.EXTERNAL_API_URL || 'https://687eade4efe65e5200875629.mockapi.io/api/v1/posts',
  apiTimeout: parseInt(process.env.API_TIMEOUT || '5000', 10),
  
  // Logger Configuration
  logLevel: process.env.LOG_LEVEL || 'DEBUG',
  logLang: process.env.LOG_LANG || 'ES',
  serviceName: process.env.SERVICE_NAME || 'express-clean-logger-ts',
  logFormat: process.env.LOG_FORMAT || 'JSON',
  
  // Server Configuration
  requestLimit: process.env.REQUEST_LIMIT || '10mb'
};