const { LogLevel, Environment, OutputFormat, SupportedLang } = require('@smdv/logger');
const { Logger } = require('@smdv/logger/dist/logger');
import { config } from '../../config/environment';

const logLevelMap: { [key: string]: any } = {
  'DEBUG': LogLevel.DEBUG,
  'INFO': LogLevel.INFO,
  'WARN': LogLevel.WARN,
  'ERROR': LogLevel.ERROR
};

const langMap: { [key: string]: any } = {
  'ES': SupportedLang.ES,
  'EN': SupportedLang.EN
};

const envMap: { [key: string]: any } = {
  'development': Environment.LOCAL,
  'local': Environment.LOCAL,
  'staging': Environment.STAGING,
  'production': Environment.PRODUCTION
};

const formatMap: { [key: string]: any } = {
  'JSON': OutputFormat.JSON,
  'TEXT': OutputFormat.TEXT
};

const logger = new Logger({
  level: logLevelMap[config.logLevel] || LogLevel.DEBUG,
  lang: langMap[config.logLang] || SupportedLang.ES,
  service: config.serviceName,
  environment: envMap[config.nodeEnv] || Environment.LOCAL,
  outputFormat: formatMap[config.logFormat] || OutputFormat.JSON
});

export default logger;
