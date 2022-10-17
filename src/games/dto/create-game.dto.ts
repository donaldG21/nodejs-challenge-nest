import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsDate()
  @ApiProperty()
  readonly played_at: Date;
}
