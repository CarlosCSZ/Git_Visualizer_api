import {
  Controller,
  Post,
  Body,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommitsService } from './commits.service';
import { RepoDTO } from './dto/commits.dto';
import { CommitDetails } from './models/commitDetails.model';

@Controller('api/commits')
@ApiTags('Commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @ApiOperation({ summary: 'Returns all commits from a given repo' })
  @Post()
  getOcto(@Body() body: RepoDTO): Promise<CommitDetails[]> {
    try {
      return this.commitsService.getCommitsFromRepo(body.repo);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new NotFoundException('Commits Were not found');
      } else {
        throw new ServiceUnavailableException(error.message);
      }
    }
  }
}
