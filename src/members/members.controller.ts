import { Controller, Get } from '@nestjs/common';
import { Member } from './member.entity';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * List all games played data
   * @returns {Game[]}
   */
  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }
}
