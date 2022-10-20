import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersService } from 'src/members/members.service';
import { getDaysMostPlayed, splitByMonthsAndYear } from 'src/utils/date-utils';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';

/**
 * Service dealing with game operations.
 *
 * @class
 */
@Injectable()
export class GamesService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Game>} gameRepository
   * @param {MembersService} membersService
   */
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly membersService: MembersService,
  ) {}

  /**
   * Fetch all games from db
   * @returns {Game[]}
   */
  findAll(): Promise<Game[]> {
    return this.gameRepository.find({
      relations: {
        member: true,
      },
    });
  }

  /**
   * Adds a new game-played record to the DB from JSON input
   * @returns {Game}
   */
  async create(createGameDto: CreateGameDto): Promise<Game> {
    const { name, member, played_at } = createGameDto;
    const owner = await this.membersService.findOrCreate({ name: member });
    const game = new Game();
    game.name = name;
    game.played_at = played_at;
    game.member = owner;

    return await this.gameRepository.save(game);
  }

  /**
   * Run DB query to get day of month that most games were played.
   * @returns {string[]}
   */
  async getDaysMostPlayed(): Promise<string[]> {
    const gameDatesArray = await this.gameRepository
      .find({ order: { played_at: 'ASC' } })
      .then((games) => games.map((g) => g.played_at));
    const split = splitByMonthsAndYear(gameDatesArray);
    return Object.values(split).map((date) => getDaysMostPlayed(date));
  }
}
