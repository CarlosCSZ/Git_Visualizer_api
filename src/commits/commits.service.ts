import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';

import { CommitDetails } from 'src/commits/models/commitDetails.model';
import config from 'src/configurations/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CommitsService {
  private readonly logger = new Logger(CommitsService.name);

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getCommitsFromRepo(repo: string): Promise<CommitDetails[]> {
    const octokit = new Octokit({
      auth: this.configService.gh.token,
    });
    try {
      const ghResponse = await octokit.request(
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
        return {
          sha: commit.sha,
          author: commit.commit.committer.name,
          email: commit.commit.committer.email,
          date: new Date(commit.commit.committer.date).toUTCString(),
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
