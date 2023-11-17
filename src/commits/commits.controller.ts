import {
  Controller,
  NotFoundException,
  ServiceUnavailableException,
  Get,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommitsService } from './commits.service';
import { PrivateRepoDTO, RepoDTO } from './dto/commits.dto';
import { CommitDetails } from './models/commitDetails.model';

@Controller('api/commits')
@ApiTags('Commits')
export class CommitsController {
  private readonly logger = new Logger(CommitsController.name);

  constructor(private readonly commitsService: CommitsService) {}

  @ApiOperation({ summary: 'Returns all commits from a given repo' })
  @Get()
  async getOcto(@Query() params: RepoDTO): Promise<CommitDetails[]> {
    try {
      this.logger.log('From Query: ', params);
      return await this.commitsService.getCommitsFromRepo(params.repo);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new NotFoundException('Commits Were not found');
      } else {
        throw new ServiceUnavailableException(error.message);
      }
    }
  }

  @ApiOperation({ summary: 'Returns all commits from a Private repository' })
  @Get('private')
  async getOctoPrivate(
    @Query() params: PrivateRepoDTO,
  ): Promise<CommitDetails[]> {
    try {
      return await this.commitsService.commitsFromPrivateRepo(params);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new NotFoundException('Private Commits Were not found');
      } else {
        throw new ServiceUnavailableException(error.message);
      }
    }
  }
}
