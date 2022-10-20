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

  it('should find all games', async () => {
    gameRepoMock.find.mockReturnValue(mockGames);
    const games: Game[] = await service.findAll();
    expect(games).toHaveLength(2);
  });

  it('should get streaks of days games played', async () => {
    const id = 1;
    const expectedStreaks = [
      '2015-02-28 00:00:00.000 -0500',
      '2015-03-01 00:00:00.000 -0500',
      '2015-04-01 00:00:00.000 -0400',
    ].map((d) => new Date(d));

    const streaks: Date[][] = await service.getStreaks(id);
    expect(expectedStreaks).toEqual(streaks);
  });

  it('should get day of month that most games were played', async () => {
    const expectedDays = [
      '2015-01-01 00:00:00.000 -0500',
      '2015-02-28 00:00:00.000 -0500',
      '2015-03-01 00:00:00.000 -0500',
      '2015-04-01 00:00:00.000 -0400',
      '2015-05-01 00:00:00.000 -0400',
    ].map((d) => new Date(d));

    const daysMostPlayed: Date[] = await service.getDaysMostPlayed();
    expect(daysMostPlayed).toEqual(expectedDays);
  });
});
