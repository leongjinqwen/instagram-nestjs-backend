import { Injectable } from '@nestjs/common';
// like util function
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
