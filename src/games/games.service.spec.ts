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
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let gameRepoMock: MockType<Repository<Game>>;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('should create a game', async () => {
    const gameDto: CreateGameDto = {
      name: 'Chess',
      member: 'sandra',
      played_at: new Date(),
    };

    const game: Game = await service.create(gameDto);
    expect(game).toEqual(gameDto);
  });

  it('should find all games', async () => {
    gameRepoMock.find.mockReturnValue(mockGames);
    const games: Game[] = await service.findAll();
    expect(games).toHaveLength(25);
  });

  it('should get day of month that most games were played', async () => {
    const expectedDays = [
      '1/7/2015',
      '2/1/2015',
      '3/1/2015',
      '4/1/2015',
      '5/1/2015',
      '8/1/2015',
    ];

    gameRepoMock.find.mockReturnValue(
      Promise.resolve(mockGames.sort((a, b) => +a.played_at - +b.played_at)),
    );

    const daysMostPlayed: string[] = await service.getDaysMostPlayed();
    expect(daysMostPlayed).toEqual(expectedDays);
  });
});
