import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MemberDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
}
