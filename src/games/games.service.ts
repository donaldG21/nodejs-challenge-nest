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

  /**
   * Get streaks of days games played for member.
   * @param {string} id
   * @returns {Date[][]}
   */
  async getStreaks(id: number): Promise<Date[][]> {
    return new Promise((r) => r([[new Date(), new Date()]]));
  }

  /**
   * Run DB query to get day of month that most games were played.
   * @returns {Date[]}
   */
  async getDaysMostPlayed(): Promise<Date[]> {
    return new Promise((r) => r([new Date(), new Date()]));
  }
}
