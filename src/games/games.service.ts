import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersService } from 'src/members/members.service';
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

  // ○ all streaks of days when more and more games were played than the day before
  // (you can ignore days with no play). e.g. Member played 2 games on 03/02, 3
  // games on 03/05, and 6 games on 03/06. That’s a streak.
  // ○ for each month, which day of the month has members played the most games
}
