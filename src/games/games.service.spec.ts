import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { MembersService } from 'src/members/members.service';
import { mockGames } from 'src/utils/mocks/mock-games';
import {
  entityManagerMockFactory,
  MockType,
  repositoryMockFactory,
} from 'src/utils/testing-utils/mock-factory';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let gameRepoMock: MockType<Repository<Game>>;
  let managerMock: MockType<EntityManager>;

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
        {
          provide: getEntityManagerToken(),
          useFactory: entityManagerMockFactory,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    gameRepoMock = module.get(getRepositoryToken(Game));
    managerMock = module.get(getEntityManagerToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a game', async () => {
    const gameDto: CreateGameDto = {
      name: 'Chess',
      member: 'sandra',
      played_at: new Date(),
    };

    const createdGame: DeepPartial<Game> = {
      ...gameDto,
      member: {
        name: 'sandra',
      },
    };

    const game: Game = await service.create(gameDto);
    expect(game).toEqual(createdGame);
  });

  it('should find all games', async () => {
    gameRepoMock.find.mockReturnValue(mockGames);
    const games: Game[] = await service.findAll();
    expect(games).toHaveLength(25);
  });

  describe('day of month that most games were played', () => {
    const expectedDays = [
      '1/7/2015',
      '2/1/2015',
      '3/1/2015',
      '4/1/2015',
      '5/1/2015',
      '8/1/2015',
    ];

    it('should be calculated programmatically', async () => {
      gameRepoMock.find.mockReturnValue(
        Promise.resolve(mockGames.sort((a, b) => +a.played_at - +b.played_at)),
      );

      const daysMostPlayed: string[] = await service.getDaysMostPlayed(false);
      expect(daysMostPlayed).toEqual(expectedDays);
    });

    it('should be queried from the database', async () => {
      const databaseResponse = [
        { date: '1/7/2015', month: '1/2015' },
        { date: '2/1/2015', month: '1/2015' },
        { date: '3/1/2015', month: '1/2015' },
        { date: '4/1/2015', month: '1/2015' },
        { date: '5/1/2015', month: '1/2015' },
        { date: '8/1/2015', month: '1/2015' },
      ];

      managerMock.query.mockReturnValue(Promise.resolve(databaseResponse));

      const daysMostPlayed: string[] = await service.getDaysMostPlayed();
      expect(daysMostPlayed).toEqual(expectedDays);
    });
  });
});
