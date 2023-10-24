import { Inject, Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { ConfigType } from '@nestjs/config';

import config from './configurations/config';
// import {
//   GetResponseTypeFromEndpointMethod,
//   OctokitResponse,
// } from '@octokit/types';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async OctoService(): Promise<any> {
    const octokit = new Octokit({
      auth: this.configService.gh.token,
    });
    return await octokit.request('GET /repos/{owner}/{repo}', {
      owner: this.configService.gh.owner,
      repo: this.configService.gh.repo,
    });
  }
}
