import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';
require('dotenv').config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
  logging: process.env.DB_LOGGING === 'false',
};
