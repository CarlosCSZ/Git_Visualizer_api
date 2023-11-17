import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';
import { format } from 'date-fns-tz';

import { CommitDetails } from 'src/commits/models/commitDetails.model';
import config from 'src/configurations/config';
import { ConfigType } from '@nestjs/config';
import { PrivateRepoDTO } from './dto/commits.dto';

@Injectable()
export class CommitsService {
  private readonly logger = new Logger(CommitsService.name);
  private octokit: Octokit;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getCommitsFromRepo(repo: string): Promise<CommitDetails[]> {
    this.octokit = new Octokit();
    try {
      const ghResponse = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: this.configService.gh.owner,
          repo: repo,
        },
      );
      if (ghResponse.data.length === 0) {
        return [];
      }
      const commits: CommitDetails[] = ghResponse.data.map((commit) => {
        const dateUTC = new Date(commit.commit.committer.date);
        return {
          sha: commit.sha,
          author: commit.commit.committer.name,
          email: commit.commit.committer.email,
          date: format(dateUTC, 'EEE, dd MMM yyyy HH:mm:ss', {
            timeZone: 'America/Guayaquil',
          }),
          message: commit.commit.message,
          avatar: commit.author.avatar_url,
          gh_url: commit.html_url,
        };
      });

      return commits;
    } catch (error) {
      this.logger.error('Error getting commits: ', error.message);
      throw new Error('404');
    }
  }

  async commitsFromPrivateRepo(
    privateRepo: PrivateRepoDTO,
  ): Promise<CommitDetails[]> {
    this.logger.log('testCommitsFromRepo INIT');
    this.octokit = new Octokit({
      auth: privateRepo.token,
    });
    try {
      this.logger.log(this.configService.gh.token);
      const ghResponse = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: privateRepo.owner,
          repo: privateRepo.repo,
        },
      );

      if (ghResponse.data.length === 0) {
        return [];
      }
      const commits: CommitDetails[] = ghResponse.data.map((commit) => {
        const dateUTC = new Date(commit.commit.committer.date);
        return {
          sha: commit.sha,
          author: commit.commit.committer.name,
          email: commit.commit.committer.email,
          date: format(dateUTC, 'EEE, dd MMM yyyy HH:mm:ss', {
            timeZone: 'America/Guayaquil',
          }),
          message: commit.commit.message,
          avatar: commit.author.avatar_url,
          gh_url: commit.html_url,
        };
      });

      return commits;
    } catch (error) {
      this.logger.error('Error getting commits: ', error.message);
      throw new Error('404');
    }
  }
}
