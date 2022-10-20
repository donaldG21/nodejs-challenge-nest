import { Controller, Get, Param } from '@nestjs/common';
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

  /**
   * Get streaks of days games played
   * when more games were played than the day before
   * e.g. Member played 2 games on 03/02, 3 games on 03/05,
   * and 6 games on 03/06. That’s a streak.
   * @returns {Date[][]}
   */
  @Get(':id/streaks')
  getStreaks(@Param('id') id: number): Promise<string[][] | []> {
    return this.membersService.getStreaks(id);
  }
}
