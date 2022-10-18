import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

/**
 * Entity Schema for Games.
 *
 * @class
 */
export class CreateGameDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly member: string;

  @IsDate()
  @ApiProperty()
  readonly played_at: Date;
}
