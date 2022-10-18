import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  /**
   * List all games played data
   * @returns {Game[]}
   */
  @Get()
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  /**
   * Create Game
   * @param {Object} createGameDto - game properties
   * @returns {Game}
   */
  @Post()
  // @ApiOperation({ summary: 'summary goes here' })
  // @ApiResponse({ status: 200, description: 'description goes here', schema: { ...define schema here... } })
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  // TODO
  // ○ all streaks of days when more and more games were played than the day before
  // (you can ignore days with no play). e.g. Member played 2 games on 03/02, 3
  // games on 03/05, and 6 games on 03/06. That’s a streak.
  // ○ for each month, which day of the month has members played the most games
}
