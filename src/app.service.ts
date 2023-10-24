import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';
import { ConfigType } from '@nestjs/config';

import config from './configurations/config';
import { CommitDetails } from './models/commitDetails.model';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async octoService(): Promise<CommitDetails[]> {
    const octokit = new Octokit({
      auth: this.configService.gh.token,
    });
    try {
      const ghResponse = await octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: this.configService.gh.owner,
          repo: this.configService.gh.repo,
        },
      );
      if (ghResponse.data.length === 0) {
        return [];
      }
      const commits: CommitDetails[] = ghResponse.data.map((commit) => {
        return {
          sha: commit.sha,
          author: commit.commit.committer.name,
          date: new Date(commit.commit.committer.date).toUTCString(),
          message: commit.commit.message,
          avatar: commit.author.avatar_url,
        };
      });

      return commits;
    } catch (error) {
      this.logger.error('Error getting commits: ', error.message);
      throw new Error('404');
    }
  }
}
