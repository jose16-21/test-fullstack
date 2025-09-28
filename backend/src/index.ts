import { config } from './config/environment';
import app from './config/server';
import logger from './infrastructure/logger/logger';

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}, environment: ${config.nodeEnv}`);
});
