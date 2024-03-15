import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { UtilsService } from './utils.service';

@Module({
  providers: [LoggerService, UtilsService],
  exports: [LoggerService, UtilsService],
})
export class UtilsModule {}
