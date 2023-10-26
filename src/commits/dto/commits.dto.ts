import { IsNotEmpty, IsString } from 'class-validator';

export class RepoDTO {
  @IsNotEmpty()
  @IsString()
  readonly repo: string;
}
