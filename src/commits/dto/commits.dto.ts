import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class RepoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly repo: string;
}

class PrivateRepoDTO extends RepoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly token: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly owner: string;
}

export { RepoDTO, PrivateRepoDTO };
