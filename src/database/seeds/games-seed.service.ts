import * as fs from 'fs/promises';
import { parse } from 'csv/sync';
import { Injectable } from '@nestjs/common';
import { Game } from 'src/games/game.entity';
import { GamesService } from 'src/games/games.service';

/**
 * Service dealing with seeding database.
 *
 * @class
 */
@Injectable()
export class GamesSeedService {
  constructor(private readonly gamesService: GamesService) {}

  /**
   * Seed all games played from csv file.
   *
   * @function
   */
  async seedGames(): Promise<Game[]> {
    const content = await fs.readFile(__dirname + '/seed-data.csv', 'utf8');
    const games = parse(content, { columns: true });
    const results = [];

    /**
     * Handling of promises must be sequential to avoid
     * unique contraint violation of member creation.
     */
    for (const game of games) {
      game.name = game.game;
      game.played_at = game.date;
      delete game.date;

      await results.push(await this.gamesService.create(game));
    }

    return results;
  }
}
