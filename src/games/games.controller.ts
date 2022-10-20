import { Body, Controller, Get, Post } from '@nestjs/common';
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
   * Get day of most games played for each month
   * @returns {string[]}
   */
  @Get('/days-most-played')
  getDaysMostPlayed(): Promise<string[]> {
    return this.gamesService.getDaysMostPlayed();
  }
}
