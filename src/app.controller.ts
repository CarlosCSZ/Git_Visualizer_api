import {
  Controller,
  Get,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CommitDetails } from './models/commitDetails.model';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('octo')
  getOcto(): Promise<CommitDetails[]> {
    try {
      return this.appService.octoService();
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new NotFoundException('Commits Were not found');
      } else {
        throw new ServiceUnavailableException(error.message);
      }
    }
  }
}
