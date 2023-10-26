import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RepoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly repo: string;
}
