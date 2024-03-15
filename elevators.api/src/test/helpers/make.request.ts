import supertest from 'supertest';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const makeRequest = async (
  app: INestApplication,
  method: string,
  route: string,
  data?: any,
): Promise<supertest.Response> => {
  return await request(app.getHttpServer())[method](route).send(data);
};
