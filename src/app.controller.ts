import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Returns a message from server' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
