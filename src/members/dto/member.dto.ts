import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Entity Schema for Members.
 *
 * @class
 */
export class MemberDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
}
