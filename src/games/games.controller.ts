import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  /**
   * List all games played.
   * @returns {Game[]}
   */
  @Get()
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  /**
   * Create game played.
   * @param {Object} createGameDto - game properties
   * @returns {Game}
   */
  @Post()
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  /**
   * Get streaks of days games played
   * when more games were played than the day before
   * e.g. Member played 2 games on 03/02, 3 games on 03/05,
   * and 6 games on 03/06. That’s a streak.
   * @returns { Date[][] }
   */
  @Get(':id/streaks')
  getStreaks(@Param('id') id: number): Promise<Date[][]> {
    return this.gamesService.getStreaks(id);
  }

  /**
   * Get day of most games played for each month
   * @returns { Date[] }
   */
  @Get('/days-most-played')
  getDaysMostPlayed(): Promise<Date[]> {
    // TODO
    // return this.gamesService.getDaysMostPlayed();
    return new Promise((r) => r([new Date(), new Date()]));
  }
}
