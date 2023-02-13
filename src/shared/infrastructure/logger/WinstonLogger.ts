import Logger from 'shared/domain/Logger';
import { createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';

enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info'
}

class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.prettyPrint(),
        format.errors({ stack: true }),
        format.splat(),
        format.colorize(),
        format.simple()
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: `logs/${Levels.DEBUG}.log`,
          level: Levels.DEBUG
        }),
        new transports.File({
          filename: `logs/${Levels.ERROR}.log`,
          level: Levels.ERROR
        }),
        new transports.File({
          filename: `logs/${Levels.INFO}.log`,
          level: Levels.INFO
        }),
        new transports.File({
          filename: `logs/${Levels.WARN}.log`,
          level: Levels.WARN
        })
      ]
    });
  }

  warn(message: string, extra?: unknown): void {
    this.logger.warn(message, extra);
  }

  debug(message: string, extra?: unknown): void {
    this.logger.debug(message, extra);
  }

  error(message: string | Error, extra?: unknown): void {
    this.logger.error(message);
    this.logger.error(extra);
  }

  info(message: string, extra?: unknown): void {
    this.logger.info(message, extra);
  }
}
export default WinstonLogger;
