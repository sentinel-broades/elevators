import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from '../entities/floor.entity';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([Floor]), UtilsModule],
  providers: [FloorService],
  controllers: [FloorController],
  exports: [FloorService],
})
export class FloorModule {}
