import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRequest(): string {
    return 'Hello World!';
  }
}
