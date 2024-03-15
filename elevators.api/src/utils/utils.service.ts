import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public now(): number {
    return parseFloat((Date.now() / 1000).toFixed(1));
  }
}
