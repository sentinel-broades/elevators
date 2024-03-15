import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  debug(message: string) {
    this.logger.level = 'debug';
    this.logger.debug(message, { context: this.context });
  }

  log(message: string) {
    this.logger.level = 'info';
    this.logger.info(message, { context: this.context });
  }

  warn(message: string) {
    this.logger.level = 'warn';
    this.logger.warn(message, { context: this.context });
  }

  error(message: string) {
    this.logger.level = 'error';
    this.logger.error(message, { context: this.context });
  }

  httpError(message: string, error: any) {
    this.error(error.message);
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  createEntityError(error: any, entity: string) {
    if (error?.code === '23505') {
      const msg = `${entity} already exists`;
      this.log(msg);
      throw new ConflictException(msg);
    }
    this.log(error);
    this.httpError(`An error occurred creating ${entity}`, error);
  }
}
