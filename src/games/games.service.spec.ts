import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { MembersService } from 'src/members/members.service';
import { mockGames } from 'src/utils/mocks/mock-games';
import {
  MockType,
  repositoryMockFactory,
} from 'src/utils/testing-utils/mock-factory';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let gameRepoMock: MockType<Repository<Game>>;
  // let memberRepoMock: MockType<Repository<Member>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        MembersService,
        {
          provide: getRepositoryToken(Game),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Member),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    gameRepoMock = module.get(getRepositoryToken(Game));
    // memberRepoMock = module.get(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all games', async () => {
    gameRepoMock.find.mockReturnValue(mockGames);
    const games: Game[] = await service.findAll();
    expect(games).toHaveLength(2);
  });
});
