import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
   */
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  /**
   * Fetch all games from db
   * @returns {Promise}
   */
  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }
}
