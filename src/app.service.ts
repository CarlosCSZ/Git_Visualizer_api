import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {}

  getHello(): string {
    return '<h4>GH-GRAPH-API IS UP AND RUNNING.</h4>';
  }
}
